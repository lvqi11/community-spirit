import { spawnSync } from "node:child_process";

const validators = [
  "scripts/validate-contracts.mjs",
  "scripts/validate-cacp-lifecycle.mjs",
  "scripts/validate-cacp-workflow-export.mjs",
  "scripts/validate-cacp-pilot-readiness.mjs",
  "scripts/validate-cacp-manifest.mjs",
  "scripts/validate-cacp-chain-coverage.mjs",
  "scripts/validate-cacp-portable-extraction.mjs"
];

for (const validator of validators) {
  const result = spawnSync(process.execPath, [validator], {
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) {
    console.error(`CACP validator failed: ${validator}`);
    console.error("Troubleshooting: docs/cacp-validator-troubleshooting.md");
    process.exit(result.status ?? 1);
  }
}

console.log(`Validated CACP protocol capsule with ${validators.length} validator stages.`);
