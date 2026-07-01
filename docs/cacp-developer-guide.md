# CACP Developer Guide

This guide is for contributors who want to improve CACP inside Community Spirit before it becomes a separate protocol repository.

## Start here

Read these files in order:

1. `docs/cacp-spec-v0.1.md`
2. `cacp.manifest.json`
3. `docs/cacp-benchmark-matrix.md`
4. `docs/cacp-new-contributor-walkthrough.md`
5. `docs/cacp-context-fixture-contract.md`
6. `docs/cacp-cli-contract-draft.md`
7. `docs/cacp-versioning-and-compatibility-draft.md`
8. `docs/cacp-extension-governance-draft.md`
9. `docs/cacp-release-checklist.md`

Then run:

```powershell
npm.cmd run check
```

## How to add a new CACP scenario

A complete scenario should include:

1. a matching place context in `examples/context/community-reference-context.json` if the scenario needs new `poi`, `route`, `task`, or `activity` ids;
2. a matching actor card in `examples/actors/` if no existing actor fits;
3. a task contract in `examples/contracts/`;
4. lifecycle transition records in `examples/transitions/`;
5. bounded task outputs in `examples/artifacts/`;
6. minimal audit facts in `examples/evidence/`;
7. a handoff bundle in `examples/exports/`;
8. a pilot readiness checklist in `examples/pilot-readiness/`;
9. UI visibility through the selected task's `TaskContractView`.

If the task contract uses a new extension URI, add it to `examples/extensions/registry.json` and keep it aligned with `docs/cacp-extension-governance-draft.md`.

Do not add a schema field only because one scenario wants it. Prefer extending examples first. Schema changes should happen only when the object model clearly needs a new stable concept.

## Validator workflow

Use the one-command path:

```powershell
npm.cmd run validate:protocol
```

Or run the CACP-only validator entry directly:

```powershell
node scripts\validate-cacp.mjs
```

The protocol validator chain checks:

- the portable CACP reference context fixture;
- actor cards and task contracts;
- lifecycle transitions, artifacts, and evidence;
- workflow handoff bundles;
- pilot readiness gates;
- manifest references.
- full-chain coverage for every contract.

If validation fails, fix the first broken reference or safety-boundary error before adding more examples.

For common failures and repair loops, see `docs/cacp-validator-troubleshooting.md`.

For the future standalone-repo framing, see `docs/cacp-repo-readme-draft.md`.
For the future command surface, see `docs/cacp-cli-contract-draft.md` and `docs/cacp-extracted-repo-layout-draft.md`.
For breaking-change discipline, see `docs/cacp-versioning-and-compatibility-draft.md`.
For extension naming and promotion rules, see `docs/cacp-extension-governance-draft.md`.

## Reference UI workflow

The reference UI should answer five reviewer questions:

- What is the contract?
- Which lifecycle step is current or next?
- Which evidence justifies the transition?
- Which artifact was produced?
- Why is the task still `public_demo_only` before a real pilot?

Avoid adding visual complexity unless it improves one of those answers.

## Safety rules

All public examples must remain `fictional_or_synthetic_only`.

Do not include:

- real resident names or profiles;
- unit numbers;
- phone numbers;
- access-control tokens;
- camera or sensor payloads;
- raw video;
- payment data;
- real robot operation logs;
- private property maps.

Real pilots require separate user approval, operator approval, consent or lawful notice, privacy review, audit logging, human oversight, incident handling, and retention policy.

## Extraction rule

Do not extract CACP into a separate repo until:

- the manifest is complete;
- at least three full protocol chains validate;
- the spec is self-contained;
- validators can run outside Community Spirit with minimal changes;
- a standalone repo README and context-fixture contract make the protocol understandable without the React app;
- Community Spirit can remain the first reference implementation.
