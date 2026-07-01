import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AssistantPanel } from "./components/AssistantPanel";
import { initProductAnalytics, trackProductEvent } from "./analytics";
import { BenefitsWallet } from "./components/BenefitsWallet";
import { CommunityMap } from "./components/CommunityMap";
import { CommunityPulse } from "./components/CommunityPulse";
import { DemoController } from "./components/DemoController";
import { PropertyDashboard } from "./components/PropertyDashboard";
import { TaskDetails } from "./components/TaskDetails";
import { Topbar } from "./components/Topbar";
import { communityData, promptSamples } from "./data";
import {
  createHelpers,
  matchPromptToTask,
  rankPulses,
  residentLevel,
  seasonForPulse
} from "./domain";
import { canCheckinPulse, isPulseAcceptingJoins } from "./pulseLifecycle";
import { createRetentionMetrics } from "./retention";
import "./styles.css";

initProductAnalytics();

function createInitialResidentProgress() {
  return Object.fromEntries(
    communityData.residentProfiles.map((profile) => [
      profile.id,
      {
        xp: profile.xp,
        badges: [],
        taskHistory: [],
        seasonCheckins: {},
        spiritPoints: profile.spirit_points,
        benefitStates: {},
        benefitCredentials: {},
        pointTransactions: []
      }
    ])
  );
}

function App() {
  const [language, setLanguage] = useState("en");
  const [prompt, setPrompt] = useState(promptSamples[0].prompt);
  const initialTask = new URLSearchParams(window.location.search).get("task") || communityData.pulses[0].linked_task_id;
  const [selectedTaskId, setSelectedTaskId] = useState(initialTask);
  const [poiContext, setPoiContext] = useState(null);
  const [actionStatus, setActionStatus] = useState("");
  const [residentProfileId, setResidentProfileId] = useState(communityData.residentProfiles[0].id);
  const [activePulseId, setActivePulseId] = useState(communityData.pulses[0].id);
  const [pulseStages, setPulseStages] = useState({});
  const [pulseOperationalStates, setPulseOperationalStates] = useState(() =>
    Object.fromEntries(communityData.pulses.map((pulse) => [pulse.id, pulse.status]))
  );
  const [activeSeasonId, setActiveSeasonId] = useState(communityData.pulses[0].linked_season_id);
  const [residentProgress, setResidentProgress] = useState(createInitialResidentProgress);
  const [viewMode, setViewMode] = useState("world");
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [demoStep, setDemoStep] = useState(0);

  const data = useMemo(() => communityData, []);
  const helpers = useMemo(() => createHelpers(data, language), [data, language]);
  const selectedTask = helpers.task(selectedTaskId) || helpers.task(promptSamples[0].taskId);
  const selectedRoute = selectedTask?.linked_route_id ? helpers.route(selectedTask.linked_route_id) : null;
  const selectedActivity = selectedTask?.linked_activity_id ? helpers.activity(selectedTask.linked_activity_id) : null;
  const selectedContract = data.communityTaskContracts.find((contract) => contract.place.task_id === selectedTask?.id) || null;
  const selectedContractProtocol = selectedContract ? createContractProtocolBundle(data, selectedContract.contract_id) : null;
  const residentProfileBase = data.residentProfiles.find((profile) => profile.id === residentProfileId) || data.residentProfiles[0];
  const currentProgress = residentProgress[residentProfileBase.id];
  const residentProfile = {
    ...residentProfileBase,
    xp: currentProgress.xp,
    level: residentLevel(currentProgress.xp)
  };
  const retentionMetrics = useMemo(
    () => createRetentionMetrics(data.residentProfiles, residentProgress, data.seasons),
    [data.residentProfiles, data.seasons, residentProgress]
  );
  const residentRetention = retentionMetrics.byProfile[residentProfile.id];
  const rankedPulses = useMemo(() => rankPulses(data.pulses, residentProfile), [data.pulses, residentProfile]);
  const activePulse = data.pulses.find((pulse) => pulse.id === activePulseId) || rankedPulses[0].pulse;
  const activePulseMatch = rankedPulses.find((entry) => entry.pulse.id === activePulse.id) || rankedPulses[0];
  const pulseProgressKey = `${residentProfile.id}:${activePulse.id}`;
  const pulseStage = pulseStages[pulseProgressKey] || "discovered";
  const pulseOperationalState = pulseOperationalStates[activePulse.id] || activePulse.status;
  const activeSeason = data.seasons.find((season) => season.id === activeSeasonId) || seasonForPulse(data.seasons, activePulse.id);
  const seasonCheckins = currentProgress.seasonCheckins[activeSeason.id] || 0;

  function selectTask(taskId) {
    setPoiContext(null);
    setSelectedTaskId(taskId);
    const url = new URL(window.location.href);
    url.searchParams.set("task", taskId);
    window.history.replaceState({}, "", url);
    const task = helpers.task(taskId);
    trackProductEvent("task_selected", {
      task_id: taskId,
      task_type: task?.type ?? null,
      primary_user_role: task?.primary_user_role ?? null
    });
  }

  function ask() {
    const matchedTaskId = matchPromptToTask(prompt);
    trackProductEvent("community_agent_query_submitted", {
      query: prompt.slice(0, 500),
      matched_task_id: matchedTaskId,
      language,
      match_method: "keyword"
    });
    selectTask(matchedTaskId);
  }

  function openPulseTask() {
    selectTask(activePulse.linked_task_id);
  }

  function joinPulse() {
    if (!isPulseAcceptingJoins(pulseOperationalState)) {
      showActionStatus(helpers.t("pulse.unavailableStatus", "This Pulse is not accepting new participants."));
      return;
    }
    setPulseStages((current) => ({ ...current, [pulseProgressKey]: "joined" }));
    openPulseTask();
    trackProductEvent("pulse_joined", {
      pulse_id: activePulse.id,
      task_id: activePulse.linked_task_id,
      resident_profile_id: residentProfile.id,
      match_score: activePulseMatch.score,
      operational_state: pulseOperationalState
    });
    showActionStatus(helpers.t("pulse.joinedStatus", "Joined. Your route and participant slot are ready."));
  }

  function checkinPulse() {
    if (pulseStage === "checked_in") return;
    if (!canCheckinPulse(pulseStage, pulseOperationalState)) {
      showActionStatus(helpers.t("pulse.checkinClosedStatus", "Check-in is no longer available for this Pulse."));
      return;
    }
    setPulseStages((current) => ({ ...current, [pulseProgressKey]: "checked_in" }));
    setResidentProgress((current) => {
      const progress = current[residentProfile.id];
      const badgeId = activePulse.reward.badge_id;
      return {
        ...current,
        [residentProfile.id]: {
          ...progress,
          xp: progress.xp + activePulse.reward.xp,
          badges: progress.badges.includes(badgeId) ? progress.badges : [...progress.badges, badgeId],
          taskHistory: [
            ...progress.taskHistory,
            {
              pulse_id: activePulse.id,
              task_id: activePulse.linked_task_id,
              completed_at: new Date().toISOString(),
              xp_awarded: activePulse.reward.xp
            }
          ],
          seasonCheckins: {
            ...progress.seasonCheckins,
            [activePulse.linked_season_id]: (progress.seasonCheckins[activePulse.linked_season_id] || 0) + 1
          },
          spiritPoints: progress.spiritPoints + activePulse.reward.spirit_points,
          pointTransactions: [
            ...progress.pointTransactions,
            {
              id: `earn:${activePulse.id}`,
              type: "earned",
              pulse_id: activePulse.id,
              amount: activePulse.reward.spirit_points,
              balance_after: progress.spiritPoints + activePulse.reward.spirit_points,
              created_at: new Date().toISOString()
            }
          ]
        }
      };
    });
    setActiveSeasonId(activePulse.linked_season_id);
    openPulseTask();
    trackProductEvent("pulse_checked_in", {
      pulse_id: activePulse.id,
      task_id: activePulse.linked_task_id,
      xp_awarded: activePulse.reward.xp,
      spirit_points_awarded: activePulse.reward.spirit_points,
      badge_id: activePulse.reward.badge_id,
      season_id: activePulse.linked_season_id,
      new_xp_total: currentProgress.xp + activePulse.reward.xp,
      new_level: residentLevel(currentProgress.xp + activePulse.reward.xp),
      season_checkins_after: (currentProgress.seasonCheckins[activePulse.linked_season_id] || 0) + 1,
      resident_profile_id: residentProfile.id
    });
    showActionStatus(helpers.t("pulse.checkinStatus", "Checked in. XP and community goal progress updated."));
  }

  function leavePulse() {
    if (pulseStage !== "joined") return;
    setPulseStages((current) => ({ ...current, [pulseProgressKey]: "left" }));
    trackProductEvent("pulse_left", {
      pulse_id: activePulse.id,
      task_id: activePulse.linked_task_id,
      resident_profile_id: residentProfile.id,
      operational_state: pulseOperationalState
    });
    showActionStatus(helpers.t("pulse.leftStatus", "You left the Pulse. The participant slot returned to matching."));
  }

  function setPulseOperationalState(nextState) {
    setPulseOperationalStates((current) => ({ ...current, [activePulse.id]: nextState }));
    trackProductEvent("pulse_operational_state_changed", {
      pulse_id: activePulse.id,
      state: nextState,
      previous_state: pulseOperationalState
    });
    showActionStatus(helpers.t(`pulse.operationalStatus.${nextState}`, `Pulse state changed to ${nextState}.`));
  }

  function selectResidentProfile(profileId) {
    const profile = data.residentProfiles.find((item) => item.id === profileId);
    if (!profile) return;
    const [bestMatch] = rankPulses(data.pulses, profile);
    setResidentProfileId(profileId);
    setActivePulseId(bestMatch.pulse.id);
    setActiveSeasonId(bestMatch.pulse.linked_season_id);
    trackProductEvent("resident_profile_selected", {
      profile_id: profileId,
      matched_pulse_id: bestMatch.pulse.id,
      match_score: bestMatch.score,
      previous_profile_id: residentProfileId
    });
    selectTask(bestMatch.pulse.linked_task_id);
  }

  function selectPulse(pulseId) {
    const pulse = data.pulses.find((item) => item.id === pulseId);
    if (!pulse) return;
    setActivePulseId(pulseId);
    setActiveSeasonId(pulse.linked_season_id);
    const rankIndex = rankedPulses.findIndex((entry) => entry.pulse.id === pulseId);
    trackProductEvent("pulse_selected", {
      pulse_id: pulseId,
      task_id: pulse.linked_task_id,
      rank_position: rankIndex >= 0 ? rankIndex : null,
      match_score: rankIndex >= 0 ? rankedPulses[rankIndex].score : null,
      resident_profile_id: residentProfile.id
    });
    selectTask(pulse.linked_task_id);
  }

  function selectSeason(seasonId) {
    setActiveSeasonId(seasonId);
  }

  function claimBenefit(benefitId) {
    const benefit = data.benefits.find((item) => item.id === benefitId);
    if (!benefit) return;
    const linkedPulseStage = pulseStages[`${residentProfile.id}:${benefit.linked_pulse_id}`];
    if (linkedPulseStage !== "checked_in") return;
    setResidentProgress((current) => {
      const progress = current[residentProfile.id];
      if (progress.benefitStates[benefitId] || progress.spiritPoints < benefit.points_cost) return current;
      return {
        ...current,
        [residentProfile.id]: {
          ...progress,
          spiritPoints: progress.spiritPoints - benefit.points_cost,
          benefitStates: { ...progress.benefitStates, [benefitId]: "claimed" },
          benefitCredentials: {
            ...progress.benefitCredentials,
            [benefitId]: {
              code: createCredentialCode(benefit, residentProfile.id),
              issued_at: new Date().toISOString(),
              activated_at: null,
              redeemed_at: null
            }
          },
          pointTransactions: [
            ...progress.pointTransactions,
            {
              id: `spend:${benefitId}`,
              type: "spent",
              benefit_id: benefitId,
              amount: benefit.points_cost,
              balance_after: progress.spiritPoints - benefit.points_cost,
              created_at: new Date().toISOString()
            }
          ]
        }
      };
    });
    trackProductEvent("benefit_claimed", {
      benefit_id: benefitId,
      pulse_id: benefit.linked_pulse_id,
      points_cost: benefit.points_cost,
      points_remaining: currentProgress.spiritPoints - benefit.points_cost,
      benefit_type: benefit.type,
      resident_profile_id: residentProfile.id
    });
    showActionStatus(helpers.t("benefits.claimedStatus", "Benefit claimed. Spirit Points deducted once."));
  }

  function activateBenefit(benefitId) {
    const benefit = data.benefits.find((item) => item.id === benefitId);
    updateBenefitState(benefitId, "claimed", "activated", "activated_at");
    trackProductEvent("benefit_activated", {
      benefit_id: benefitId,
      benefit_type: benefit?.type ?? null,
      resident_profile_id: residentProfile.id,
      credential_code: currentProgress.benefitCredentials[benefitId]?.code ?? null
    });
    showActionStatus(helpers.t("benefits.activatedStatus", "Benefit activated and ready for redemption."));
  }

  function redeemBenefit(benefitId) {
    const benefit = data.benefits.find((item) => item.id === benefitId);
    updateBenefitState(benefitId, "activated", "redeemed", "redeemed_at");
    trackProductEvent("benefit_redeemed", {
      benefit_id: benefitId,
      benefit_type: benefit?.type ?? null,
      resident_profile_id: residentProfile.id,
      credential_code: currentProgress.benefitCredentials[benefitId]?.code ?? null
    });
    showActionStatus(helpers.t("benefits.redeemedStatus", "Redemption recorded. This benefit cannot be redeemed twice."));
  }

  function updateBenefitState(benefitId, expectedState, nextState, timestampField) {
    setResidentProgress((current) => {
      const progress = current[residentProfile.id];
      if (progress.benefitStates[benefitId] !== expectedState) return current;
      const credential = progress.benefitCredentials[benefitId];
      return {
        ...current,
        [residentProfile.id]: {
          ...progress,
          benefitStates: { ...progress.benefitStates, [benefitId]: nextState },
          benefitCredentials: {
            ...progress.benefitCredentials,
            [benefitId]: {
              ...credential,
              [timestampField]: new Date().toISOString()
            }
          }
        }
      };
    });
  }

  function resetDemo() {
    const profile = data.residentProfiles[0];
    const pulse = data.pulses[0];
    setResidentProfileId(profile.id);
    setActivePulseId(pulse.id);
    setActiveSeasonId(pulse.linked_season_id);
    setSelectedTaskId(pulse.linked_task_id);
    setPulseStages({});
    setPulseOperationalStates(Object.fromEntries(data.pulses.map((item) => [item.id, item.status])));
    setResidentProgress(createInitialResidentProgress());
    setPoiContext(null);
    setViewMode("world");
    setDemoStep(0);
    const url = new URL(window.location.href);
    url.searchParams.set("task", pulse.linked_task_id);
    window.history.replaceState({}, "", url);
    trackProductEvent("demo_reset", {
      pulse_id: pulse.id,
      task_id: pulse.linked_task_id,
      previous_step: demoStep
    });
    showActionStatus(helpers.t("demo.resetStatus", "Demo story reset to the opening match."));
  }

  function runDemoStep(stepIndex) {
    const demoStepIds = ["reset", "join", "checkin", "claim", "activate", "redeem", "ops"];
    trackProductEvent("demo_step_run", {
      step_index: stepIndex,
      step_id: demoStepIds[stepIndex] ?? null,
      view: viewMode,
      resident_profile_id: residentProfile.id
    });
    const sportsBenefitId = "benefit-sports-drink";
    if (stepIndex === 0) {
      resetDemo();
      setDemoStep(1);
      return;
    }
    if (stepIndex === 1) {
      setViewMode("task");
      joinPulse();
    }
    if (stepIndex === 2) {
      setViewMode("task");
      checkinPulse();
    }
    if (stepIndex === 3) {
      setViewMode("task");
      claimBenefit(sportsBenefitId);
    }
    if (stepIndex === 4) {
      setViewMode("task");
      activateBenefit(sportsBenefitId);
    }
    if (stepIndex === 5) {
      setViewMode("task");
      redeemBenefit(sportsBenefitId);
    }
    if (stepIndex === 6) {
      setViewMode("ops");
      trackProductEvent("demo_completed", {
        total_steps: 7,
        resident_profile_id: residentProfile.id,
        final_xp: residentProfile.xp,
        final_level: residentProfile.level,
        spirit_points_remaining: currentProgress.spiritPoints
      });
    }
    setDemoStep(Math.min(stepIndex + 1, 7));
  }

  function showActionStatus(message) {
    setActionStatus(message);
    window.clearTimeout(showActionStatus.timer);
    showActionStatus.timer = window.setTimeout(() => setActionStatus(""), 2600);
  }

  async function copyTaskLink() {
    const url = new URL(window.location.href);
    url.searchParams.set("task", selectedTask.id);
    let copySuccess = false;
    try {
      await navigator.clipboard.writeText(url.toString());
      copySuccess = true;
      showActionStatus(helpers.t("actions.linkCopied", "Task link copied."));
    } catch {
      showActionStatus(url.toString());
    }
    trackProductEvent("task_link_copied", {
      task_id: selectedTask.id,
      copy_success: copySuccess,
      task_type: selectedTask.type ?? null
    });
  }

  function exportTaskJson() {
    const payload = {
      schema_version: "0.1.0",
      exported_at: new Date().toISOString(),
      community_id: "omniweave-community",
      task: selectedTask,
      route: selectedRoute,
      activity: selectedActivity,
      community_task_contract: selectedContract,
      cacp_protocol_bundle: selectedContractProtocol ? createExportProtocolBundle(selectedContract, selectedContractProtocol) : null,
      dashboard_context: {
        managed_pois: data.pois.length,
        robot_ready_pois: data.pois.filter((poi) => poi.robot_accessible).length,
        open_activities: data.activities.filter((activity) => activity.status === "open_for_signup").length,
        community_pulse: selectedTask.id === activePulse.linked_task_id ? {
          pulse_id: activePulse.id,
          participation_stage: pulseStage,
          operational_state: pulseOperationalState,
          shared_goal_id: activePulse.community_goal.id,
          resident_profile_id: residentProfile.id,
          recommendation_score: activePulseMatch.score,
          recommendation_reasons: activePulseMatch.reasons,
          resident_growth: {
            xp: residentProfile.xp,
            level: residentProfile.level,
            badges: currentProgress.badges,
            completed_tasks: currentProgress.taskHistory.length
          },
          season: {
            season_id: activeSeason.id,
            completed_checkins: seasonCheckins
          },
          wallet: {
            currency: data.benefitCurrency.id,
            balance: currentProgress.spiritPoints,
            benefit_states: currentProgress.benefitStates,
            transaction_count: currentProgress.pointTransactions.length
          },
          retention: {
            first_participated: residentRetention.firstParticipated,
            returned_within_7_days: residentRetention.returnedWithin7Days,
            current_streak: residentRetention.currentStreak,
            season_visits: residentRetention.seasonVisits
          }
        } : null
      },
      data_policy: "fictional_or_synthetic_only"
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${selectedTask.id}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    trackProductEvent("workflow_json_exported", {
      task_id: selectedTask.id,
      contract_id: selectedContract?.contract_id ?? null,
      protocol_transition_count: selectedContractProtocol?.transitions.length ?? 0,
      protocol_evidence_count: selectedContractProtocol?.evidence.length ?? 0,
      protocol_artifact_count: selectedContractProtocol?.artifacts.length ?? 0,
      has_pulse_context: selectedTask.id === activePulse.linked_task_id,
      has_contract: !!selectedContract,
      resident_profile_id: residentProfile.id
    });
    showActionStatus(helpers.t("actions.exported", "Current workflow JSON exported."));
  }

  return (
    <div className="app-shell">
      <Topbar helpers={helpers} language={language} onLanguage={setLanguage} />
      <DemoController
        currentStep={demoStep}
        helpers={helpers}
        isDemoMode={isDemoMode}
        onReset={resetDemo}
        onRunStep={runDemoStep}
        onToggleDemo={() => setIsDemoMode((current) => !current)}
        onView={(view) => {
          trackProductEvent("view_selected", { view, previous_view: viewMode });
          setViewMode(view);
        }}
        viewMode={viewMode}
      />
      <main className={`workspace view-${viewMode}`}>
        {viewMode === "world" && <AssistantPanel
          helpers={helpers}
          language={language}
          prompt={prompt}
          promptSamples={promptSamples}
          selectedRoute={selectedRoute}
          selectedTask={selectedTask}
          onAsk={ask}
          onPrompt={setPrompt}
          onSelectTask={selectTask}
          activeSeason={activeSeason}
          seasons={data.seasons}
          seasonCheckins={seasonCheckins}
          resident={residentProfile}
          residentProgress={currentProgress}
          residentRetention={residentRetention}
          onSelectSeason={selectSeason}
        />}

        {viewMode !== "ops" && <section className="map-panel">
          <CommunityPulse
            helpers={helpers}
            pulse={activePulse}
            rankedPulses={rankedPulses}
            match={activePulseMatch}
            pulseStage={pulseStage}
            operationalState={pulseOperationalState}
            resident={residentProfile}
            residentProgress={currentProgress}
            activeSeason={activeSeason}
            seasonCheckins={seasonCheckins}
            residentProfiles={data.residentProfiles}
            onOpen={openPulseTask}
            onJoin={joinPulse}
            onCheckin={checkinPulse}
            onLeave={leavePulse}
            onSelectProfile={selectResidentProfile}
            onSelectPulse={selectPulse}
          />
          <div className="map-header">
            <div>
              <h2>Spatial Community Map</h2>
              <p className="muted">
                {helpers.t("map.subtitle", "OmniWeave Community: POIs, routes, tasks, and robot-ready semantics.")}
              </p>
            </div>
            <div className="legend">
              <span><i className="legend-dot public"></i>Public</span>
              <span><i className="legend-dot resident"></i>Resident</span>
              <span><i className="legend-dot property"></i>Property</span>
              <span><i className="legend-line"></i>Selected route</span>
            </div>
          </div>
          <CommunityMap data={data} helpers={helpers} selectedRoute={selectedRoute} selectedTask={selectedTask} onPoi={setPoiContext} />
        </section>}

        {viewMode === "task" && <aside className="detail-panel">
          <BenefitsWallet
            benefits={data.benefits}
            currency={data.benefitCurrency}
            helpers={helpers}
            pulseStages={pulseStages}
            pulses={data.pulses}
            resident={residentProfile}
            residentProgress={currentProgress}
            onClaim={claimBenefit}
            onActivate={activateBenefit}
            onRedeem={redeemBenefit}
          />
          <TaskDetails
            contract={selectedContract}
            protocol={selectedContractProtocol}
            helpers={helpers}
            poiContext={poiContext}
            selectedActivity={selectedActivity}
            selectedRoute={selectedRoute}
            selectedTask={selectedTask}
            actionStatus={actionStatus}
            onCopyLink={copyTaskLink}
            onExportJson={exportTaskJson}
            onSelectTask={selectTask}
            pulse={activePulse}
            pulseStage={pulseStage}
            pulseOperationalState={pulseOperationalState}
            onPulseJoin={joinPulse}
            onPulseCheckin={checkinPulse}
            onPulseLeave={leavePulse}
          />
        </aside>}
        {viewMode === "ops" && (
          <section className="ops-view">
            <PropertyDashboard
              data={data}
              helpers={helpers}
              pulse={activePulse}
              pulseStage={pulseStage}
              pulseOperationalState={pulseOperationalState}
              resident={residentProfile}
              residentProgress={currentProgress}
              retentionMetrics={retentionMetrics}
              activeSeason={activeSeason}
              seasonCheckins={seasonCheckins}
              benefits={data.benefits}
              benefitBaseline={data.benefitOperatorBaseline}
              selectedContract={selectedContract}
              selectedContractProtocol={selectedContractProtocol}
              selectedTask={selectedTask}
              selectedRoute={selectedRoute}
              onTask={selectTask}
              onPulseOperationalState={setPulseOperationalState}
            />
          </section>
        )}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

function createContractProtocolBundle(data, contractId) {
  const actorsById = Object.fromEntries(data.communityActors.map((actor) => [actor.actor_id, actor]));
  const artifacts = data.communityArtifacts.filter((artifact) => artifact.contract_id === contractId);
  const evidence = data.communityEvidence.filter((record) => record.contract_id === contractId);
  const pilotReadiness = data.communityPilotReadiness.find((checklist) => checklist.contract_id === contractId) || null;
  const transitions = data.communityTransitions
    .filter((transition) => transition.contract_id === contractId)
    .map((transition) => ({
      ...transition,
      actor: actorsById[transition.requested_by] || null,
      evidence: transition.evidence_ids
        .map((evidenceId) => evidence.find((record) => record.evidence_id === evidenceId))
        .filter(Boolean),
      artifacts: transition.artifact_ids
        .map((artifactId) => artifacts.find((artifact) => artifact.artifact_id === artifactId))
        .filter(Boolean)
    }));

  return {
    actors: data.communityActors,
    artifacts,
    evidence,
    pilotReadiness,
    transitions
  };
}

function createExportProtocolBundle(contract, protocol) {
  const transitionActors = new Set(protocol.transitions.map((transition) => transition.requested_by));
  const artifactActors = new Set(protocol.artifacts.map((artifact) => artifact.created_by));
  const evidenceActors = new Set(protocol.evidence.map((record) => record.recorded_by));
  const referencedActorIds = new Set([...transitionActors, ...artifactActors, ...evidenceActors]);

  return {
    schema_version: "cacp.workflow_protocol_bundle.v0.1",
    contract_id: contract.contract_id,
    lifecycle: contract.lifecycle,
    readiness: {
      has_transition_records: protocol.transitions.length > 0,
      has_evidence_records: protocol.evidence.length > 0,
      has_artifacts: protocol.artifacts.length > 0,
      human_review_required: contract.permission.human_review_required,
      resident_notice_required: contract.permission.resident_notice_required,
      data_policy: contract.data_policy
    },
    actors: protocol.actors
      .filter((actor) => referencedActorIds.has(actor.actor_id))
      .map((actor) => ({
        actor_id: actor.actor_id,
        actor_type: actor.actor_type,
        display_name: actor.display_name,
        capabilities: actor.capabilities,
        requires_human_approval: actor.requires_human_approval,
        safety_controls: actor.safety_controls,
        data_boundaries: actor.data_boundaries,
        data_policy: actor.data_policy
      })),
    transitions: protocol.transitions.map((transition) => ({
      transition_id: transition.transition_id,
      from_state: transition.from_state,
      to_state: transition.to_state,
      occurred_at: transition.occurred_at,
      requested_by: transition.requested_by,
      actor_type: transition.actor?.actor_type ?? null,
      reason: transition.reason,
      evidence_ids: transition.evidence_ids,
      artifact_ids: transition.artifact_ids,
      data_policy: transition.data_policy
    })),
    evidence: protocol.evidence.map((record) => ({
      evidence_id: record.evidence_id,
      evidence_type: record.evidence_type,
      recorded_by: record.recorded_by,
      recorded_at: record.recorded_at,
      facts: record.facts,
      source_artifact_ids: record.source_artifact_ids,
      synthetic: record.synthetic,
      data_policy: record.data_policy
    })),
    artifacts: protocol.artifacts.map((artifact) => ({
      artifact_id: artifact.artifact_id,
      artifact_type: artifact.artifact_type,
      created_by: artifact.created_by,
      created_at: artifact.created_at,
      visibility: artifact.visibility,
      contains_personal_data: artifact.contains_personal_data,
      summary: artifact.summary,
      retention: artifact.retention,
      data_policy: artifact.data_policy
    })),
    safety_boundary: {
      public_demo_data: true,
      fictional_or_synthetic_only: true,
      excludes_real_resident_identity: true,
      excludes_raw_camera_or_sensor_payload: true,
      requires_real_pilot_consent_and_operator_approval: true
    }
  };
}

function createCredentialCode(benefit, residentId) {
  const residentCode = residentId
    .replace("resident-profile-", "")
    .split("-")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 4);
  const benefitCode = benefit.id.split("-").slice(-2).join("").length.toString().padStart(2, "0");
  return `CS-${benefit.credential_prefix}-${residentCode}${benefitCode}`;
}
