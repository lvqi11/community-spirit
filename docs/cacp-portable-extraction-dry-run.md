# CACP Portable Extraction Dry-Run

This document defines a read-only dry-run for the future moment when CACP moves from the `community-spirit` monorepo-style capsule into its own protocol repository or package.

Current verdict:

```text
portable-core inventory is present, but extraction still has tracked Community Spirit couplings
```

The goal is not to split the repo today. The goal is to prove that we can name the smallest portable CACP surface, keep it synthetic-only, and identify which remaining dependencies still belong to the Community Spirit reference implementation.

## Dry-run command

```powershell
node scripts\validate-cacp-portable-extraction.mjs
```

This validator is read-only. It does not copy files, move directories, rewrite paths, or create a second repo. It only checks the current tree and reports which assets already form the future CACP portable core.

## Future extracted shape

Possible future repository or package name:

```text
community-ai-collaboration-protocol
```

The future extracted protocol surface should be described as:

```text
CACP core = spec + schemas + examples + validators + manifest + developer docs
Community Spirit = first reference implementation
```

## Portable CACP core

These assets should move together when extraction becomes appropriate.

| Portable area | Current location inside `community-spirit` | Why it belongs to CACP core |
| --- | --- | --- |
| Manifest | `cacp.manifest.json` | Declares the portable protocol surface. |
| Main spec | `docs/cacp-spec-v0.1.md` | Defines the protocol entry point and object model. |
| Design rationale | `docs/protocol-design.md` | Explains why the protocol exists and what it is optimizing for. |
| Topical spec docs | `docs/community-task-contract.md`, `docs/cacp-lifecycle-artifacts-evidence.md`, `docs/workflow-export-contract.md`, `docs/cacp-pilot-readiness-checklist.md` | Explain contract semantics, lifecycle artifacts, workflow handoff, and pilot gating. |
| Extraction / hardening docs | `docs/cacp-extraction-plan.md`, `docs/cacp-independence-audit.md`, `docs/cacp-schema-surface-review.md`, `docs/cacp-package-shape-draft.md`, `docs/cacp-portable-extraction-dry-run.md`, `docs/cacp-cli-contract-draft.md`, `docs/cacp-extracted-repo-layout-draft.md`, `docs/cacp-versioning-and-compatibility-draft.md`, `docs/cacp-extension-governance-draft.md` | Keep extraction criteria explicit and auditable. |
| Developer docs | `docs/cacp-developer-guide.md`, `docs/cacp-new-contributor-walkthrough.md`, `docs/cacp-validator-troubleshooting.md`, `docs/cacp-context-fixture-contract.md`, `docs/cacp-repo-readme-draft.md` | Make the protocol understandable without React app context. |
| Release / governance docs | `docs/cacp-benchmark-matrix.md`, `docs/cacp-release-roadmap.md`, `docs/cacp-changelog.md`, `docs/cacp-release-checklist.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md` | Give the protocol repo a credible project shell. |
| Schemas | `schemas/` | Provide the machine-readable contract surface. |
| Examples | `examples/context`, `examples/extensions`, `examples/actors`, `examples/contracts`, `examples/transitions`, `examples/artifacts`, `examples/evidence`, `examples/exports`, `examples/pilot-readiness` | Provide synthetic-only reference chains, extension registry, and the minimal place context needed by portable validators. |
| Validators | `scripts/validate-contracts.mjs`, `scripts/validate-cacp-lifecycle.mjs`, `scripts/validate-cacp-workflow-export.mjs`, `scripts/validate-cacp-pilot-readiness.mjs`, `scripts/validate-cacp-manifest.mjs`, `scripts/validate-cacp-chain-coverage.mjs`, `scripts/validate-cacp-portable-extraction.mjs`, `scripts/validate-cacp.mjs` | Keep the protocol runnable and reviewable without product UI. |

## Community Spirit reference implementation

These assets should stay in `community-spirit` even after CACP is extracted.

| Reference implementation area | Current location | Why it stays with Community Spirit |
| --- | --- | --- |
| React reference UI | `src/components/TaskContractView.jsx`, `src/components/TaskDetails.jsx`, `src/components/PropertyDashboard.jsx` | Shows how the protocol can be visualized, but is not the protocol itself. |
| Product demo flows | `src/`, `dist/`, `demo/` | Demonstrate the community life RPG product experience. |
| Demo media | `assets/`, `reports/video-assets/` | Support hackathon, pitch, and presentation storytelling. |
| Product fixture universe | `data/sample-*.json` | Still powers the Community Spirit product demo, but no longer blocks portable CACP contract validation. |

## Current dry-run findings

The read-only validator should currently confirm these outcomes:

1. contract validation now depends on `examples/context/community-reference-context.json` instead of `data/sample-*`;
2. workflow handoff docs now describe portable context fixtures instead of product-only data files;
3. `cacp.manifest.json.reference_ui` still intentionally points at Community Spirit React files and should remain a reference-implementation section, not a portable-core requirement.

This is the desired state for the current strategy:

```text
do not split the repo yet
```

Remaining reference-implementation links should stay explicit rather than hidden.

## Next hardening targets

1. Keep the portable context fixture minimal and stable as new scenarios are added.
2. Reduce top-level spec docs that still require Community Spirit file paths to explain protocol semantics.
3. Keep the extracted-repo README draft and context-fixture contract aligned with real validator behavior.
4. Keep examples synthetic-only while broadening AI-agent and operator edge cases.

## Extraction gate

Do not split into `community-ai-collaboration-protocol` until:

- `node scripts\validate-cacp-portable-extraction.mjs` passes with no unexpected missing core assets;
- the remaining Community Spirit couplings are intentional, documented, and decreasing;
- protocol validators can run after copying only manifest, docs, schemas, examples, and validator scripts;
- external readers can understand CACP as a protocol project before they ever open the app UI.
