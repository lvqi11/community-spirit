import fs from "node:fs";
import path from "node:path";

const schemaPath = "schemas/community-task-contract.schema.json";
const contractsDir = "examples/contracts";

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const pois = JSON.parse(fs.readFileSync("data/sample-pois.json", "utf8")).pois;
const routes = JSON.parse(fs.readFileSync("data/sample-routes.json", "utf8")).routes;
const tasks = JSON.parse(fs.readFileSync("data/sample-tasks.json", "utf8")).tasks;
const activities = JSON.parse(fs.readFileSync("data/sample-activities.json", "utf8")).activities;

const poiIds = new Set(pois.map((item) => item.id));
const routeIds = new Set(routes.map((item) => item.id));
const taskIds = new Set(tasks.map((item) => item.id));
const activityIds = new Set(activities.map((item) => item.id));

const errors = [];
const contractFiles = fs
  .readdirSync(contractsDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

if (!contractFiles.length) errors.push("No community task contract examples found.");

const enumAt = (property) => schema.properties[property]?.enum ?? [];
const lifecycleStates = schema.properties.lifecycle.properties.state.enum;

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertString(value, message) {
  assert(typeof value === "string" && value.trim().length > 0, message);
}

function validateContract(contract, file) {
  for (const field of schema.required) {
    assert(Object.hasOwn(contract, field), `${file} missing required field: ${field}`);
  }

  assert(contract.schema_version === schema.properties.schema_version.const, `${file} has unsupported schema_version`);
  assert(/^ctc-[a-z0-9-]+$/.test(contract.contract_id ?? ""), `${file} contract_id must start with ctc- and use kebab-case`);
  assertString(contract.title, `${file} requires title`);
  assertString(contract.intent, `${file} requires intent`);
  assert(contract.intent?.length >= 10, `${file} intent is too short`);
  assert(enumAt("actor").includes(contract.actor), `${file} actor is not allowed: ${contract.actor}`);
  assert(enumAt("interaction_mode").includes(contract.interaction_mode), `${file} interaction_mode is not allowed: ${contract.interaction_mode}`);
  assert(enumAt("visibility").includes(contract.visibility), `${file} visibility is not allowed: ${contract.visibility}`);
  assert(enumAt("risk_level").includes(contract.risk_level), `${file} risk_level is not allowed: ${contract.risk_level}`);
  assert(enumAt("resident_touch").includes(contract.resident_touch), `${file} resident_touch is not allowed: ${contract.resident_touch}`);
  assert(contract.data_policy === "fictional_or_synthetic_only", `${file} must keep data_policy fictional_or_synthetic_only`);

  const place = contract.place ?? {};
  assert(poiIds.has(place.poi_id), `${file} references unknown poi_id: ${place.poi_id}`);
  assert(routeIds.has(place.route_id), `${file} references unknown route_id: ${place.route_id}`);
  if (place.task_id) assert(taskIds.has(place.task_id), `${file} references unknown task_id: ${place.task_id}`);
  if (place.activity_id) assert(activityIds.has(place.activity_id), `${file} references unknown activity_id: ${place.activity_id}`);

  const permission = contract.permission ?? {};
  const permissionLevels = schema.properties.permission.properties.level.enum;
  assert(permissionLevels.includes(permission.level), `${file} permission.level is not allowed: ${permission.level}`);
  assertString(permission.approved_by, `${file} requires permission.approved_by`);
  assert(typeof permission.human_review_required === "boolean", `${file} requires boolean permission.human_review_required`);

  const privacy = contract.privacy_boundary ?? {};
  for (const field of ["real_identity_required", "camera_feed_allowed", "raw_video_storage_allowed", "public_profile_required"]) {
    assert(typeof privacy[field] === "boolean", `${file} requires boolean privacy_boundary.${field}`);
  }
  assert(privacy.real_identity_required === false, `${file} public contract examples must not require real identity`);
  assert(privacy.public_profile_required === false, `${file} public contract examples must not require public resident profiles`);

  const fallback = contract.fallback ?? {};
  const fallbackOwners = schema.properties.fallback.properties.owner.enum;
  assert(fallbackOwners.includes(fallback.owner), `${file} fallback.owner is not allowed: ${fallback.owner}`);
  assertString(fallback.condition, `${file} requires fallback.condition`);
  assertString(fallback.action, `${file} requires fallback.action`);

  const feedback = contract.feedback ?? {};
  for (const field of ["retention_signal", "trust_signal", "acceptance_signal"]) {
    assertString(feedback[field], `${file} requires feedback.${field}`);
  }

  const lifecycle = contract.lifecycle ?? {};
  assert(lifecycleStates.includes(lifecycle.state), `${file} lifecycle.state is not allowed: ${lifecycle.state}`);
  assert(Array.isArray(lifecycle.allowed_next_states), `${file} lifecycle.allowed_next_states must be an array`);
  for (const state of lifecycle.allowed_next_states ?? []) {
    assert(lifecycleStates.includes(state), `${file} lifecycle.allowed_next_states contains invalid state: ${state}`);
  }

  if (contract.risk_level === "high") {
    assert(permission.human_review_required === true, `${file} high-risk contracts must require human review`);
  }
  if (contract.interaction_mode === "robot_assist") {
    assert(permission.human_review_required === true, `${file} robot_assist contracts must require human review`);
    assert(["operator_only", "participant_and_operator"].includes(contract.visibility), `${file} robot_assist contracts must not be broadly public`);
  }
  if (contract.resident_touch === "direct") {
    assert(permission.resident_notice_required === true, `${file} direct resident touch requires resident notice`);
  }
}

for (const file of contractFiles) {
  const fullPath = path.join(contractsDir, file);
  const contract = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  validateContract(contract, fullPath);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${contractFiles.length} community task contracts against CACP draft schema and sample data references.`);
