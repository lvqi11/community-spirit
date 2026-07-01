# CACP Pilot Readiness Checklist

The public Community Spirit prototype is synthetic. It does not operate a real community, does not connect to locks, cameras, sensors, payments, or robots, and does not include real residents.

The pilot readiness checklist exists for the next stage: deciding what must be true before a CACP task contract can move from demo context toward a real-world pilot.

## Why this exists

CACP is not only a task format. It is a community handoff protocol for people, places, operators, AI agents, and future robots.

Before a task becomes real, the project needs a governance gate for:

- consent or lawful resident notice;
- operator approval;
- privacy boundary;
- data minimization;
- audit log;
- human handoff;
- manual stop;
- incident review;
- data retention;
- fallback owner;
- physical safety review.

The checklist makes those gates explicit and machine-checkable.

For the current `public-notice` extension, see `docs/cacp-public-notice-semantics-draft.md`.

## Readiness levels

`public_demo_only`

The task can be shown in the public prototype with fictional or synthetic data. It must not claim real-world approval, consent, or deployment readiness.

`pilot_candidate`

The task may be ready for partner review, but must not begin operation until all real-world gates are satisfied.

`pilot_ready`

The task has satisfied every required real-world governance gate, including consent or notice, operator approval, privacy, audit, handoff, incident, retention, and physical safety rules.

The current repository only includes a `public_demo_only` example.

## Current machine-readable assets

```text
schemas/cacp-pilot-readiness-checklist.schema.json
examples/pilot-readiness/robot-fire-passage-patrol.json
scripts/validate-cacp-pilot-readiness.mjs
```

Run:

```powershell
npm.cmd run validate:protocol
```

## Validator rules

The validator checks:

- the checklist references a known `CommunityTaskContract`;
- the reviewer is a known `CommunityActorCard`;
- all required governance gates are present;
- gate evidence and artifacts reference known synthetic examples;
- evidence and artifacts belong to the same contract;
- public examples remain `fictional_or_synthetic_only`;
- public examples do not contain sensitive keys such as unit numbers, access tokens, raw video payloads, or sensor payloads;
- robot contracts cannot skip manual stop or physical safety review;
- contracts that require resident notice cannot mark the resident-notice gate as not applicable;
- `public_demo_only` examples cannot claim real-world gates are already satisfied.

## Boundary for real pilots

A real pilot must be approved separately by the user and by the relevant community or property operator. It should add partner-specific authorization, consent or notice text, privacy review, retention policy, incident process, audit storage, and human oversight before any real-world data leaves a trusted environment.
