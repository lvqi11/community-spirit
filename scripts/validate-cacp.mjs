import { spawnSync } from "node:child_process";

const validators = [
  {
    script: "scripts/validate-contracts.mjs",
    label: "contract, actor, context, and extension registry references"
  },
  {
    script: "scripts/validate-cacp-lifecycle.mjs",
    label: "lifecycle transitions, artifacts, evidence, public-notice, and incident-review boundaries"
  },
  {
    script: "scripts/validate-cacp-workflow-export.mjs",
    label: "workflow export protocol bundles"
  },
  {
    script: "scripts/validate-cacp-pilot-readiness.mjs",
    label: "pilot readiness governance gates"
  },
  {
    script: "scripts/validate-cacp-manifest.mjs",
    label: "manifest references"
  },
  {
    script: "scripts/validate-cacp-chain-coverage.mjs",
    label: "full-chain coverage"
  },
  {
    script: "scripts/validate-cacp-portable-extraction.mjs",
    label: "portable extraction dry-run"
  }
];

for (const [index, validator] of validators.entries()) {
  console.log(`Running CACP validator ${index + 1}/${validators.length}: ${validator.label}`);
  console.log(`Focused command: node ${validator.script}`);

  const result = spawnSync(process.execPath, [validator.script], {
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) {
    console.error(`CACP validator failed: ${validator.script}`);
    console.error(`Failed stage: ${validator.label}`);
    console.error(`Re-run focused command: node ${validator.script}`);
    console.error("Troubleshooting: docs/cacp-validator-troubleshooting.md");
    process.exit(result.status ?? 1);
  }
}

console.log(`Validated CACP protocol capsule with ${validators.length} validator stages.`);
