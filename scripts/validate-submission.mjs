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
  "pitch/demo-script.md",
  "docs/protocol-design.md",
  "docs/community-task-contract.md",
  "docs/physical-ai-community-roadmap.md",
  "docs/physical-ai-social-layer.md",
  "docs/project-summary.md",
  "schemas/community-task-contract.schema.json",
  "examples/contracts/evening-basketball-social-pulse.json",
  "examples/contracts/elder-friendly-walking-helper.json",
  "examples/contracts/robot-fire-passage-patrol.json",
  "docs/demo-qa-checklist.md",
  "docs/demo-recording-guide.md",
  "dist/index.html"
];

const requiredDocumentMarkers = {
  "README.md": ["Community Pulse", "Seven-step guided demo controller", "fictional or synthetic"],
  "PROJECT.md": ["Community Life RPG", "Spirit Points", "fictional or synthetic"],
  "pitch/demo-script.md": ["Run next step", "resident benefit pass", "World Ops"],
  "docs/protocol-design.md": ["CACP", "MCP", "A2A"],
  "docs/community-task-contract.md": ["interaction_mode", "privacy_boundary", "trust_signal"],
  "docs/physical-ai-community-roadmap.md": ["can collaborate", "Community Task Contract", "Synthetic Community Simulator"],
  "docs/physical-ai-social-layer.md": ["social operating layer", "Trust and Acceptance Metrics", "Task Contract Direction"],
  "docs/project-summary.md": ["13 POIs", "seven-step", "Community Pulse"],
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
const assetPaths = [...distHtml.matchAll(/(?:src|href)="\/(assets\/[^"]+)"/g)].map((match) => match[1]);
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
