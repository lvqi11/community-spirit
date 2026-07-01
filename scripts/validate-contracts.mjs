import fs from "node:fs";
import path from "node:path";

const schemaPath = "schemas/community-task-contract.schema.json";
const actorSchemaPath = "schemas/community-actor-card.schema.json";
const contextSchemaPath = "schemas/cacp-reference-context.schema.json";
const extensionRegistrySchemaPath = "schemas/cacp-extension-registry.schema.json";
const contextPath = "examples/context/community-reference-context.json";
const extensionRegistryPath = "examples/extensions/registry.json";
const contractsDir = "examples/contracts";
const actorsDir = "examples/actors";

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const actorSchema = JSON.parse(fs.readFileSync(actorSchemaPath, "utf8"));
const contextSchema = JSON.parse(fs.readFileSync(contextSchemaPath, "utf8"));
const extensionRegistrySchema = JSON.parse(fs.readFileSync(extensionRegistrySchemaPath, "utf8"));
const context = JSON.parse(fs.readFileSync(contextPath, "utf8"));
const extensionRegistry = JSON.parse(fs.readFileSync(extensionRegistryPath, "utf8"));
const pois = context.pois ?? [];
const routes = context.routes ?? [];
const tasks = context.tasks ?? [];
const activities = context.activities ?? [];

const poiIds = new Set(pois.map((item) => item.id));
const routeIds = new Set(routes.map((item) => item.id));
const taskIds = new Set(tasks.map((item) => item.id));
const activityIds = new Set(activities.map((item) => item.id));

const errors = [];
const actorFiles = fs
  .readdirSync(actorsDir)
  .filter((file) => file.endsWith(".json"))
  .sort();
const contractFiles = fs
  .readdirSync(contractsDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

if (!contractFiles.length) errors.push("No community task contract examples found.");
if (!actorFiles.length) errors.push("No community actor card examples found.");

const enumAt = (property) => schema.properties[property]?.enum ?? [];
const lifecycleStates = schema.properties.lifecycle.properties.state.enum;
const extensionUriPattern = /^https:\/\/community-spirit\.dev\/cacp\/extensions\/[a-z0-9]+(?:-[a-z0-9]+)*\/v0\.1$/;
const extensionRegistryByUri = new Map();

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertString(value, message) {
  assert(typeof value === "string" && value.trim().length > 0, message);
}

const actorTypes = new Set();

function validateReferenceContext() {
  for (const field of contextSchema.required) {
    assert(Object.hasOwn(context, field), `${contextPath} missing required field: ${field}`);
  }

  assert(context.schema_version === contextSchema.properties.schema_version.const, `${contextPath} has unsupported schema_version`);
  assert(typeof context.community_id === "string" && context.community_id.trim().length > 0, `${contextPath} requires community_id`);
  assert(context.data_policy === "fictional_or_synthetic_only", `${contextPath} must keep data_policy fictional_or_synthetic_only`);

  for (const [collectionName, items] of Object.entries({
    pois,
    routes,
    tasks,
    activities
  })) {
    assert(Array.isArray(items) && items.length > 0, `${contextPath} requires at least one ${collectionName} item`);
    const ids = new Set();

    for (const item of items) {
      assert(typeof item?.id === "string" && item.id.trim().length > 0, `${contextPath} ${collectionName} item requires id`);
      assert(typeof item?.title === "string" && item.title.trim().length > 0, `${contextPath} ${collectionName} item ${item?.id ?? "(unknown)"} requires title`);
      assert(!ids.has(item.id), `${contextPath} ${collectionName} duplicates id: ${item.id}`);
      ids.add(item.id);
    }
  }
}

function validateExtensionRegistry() {
  for (const field of extensionRegistrySchema.required) {
    assert(Object.hasOwn(extensionRegistry, field), `${extensionRegistryPath} missing required field: ${field}`);
  }

  assert(extensionRegistry.schema_version === extensionRegistrySchema.properties.schema_version.const, `${extensionRegistryPath} has unsupported schema_version`);
  assert(extensionRegistry.data_policy === "fictional_or_synthetic_only", `${extensionRegistryPath} must keep data_policy fictional_or_synthetic_only`);
  assert(Array.isArray(extensionRegistry.extensions) && extensionRegistry.extensions.length > 0, `${extensionRegistryPath} requires at least one extension entry`);

  for (const entry of extensionRegistry.extensions ?? []) {
    assert(typeof entry.uri === "string" && extensionUriPattern.test(entry.uri), `${extensionRegistryPath} registry URI must follow https://community-spirit.dev/cacp/extensions/<kebab-name>/v0.1: ${entry.uri}`);
    assert(typeof entry.name === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name), `${extensionRegistryPath} extension name must be kebab-case: ${entry.name}`);
    assert(entry.uri?.includes(`/extensions/${entry.name}/`), `${extensionRegistryPath} extension name must match URI segment: ${entry.name}`);
    assert(["draft", "candidate", "deprecated"].includes(entry.status), `${extensionRegistryPath} extension status is not allowed: ${entry.status}`);
    assertString(entry.summary, `${extensionRegistryPath} extension ${entry.uri} requires summary`);
    assert(Array.isArray(entry.applies_to_actors) && entry.applies_to_actors.length > 0, `${extensionRegistryPath} extension ${entry.uri} requires applies_to_actors`);
    assert(Array.isArray(entry.applies_to_interaction_modes) && entry.applies_to_interaction_modes.length > 0, `${extensionRegistryPath} extension ${entry.uri} requires applies_to_interaction_modes`);
    assert(Array.isArray(entry.example_contract_ids) && entry.example_contract_ids.length > 0, `${extensionRegistryPath} extension ${entry.uri} requires example_contract_ids`);
    assert(typeof entry.core_candidate === "boolean", `${extensionRegistryPath} extension ${entry.uri} requires boolean core_candidate`);
    assert(entry.data_policy === "fictional_or_synthetic_only", `${extensionRegistryPath} extension ${entry.uri} must keep data_policy fictional_or_synthetic_only`);
    assert(!extensionRegistryByUri.has(entry.uri), `${extensionRegistryPath} duplicates extension URI: ${entry.uri}`);
    extensionRegistryByUri.set(entry.uri, entry);
  }
}

function validateActorCard(card, file) {
  for (const field of actorSchema.required) {
    assert(Object.hasOwn(card, field), `${file} missing required field: ${field}`);
  }

  assert(card.schema_version === actorSchema.properties.schema_version.const, `${file} has unsupported schema_version`);
  assert(/^actor-[a-z0-9-]+$/.test(card.actor_id ?? ""), `${file} actor_id must start with actor- and use kebab-case`);
  assert(actorSchema.properties.actor_type.enum.includes(card.actor_type), `${file} actor_type is not allowed: ${card.actor_type}`);
  assertString(card.display_name, `${file} requires display_name`);
  assert(Array.isArray(card.capabilities) && card.capabilities.length > 0, `${file} requires at least one capability`);
  assert(Array.isArray(card.supported_interaction_modes) && card.supported_interaction_modes.length > 0, `${file} requires at least one interaction mode`);
  assert(Array.isArray(card.allowed_zones) && card.allowed_zones.length > 0, `${file} requires at least one allowed zone`);
  assert(Array.isArray(card.forbidden_zones), `${file} forbidden_zones must be an array`);
  assert(card.data_policy === "fictional_or_synthetic_only", `${file} must keep data_policy fictional_or_synthetic_only`);

  for (const capability of card.capabilities ?? []) {
    assert(actorSchema.properties.capabilities.items.enum.includes(capability), `${file} capability is not allowed: ${capability}`);
  }
  for (const mode of card.supported_interaction_modes ?? []) {
    assert(actorSchema.properties.supported_interaction_modes.items.enum.includes(mode), `${file} interaction mode is not allowed: ${mode}`);
  }

  const data = card.data_boundaries ?? {};
  for (const field of ["real_identity_access", "camera_access", "raw_video_storage", "resident_profile_access"]) {
    assert(typeof data[field] === "boolean", `${file} requires boolean data_boundaries.${field}`);
  }
  assert(data.real_identity_access === false, `${file} public actor examples must not access real identity`);
  assert(data.raw_video_storage === false, `${file} public actor examples must not store raw video`);
  assert(data.resident_profile_access === false, `${file} public actor examples must not access real resident profiles`);

  const safety = card.safety_controls ?? {};
  for (const field of ["human_handoff", "manual_stop", "audit_log"]) {
    assert(typeof safety[field] === "boolean", `${file} requires boolean safety_controls.${field}`);
  }
  assert(safety.human_handoff === true, `${file} must support human handoff`);
  assert(safety.manual_stop === true, `${file} must support manual stop`);
  assert(safety.audit_log === true, `${file} must support an audit log`);

  if (card.actor_type === "robot") {
    assert(card.requires_human_approval === true, `${file} robot actors must require human approval`);
    assert(card.supported_interaction_modes?.includes("robot_assist"), `${file} robot actors must support robot_assist`);
  }

  actorTypes.add(card.actor_type);
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

  if (contract.extensions) {
    assert(Array.isArray(contract.extensions), `${file} extensions must be an array`);
    const extensionUris = new Set();
    for (const extension of contract.extensions ?? []) {
      assert(typeof extension === "string", `${file} extension values must be strings`);
      assert(extensionUriPattern.test(extension), `${file} extension URI must follow https://community-spirit.dev/cacp/extensions/<kebab-name>/v0.1: ${extension}`);
      assert(!extensionUris.has(extension), `${file} duplicates extension URI: ${extension}`);
      const registryEntry = extensionRegistryByUri.get(extension);
      assert(Boolean(registryEntry), `${file} extension URI is not registered in ${extensionRegistryPath}: ${extension}`);
      if (registryEntry) {
        assert(registryEntry.example_contract_ids.includes(contract.contract_id), `${extensionRegistryPath} extension ${extension} must list example contract ${contract.contract_id}`);
        assert(registryEntry.applies_to_actors.includes(contract.actor), `${extensionRegistryPath} extension ${extension} does not apply to actor ${contract.actor}`);
        assert(registryEntry.applies_to_interaction_modes.includes(contract.interaction_mode), `${extensionRegistryPath} extension ${extension} does not apply to interaction_mode ${contract.interaction_mode}`);
      }
      extensionUris.add(extension);
    }
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

validateReferenceContext();
validateExtensionRegistry();

for (const file of contractFiles) {
  const fullPath = path.join(contractsDir, file);
  const contract = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  validateContract(contract, fullPath);
}

for (const file of actorFiles) {
  const fullPath = path.join(actorsDir, file);
  const card = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  validateActorCard(card, fullPath);
}

for (const file of contractFiles) {
  const fullPath = path.join(contractsDir, file);
  const contract = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  assert(actorTypes.has(contract.actor), `${fullPath} has no matching CommunityActorCard actor_type: ${contract.actor}`);
}

if (errors.length) {
  console.error("CACP contract validation failed.");
  console.error("How to fix: check the referenced file, align it with schemas/community-task-contract.schema.json, schemas/community-actor-card.schema.json, schemas/cacp-reference-context.schema.json, or schemas/cacp-extension-registry.schema.json, keep public examples synthetic-only, ensure every contract.actor has a matching CommunityActorCard actor_type, and keep extension URIs aligned with docs/cacp-extension-governance-draft.md.");
  console.error("Troubleshooting: docs/cacp-validator-troubleshooting.md");
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${actorFiles.length} community actor cards, ${contractFiles.length} task contracts, the portable CACP reference context fixture, and ${extensionRegistryByUri.size} registered extensions.`);
