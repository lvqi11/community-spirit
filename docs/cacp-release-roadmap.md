# CACP Release Roadmap

CACP should stay inside `community-spirit` until the object model is stable enough to stand alone.

## v0.1: Draft inside Community Spirit

Status: current.

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

Target:

- at least three full protocol chains:
  - resident social task;
  - elder-friendly helper task;
  - robot/operator task;
- AI-agent proposal scenario coverage;
- clearer validator diagnostics;
- a single CACP validator CLI entry;
- visible pilot readiness in the reference UI;
- CACP-specific GitHub contribution and release process.
- schema surface review and package-shape draft.

Exit criteria:

- `npm.cmd run check` validates all full chains;
- `node scripts\validate-cacp.mjs` validates the CACP capsule without reading the package script chain;
- README and spec explain the protocol without requiring Devpost context;
- public examples remain synthetic-only.

## v0.3: Package-shaped protocol capsule

Target:

- prepare a package-like folder or publishable artifact for schemas and validators;
- document CLI usage for protocol validation;
- draft extracted repo layout and standalone README shape;
- add more extension examples;
- write an extraction checklist for a future independent repo.

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
