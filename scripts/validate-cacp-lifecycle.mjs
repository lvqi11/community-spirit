import fs from "node:fs";
import path from "node:path";

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const readDirectory = (directory) => fs.readdirSync(directory).filter((file) => file.endsWith(".json")).sort().map((file) => [path.join(directory, file), readJson(path.join(directory, file))]);

const artifactSchema = readJson("schemas/community-artifact.schema.json");
const evidenceSchema = readJson("schemas/community-evidence.schema.json");
const transitionSchema = readJson("schemas/community-task-transition.schema.json");
const contracts = new Map(readDirectory("examples/contracts").map(([file, item]) => [item.contract_id, { file, item }]));
const actors = new Map(readDirectory("examples/actors").map(([file, item]) => [item.actor_id, { file, item }]));
const artifacts = new Map();
const evidence = new Map();
const errors = [];
const publicNoticeExtension = "https://community-spirit.dev/cacp/extensions/public-notice/v0.1";

const allowedTransitions = {
  draft: ["proposed", "canceled"],
  proposed: ["needs_resident_notice", "needs_operator_approval", "approved", "rejected", "canceled"],
  needs_resident_notice: ["needs_operator_approval", "approved", "rejected", "canceled"],
  needs_operator_approval: ["approved", "rejected", "canceled"],
  approved: ["scheduled", "running", "canceled"],
  scheduled: ["running", "canceled"],
  running: ["paused", "input_required", "auth_required", "completed", "failed", "incident_review", "canceled"],
  paused: ["running", "failed", "incident_review", "canceled"],
  input_required: ["running", "failed", "canceled"],
  auth_required: ["running", "failed", "canceled"],
  incident_review: ["completed", "failed", "canceled"],
  completed: [],
  rejected: [],
  canceled: [],
  failed: ["incident_review"]
};

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertRequired(item, schema, file) {
  for (const field of schema.required) assert(Object.hasOwn(item, field), `${file} missing required field: ${field}`);
}

function assertDate(value, message) {
  assert(typeof value === "string" && !Number.isNaN(Date.parse(value)), message);
}

for (const [file, artifact] of readDirectory("examples/artifacts")) {
  assertRequired(artifact, artifactSchema, file);
  assert(artifact.schema_version === artifactSchema.properties.schema_version.const, `${file} has unsupported schema_version`);
  assert(/^artifact-[a-z0-9-]+$/.test(artifact.artifact_id ?? ""), `${file} has invalid artifact_id`);
  assert(artifactSchema.properties.artifact_type.enum.includes(artifact.artifact_type), `${file} has invalid artifact_type: ${artifact.artifact_type}`);
  assert(contracts.has(artifact.contract_id), `${file} references unknown contract_id: ${artifact.contract_id}`);
  assert(actors.has(artifact.created_by), `${file} references unknown actor: ${artifact.created_by}`);
  assertDate(artifact.created_at, `${file} has invalid created_at`);
  assert(artifact.contains_personal_data === false, `${file} public artifact examples must not contain personal data`);
  assert(artifact.data_policy === "fictional_or_synthetic_only", `${file} must remain synthetic`);
  assert(!artifacts.has(artifact.artifact_id), `${file} duplicates artifact_id: ${artifact.artifact_id}`);
  artifacts.set(artifact.artifact_id, { file, item: artifact });
}

for (const [file, record] of readDirectory("examples/evidence")) {
  assertRequired(record, evidenceSchema, file);
  assert(record.schema_version === evidenceSchema.properties.schema_version.const, `${file} has unsupported schema_version`);
  assert(/^evidence-[a-z0-9-]+$/.test(record.evidence_id ?? ""), `${file} has invalid evidence_id`);
  assert(evidenceSchema.properties.evidence_type.enum.includes(record.evidence_type), `${file} has invalid evidence_type: ${record.evidence_type}`);
  assert(contracts.has(record.contract_id), `${file} references unknown contract_id: ${record.contract_id}`);
  assert(actors.has(record.recorded_by), `${file} references unknown actor: ${record.recorded_by}`);
  assertDate(record.recorded_at, `${file} has invalid recorded_at`);
  assert(record.facts && Object.keys(record.facts).length > 0, `${file} must contain minimal audit facts`);
  assert(record.synthetic === true, `${file} public evidence examples must be synthetic`);
  assert(record.data_policy === "fictional_or_synthetic_only", `${file} must remain synthetic`);
  for (const artifactId of record.source_artifact_ids ?? []) {
    const artifact = artifacts.get(artifactId)?.item;
    assert(Boolean(artifact), `${file} references unknown source artifact: ${artifactId}`);
    if (artifact) assert(artifact.contract_id === record.contract_id, `${file} and ${artifactId} must reference the same contract`);
  }
  assert(!evidence.has(record.evidence_id), `${file} duplicates evidence_id: ${record.evidence_id}`);
  evidence.set(record.evidence_id, { file, item: record });
}

let transitionCount = 0;
for (const [file, transition] of readDirectory("examples/transitions")) {
  transitionCount += 1;
  assertRequired(transition, transitionSchema, file);
  assert(transition.schema_version === transitionSchema.properties.schema_version.const, `${file} has unsupported schema_version`);
  assert(/^transition-[a-z0-9-]+$/.test(transition.transition_id ?? ""), `${file} has invalid transition_id`);
  assert(actors.has(transition.requested_by), `${file} references unknown requesting actor: ${transition.requested_by}`);
  assertDate(transition.occurred_at, `${file} has invalid occurred_at`);
  assert(transition.data_policy === "fictional_or_synthetic_only", `${file} must remain synthetic`);

  const contract = contracts.get(transition.contract_id)?.item;
  assert(Boolean(contract), `${file} references unknown contract_id: ${transition.contract_id}`);
  const canonicalNext = allowedTransitions[transition.from_state];
  assert(Array.isArray(canonicalNext), `${file} has unknown from_state: ${transition.from_state}`);
  assert(canonicalNext?.includes(transition.to_state), `${file} forbids lifecycle transition ${transition.from_state} -> ${transition.to_state}`);
  if (contract?.lifecycle.state === transition.from_state) {
    assert(contract.lifecycle.allowed_next_states.includes(transition.to_state), `${file} transition is not declared by contract.lifecycle.allowed_next_states`);
  }

  const linkedEvidence = (transition.evidence_ids ?? []).map((id) => evidence.get(id)?.item).filter(Boolean);
  const evidenceTypes = new Set(linkedEvidence.map((item) => item.evidence_type));
  for (const evidenceId of transition.evidence_ids ?? []) {
    const record = evidence.get(evidenceId)?.item;
    assert(Boolean(record), `${file} references unknown evidence: ${evidenceId}`);
    if (record) {
      assert(record.contract_id === transition.contract_id, `${file} and ${evidenceId} must reference the same contract`);
      assert(Date.parse(record.recorded_at) <= Date.parse(transition.occurred_at), `${file} cannot use future evidence: ${evidenceId}`);
    }
  }
  for (const artifactId of transition.artifact_ids ?? []) {
    const artifact = artifacts.get(artifactId)?.item;
    assert(Boolean(artifact), `${file} references unknown artifact: ${artifactId}`);
    if (artifact) assert(artifact.contract_id === transition.contract_id, `${file} and ${artifactId} must reference the same contract`);
  }

  if (transition.from_state === "needs_resident_notice") assert(evidenceTypes.has("resident_notice"), `${file} requires resident_notice evidence`);
  if (transition.to_state === "approved" && contract?.permission.human_review_required) assert(evidenceTypes.has("operator_approval"), `${file} requires operator_approval evidence`);
  if (transition.to_state === "scheduled") assert(evidenceTypes.has("schedule_confirmation"), `${file} requires schedule_confirmation evidence`);
  if (transition.to_state === "running") assert(evidenceTypes.has("task_start"), `${file} requires task_start evidence`);
  if (transition.to_state === "completed") assert(evidenceTypes.has("task_completion"), `${file} requires task_completion evidence`);
  if (transition.to_state === "incident_review") assert(evidenceTypes.has("incident"), `${file} requires incident evidence`);
}

for (const [contractId, { file, item: contract }] of contracts) {
  if (!contract.extensions?.includes(publicNoticeExtension)) continue;
  if (contract.resident_touch !== "direct") continue;

  const contractArtifacts = [...artifacts.values()].map(({ item }) => item).filter((artifact) => artifact.contract_id === contractId);
  const contractEvidence = [...evidence.values()].map(({ item }) => item).filter((record) => record.contract_id === contractId);
  const residentNoticeArtifacts = contractArtifacts.filter((artifact) => artifact.artifact_type === "resident_notice");
  const residentNoticeEvidence = contractEvidence.filter((record) => record.evidence_type === "resident_notice");

  assert(residentNoticeArtifacts.length > 0, `${file} uses public-notice with direct resident touch but has no resident_notice artifact`);
  assert(residentNoticeEvidence.length > 0, `${file} uses public-notice with direct resident touch but has no resident_notice evidence`);

  for (const artifact of residentNoticeArtifacts) {
    assert(
      ["community_summary", "participant_and_operator"].includes(artifact.visibility),
      `${file} public-notice resident_notice artifact ${artifact.artifact_id} must be visible to community_summary or participant_and_operator`
    );
  }

  for (const record of residentNoticeEvidence) {
    assert(record.facts?.real_identity_stored === false, `${file} public-notice resident_notice evidence ${record.evidence_id} must record real_identity_stored=false`);
    const sourceArtifacts = record.source_artifact_ids.map((artifactId) => artifacts.get(artifactId)?.item).filter(Boolean);
    assert(
      sourceArtifacts.some((artifact) => artifact.artifact_type === "resident_notice"),
      `${file} public-notice resident_notice evidence ${record.evidence_id} must source at least one resident_notice artifact`
    );
  }
}

if (errors.length) {
  console.error("CACP lifecycle/artifact/evidence validation failed.");
  console.error("How to fix: verify every transition references one known contract, one known requesting actor, same-contract evidence and artifacts, and the required evidence type for protected lifecycle boundaries.");
  console.error("Troubleshooting: docs/cacp-validator-troubleshooting.md");
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${transitionCount} CACP lifecycle transitions with ${artifacts.size} artifacts and ${evidence.size} evidence records.`);
