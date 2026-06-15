import fs from "node:fs";

const files = [
  "data/sample-pois.json",
  "data/sample-routes.json",
  "data/sample-tasks.json",
  "data/sample-activities.json",
  "data/sample-pulses.json",
  "data/sample-seasons.json",
  "data/sample-benefits.json",
  "data/i18n.zh-CN.json",
  "examples/exports/robot-fire-passage-patrol.json"
];

const data = Object.fromEntries(
  files.map((file) => [file, JSON.parse(fs.readFileSync(file, "utf8"))])
);

const pois = data["data/sample-pois.json"].pois ?? [];
const routes = data["data/sample-routes.json"].routes ?? [];
const tasks = data["data/sample-tasks.json"].tasks ?? [];
const activities = data["data/sample-activities.json"].activities ?? [];
const i18n = data["data/i18n.zh-CN.json"];
const pulseData = data["data/sample-pulses.json"];
const pulses = pulseData.pulses ?? [];
const seasons = data["data/sample-seasons.json"].seasons ?? [];
const benefitData = data["data/sample-benefits.json"];
const benefits = benefitData.benefits ?? [];
const robotExport = data["examples/exports/robot-fire-passage-patrol.json"];

const poiIds = new Set(pois.map((poi) => poi.id));
const routeIds = new Set(routes.map((route) => route.id));
const taskIds = new Set(tasks.map((task) => task.id));
const activityIds = new Set(activities.map((activity) => activity.id));
const pulseIds = new Set(pulses.map((pulse) => pulse.id));
const seasonIds = new Set(seasons.map((season) => season.id));
const credentialPrefixes = new Set();
const pulseOperationalStates = new Set(["matching", "open", "full", "expired", "ended"]);
const errors = [];

function requireRef(kind, sourceId, field, id, ids) {
  if (id && !ids.has(id)) errors.push(`${kind} ${sourceId} has missing ${field}: ${id}`);
}

for (const poi of pois) {
  if (!poi.id || !poi.name || !poi.type) errors.push(`POI is missing id/name/type: ${JSON.stringify(poi)}`);
  if (typeof poi.position?.x !== "number" || typeof poi.position?.y !== "number") {
    errors.push(`POI ${poi.id} is missing numeric local position`);
  }
}

for (const route of routes) {
  requireRef("Route", route.id, "start_poi_id", route.start_poi_id, poiIds);
  requireRef("Route", route.id, "end_poi_id", route.end_poi_id, poiIds);
  for (const [index, waypoint] of route.waypoints.entries()) {
    if (waypoint.poi_id) requireRef("Route waypoint", `${route.id}[${index}]`, "poi_id", waypoint.poi_id, poiIds);
    if (!waypoint.poi_id && typeof waypoint.position?.x !== "number") {
      errors.push(`Route ${route.id} waypoint ${index} needs poi_id or numeric position`);
    }
  }
}

for (const task of tasks) {
  requireRef("Task", task.id, "linked_route_id", task.linked_route_id, routeIds);
  requireRef("Task", task.id, "linked_activity_id", task.linked_activity_id, activityIds);
  requireRef("Task", task.id, "start_poi_id", task.start_poi_id, poiIds);
  requireRef("Task", task.id, "target_poi_id", task.target_poi_id, poiIds);
  if (task.schedule_context) {
    for (const field of ["time_label", "place_label", "participation_status", "action_hint"]) {
      if (!task.schedule_context[field]) errors.push(`Scheduled task ${task.id} is missing schedule_context.${field}`);
    }
  }
}

for (const activity of activities) {
  requireRef("Activity", activity.id, "location_poi_id", activity.location_poi_id, poiIds);
  requireRef("Activity", activity.id, "linked_route_id", activity.linked_route_id, routeIds);
}

const residentProfiles = pulseData.resident_profiles ?? [];
if (residentProfiles.length < 2) {
  errors.push("Community Pulse requires multiple resident profiles");
}
for (const profile of residentProfiles) {
  if (!profile.id || !profile.interests?.length || !profile.availability?.length || !profile.social_mode || typeof profile.spirit_points !== "number") {
    errors.push(`Resident profile ${profile.id ?? "unknown"} requires interests, availability, and social_mode`);
  }
  if (typeof profile.retention?.prior_checkins_30d !== "number" || typeof profile.retention?.current_streak !== "number") {
    errors.push(`Resident profile ${profile.id ?? "unknown"} requires synthetic retention prior_checkins_30d and current_streak`);
  }
  for (const season of seasons) {
    if (typeof profile.retention?.season_visits?.[season.id] !== "number") {
      errors.push(`Resident profile ${profile.id ?? "unknown"} is missing retention season visit count for ${season.id}`);
    }
  }
}
for (const pulse of pulses) {
  requireRef("Pulse", pulse.id, "linked_task_id", pulse.linked_task_id, taskIds);
  requireRef("Pulse", pulse.id, "linked_activity_id", pulse.linked_activity_id, activityIds);
  requireRef("Pulse", pulse.id, "location_poi_id", pulse.location_poi_id, poiIds);
  requireRef("Pulse", pulse.id, "linked_season_id", pulse.linked_season_id, seasonIds);
  if (!pulse.community_goal?.id || !pulse.community_goal?.target_points) {
    errors.push(`Pulse ${pulse.id} requires a community goal`);
  }
  if (!pulseOperationalStates.has(pulse.status)) {
    errors.push(`Pulse ${pulse.id} has unsupported lifecycle status: ${pulse.status}`);
  }
  for (const field of ["signup_closes_label", "cancellation_policy", "end_condition"]) {
    if (!pulse.lifecycle?.[field]) errors.push(`Pulse ${pulse.id} is missing lifecycle.${field}`);
  }
  if (pulse.participants?.confirmed > pulse.participants?.capacity || pulse.participants?.target > pulse.participants?.capacity) {
    errors.push(`Pulse ${pulse.id} participant counts exceed capacity`);
  }
  if (pulse.participants?.confirmed >= pulse.participants?.target) {
    errors.push(`Pulse ${pulse.id} should demonstrate an open participant need`);
  }
  if (!pulse.match_tags?.length || !pulse.availability_tags?.length || !pulse.social_modes?.length) {
    errors.push(`Pulse ${pulse.id} requires recommendation tags`);
  }
  if (!pulse.reward?.badge_id || typeof pulse.reward?.xp !== "number" || typeof pulse.reward?.spirit_points !== "number") {
    errors.push(`Pulse ${pulse.id} requires XP, Spirit Points, and badge reward`);
  }
  if (!i18n.entities?.pulses?.[pulse.id]?.headline) errors.push(`Missing zh-CN pulse headline: ${pulse.id}`);
  for (const field of ["signup_closes_label", "cancellation_policy", "end_condition"]) {
    if (!i18n.entities?.pulses?.[pulse.id]?.[field]) errors.push(`Missing zh-CN pulse ${field}: ${pulse.id}`);
  }
}
for (const season of seasons) {
  if (!season.id || !season.milestones?.length || !season.reward?.name) errors.push(`Season ${season.id ?? "unknown"} is incomplete`);
  for (const pulseId of season.linked_pulse_ids ?? []) requireRef("Season", season.id, "linked_pulse_id", pulseId, pulseIds);
  if (!i18n.entities?.seasons?.[season.id]?.name) errors.push(`Missing zh-CN season name: ${season.id}`);
}
for (const profile of residentProfiles) {
  if (!i18n.entities?.profiles?.[profile.id]?.profile_label) errors.push(`Missing zh-CN profile label: ${profile.id}`);
}
for (const benefit of benefits) {
  requireRef("Benefit", benefit.id, "linked_pulse_id", benefit.linked_pulse_id, pulseIds);
  requireRef("Benefit", benefit.id, "linked_poi_id", benefit.linked_poi_id, poiIds);
  if (!benefit.id || !benefit.name || benefit.points_cost <= 0 || !benefit.unlock_rule || !benefit.activation_mode || !benefit.credential_prefix) {
    errors.push(`Benefit ${benefit.id ?? "unknown"} is incomplete`);
  }
  if (!/^[A-Z]{3,8}$/.test(benefit.credential_prefix ?? "")) {
    errors.push(`Benefit ${benefit.id} requires a 3-8 character uppercase credential_prefix`);
  }
  if (credentialPrefixes.has(benefit.credential_prefix)) {
    errors.push(`Benefit credential_prefix must be unique: ${benefit.credential_prefix}`);
  }
  credentialPrefixes.add(benefit.credential_prefix);
  if (!i18n.entities?.benefits?.[benefit.id]?.name) errors.push(`Missing zh-CN benefit name: ${benefit.id}`);
}
if (benefitData.currency?.id !== "spirit_points" || !benefitData.operator_baseline) {
  errors.push("Benefit data requires Spirit Points currency and operator baseline");
}

for (const task of tasks) {
  if (!i18n.entities?.tasks?.[task.id]?.name) errors.push(`Missing zh-CN task name: ${task.id}`);
}
for (const route of routes) {
  if (!i18n.entities?.routes?.[route.id]?.name) errors.push(`Missing zh-CN route name: ${route.id}`);
}

requireRef("Example export", "robot-fire-passage-patrol", "task_id", robotExport.task_id, taskIds);
requireRef("Example export", "robot-fire-passage-patrol", "route_id", robotExport.route_id, routeIds);
for (const [index, waypoint] of robotExport.route.entries()) {
  requireRef("Example export waypoint", `robot-fire-passage-patrol[${index}]`, "poi_id", waypoint.poi_id, poiIds);
}
if (robotExport.data_policy !== "fictional_or_synthetic_only") {
  errors.push("Example export must keep data_policy fictional_or_synthetic_only");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${pois.length} POIs, ${routes.length} routes, ${tasks.length} tasks, ${activities.length} activities, ${pulses.length} pulses, ${residentProfiles.length} profiles, ${seasons.length} seasons, ${benefits.length} benefits.`);
