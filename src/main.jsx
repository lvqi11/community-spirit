import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AssistantPanel } from "./components/AssistantPanel";
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
  }

  function ask() {
    selectTask(matchPromptToTask(prompt));
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
    showActionStatus(helpers.t("pulse.checkinStatus", "Checked in. XP and community goal progress updated."));
  }

  function leavePulse() {
    if (pulseStage !== "joined") return;
    setPulseStages((current) => ({ ...current, [pulseProgressKey]: "left" }));
    showActionStatus(helpers.t("pulse.leftStatus", "You left the Pulse. The participant slot returned to matching."));
  }

  function setPulseOperationalState(nextState) {
    setPulseOperationalStates((current) => ({ ...current, [activePulse.id]: nextState }));
    showActionStatus(helpers.t(`pulse.operationalStatus.${nextState}`, `Pulse state changed to ${nextState}.`));
  }

  function selectResidentProfile(profileId) {
    const profile = data.residentProfiles.find((item) => item.id === profileId);
    if (!profile) return;
    const [bestMatch] = rankPulses(data.pulses, profile);
    setResidentProfileId(profileId);
    setActivePulseId(bestMatch.pulse.id);
    setActiveSeasonId(bestMatch.pulse.linked_season_id);
    selectTask(bestMatch.pulse.linked_task_id);
  }

  function selectPulse(pulseId) {
    const pulse = data.pulses.find((item) => item.id === pulseId);
    if (!pulse) return;
    setActivePulseId(pulseId);
    setActiveSeasonId(pulse.linked_season_id);
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
    showActionStatus(helpers.t("benefits.claimedStatus", "Benefit claimed. Spirit Points deducted once."));
  }

  function activateBenefit(benefitId) {
    updateBenefitState(benefitId, "claimed", "activated", "activated_at");
    showActionStatus(helpers.t("benefits.activatedStatus", "Benefit activated and ready for redemption."));
  }

  function redeemBenefit(benefitId) {
    updateBenefitState(benefitId, "activated", "redeemed", "redeemed_at");
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
    showActionStatus(helpers.t("demo.resetStatus", "Demo story reset to the opening match."));
  }

  function runDemoStep(stepIndex) {
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
    try {
      await navigator.clipboard.writeText(url.toString());
      showActionStatus(helpers.t("actions.linkCopied", "Task link copied."));
    } catch {
      showActionStatus(url.toString());
    }
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
        onView={setViewMode}
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
