# CACP Release Roadmap

CACP should stay inside `community-spirit` until the object model is stable enough to stand alone.

## Current snapshot

Status: post-v0.2 hardening, moving toward v0.3 package shape.

As of `a887c08`, CACP validates:

- 5 community actor cards;
- 6 full synthetic task-contract chains;
- lifecycle transitions, artifacts, evidence, workflow export bundles, and pilot-readiness checklists for every contract;
- 6 registered extensions;
- portable extraction dry-run with no Community Spirit coupling findings inside the portable-core audit surface.

The newest full chain is:

```text
ctc-shared-garden-maintenance-notice-update
```

This gives `public-notice` a fourth scenario family:

- AI-agent proposal reviewed by an operator;
- elder-friendly helper coordination;
- resident-facing property operation notice before scheduling review.
- resident-facing property operation notice update before scheduling review continues.

`public-notice` is now the strongest core candidate, but it should remain an extension until timing fields and evidence facts stabilize.

## v0.1: Draft inside Community Spirit

Status: achieved.

Scope:

- consolidated spec draft;
- synthetic examples;
- JSON schemas;
- protocol validators;
- reference UI in Community Spirit;
- workflow export bundle;
- pilot readiness checklist.

Promise:

- useful for review, demos, and protocol discussion;
- not stable for production deployment;
- not a claim of real-world pilot approval.

## v0.2: Example and validator hardening

Status: achieved in the current repo state.

Achieved scope:

- at least six full protocol chains:
  - resident social task;
  - elder-friendly helper task;
  - robot/operator task;
  - AI-agent proposal scenario;
  - resident-facing property operation notice;
  - resident-facing property operation notice update;
- AI-agent proposal scenario coverage;
- clearer validator diagnostics;
- a single CACP validator CLI entry;
- visible pilot readiness in the reference UI;
- CACP-specific GitHub contribution and release process;
- schema surface review and package-shape draft.

Exit criteria:

- `npm.cmd run check` validates all full chains;
- `node scripts\validate-cacp.mjs` validates the CACP capsule without reading the package script chain;
- README and spec explain the protocol without requiring Devpost context;
- public examples remain synthetic-only.

## v0.3: Package-shaped protocol capsule

Status: in progress.

Target:

- prepare a package-like folder or publishable artifact for schemas and validators;
- document CLI usage for protocol validation;
- draft extracted repo layout and standalone README shape;
- add more extension examples and decide which concepts deserve core proposals;
- write an extraction checklist for a future independent repo.

Near-term v0.3 work:

- update public-notice from "coverage gap" to "core-candidate decision path";
- add a notice-update, pause, cancellation, or incident-review scenario before adding more validator rules;
- make validator diagnostics more contributor-friendly;
- keep README and spec clear enough for readers who did not come from Devpost;
- keep the portable extraction dry-run green while avoiding premature repo split.

Possible package surfaces:

- schema bundle;
- validator CLI;
- example corpus;
- reference UI snippets.

v0.3 draft assets now include:

- `docs/cacp-cli-contract-draft.md`
- `docs/cacp-extracted-repo-layout-draft.md`
- `docs/cacp-repo-readme-draft.md`
- `docs/cacp-versioning-and-compatibility-draft.md`
- `docs/cacp-extension-governance-draft.md`
- `docs/cacp-extension-coverage-matrix.md`
- `docs/cacp-public-notice-semantics-draft.md`
- `docs/cacp-public-notice-core-candidate-decision.md`
- `examples/extensions/registry.json`

## v1.0: Not yet promised

CACP should not claim v1.0 stability until:

- object names are stable;
- schema compatibility rules are written;
- multiple partner-style scenarios are represented;
- pilot readiness has been reviewed with real-world operators or domain experts;
- Community Spirit can be cited as an external reference implementation.

## Future independent repo trigger

Only consider extracting `community-ai-collaboration-protocol` when:

- `docs/cacp-spec-v0.1.md` is self-contained;
- examples cover resident, operator, AI-agent, robot, and mixed actor cases;
- validators are easy to run outside Community Spirit;
- contribution and security policies are CACP-specific;
- Community Spirit can link to CACP rather than define it inline.
