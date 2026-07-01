import fs from "node:fs";
import path from "node:path";

const manifestPath = "cacp.manifest.json";
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function existsFile(file) {
  return fs.existsSync(file) && fs.statSync(file).isFile();
}

function existsDirectory(directory) {
  return fs.existsSync(directory) && fs.statSync(directory).isDirectory();
}

function listJson(directory) {
  return fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
}

assert(manifest.schema_version === "cacp.manifest.v0.1", `${manifestPath} has unsupported schema_version`);
assert(manifest.short_name === "CACP", `${manifestPath} short_name must be CACP`);
assert(manifest.data_policy === "fictional_or_synthetic_only", `${manifestPath} must remain synthetic-only`);
assert(manifest.reference_implementation?.role === "first_reference_implementation", `${manifestPath} must name Community Spirit as first reference implementation`);

for (const [label, file] of Object.entries(manifest.spec ?? {})) {
  if (Array.isArray(file)) continue;
  assert(existsFile(file), `${manifestPath} spec.${label} references missing file: ${file}`);
}

for (const topic of manifest.spec?.topics ?? []) {
  assert(existsFile(topic), `${manifestPath} spec topic references missing file: ${topic}`);
}

for (const schema of manifest.schemas ?? []) {
  assert(existsFile(schema), `${manifestPath} schema reference is missing: ${schema}`);
  if (existsFile(schema)) {
    const payload = JSON.parse(fs.readFileSync(schema, "utf8"));
    assert(payload.$schema, `${schema} must declare $schema`);
  }
}

for (const [group, directory] of Object.entries(manifest.example_groups ?? {})) {
  assert(existsDirectory(directory), `${manifestPath} example group ${group} references missing directory: ${directory}`);
  if (existsDirectory(directory)) {
    assert(listJson(directory).length > 0, `${manifestPath} example group ${group} must contain JSON examples`);
  }
}

for (const validator of manifest.validators ?? []) {
  assert(existsFile(validator), `${manifestPath} validator reference is missing: ${validator}`);
}

for (const uiFile of manifest.reference_ui ?? []) {
  assert(existsFile(uiFile), `${manifestPath} reference UI file is missing: ${uiFile}`);
}

for (const doc of manifest.quality_docs ?? []) {
  assert(existsFile(doc), `${manifestPath} quality doc reference is missing: ${doc}`);
}

for (const [flag, value] of Object.entries(manifest.public_demo_boundary ?? {})) {
  assert(value === true, `${manifestPath} public_demo_boundary.${flag} must be true`);
}

const contracts = listJson(manifest.example_groups.contracts ?? "examples/contracts").length;
const exports = listJson(manifest.example_groups.workflow_exports ?? "examples/exports").length;
const pilotReadiness = listJson(manifest.example_groups.pilot_readiness ?? "examples/pilot-readiness").length;
assert(exports >= contracts, `${manifestPath} should include at least one workflow export per contract`);
assert(pilotReadiness >= contracts, `${manifestPath} should include at least one pilot readiness checklist per contract`);

if (errors.length) {
  console.error("CACP manifest validation failed.");
  console.error("How to fix: update cacp.manifest.json so every spec, schema, example group, validator, reference UI file, and quality doc points to an existing CACP asset.");
  console.error("Troubleshooting: docs/cacp-validator-troubleshooting.md");
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated CACP manifest with ${manifest.schemas.length} schemas, ${Object.keys(manifest.example_groups).length} example groups, and ${manifest.validators.length} validators.`);
