import { useState } from "react";
import { TaskContractView } from "./TaskContractView";
import { hasActivePulsePlace } from "../pulseLifecycle";

const queueFilters = ["all", "demo_ready", "planned_for_demo", "future_interface"];

export function PropertyDashboard({
  data,
  helpers,
  pulse,
  pulseStage,
  pulseOperationalState,
  resident,
  residentProgress,
  retentionMetrics,
  activeSeason,
  seasonCheckins,
  benefits,
  benefitBaseline,
  selectedContract,
  selectedTask,
  selectedRoute,
  onTask,
  onPulseOperationalState
}) {
  const [queueFilter, setQueueFilter] = useState("all");
  const openActivities = data.activities.filter((activity) => activity.status === "open_for_signup").length;
  const repairTasks = data.tasks.filter((task) => task.type === "repair_reporting").length;
  const robotPois = data.pois.filter((poi) => poi.robot_accessible).length;
  const robotRoutes = data.routes.filter((route) => route.scenario === "robot_patrol").length;
  const robotPatrolTask = data.tasks.find((task) => task.type === "robot_patrol");
  const propertyTasks = data.tasks.filter(
    (task) => task.secondary_user_roles.includes("property_operator") || task.primary_user_role === "property_operator"
  );
  const filteredPropertyTasks = propertyTasks.filter((task) => queueFilter === "all" || task.status === queueFilter);
  const taskStatuses = countBy(data.tasks, "status");
  const selectedActivity = selectedTask.linked_activity_id ? helpers.activity(selectedTask.linked_activity_id) : null;
  const targetPoi = selectedTask.target_poi_id ? helpers.poi(selectedTask.target_poi_id) : null;
  const operatorActions = getOperatorActions(selectedTask, helpers);
  const accessRequirements = selectedRoute?.access_requirements ?? [];
  const exportSummary = createExportSummary(selectedTask, selectedRoute, selectedActivity, targetPoi, helpers);
  const activityRows = data.activities.map((activity) => ({
    activity,
    location: helpers.poi(activity.location_poi_id),
    route: activity.linked_route_id ? helpers.route(activity.linked_route_id) : null
  }));
  const hotPois = rankPoisByUsage(data).slice(0, 5);
  const metrics = [
    [data.pois.length, helpers.t("dashboard.metrics.pois", "Managed POIs")],
    [openActivities, helpers.t("dashboard.metrics.openActivities", "Open activities")],
    [repairTasks, helpers.t("dashboard.metrics.repairTickets", "Repair tickets")],
    [robotPois, helpers.t("dashboard.metrics.robotReady", "Robot-ready POIs")]
  ];
  const pulseMetrics = createPulseMetrics(pulse, pulseStage, helpers);
  const retentionRows = createRetentionRows(retentionMetrics, helpers);
  const seasonRetentionRows = data.seasons.map((season) => ({
    id: season.id,
    label: helpers.seasonText(season, "short_name") || helpers.seasonText(season, "name"),
    visits: retentionMetrics.seasonComparison[season.id] || 0
  }));
  const maxSeasonVisits = Math.max(1, ...seasonRetentionRows.map((row) => row.visits));
  const benefitMetrics = createBenefitMetrics(residentProgress, benefitBaseline, helpers);

  return (
    <section className="property-dashboard">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">{helpers.t("dashboard.eyebrow", "Property Dashboard")}</p>
          <h2>{helpers.t("dashboard.title", "Today at a Glance")}</h2>
        </div>
        <p className="muted">
          {helpers.t("dashboard.summary", "A compact operator view derived from the same public prototype data.")}
        </p>
      </div>
      <div className="dashboard-metrics">
        {metrics.map(([value, label]) => (
          <div className="dashboard-metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <section className="pulse-ops-card">
        <div className="pulse-ops-header">
          <div>
            <p className="eyebrow">{helpers.t("dashboard.pulse.eyebrow", "Community Pulse Conversion")}</p>
            <h3>{helpers.pulseText(pulse, "ops_title") || helpers.t("dashboard.pulse.title", "Live space activation")}</h3>
          </div>
          <span>{helpers.t(`pulse.stage.${pulseStage}`, pulseStage.replaceAll("_", " "))}</span>
        </div>
        <div className="pulse-lifecycle-ops">
          <div>
            <span>{helpers.t("dashboard.pulse.lifecycle", "Lifecycle control")}</span>
            <strong>{helpers.t(`pulse.operational.${pulseOperationalState}`, pulseOperationalState.replaceAll("_", " "))}</strong>
          </div>
          <div>
            {["matching", "open", "full", "expired", "ended"].map((state) => (
              <button
                className={pulseOperationalState === state ? "active" : ""}
                key={state}
                onClick={() => onPulseOperationalState(state)}
              >
                {helpers.t(`pulse.operational.${state}`, state)}
              </button>
            ))}
          </div>
          <small>{helpers.pulseText(pulse, "end_condition") || pulse.lifecycle.end_condition}</small>
        </div>
        <div className="pulse-funnel">
          {pulseMetrics.map(([value, label, active]) => (
            <div className={active ? "active" : ""} key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="pulse-ops-impact">
          <div>
            <span>{helpers.t("dashboard.pulse.activation", "Projected space activation")}</span>
            <strong>{pulse.operator_signals.space_activation_baseline_percent}% → {pulse.operator_signals.space_activation_projected_percent}%</strong>
          </div>
          <div>
            <span>{helpers.t("dashboard.pulse.goalImpact", "Shared goal contribution")}</span>
            <strong>
              +{pulseStage === "checked_in"
                ? pulse.community_goal.join_points + pulse.community_goal.checkin_points
                : pulseStage === "joined"
                  ? pulse.community_goal.join_points
                  : 0}
            </strong>
          </div>
        </div>
      </section>
      <section className="season-ops-card">
        <div>
          <p className="eyebrow">{helpers.t("dashboard.season.eyebrow", "Season Operations")}</p>
          <h3>{helpers.seasonText(activeSeason, "name")}</h3>
          <p>{helpers.seasonText(activeSeason, "operator_goal") || activeSeason.operator_goal}</p>
        </div>
        <div className="season-ops-metrics">
          <div>
            <span>{helpers.t("dashboard.season.resident", "Active resident")}</span>
            <strong>{resident.display_name} · Lv. {resident.level}</strong>
          </div>
          <div>
            <span>{helpers.t("dashboard.season.checkins", "Season check-ins")}</span>
            <strong>{seasonCheckins}</strong>
          </div>
          <div>
            <span>{helpers.t("dashboard.season.xp", "Resident XP")}</span>
            <strong>{resident.xp}</strong>
          </div>
          <div>
            <span>{helpers.t("dashboard.season.history", "Completed Pulse tasks")}</span>
            <strong>{residentProgress.taskHistory.length}</strong>
          </div>
        </div>
      </section>
      <section className="retention-ops-card">
        <div className="retention-ops-header">
          <div>
            <p className="eyebrow">{helpers.t("dashboard.retention.eyebrow", "Retention Loop")}</p>
            <h3>{helpers.t("dashboard.retention.title", "Residents who come back")}</h3>
          </div>
          <strong>{formatPercent(retentionMetrics.sevenDayReturnRate)}</strong>
        </div>
        <div className="retention-funnel">
          {retentionRows.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="season-retention-bars">
          {seasonRetentionRows.map((row) => (
            <div className="season-retention-row" key={row.id}>
              <span>{row.label}</span>
              <i><b style={{ width: `${Math.max(10, (row.visits / maxSeasonVisits) * 100)}%` }}></b></i>
              <strong>{row.visits}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="commerce-ops-card">
        <div className="commerce-ops-header">
          <div>
            <p className="eyebrow">{helpers.t("dashboard.commerce.eyebrow", "Community Commerce Loop")}</p>
            <h3>{helpers.t("dashboard.commerce.title", "Participation to benefit conversion")}</h3>
          </div>
          <strong>{residentProgress.spiritPoints} SP</strong>
        </div>
        <div className="commerce-funnel">
          {benefitMetrics.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="commerce-benefit-mix">
          {benefits.map((benefit) => (
            <span key={benefit.id}>{helpers.t(`benefits.types.${benefit.type}`, benefit.type.replaceAll("_", " "))}</span>
          ))}
        </div>
      </section>
      <section className="handoff-card">
        <div>
          <p className="eyebrow">{helpers.t("dashboard.handoffTitle", "Selected Workflow Handoff")}</p>
          <h3>{helpers.taskText(selectedTask, "name")}</h3>
          <span>{formatTokenLabel(selectedTask.primary_user_role, helpers)}</span>
        </div>
        <dl>
          <div>
            <dt>{helpers.t("dashboard.handoffTarget", "Target")}</dt>
            <dd>{targetPoi ? helpers.poiText(targetPoi, "name") : helpers.t("status.no", "No")}</dd>
          </div>
          <div>
            <dt>{helpers.t("dashboard.handoffRoute", "Route")}</dt>
            <dd>{selectedRoute ? helpers.routeText(selectedRoute, "name") : helpers.t("status.noRoute", "No route")}</dd>
          </div>
          <div>
            <dt>{helpers.t("dashboard.handoffOutputs", "Outputs")}</dt>
            <dd>{selectedTask.expected_outputs.length}</dd>
          </div>
          <div>
            <dt>{helpers.t("dashboard.handoffGuardrails", "Guardrails")}</dt>
            <dd>{selectedTask.privacy_notes.length}</dd>
          </div>
        </dl>
      </section>
      <TaskContractView contract={selectedContract} helpers={helpers} compact />
      <div className="dashboard-lanes">
        <section>
          <h3>{helpers.t("dashboard.operationsTitle", "Operational Queue")}</h3>
          <div className="queue-filters" aria-label="Operational queue filter">
            {queueFilters.map((filter) => (
              <button
                className={queueFilter === filter ? "active" : ""}
                key={filter}
                onClick={() => setQueueFilter(filter)}
              >
                {formatQueueFilterLabel(filter, helpers)}
              </button>
            ))}
          </div>
          <div className="queue-list">
            {filteredPropertyTasks.slice(0, 4).map((task) => (
              <button className="queue-item" key={task.id} onClick={() => onTask(task.id)}>
                <strong>{helpers.taskText(task, "name")}</strong>
                <span>{formatTokenLabel(task.status, helpers)}</span>
              </button>
            ))}
            {filteredPropertyTasks.length === 0 && (
              <p className="queue-empty">{helpers.t("dashboard.queueEmpty", "No workflows in this filter.")}</p>
            )}
          </div>
        </section>
        <section>
          <h3>{helpers.t("dashboard.insightTitle", "Spatial Insight")}</h3>
          <div className="insight-card">
            <strong>{helpers.t("dashboard.insightSelected", "Selected workflow")}</strong>
            <p>{helpers.taskText(selectedTask, "name")}</p>
            <dl>
              <div>
                <dt>{helpers.t("fields.distance", "Distance")}</dt>
                <dd>
                  {selectedRoute
                    ? `${selectedRoute.distance_meters} ${helpers.t("units.meters", "meters")}`
                    : helpers.t("status.noRoute", "No route")}
                </dd>
              </div>
              <div>
                <dt>{helpers.t("dashboard.metrics.robotRoutes", "Robot routes")}</dt>
                <dd>{robotRoutes}</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
      <div className="dashboard-lanes dashboard-lanes-extended">
        <section>
          <h3>{helpers.t("dashboard.nextActionsTitle", "Operator Next Actions")}</h3>
          <ol className="operator-actions">
            {operatorActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </section>
        <section>
          <h3>{helpers.t("dashboard.selectedContextTitle", "Selected Context")}</h3>
          <div className="selected-context-card">
            <strong>{selectedActivity ? helpers.activityText(selectedActivity, "name") : helpers.t("dashboard.noLinkedActivity", "No linked activity")}</strong>
            <span>{formatTokenLabel(selectedTask.status, helpers)}</span>
            <p>{helpers.taskText(selectedTask, "property_value")}</p>
          </div>
        </section>
      </div>
      <div className="dashboard-lanes dashboard-lanes-extended">
        <section>
          <h3>{helpers.t("dashboard.riskTitle", "Risk & Access Review")}</h3>
          <div className="review-list">
            {selectedTask.privacy_notes.slice(0, 2).map((note) => (
              <div className="review-row" key={note}>
                <strong>{helpers.t("dashboard.privacyLabel", "Privacy")}</strong>
                <span>{formatReviewText(note, helpers)}</span>
              </div>
            ))}
            {accessRequirements.slice(0, 2).map((requirement) => (
              <div className="review-row" key={requirement}>
                <strong>{helpers.t("dashboard.accessLabel", "Access")}</strong>
                <span>{formatReviewText(requirement, helpers)}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3>{helpers.t("dashboard.exportTitle", "Workflow Export Summary")}</h3>
          <dl className="export-summary">
            {exportSummary.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <div className="dashboard-lanes dashboard-lanes-extended">
        <section>
          <h3>{helpers.t("dashboard.workOrderTitle", "Work Order Status")}</h3>
          <div className="status-stack" aria-label="Task status distribution">
            {Object.entries(taskStatuses).map(([status, count]) => (
              <div className="status-row" key={status}>
                <div>
                  <strong>{formatTokenLabel(status, helpers)}</strong>
                  <span>{formatWorkflowCount(count, helpers)}</span>
                </div>
                <i style={{ width: `${Math.max(18, (count / data.tasks.length) * 100)}%` }}></i>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3>{helpers.t("dashboard.robotTitle", "Robot Patrol Readiness")}</h3>
          <button
            className="robot-summary"
            disabled={!robotPatrolTask}
            onClick={() => robotPatrolTask && onTask(robotPatrolTask.id)}
          >
            <span>{formatRouteCount(robotRoutes, helpers)}</span>
            <strong>{formatRobotPoiCount(robotPois, helpers)}</strong>
            <small>{helpers.t("dashboard.robotSummary", "Approval required before real-world robot operation.")}</small>
          </button>
        </section>
      </div>
      <div className="dashboard-lanes dashboard-lanes-extended">
        <section>
          <h3>{helpers.t("dashboard.activityTitle", "Activity Signup Pipeline")}</h3>
          <div className="activity-table">
            {activityRows.map(({ activity, location, route }) => (
              <div className="activity-row" key={activity.id}>
                <div>
                  <strong>{helpers.activityText(activity, "name")}</strong>
                  <span>{location ? helpers.poiText(location, "name") : helpers.t("status.noRoute", "No route")}</span>
                </div>
                <div>
                  <b>{activity.capacity ?? helpers.t("dashboard.internalCapacity", "Internal")}</b>
                  <span>{route ? `${route.estimated_minutes} ${helpers.t("units.minutes", "minutes")}` : formatTokenLabel(activity.status, helpers)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3>{helpers.t("dashboard.hotPoiTitle", "Hot POIs")}</h3>
          <div className="hot-poi-list">
            {hotPois.map(({ poi, score }) => (
              <div className="hot-poi-row" key={poi.id}>
                <span>{helpers.poiText(poi, "name")}</span>
                <strong>{score}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function createBenefitMetrics(progress, baseline, helpers) {
  const states = Object.values(progress.benefitStates);
  const awarded = progress.pointTransactions.filter((item) => item.type === "earned").reduce((sum, item) => sum + item.amount, 0);
  const spent = progress.pointTransactions.filter((item) => item.type === "spent").reduce((sum, item) => sum + item.amount, 0);
  return [
    [baseline.points_awarded + awarded, helpers.t("dashboard.commerce.awarded", "SP awarded")],
    [baseline.points_spent + spent, helpers.t("dashboard.commerce.spent", "SP spent")],
    [baseline.benefits_claimed + states.filter((state) => ["claimed", "activated", "redeemed"].includes(state)).length, helpers.t("dashboard.commerce.claimed", "Claimed")],
    [baseline.benefits_activated + states.filter((state) => ["activated", "redeemed"].includes(state)).length, helpers.t("dashboard.commerce.activated", "Activated")],
    [baseline.benefits_redeemed + states.filter((state) => state === "redeemed").length, helpers.t("dashboard.commerce.redeemed", "Redeemed")]
  ];
}

function createRetentionRows(metrics, helpers) {
  return [
    [formatPercent(metrics.firstParticipationRate), helpers.t("dashboard.retention.firstParticipationRate", "First participation")],
    [formatPercent(metrics.sevenDayReturnRate), helpers.t("dashboard.retention.sevenDayReturnRate", "7-day return")],
    [metrics.averageStreak, helpers.t("dashboard.retention.averageStreak", "Avg. streak")]
  ];
}

function formatPercent(value) {
  return `${value}%`;
}

function createPulseMetrics(pulse, pulseStage, helpers) {
  const joined = hasActivePulsePlace(pulseStage);
  const checkedIn = pulseStage === "checked_in";
  return [
    [pulse.operator_signals.recommendation_impressions, helpers.t("dashboard.pulse.impressions", "Recommended"), true],
    [pulse.operator_signals.detail_opens + 1, helpers.t("dashboard.pulse.opens", "Opened"), true],
    [pulse.operator_signals.confirmed_joins + (joined ? 1 : 0), helpers.t("dashboard.pulse.joins", "Joined"), joined],
    [pulse.operator_signals.checkins + (checkedIn ? 1 : 0), helpers.t("dashboard.pulse.checkins", "Checked in"), checkedIn]
  ];
}

function countBy(items, key) {
  return items.reduce((counts, item) => {
    counts[item[key]] = (counts[item[key]] ?? 0) + 1;
    return counts;
  }, {});
}

function rankPoisByUsage(data) {
  const scores = new Map(data.pois.map((poi) => [poi.id, 0]));

  data.tasks.forEach((task) => {
    [task.start_poi_id, task.target_poi_id].forEach((poiId) => addScore(scores, poiId, 2));
  });
  data.routes.forEach((route) => {
    route.waypoints.forEach((waypoint) => addScore(scores, waypoint.poi_id, 1));
  });
  data.activities.forEach((activity) => {
    addScore(scores, activity.location_poi_id, 2);
  });

  return data.pois
    .map((poi) => ({ poi, score: scores.get(poi.id) ?? 0 }))
    .sort((left, right) => right.score - left.score || left.poi.name.localeCompare(right.poi.name));
}

function addScore(scores, poiId, amount) {
  if (!poiId || !scores.has(poiId)) return;
  scores.set(poiId, scores.get(poiId) + amount);
}

function formatWorkflowCount(count, helpers) {
  const label = count > 1 ? helpers.t("dashboard.units.workflows", "workflows") : helpers.t("dashboard.units.workflow", "workflow");
  return `${count} ${label}`;
}

function formatRouteCount(count, helpers) {
  const label = count > 1 ? helpers.t("dashboard.units.routes", "routes") : helpers.t("dashboard.units.route", "route");
  return `${count} ${label}`;
}

function formatRobotPoiCount(count, helpers) {
  return `${count} ${helpers.t("dashboard.units.robotReadyPois", "robot-ready POIs")}`;
}

function formatTokenLabel(value, helpers) {
  return helpers.t(`dashboard.labels.${value}`, value.replaceAll("_", " "));
}

function formatQueueFilterLabel(value, helpers) {
  if (value === "all") return helpers.t("dashboard.filters.all", "All");
  return formatTokenLabel(value, helpers);
}

function formatReviewText(value, helpers) {
  const key = reviewTextKeys[value];
  return key ? helpers.t(`dashboard.reviewText.${key}`, value) : value;
}

function createExportSummary(task, route, activity, targetPoi, helpers) {
  return [
    [helpers.t("dashboard.exportFields.schema", "Schema"), "0.1.0"],
    [helpers.t("dashboard.exportFields.task", "Task"), task.id],
    [helpers.t("dashboard.exportFields.route", "Route"), route?.id ?? helpers.t("status.noRoute", "No route")],
    [helpers.t("dashboard.exportFields.activity", "Activity"), activity?.id ?? helpers.t("dashboard.noLinkedActivity", "No linked activity")],
    [helpers.t("dashboard.exportFields.target", "Target"), targetPoi ? helpers.poiText(targetPoi, "name") : helpers.t("status.no", "No")],
    [helpers.t("dashboard.exportFields.policy", "Policy"), "fictional_or_synthetic_only"]
  ];
}

const reviewTextKeys = {
  "Do not expose unit number by default.": "noUnitNumber",
  "Visitor access must follow community access-control rules.": "visitorAccessRules",
  "Package code or delivery information should never be stored in public route data.": "noPackageCode",
  "Children's information should not be publicly displayed.": "noChildrenInfo",
  "Activity participant lists should follow community privacy settings.": "participantPrivacy",
  "Do not attach resident identity to public issue feeds.": "noResidentIdentity",
  "Photos should be reviewed for privacy-sensitive content before public display.": "photoReview",
  "Property operators should review activity content before publishing.": "operatorReview",
  "Robot operation must follow privacy, safety, and property approval rules.": "robotGovernance",
  "Camera or sensor data should not be stored without explicit governance policies.": "sensorGovernance",
  "Visitor should be authorized by the resident before entering residential building areas.": "residentAuthorizesVisitor",
  "Building entrance access should follow property access-control rules.": "buildingAccessRules",
  "Resident identity is required for package pickup.": "packageIdentity",
  "Activity signup may be required before check-in.": "activitySignup",
  "Children should be accompanied by guardians.": "childrenGuardians",
  "Property operator approval is required.": "propertyApproval",
  "Robot operation should follow privacy, safety, and community management rules.": "robotCommunityRules"
};

function getOperatorActions(task, helpers) {
  if (task.type === "repair_reporting" || task.type === "world_maintenance") {
    return [
      helpers.t("dashboard.actions.repair.verifyLocation", "Verify the reported POI and issue category."),
      helpers.t("dashboard.actions.repair.dispatch", "Dispatch a maintenance owner with spatial context."),
      helpers.t("dashboard.actions.repair.followUp", "Close the loop with a resident-visible status update.")
    ];
  }
  if (task.type === "activity_participation" || task.type === "property_operation") {
    return [
      helpers.t("dashboard.actions.activity.review", "Review activity copy, capacity, and safety notes."),
      helpers.t("dashboard.actions.activity.publish", "Publish the activity card with route guidance."),
      helpers.t("dashboard.actions.activity.track", "Track signup, check-in, and post-event engagement.")
    ];
  }
  if (task.type === "robot_patrol") {
    return [
      helpers.t("dashboard.actions.robot.approve", "Confirm property approval before robot execution."),
      helpers.t("dashboard.actions.robot.checkRoute", "Check all route POIs are robot-accessible."),
      helpers.t("dashboard.actions.robot.export", "Export the semantic patrol payload for integration.")
    ];
  }
  return [
    helpers.t("dashboard.actions.navigation.confirm", "Confirm the route matches public visibility rules."),
    helpers.t("dashboard.actions.navigation.share", "Share the task link with the resident or visitor."),
    helpers.t("dashboard.actions.navigation.monitor", "Monitor repeated guidance demand by POI.")
  ];
}
