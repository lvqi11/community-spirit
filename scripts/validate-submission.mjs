import fs from "node:fs";
import path from "node:path";

const expectedCounts = {
  "data/sample-pois.json": ["pois", 13],
  "data/sample-routes.json": ["routes", 8],
  "data/sample-tasks.json": ["tasks", 9],
  "data/sample-activities.json": ["activities", 4],
  "data/sample-pulses.json": ["pulses", 3],
  "data/sample-seasons.json": ["seasons", 3],
  "data/sample-benefits.json": ["benefits", 3]
};

const requiredFiles = [
  "README.md",
  "PROJECT.md",
  "cacp.manifest.json",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "CODE_OF_CONDUCT.md",
  ".github/pull_request_template.md",
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/feature_request.md",
  ".github/ISSUE_TEMPLATE/cacp_protocol_change.md",
  "pitch/demo-script.md",
  "docs/protocol-design.md",
  "docs/cacp-spec-v0.1.md",
  "docs/cacp-developer-guide.md",
  "docs/cacp-new-contributor-walkthrough.md",
  "docs/cacp-context-fixture-contract.md",
  "docs/cacp-cli-contract-draft.md",
  "docs/cacp-extracted-repo-layout-draft.md",
  "docs/cacp-versioning-and-compatibility-draft.md",
  "docs/cacp-extension-governance-draft.md",
  "docs/cacp-extension-coverage-matrix.md",
  "docs/cacp-public-notice-semantics-draft.md",
  "docs/cacp-repo-readme-draft.md",
  "docs/cacp-validator-troubleshooting.md",
  "docs/cacp-independence-audit.md",
  "docs/cacp-portable-extraction-dry-run.md",
  "docs/cacp-benchmark-matrix.md",
  "docs/cacp-schema-surface-review.md",
  "docs/cacp-package-shape-draft.md",
  "docs/cacp-release-roadmap.md",
  "docs/cacp-extraction-plan.md",
  "docs/cacp-changelog.md",
  "docs/cacp-release-checklist.md",
  "docs/novus-analytics-integration.md",
  "docs/community-task-contract.md",
  "docs/cacp-lifecycle-artifacts-evidence.md",
  "docs/cacp-pilot-readiness-checklist.md",
  "docs/physical-ai-community-roadmap.md",
  "docs/physical-ai-social-layer.md",
  "docs/project-summary.md",
  "docs/devpost-world-product-day-submission.md",
  "docs/hackathon-submission-strategy.md",
  "schemas/community-actor-card.schema.json",
  "schemas/community-task-contract.schema.json",
  "schemas/community-task-transition.schema.json",
  "schemas/community-artifact.schema.json",
  "schemas/community-evidence.schema.json",
  "schemas/cacp-workflow-protocol-bundle.schema.json",
  "schemas/cacp-pilot-readiness-checklist.schema.json",
  "schemas/cacp-reference-context.schema.json",
  "schemas/cacp-extension-registry.schema.json",
  "examples/context/community-reference-context.json",
  "examples/extensions/registry.json",
  "examples/actors/resident-companion-app.json",
  "examples/actors/elder-helper-pair.json",
  "examples/actors/community-operator-console.json",
  "examples/actors/future-patrol-robot.json",
  "examples/actors/community-ai-assistant.json",
  "examples/contracts/ai-suggested-garden-meetup.json",
  "examples/contracts/evening-basketball-social-pulse.json",
  "examples/contracts/elder-friendly-walking-helper.json",
  "examples/contracts/robot-fire-passage-patrol.json",
  "examples/artifacts/elder-walk-resident-notice.json",
  "examples/artifacts/basketball-schedule-record.json",
  "examples/artifacts/robot-patrol-approval-record.json",
  "examples/artifacts/ai-garden-meetup-review-record.json",
  "examples/evidence/elder-walk-resident-notice.json",
  "examples/evidence/basketball-schedule-confirmation.json",
  "examples/evidence/robot-patrol-operator-approval.json",
  "examples/evidence/ai-garden-meetup-operator-review.json",
  "examples/transitions/elder-walk-notice-to-review.json",
  "examples/transitions/basketball-approved-to-scheduled.json",
  "examples/transitions/robot-patrol-review-to-approved.json",
  "examples/transitions/ai-garden-meetup-review-to-approved.json",
  "examples/exports/ai-suggested-garden-meetup.json",
  "examples/exports/evening-basketball-social-pulse.json",
  "examples/exports/elder-friendly-walking-helper.json",
  "examples/exports/robot-fire-passage-patrol.json",
  "examples/pilot-readiness/ai-suggested-garden-meetup.json",
  "examples/pilot-readiness/evening-basketball-social-pulse.json",
  "examples/pilot-readiness/elder-friendly-walking-helper.json",
  "examples/pilot-readiness/robot-fire-passage-patrol.json",
  "scripts/validate-cacp-workflow-export.mjs",
  "scripts/validate-cacp-pilot-readiness.mjs",
  "scripts/validate-cacp-manifest.mjs",
  "scripts/validate-cacp-chain-coverage.mjs",
  "scripts/validate-cacp-portable-extraction.mjs",
  "scripts/validate-cacp.mjs",
  "docs/demo-qa-checklist.md",
  "docs/demo-recording-guide.md",
  "dist/index.html"
];

const requiredDocumentMarkers = {
  "README.md": ["Community Pulse", "Seven-step guided demo controller", "fictional or synthetic"],
  "PROJECT.md": ["Community Life RPG", "Spirit Points", "fictional or synthetic"],
  "cacp.manifest.json": ["cacp.manifest.v0.1", "first_reference_implementation", "examples/extensions"],
  "CONTRIBUTING.md": ["CACP", "fictional_or_synthetic_only", "npm.cmd run check"],
  "SECURITY.md": ["CACP Protocol Boundary", "synthetic data", "real pilot"],
  "CODE_OF_CONDUCT.md": ["synthetic-data boundary", "Security", "Enforcement"],
  ".github/pull_request_template.md": ["CACP examples", "npm.cmd run check", "Screenshots"],
  ".github/ISSUE_TEMPLATE/cacp_protocol_change.md": ["Protocol area", "Validator impact", "Safety boundary"],
  "pitch/demo-script.md": ["Run next step", "resident benefit pass", "World Ops"],
  "docs/protocol-design.md": ["CACP", "MCP", "A2A"],
  "docs/cacp-spec-v0.1.md": ["Community AI Collaboration Protocol", "CACPWorkflowProtocolBundle", "CACPPilotReadinessChecklist"],
  "docs/cacp-developer-guide.md": ["How to add a new CACP scenario", "Validator workflow", "Extraction rule"],
  "docs/cacp-new-contributor-walkthrough.md": ["new contributor", "validate-cacp.mjs", "full CACP chain"],
  "docs/cacp-context-fixture-contract.md": ["CACP Context Fixture Contract", "Do not turn the fixture into a second product database", "validate-cacp-portable-extraction.mjs"],
  "docs/cacp-cli-contract-draft.md": ["CACP CLI Contract Draft", "cacp validate", "validate-cacp-portable-extraction.mjs"],
  "docs/cacp-extracted-repo-layout-draft.md": ["CACP Extracted Repo Layout Draft", "community-ai-collaboration-protocol/", "node scripts\\validate-cacp.mjs"],
  "docs/cacp-versioning-and-compatibility-draft.md": ["CACP Versioning And Compatibility Draft", "breaking changes are allowed, silent breaking changes are not", "schema version rule"],
  "docs/cacp-extension-governance-draft.md": ["CACP Extension Governance Draft", "https://community-spirit.dev/cacp/extensions/<extension-name>/v0.1", "examples/extensions/registry.json"],
  "docs/cacp-extension-coverage-matrix.md": ["CACP Extension Coverage Matrix", "public-notice", "single-chain signals"],
  "docs/cacp-public-notice-semantics-draft.md": ["CACP Public Notice Semantics Draft", "Proposal notice boundary", "Resident-touch notice boundary"],
  "docs/cacp-repo-readme-draft.md": ["CACP Repository README Draft", "first reference implementation", "validate-cacp-portable-extraction.mjs"],
  "docs/cacp-validator-troubleshooting.md": ["unknown actor", "chain coverage", "public_demo_only"],
  "docs/cacp-independence-audit.md": ["extraction-ready candidate", "AI-agent proposal", "validate-cacp.mjs"],
  "docs/cacp-portable-extraction-dry-run.md": ["Portable Extraction Dry-Run", "Community Spirit reference implementation", "examples/context"],
  "docs/cacp-benchmark-matrix.md": ["Benchmark Matrix", "OpenTelemetry", "OpenSSF Scorecard"],
  "docs/cacp-schema-surface-review.md": ["schema surface", "Do not add yet", "v0.2 hardening"],
  "docs/cacp-package-shape-draft.md": ["Package Shape Draft", "cacp validate", "Publishing blockers"],
  "docs/cacp-release-roadmap.md": ["v0.1", "v0.2", "community-ai-collaboration-protocol"],
  "docs/cacp-extraction-plan.md": ["Extraction readiness checklist", "first reference implementation", "validate-cacp-chain-coverage"],
  "docs/cacp-changelog.md": ["v0.1 draft", "CommunityActorCard", "workflow export"],
  "docs/cacp-release-checklist.md": ["npm.cmd run check", "pilot readiness", "synthetic"],
  "docs/novus-analytics-integration.md": ["VITE_PENDO_API_KEY", "Novus.ai", "fictional_or_synthetic_only"],
  "docs/community-task-contract.md": ["interaction_mode", "privacy_boundary", "trust_signal"],
  "docs/cacp-lifecycle-artifacts-evidence.md": ["CommunityTaskTransition", "CommunityArtifact", "CommunityEvidence"],
  "docs/cacp-pilot-readiness-checklist.md": ["consent", "human handoff", "public_demo_only"],
  "docs/physical-ai-community-roadmap.md": ["can collaborate", "Community Task Contract", "Synthetic Community Simulator"],
  "docs/physical-ai-social-layer.md": ["social operating layer", "Trust and Acceptance Metrics", "Task Contract Direction"],
  "docs/project-summary.md": ["13 POIs", "seven-step", "Community Pulse"],
  "docs/devpost-world-product-day-submission.md": ["World Product Day", "Novus.ai", "Devpost"],
  "docs/hackathon-submission-strategy.md": ["CACP", "synthetic-only", "event window"],
  "docs/demo-qa-checklist.md": ["npm.cmd run check", "Pulse lifecycle", "mobile"],
  "docs/demo-recording-guide.md": ["127.0.0.1:5173", "seven-step", "synthetic"]
};

const errors = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
    errors.push(`Missing or empty project artifact: ${file}`);
  }
}

for (const [file, [collection, expected]] of Object.entries(expectedCounts)) {
  const payload = JSON.parse(fs.readFileSync(file, "utf8"));
  const actual = payload[collection]?.length;
  if (actual !== expected) errors.push(`${file} expected ${expected} ${collection}, found ${actual}`);
}

const profiles = JSON.parse(fs.readFileSync("data/sample-pulses.json", "utf8")).resident_profiles?.length;
if (profiles !== 3) errors.push(`data/sample-pulses.json expected 3 resident profiles, found ${profiles}`);

for (const [file, markers] of Object.entries(requiredDocumentMarkers)) {
  const content = fs.readFileSync(file, "utf8");
  for (const marker of markers) {
    if (!content.toLowerCase().includes(marker.toLowerCase())) {
      errors.push(`${file} is missing project marker: ${marker}`);
    }
  }
}

const distHtml = fs.readFileSync("dist/index.html", "utf8");
const assetPaths = [...distHtml.matchAll(/(?:src|href)="\/(?:community-spirit\/(?:dist\/)?)?(assets\/[^"]+)"/g)].map((match) => match[1]);
if (assetPaths.length < 2) errors.push("dist/index.html must reference built JavaScript and CSS assets");
for (const assetPath of assetPaths) {
  if (!fs.existsSync(path.normalize(path.join("dist", assetPath)))) {
    errors.push(`Missing built asset referenced by dist/index.html: ${assetPath}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  "Validated project package: 13 POIs, 8 routes, 9 tasks, 4 activities, " +
  "3 pulses, 3 profiles, 3 seasons, 3 benefits, required docs, and production assets."
);
