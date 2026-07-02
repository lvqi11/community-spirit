# CACP Release Checklist

Use this checklist before describing a CACP draft as release-ready.

## Required checks

- [ ] `npm.cmd run check` passes.
- [ ] `node scripts\validate-cacp.mjs` passes and prints the focused 7-stage validator sequence.
- [ ] `node scripts\validate-cacp-portable-extraction.mjs` passes.
- [ ] Portable extraction output still reports 49 portable core files, 9 portable example groups, and 3 reference UI files, or this checklist is updated with the new expected count.
- [ ] `docs/cacp-spec-v0.1.md` describes every protocol object touched by the change.
- [ ] README and `docs/cacp-spec-v0.1.md` still describe the current full-chain count, extension decisions, validator path, and synthetic-only boundary.
- [ ] `docs/cacp-repo-readme-draft.md` still explains CACP as a standalone protocol without React app assumptions.
- [ ] `docs/cacp-context-fixture-contract.md` still matches how `examples/context/community-reference-context.json` is used.
- [ ] `docs/cacp-cli-contract-draft.md` still matches the validator stage names and intended command surface.
- [ ] `docs/cacp-package-shape-draft.md` still matches the intended future package contents and non-publishing boundary.
- [ ] `docs/cacp-extracted-repo-layout-draft.md` still matches the intended portable-core folder shape.
- [ ] `docs/cacp-versioning-and-compatibility-draft.md` still matches the actual breaking-change and version-bump discipline.
- [ ] `docs/cacp-extension-governance-draft.md` still matches the extension URI shape and core-vs-extension boundary.
- [ ] `examples/extensions/registry.json` lists every extension URI used by public contract examples.
- [ ] `docs/cacp-extension-coverage-matrix.md` still matches the extension registry and example coverage.
- [ ] `docs/cacp-public-notice-semantics-draft.md` still matches public-notice examples, evidence, and pilot-readiness gates.
- [ ] `docs/cacp-public-notice-core-candidate-decision.md` and `docs/cacp-public-notice-timing-model-review.md` still match the public-notice core-candidate decision.
- [ ] `docs/cacp-incident-review-extension-decision.md` still matches incident-review extension coverage and validator behavior.
- [ ] `docs/cacp-new-contributor-walkthrough.md` and `CONTRIBUTING.md` still describe the smallest safe full-chain contribution path.
- [ ] `docs/cacp-changelog.md` is updated.
- [ ] All new public examples are fictional or synthetic.
- [ ] No real residents, unit numbers, access tokens, raw video, sensor payloads, payment data, or real robot logs are included.
- [ ] Every new contract has matching actor capability coverage.
- [ ] Every new contract has a full chain: contract, transition, artifact, evidence, workflow export bundle, and pilot readiness checklist.
- [ ] Every protected lifecycle transition has required evidence.
- [ ] Direct resident-touch public-notice examples include resident notice evidence and a resident notice artifact.
- [ ] `incident_review` transitions include incident evidence.
- [ ] Workflow export bundles reference known actors, transitions, evidence, and artifacts.
- [ ] Pilot readiness examples stay `public_demo_only` unless real-world gates are actually satisfied outside the demo.

## Review notes

Reviewers should treat CACP as a protocol draft and Community Spirit as the first reference implementation. The release should make both easier to understand without implying that the public demo is a real-world deployment.
