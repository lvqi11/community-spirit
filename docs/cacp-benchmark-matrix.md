# CACP Benchmark Matrix

This document records how CACP should learn from high-quality protocol and specification repositories without copying their domain assumptions.

The goal is not to make Community Spirit look like a large foundation project overnight. The goal is to borrow proven engineering shape: clear spec entry, examples, validators, community files, and version discipline.

## Reference pool

| Project | What to inspect | Pattern CACP should borrow |
| --- | --- | --- |
| MCP | Main spec, schema/docs split, capability framing, SDK/reference implementation relationship | Keep one clear spec entry and separate protocol concepts from product demo behavior. |
| A2A | Agent cards, tasks, artifacts, lifecycle semantics, examples | Treat actor capability discovery, task lifecycle, artifacts, and evidence as first-class protocol objects. |
| OpenAPI Specification | Versioned spec, normative language, examples, compatibility expectations | Make schema versions explicit and avoid promising v1 stability before the object model settles. |
| AsyncAPI Spec | Event/message-oriented examples and documentation structure | Keep handoff bundles understandable through concrete examples, not only abstract schemas. |
| OpenTelemetry Specification | Status labels, signal separation, compatibility notes, governance habits | Mark CACP as draft, separate stable ideas from experimental ones, and keep a changelog. |
| GitHub Community Profile | README, contributing, security, code of conduct, issue/PR templates | Make the repo welcoming and safe to review while keeping synthetic-data boundaries obvious. |
| OpenSSF Scorecard | CI, security policy, maintained status, dependency hygiene, reviewability | Use automated checks and explicit policies as quality signals. |

## Current CACP posture

| Area | Current state | Next quality bar |
| --- | --- | --- |
| Spec entry | `docs/cacp-spec-v0.1.md` exists as consolidated draft. | Keep it short enough to read, but complete enough to explain every schema object. |
| Design rationale | `docs/protocol-design.md` explains CACP vs MCP/A2A. | Keep rationale separate from normative object definitions. |
| Schemas | Task contract, actor card, transition, artifact, evidence, workflow bundle, pilot readiness. | Add more examples before widening schemas. |
| Examples | Three contracts, three transitions, three artifacts/evidence records, one workflow bundle, one pilot readiness checklist. | Each core task type should have the full chain from actor to pilot readiness. |
| Validators | `npm.cmd run validate:protocol` checks cross-references and public-demo safety. | Error output should guide contributors toward the broken reference and the likely fix. |
| Reference UI | Task Contract View and Contract Evidence View are visible in the React demo. | Add pilot readiness visibility so reviewers see why examples remain `public_demo_only`. |
| Community files | Contributing, security, issue templates, PR template, CI, Pages, MIT license already exist. | Add CACP-specific contribution rules, code of conduct, changelog, and release checklist. |
| Release posture | v0.1 draft inside `community-spirit`. | State v0.1/v0.2/v0.3 route before extracting a separate repo. |

## Borrowed project-shape decisions

1. **One canonical spec entry**
   - CACP uses `docs/cacp-spec-v0.1.md` as the current entry point.
   - Topic docs remain useful, but should not compete with the spec.

2. **Examples are part of the protocol**
   - A schema without examples is too abstract for community tasks.
   - Every important CACP object should be represented by at least one synthetic example.

3. **Validators are developer experience**
   - Validators should not only fail; they should say what failed and how to fix it.
   - `npm.cmd run check` remains the one command for reviewers.

4. **Reference implementation stays connected**
   - Community Spirit proves the protocol through UI and export behavior.
   - CACP should not be extracted until the reference flow is understandable without private context.

5. **Synthetic boundary is a feature**
   - Public examples must not contain real residents, unit numbers, access tokens, camera payloads, sensor payloads, payment data, or robot logs.
   - Real pilot readiness is represented as a checklist, not implied by demo data.

## Search and review workflow

When evaluating a new benchmark repo, inspect only these six things first:

1. README first screen.
2. Spec entry point.
3. Schema and example organization.
4. Validator or test command.
5. Community health files.
6. Version and release strategy.

If a project cannot improve one of those six areas for CACP, do not spend time copying its structure.

## Immediate CACP quality roadmap

1. Expand examples so basketball, elder-helper, and robot patrol each have:
   - actor card references;
   - task contract;
   - lifecycle transition;
   - artifact;
   - evidence;
   - workflow protocol bundle;
   - pilot readiness checklist.
2. Add pilot readiness to the reference UI.
3. Improve validator error messages with repair hints.
4. Add CACP changelog and release checklist.
5. Update contribution/security docs with CACP-specific synthetic-data rules.
