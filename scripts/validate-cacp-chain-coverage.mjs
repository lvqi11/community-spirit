import fs from "node:fs";
import path from "node:path";

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const readDirectory = (directory) =>
  fs.readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => [path.join(directory, file), readJson(path.join(directory, file))]);

const contracts = readDirectory("examples/contracts");
const transitions = readDirectory("examples/transitions");
const artifacts = readDirectory("examples/artifacts");
const evidence = readDirectory("examples/evidence");
const exports = readDirectory("examples/exports");
const pilotReadiness = readDirectory("examples/pilot-readiness");
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function idsForContract(collection, contractId, idField) {
  return collection
    .filter(([, item]) => item.contract_id === contractId)
    .map(([, item]) => item[idField]);
}

function exportForContract(contractId) {
  return exports.find(([, item]) => item.community_task_contract?.contract_id === contractId || item.cacp_protocol_bundle?.contract_id === contractId);
}

function pilotChecklistForContract(contractId) {
  return pilotReadiness.find(([, item]) => item.contract_id === contractId);
}

for (const [contractFile, contract] of contracts) {
  const contractId = contract.contract_id;
  const transitionIds = idsForContract(transitions, contractId, "transition_id");
  const artifactIds = idsForContract(artifacts, contractId, "artifact_id");
  const evidenceIds = idsForContract(evidence, contractId, "evidence_id");
  const exportEntry = exportForContract(contractId);
  const pilotEntry = pilotChecklistForContract(contractId);

  assert(transitionIds.length > 0, `${contractFile} has no lifecycle transition example`);
  assert(artifactIds.length > 0, `${contractFile} has no artifact example`);
  assert(evidenceIds.length > 0, `${contractFile} has no evidence example`);
  assert(Boolean(exportEntry), `${contractFile} has no workflow export bundle`);
  assert(Boolean(pilotEntry), `${contractFile} has no pilot readiness checklist`);

  if (exportEntry) {
    const [exportFile, exported] = exportEntry;
    const bundle = exported.cacp_protocol_bundle;
    assert(bundle?.contract_id === contractId, `${exportFile} bundle contract_id must match ${contractId}`);
    assert(exported.community_task_contract?.contract_id === contractId, `${exportFile} contract summary must match ${contractId}`);
    assert((bundle?.transitions ?? []).length > 0, `${exportFile} bundle must include transitions`);
    assert((bundle?.evidence ?? []).length > 0, `${exportFile} bundle must include evidence`);
    assert((bundle?.artifacts ?? []).length > 0, `${exportFile} bundle must include artifacts`);

    for (const transition of bundle?.transitions ?? []) {
      assert(transitionIds.includes(transition.transition_id), `${exportFile} references transition outside contract chain: ${transition.transition_id}`);
    }
    for (const record of bundle?.evidence ?? []) {
      assert(evidenceIds.includes(record.evidence_id), `${exportFile} references evidence outside contract chain: ${record.evidence_id}`);
    }
    for (const artifact of bundle?.artifacts ?? []) {
      assert(artifactIds.includes(artifact.artifact_id), `${exportFile} references artifact outside contract chain: ${artifact.artifact_id}`);
    }
  }

  if (pilotEntry) {
    const [pilotFile, checklist] = pilotEntry;
    assert(checklist.readiness_level === "public_demo_only", `${pilotFile} must remain public_demo_only in public examples`);
    assert(checklist.public_demo_boundary?.fictional_or_synthetic_only === true, `${pilotFile} must preserve fictional_or_synthetic_only boundary`);
    const gateReferences = Object.values(checklist.gates ?? {}).flatMap((gate) => [
      ...(gate.evidence_ids ?? []),
      ...(gate.artifact_ids ?? [])
    ]);
    for (const referenceId of gateReferences) {
      if (referenceId.startsWith("evidence-")) assert(evidenceIds.includes(referenceId), `${pilotFile} references evidence outside contract chain: ${referenceId}`);
      if (referenceId.startsWith("artifact-")) assert(artifactIds.includes(referenceId), `${pilotFile} references artifact outside contract chain: ${referenceId}`);
    }
  }
}

if (errors.length) {
  console.error("CACP full-chain coverage validation failed.");
  console.error("How to fix: every examples/contracts item needs same-contract transition, artifact, evidence, workflow export bundle, and pilot readiness checklist examples.");
  console.error("Troubleshooting: docs/cacp-validator-troubleshooting.md");
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated full CACP chain coverage for ${contracts.length} task contracts.`);
