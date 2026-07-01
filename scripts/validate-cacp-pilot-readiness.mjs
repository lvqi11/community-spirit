import fs from "node:fs";
import path from "node:path";

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const readDirectory = (directory) =>
  fs.readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => [path.join(directory, file), readJson(path.join(directory, file))]);

const schema = readJson("schemas/cacp-pilot-readiness-checklist.schema.json");
const contracts = new Map(readDirectory("examples/contracts").map(([file, item]) => [item.contract_id, { file, item }]));
const actors = new Map(readDirectory("examples/actors").map(([file, item]) => [item.actor_id, { file, item }]));
const artifacts = new Map(readDirectory("examples/artifacts").map(([file, item]) => [item.artifact_id, { file, item }]));
const evidence = new Map(readDirectory("examples/evidence").map(([file, item]) => [item.evidence_id, { file, item }]));
const errors = [];

const forbiddenKeys = new Set([
  "phone",
  "phone_number",
  "unit",
  "unit_number",
  "access_token",
  "lock_token",
  "payment_token",
  "camera_payload",
  "raw_video",
  "raw_video_payload",
  "sensor_payload",
  "resident_real_name",
  "real_resident_profile"
]);

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

function assertNoSensitiveKeys(value, file, pathLabel = "checklist") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNoSensitiveKeys(item, file, `${pathLabel}[${index}]`));
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [key, nested] of Object.entries(value)) {
    assert(!forbiddenKeys.has(key), `${file} contains forbidden public pilot-readiness key at ${pathLabel}.${key}`);
    assertNoSensitiveKeys(nested, file, `${pathLabel}.${key}`);
  }
}

let checklistCount = 0;
for (const [file, checklist] of readDirectory("examples/pilot-readiness")) {
  checklistCount += 1;
  assertNoSensitiveKeys(checklist, file);
  assertRequired(checklist, schema.required, file, "pilot readiness checklist");
  assert(checklist.schema_version === schema.properties.schema_version.const, `${file} has unsupported schema_version`);
  assert(/^pilot-readiness-[a-z0-9-]+$/.test(checklist.checklist_id ?? ""), `${file} has invalid checklist_id`);
  assert(checklist.data_policy === "fictional_or_synthetic_only", `${file} must remain synthetic-only`);
  assertDate(checklist.reviewed_at, file, "reviewed_at");

  const contract = contracts.get(checklist.contract_id)?.item;
  assert(Boolean(contract), `${file} references unknown contract_id: ${checklist.contract_id}`);
  const reviewer = actors.get(checklist.reviewed_by)?.item;
  assert(Boolean(reviewer), `${file} references unknown reviewed_by actor: ${checklist.reviewed_by}`);
  if (reviewer) {
    assert(reviewer.safety_controls.audit_log === true, `${file} reviewer actor must support audit_log`);
    assert(reviewer.safety_controls.human_handoff === true, `${file} reviewer actor must support human_handoff`);
  }

  for (const [field, rule] of Object.entries(schema.properties.public_demo_boundary.properties)) {
    assert(checklist.public_demo_boundary?.[field] === rule.const, `${file} public_demo_boundary.${field} must be true`);
  }

  const requiredGateNames = schema.properties.gates.required;
  assertRequired(checklist.gates, requiredGateNames, file, "gates");
  const allowedGateStatuses = schema.$defs.gate.properties.status.enum;
  let satisfiedGateCount = 0;
  let needsRealWorldReviewCount = 0;

  for (const gateName of requiredGateNames) {
    const gate = checklist.gates?.[gateName];
    assertRequired(gate, schema.$defs.gate.required, file, `gate ${gateName}`);
    assert(allowedGateStatuses.includes(gate?.status), `${file} gate ${gateName} has invalid status: ${gate?.status}`);
    assert(typeof gate?.real_pilot_requirement === "string" && gate.real_pilot_requirement.length >= 10, `${file} gate ${gateName} must describe real pilot requirement`);
    assert(typeof gate?.notes === "string" && gate.notes.length >= 10, `${file} gate ${gateName} must include notes`);

    if (gate?.status === "satisfied") satisfiedGateCount += 1;
    if (gate?.status === "needs_real_world_review") needsRealWorldReviewCount += 1;

    for (const evidenceId of gate?.evidence_ids ?? []) {
      const record = evidence.get(evidenceId)?.item;
      assert(Boolean(record), `${file} gate ${gateName} references unknown evidence: ${evidenceId}`);
      if (record) {
        assert(record.contract_id === checklist.contract_id, `${file} gate ${gateName} evidence ${evidenceId} must match checklist contract`);
        assert(record.synthetic === true, `${file} gate ${gateName} evidence ${evidenceId} must be synthetic in public examples`);
        assert(record.data_policy === "fictional_or_synthetic_only", `${file} gate ${gateName} evidence ${evidenceId} must remain synthetic-only`);
      }
    }

    for (const artifactId of gate?.artifact_ids ?? []) {
      const artifact = artifacts.get(artifactId)?.item;
      assert(Boolean(artifact), `${file} gate ${gateName} references unknown artifact: ${artifactId}`);
      if (artifact) {
        assert(artifact.contract_id === checklist.contract_id, `${file} gate ${gateName} artifact ${artifactId} must match checklist contract`);
        assert(artifact.contains_personal_data === false, `${file} gate ${gateName} artifact ${artifactId} must not contain personal data`);
        assert(artifact.data_policy === "fictional_or_synthetic_only", `${file} gate ${gateName} artifact ${artifactId} must remain synthetic-only`);
      }
    }
  }

  if (contract) {
    if (contract.permission.human_review_required) {
      assert(checklist.gates.operator_approval.status !== "not_applicable", `${file} contract requires human review; operator_approval cannot be not_applicable`);
      assert(checklist.gates.human_handoff.status !== "not_applicable", `${file} contract requires human review; human_handoff cannot be not_applicable`);
    }
    if (contract.permission.resident_notice_required) {
      assert(checklist.gates.resident_notice.status !== "not_applicable", `${file} contract requires resident notice; resident_notice cannot be not_applicable`);
    }
    if (contract.actor === "robot") {
      assert(checklist.gates.manual_stop.status !== "not_applicable", `${file} robot contract requires manual_stop gate`);
      assert(checklist.gates.physical_safety_review.status !== "not_applicable", `${file} robot contract requires physical_safety_review gate`);
    }
  }

  if (checklist.readiness_level === "public_demo_only") {
    assert(satisfiedGateCount === 0, `${file} public_demo_only checklist must not claim real-world gates are satisfied`);
    assert(needsRealWorldReviewCount > 0, `${file} public_demo_only checklist must identify real-world review gaps`);
  } else {
    const incomplete = requiredGateNames.filter((gateName) => !["satisfied", "not_applicable"].includes(checklist.gates[gateName]?.status));
    assert(incomplete.length === 0, `${file} ${checklist.readiness_level} checklist has incomplete gates: ${incomplete.join(", ")}`);
  }
}

if (errors.length) {
  console.error("CACP pilot readiness validation failed.");
  console.error("How to fix: include every required governance gate, keep public examples public_demo_only unless real-world gates are satisfied, reference same-contract synthetic evidence/artifacts, and preserve the public-demo safety boundary.");
  console.error("Troubleshooting: docs/cacp-validator-troubleshooting.md");
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${checklistCount} CACP pilot readiness checklist with governance gates.`);
