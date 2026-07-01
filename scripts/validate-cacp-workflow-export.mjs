import fs from "node:fs";
import path from "node:path";

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const readDirectory = (directory) =>
  fs.readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => [path.join(directory, file), readJson(path.join(directory, file))]);

const schema = readJson("schemas/cacp-workflow-protocol-bundle.schema.json");
const contracts = new Map(readDirectory("examples/contracts").map(([file, item]) => [item.contract_id, { file, item }]));
const actors = new Map(readDirectory("examples/actors").map(([file, item]) => [item.actor_id, { file, item }]));
const artifacts = new Map(readDirectory("examples/artifacts").map(([file, item]) => [item.artifact_id, { file, item }]));
const evidence = new Map(readDirectory("examples/evidence").map(([file, item]) => [item.evidence_id, { file, item }]));
const transitions = new Map(readDirectory("examples/transitions").map(([file, item]) => [item.transition_id, { file, item }]));
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertRequired(item, fields, file, label = "object") {
  for (const field of fields) {
    assert(Object.hasOwn(item ?? {}, field), `${file} ${label} missing required field: ${field}`);
  }
}

function assertDate(value, file, field) {
  assert(typeof value === "string" && !Number.isNaN(Date.parse(value)), `${file} has invalid ${field}: ${value}`);
}

function assertSyntheticPolicy(item, file, label) {
  assert(item?.data_policy === "fictional_or_synthetic_only", `${file} ${label} must remain fictional_or_synthetic_only`);
}

function assertNoSensitiveExportPayload(value, file, pathLabel = "export") {
  const forbiddenKeys = new Set([
    "phone",
    "phone_number",
    "unit",
    "unit_number",
    "access_token",
    "lock_token",
    "camera_payload",
    "raw_video",
    "raw_video_payload",
    "sensor_payload",
    "resident_real_name"
  ]);

  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNoSensitiveExportPayload(item, file, `${pathLabel}[${index}]`));
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [key, nested] of Object.entries(value)) {
    assert(!forbiddenKeys.has(key), `${file} contains forbidden public export key at ${pathLabel}.${key}`);
    assertNoSensitiveExportPayload(nested, file, `${pathLabel}.${key}`);
  }
}

function assertSummaryMatches(source, summary, fields, file, label) {
  for (const field of fields) {
    assert(JSON.stringify(source[field]) === JSON.stringify(summary[field]), `${file} ${label} field mismatch: ${field}`);
  }
}

let exportCount = 0;
for (const [file, exported] of readDirectory("examples/exports")) {
  exportCount += 1;
  assert(exported.schema_version === "0.1.0", `${file} has unsupported export schema_version`);
  assertSyntheticPolicy(exported, file, "export");
  assertNoSensitiveExportPayload(exported, file);

  const contractSummary = exported.community_task_contract;
  const bundle = exported.cacp_protocol_bundle;
  assert(contractSummary, `${file} missing community_task_contract`);
  assert(bundle, `${file} missing cacp_protocol_bundle`);
  if (!bundle) continue;

  assertRequired(bundle, schema.required, file, "cacp_protocol_bundle");
  assert(bundle.schema_version === schema.properties.schema_version.const, `${file} has unsupported cacp_protocol_bundle schema_version`);
  assert(/^ctc-[a-z0-9-]+$/.test(bundle.contract_id ?? ""), `${file} has invalid bundle contract_id`);

  const contract = contracts.get(bundle.contract_id)?.item;
  assert(Boolean(contract), `${file} references unknown contract_id: ${bundle.contract_id}`);
  assert(contractSummary?.contract_id === bundle.contract_id, `${file} contract summary and bundle contract_id must match`);
  if (contract) {
    assert(bundle.lifecycle?.state === contract.lifecycle.state, `${file} bundle lifecycle.state must match contract`);
    assert(
      JSON.stringify(bundle.lifecycle?.allowed_next_states ?? []) === JSON.stringify(contract.lifecycle.allowed_next_states),
      `${file} bundle lifecycle.allowed_next_states must match contract`
    );
    assert(bundle.readiness?.human_review_required === contract.permission.human_review_required, `${file} readiness human_review_required must match contract`);
    assert(bundle.readiness?.resident_notice_required === contract.permission.resident_notice_required, `${file} readiness resident_notice_required must match contract`);
    assert(bundle.readiness?.data_policy === contract.data_policy, `${file} readiness data_policy must match contract`);
  }

  assertRequired(bundle.readiness, Object.keys(schema.properties.readiness.properties), file, "readiness");
  assert(bundle.readiness.has_transition_records === bundle.transitions.length > 0, `${file} readiness.has_transition_records must match transitions length`);
  assert(bundle.readiness.has_evidence_records === bundle.evidence.length > 0, `${file} readiness.has_evidence_records must match evidence length`);
  assert(bundle.readiness.has_artifacts === bundle.artifacts.length > 0, `${file} readiness.has_artifacts must match artifacts length`);
  assertSyntheticPolicy(bundle.readiness, file, "readiness");

  for (const [field, rule] of Object.entries(schema.properties.safety_boundary.properties)) {
    assert(bundle.safety_boundary?.[field] === rule.const, `${file} safety_boundary.${field} must be true`);
  }

  const bundleActors = new Map((bundle.actors ?? []).map((actor) => [actor.actor_id, actor]));
  const bundleEvidence = new Map((bundle.evidence ?? []).map((record) => [record.evidence_id, record]));
  const bundleArtifacts = new Map((bundle.artifacts ?? []).map((artifact) => [artifact.artifact_id, artifact]));

  for (const actorSummary of bundle.actors ?? []) {
    assertRequired(actorSummary, schema.$defs.actor_summary.required, file, `actor ${actorSummary.actor_id}`);
    const actor = actors.get(actorSummary.actor_id)?.item;
    assert(Boolean(actor), `${file} references unknown actor: ${actorSummary.actor_id}`);
    if (actor) {
      assertSummaryMatches(
        actor,
        actorSummary,
        ["actor_type", "display_name", "capabilities", "requires_human_approval", "safety_controls", "data_boundaries", "data_policy"],
        file,
        `actor ${actorSummary.actor_id}`
      );
      assert(actor.data_boundaries.real_identity_access === false, `${file} actor ${actor.actor_id} must not expose real identity access`);
      assert(actor.data_boundaries.raw_video_storage === false, `${file} actor ${actor.actor_id} must not allow raw video storage`);
      assert(actor.data_boundaries.resident_profile_access === false, `${file} actor ${actor.actor_id} must not expose resident profile access`);
    }
  }

  for (const transitionSummary of bundle.transitions ?? []) {
    assertRequired(transitionSummary, schema.$defs.transition_summary.required, file, `transition ${transitionSummary.transition_id}`);
    assertDate(transitionSummary.occurred_at, file, `transition ${transitionSummary.transition_id}.occurred_at`);
    assertSyntheticPolicy(transitionSummary, file, `transition ${transitionSummary.transition_id}`);

    const transition = transitions.get(transitionSummary.transition_id)?.item;
    assert(Boolean(transition), `${file} references unknown transition: ${transitionSummary.transition_id}`);
    if (transition) {
      assertSummaryMatches(
        transition,
        transitionSummary,
        ["from_state", "to_state", "occurred_at", "requested_by", "reason", "evidence_ids", "artifact_ids", "data_policy"],
        file,
        `transition ${transitionSummary.transition_id}`
      );
      assert(transition.contract_id === bundle.contract_id, `${file} transition ${transition.transition_id} must match bundle contract_id`);
    }

    const actor = actors.get(transitionSummary.requested_by)?.item;
    assert(bundleActors.has(transitionSummary.requested_by), `${file} transition actor must be included in actors: ${transitionSummary.requested_by}`);
    if (actor) assert(transitionSummary.actor_type === actor.actor_type, `${file} transition actor_type must match actor card`);

    for (const evidenceId of transitionSummary.evidence_ids ?? []) {
      assert(bundleEvidence.has(evidenceId), `${file} transition references evidence not included in bundle: ${evidenceId}`);
    }
    for (const artifactId of transitionSummary.artifact_ids ?? []) {
      assert(bundleArtifacts.has(artifactId), `${file} transition references artifact not included in bundle: ${artifactId}`);
    }
  }

  for (const evidenceSummary of bundle.evidence ?? []) {
    assertRequired(evidenceSummary, schema.$defs.evidence_summary.required, file, `evidence ${evidenceSummary.evidence_id}`);
    assertDate(evidenceSummary.recorded_at, file, `evidence ${evidenceSummary.evidence_id}.recorded_at`);
    assert(evidenceSummary.synthetic === true, `${file} evidence ${evidenceSummary.evidence_id} must be synthetic`);
    assertSyntheticPolicy(evidenceSummary, file, `evidence ${evidenceSummary.evidence_id}`);
    assert(Object.keys(evidenceSummary.facts ?? {}).length > 0, `${file} evidence ${evidenceSummary.evidence_id} must include facts`);

    const record = evidence.get(evidenceSummary.evidence_id)?.item;
    assert(Boolean(record), `${file} references unknown evidence: ${evidenceSummary.evidence_id}`);
    if (record) {
      assert(record.contract_id === bundle.contract_id, `${file} evidence ${record.evidence_id} must match bundle contract_id`);
      assertSummaryMatches(
        record,
        evidenceSummary,
        ["evidence_type", "recorded_by", "recorded_at", "facts", "source_artifact_ids", "synthetic", "data_policy"],
        file,
        `evidence ${evidenceSummary.evidence_id}`
      );
    }

    assert(bundleActors.has(evidenceSummary.recorded_by), `${file} evidence recorder must be included in actors: ${evidenceSummary.recorded_by}`);
    for (const artifactId of evidenceSummary.source_artifact_ids ?? []) {
      assert(bundleArtifacts.has(artifactId), `${file} evidence references source artifact not included in bundle: ${artifactId}`);
    }
  }

  for (const artifactSummary of bundle.artifacts ?? []) {
    assertRequired(artifactSummary, schema.$defs.artifact_summary.required, file, `artifact ${artifactSummary.artifact_id}`);
    assertDate(artifactSummary.created_at, file, `artifact ${artifactSummary.artifact_id}.created_at`);
    assert(artifactSummary.contains_personal_data === false, `${file} artifact ${artifactSummary.artifact_id} must not contain personal data`);
    assertSyntheticPolicy(artifactSummary, file, `artifact ${artifactSummary.artifact_id}`);

    const artifact = artifacts.get(artifactSummary.artifact_id)?.item;
    assert(Boolean(artifact), `${file} references unknown artifact: ${artifactSummary.artifact_id}`);
    if (artifact) {
      assert(artifact.contract_id === bundle.contract_id, `${file} artifact ${artifact.artifact_id} must match bundle contract_id`);
      assertSummaryMatches(
        artifact,
        artifactSummary,
        ["artifact_type", "created_by", "created_at", "visibility", "contains_personal_data", "summary", "retention", "data_policy"],
        file,
        `artifact ${artifactSummary.artifact_id}`
      );
    }

    assert(bundleActors.has(artifactSummary.created_by), `${file} artifact creator must be included in actors: ${artifactSummary.created_by}`);
  }
}

if (errors.length) {
  console.error("CACP workflow export bundle validation failed.");
  console.error("How to fix: keep examples/exports bundles aligned with the source contract, actor cards, transitions, evidence, and artifacts; do not include real resident, access, camera, sensor, payment, or robot payload keys.");
  console.error("Troubleshooting: docs/cacp-validator-troubleshooting.md");
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${exportCount} workflow export CACP protocol bundle handoff artifact.`);
