import fs from "node:fs";
import path from "node:path";

const manifestPath = "cacp.manifest.json";
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const errors = [];
const findings = new Map();

const portableDocExtras = [
  "docs/cacp-independence-audit.md",
  "docs/cacp-portable-extraction-dry-run.md"
];

const referenceImplementationRoots = [
  "src/",
  "dist/",
  "demo/",
  "assets/",
  "reports/video-assets/",
  "data/sample-"
];

const portableValidators = new Set(manifest.validators ?? []);
const portableFiles = new Set([
  manifestPath,
  manifest.spec?.entry,
  manifest.spec?.design_rationale,
  ...(manifest.spec?.topics ?? []),
  ...(manifest.schemas ?? []),
  ...(manifest.validators ?? []),
  ...(manifest.quality_docs ?? []),
  ...portableDocExtras
].filter(Boolean));

const portableDirectories = Object.values(manifest.example_groups ?? {});

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function existsFile(file) {
  return fs.existsSync(file) && fs.statSync(file).isFile();
}

function existsDirectory(directory) {
  return fs.existsSync(directory) && fs.statSync(directory).isDirectory();
}

function normalize(value) {
  return value.replace(/\\/g, "/");
}

function collectCouplings(file, markers) {
  const content = fs.readFileSync(file, "utf8");
  const matches = markers.filter((marker) => content.includes(marker));
  if (matches.length) {
    const previous = findings.get(file) ?? new Set();
    for (const marker of matches) previous.add(marker);
    findings.set(file, previous);
  }
}

assert(manifest.maturity?.extraction_target === "community-ai-collaboration-protocol", `${manifestPath} must keep the agreed extraction_target`);
assert(existsFile("docs/cacp-portable-extraction-dry-run.md"), "Missing portable extraction dry-run doc: docs/cacp-portable-extraction-dry-run.md");

for (const file of portableFiles) {
  assert(existsFile(file), `Portable CACP core file is missing: ${file}`);
  if (!existsFile(file)) continue;

  const normalized = normalize(file);
  if (normalized !== manifestPath) {
    for (const root of referenceImplementationRoots) {
      if (normalized.startsWith(root)) {
        errors.push(`Portable CACP core file must not live under Community Spirit reference implementation root ${root}: ${file}`);
      }
    }
  }
}

for (const directory of portableDirectories) {
  assert(existsDirectory(directory), `Portable CACP example group directory is missing: ${directory}`);
  if (!existsDirectory(directory)) continue;

  const normalized = normalize(directory);
  for (const root of referenceImplementationRoots) {
    if (normalized.startsWith(root)) {
      errors.push(`Portable CACP example group must not live under Community Spirit reference implementation root ${root}: ${directory}`);
    }
  }
}

for (const validator of portableValidators) {
  if (!existsFile(validator)) continue;
  if (validator === "scripts/validate-cacp-portable-extraction.mjs") continue;
  collectCouplings(validator, referenceImplementationRoots);
}

const portabilityDocs = [
  manifest.spec?.entry,
  manifest.spec?.design_rationale,
  ...(manifest.spec?.topics ?? []),
  "docs/cacp-developer-guide.md",
  "docs/cacp-new-contributor-walkthrough.md",
  "docs/cacp-validator-troubleshooting.md",
  "docs/cacp-extraction-plan.md",
  "docs/cacp-independence-audit.md"
].filter(Boolean);

for (const file of new Set(portabilityDocs)) {
  if (!existsFile(file)) continue;
  collectCouplings(file, ["src/", "dist/", "demo/", "reports/video-assets/", "data/sample-"]);
}

if (errors.length) {
  console.error("CACP portable extraction dry-run failed.");
  console.error("How to fix: keep every portable-core file inside docs/schemas/examples/scripts plus top-level governance files, and document extraction blockers without moving the repo yet.");
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

const findingList = [...findings.entries()].map(([file, markers]) => ({
  file,
  markers: [...markers].sort()
}));
const validatorCouplings = findingList.filter((finding) => portableValidators.has(finding.file)).length;
const docCouplings = findingList.length - validatorCouplings;
console.log(
  `Validated CACP portable extraction dry-run with ${portableFiles.size} portable core files, ` +
  `${portableDirectories.length} portable example groups, and ${manifest.reference_ui?.length ?? 0} reference UI files.`
);

if (findingList.length) {
  console.log(
    `Tracked ${findingList.length} Community Spirit coupling findings ` +
    `(${validatorCouplings} validator, ${docCouplings} doc).`
  );
  for (const finding of findingList) {
    console.log(`- ${finding.file}: ${finding.markers.join(", ")}`);
  }
} else {
  console.log("No Community Spirit coupling findings remain inside the portable-core audit surface.");
}
