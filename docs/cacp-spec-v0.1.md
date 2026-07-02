# CACP Spec Draft v0.1

Working name:

```text
CACP: Community AI Collaboration Protocol
```

Status:

```text
Draft v0.1 inside Community Spirit
```

Community Spirit is the first reference implementation and demo scene for CACP. CACP is not yet a separate repository or package. The current goal is to make the protocol complete, testable, and understandable inside this repo before deciding whether to split it into an independent project.

## One-line definition

CACP is a community task-contract layer for coordinating people, places, operators, AI agents, and future robots before an action happens in a shared physical environment.

## Why CACP exists

Physical AI needs more than maps, robot control, perception, or task planning.

Before an AI agent or future robot acts in a real community, someone must answer:

```text
What is the intent?
Where can it happen?
Who approved it?
Who must be notified?
What data is off-limits?
Who takes over if something is uncertain?
What evidence justifies the lifecycle change?
What artifact is produced?
Is this only demo-ready, or actually pilot-ready?
```

CACP turns those questions into structured, validated protocol objects.

## Relationship to MCP and A2A

```text
MCP connects models to tools and resources.
A2A connects agents to agents.
CACP connects people, places, operators, AI agents, and robots through community task contracts.
```

CACP should reuse useful protocol patterns from MCP and A2A:

- capability discovery before task assignment;
- explicit lifecycle state;
- human-in-the-loop approval;
- pause, cancel, fallback, and incident review;
- artifacts separated from messages;
- versioned schemas and examples;
- extension points instead of one closed app model.

CACP does not replace MCP or A2A. It adds the social, spatial, privacy, and governance layer needed before physical-AI tasks enter community life.

## Non-goals

CACP is not:

- a robot motion-control protocol;
- a SLAM, map, or world-model format;
- a smart-community dashboard;
- a property-management backend;
- a surveillance system;
- a claim that the public demo contains real residents, real property data, real robots, real sensors, real locks, or real payments.

The public reference implementation uses fictional or synthetic data only.

## Core object model

### CommunityActorCard

Declares what an actor can do before a task is assigned.

Examples:

- resident companion app;
- community operator console;
- future patrol robot;
- elder/helper pair.

Machine-readable assets:

```text
schemas/community-actor-card.schema.json
examples/actors/
scripts/validate-contracts.mjs
```

Schema surface notes: `docs/cacp-schema-surface-review.md`.

Key checks:

- actor type is explicit;
- capabilities are bounded;
- allowed and forbidden zones are declared;
- data boundaries are declared;
- human handoff, manual stop, and audit log support are present;
- robot actors require human approval and robot-assist interaction mode.

### CommunityTaskContract

Defines the social, spatial, privacy, and operational terms of a task before execution.

Machine-readable assets:

```text
schemas/community-task-contract.schema.json
examples/contracts/
docs/community-task-contract.md
```

Core fields:

```text
intent
place
actor
interaction_mode
permission
visibility
risk_level
resident_touch
privacy_boundary
fallback
feedback
lifecycle
artifacts
extensions
data_policy
```

### CommunityTaskTransition

Represents an explicit lifecycle state change.

Machine-readable assets:

```text
schemas/community-task-transition.schema.json
examples/transitions/
scripts/validate-cacp-lifecycle.mjs
```

Example transition:

```text
needs_operator_approval -> approved
```

Protected transitions require evidence. For example:

- leaving `needs_resident_notice` requires `resident_notice` evidence;
- entering `approved` when human review is required needs `operator_approval`;
- entering `scheduled` needs `schedule_confirmation`;
- entering `running` needs `task_start`;
- entering `completed` needs `task_completion`;
- entering `incident_review` needs `incident`.

### CommunityArtifact

Represents a bounded task output.

Examples:

- resident notice;
- approval record;
- schedule record;
- inspection report;
- incident report;
- robot-ready payload.

Machine-readable assets:

```text
schemas/community-artifact.schema.json
examples/artifacts/
```

Public examples must not contain personal data.

### CommunityEvidence

Represents the minimal audit-friendly facts needed to justify a lifecycle decision.

Examples:

- notice recorded;
- opt-out path available;
- operator approved;
- manual stop available;
- raw video storage disabled;
- schedule confirmed.

Machine-readable assets:

```text
schemas/community-evidence.schema.json
examples/evidence/
```

Evidence should not become a surveillance archive. It should point to artifacts and record only the facts required for a protocol decision.

### CACPWorkflowProtocolBundle

Represents the compact export bundle that travels with a workflow handoff.

Machine-readable assets:

```text
schemas/cacp-workflow-protocol-bundle.schema.json
examples/exports/robot-fire-passage-patrol.json
scripts/validate-cacp-workflow-export.mjs
docs/workflow-export-contract.md
```

The bundle includes:

- selected contract lifecycle;
- referenced actor summaries;
- transitions;
- evidence;
- artifacts;
- public-demo safety boundary.

This lets an operator, AI agent, or future robot SDK receive not only route/task data, but also the protocol context explaining why the handoff is allowed.

### CACPPilotReadinessChecklist

Represents the governance gate before a task can move beyond a public demo.

Machine-readable assets:

```text
schemas/cacp-pilot-readiness-checklist.schema.json
examples/pilot-readiness/
scripts/validate-cacp-pilot-readiness.mjs
docs/cacp-pilot-readiness-checklist.md
```

Readiness levels:

```text
public_demo_only
pilot_candidate
pilot_ready
```

Current examples are `public_demo_only`. They demonstrate the governance shape without claiming real-world approval.

Required gates include:

- consent;
- operator approval;
- resident notice;
- privacy boundary;
- data minimization;
- audit log;
- human handoff;
- manual stop;
- incident review;
- data retention;
- fallback owner;
- physical safety review.

## Lifecycle state machine

Current draft states:

```text
draft
proposed
needs_resident_notice
needs_operator_approval
approved
scheduled
running
paused
input_required
auth_required
completed
rejected
canceled
failed
incident_review
```

The validator rejects illegal jumps and checks protected transitions against required evidence.

Terminal states such as `completed`, `rejected`, and `canceled` cannot silently return to execution.

## Reference implementation

Community Spirit currently implements CACP as:

- protocol docs;
- JSON schemas;
- 7 full synthetic example chains;
- Node validators;
- visible Task Contract View;
- visible Contract Evidence View;
- workflow JSON export with `cacp_protocol_bundle`;
- pilot readiness checklist.

Current example coverage:

- resident social task;
- elder-friendly helper task;
- robot/operator patrol task;
- AI-agent proposal review;
- resident-facing property operation notice;
- resident-facing property operation notice update;
- resident-facing property operation notice failure with incident review.

Community Spirit remains the product and demo environment. CACP is the protocol layer that can later be extracted into its own project.

Portable extracted-repo planning:

- `docs/cacp-repo-readme-draft.md`
- `docs/cacp-context-fixture-contract.md`
- `docs/cacp-cli-contract-draft.md`
- `docs/cacp-extracted-repo-layout-draft.md`
- `docs/cacp-versioning-and-compatibility-draft.md`
- `docs/cacp-extension-governance-draft.md`
- `docs/cacp-public-notice-timing-model-review.md`
- `docs/cacp-incident-review-extension-decision.md`

## Validation

Run:

```powershell
npm.cmd run validate:protocol
```

This currently validates:

- actor cards and task contracts;
- lifecycle transitions, artifacts, and evidence;
- workflow handoff bundles;
- pilot readiness checklists;
- extension registry coverage;
- manifest references;
- full-chain coverage;
- portable extraction dry-run.

The aggregate validator prints focused stages and re-run commands, for example:

```text
Running CACP validator 2/7: lifecycle transitions, artifacts, evidence, public-notice, and incident-review boundaries
Focused command: node scripts/validate-cacp-lifecycle.mjs
```

Troubleshooting guide: `docs/cacp-validator-troubleshooting.md`.

Full project check:

```powershell
npm.cmd run check
```

## Public demo safety boundary

The public reference implementation must remain:

```text
fictional_or_synthetic_only
```

It must not include:

- real residents;
- real unit numbers;
- real access-control tokens;
- real lock integrations;
- real camera feeds;
- raw video payloads;
- real sensor payloads;
- real payment data;
- real robot operation logs;
- real private property maps.

Real pilots require separate user approval, community/operator approval, consent or lawful notice, privacy review, audit logging, human oversight, incident handling, and retention policies.

## Path to an independent CACP project

CACP should become independent only after the draft is stable enough that it can stand without the Community Spirit demo.

Suggested extraction path:

1. Keep CACP inside `community-spirit` while the reference implementation evolves.
2. Stabilize schema names, object semantics, validator behavior, and example coverage.
3. Add more synthetic examples for resident, operator, AI-agent, robot, and mixed actor tasks.
4. Publish CACP docs as a clear protocol draft.
5. Only then consider a separate repository such as `community-ai-collaboration-protocol`.

When extracted, Community Spirit should remain the first reference implementation.

Package-shape draft: `docs/cacp-package-shape-draft.md`.
CLI contract draft: `docs/cacp-cli-contract-draft.md`.
Extracted repo layout draft: `docs/cacp-extracted-repo-layout-draft.md`.
Versioning and compatibility draft: `docs/cacp-versioning-and-compatibility-draft.md`.
Extension governance draft: `docs/cacp-extension-governance-draft.md`.
Extension registry: `examples/extensions/registry.json`.
Public-notice timing review: `docs/cacp-public-notice-timing-model-review.md`.
Incident-review extension decision: `docs/cacp-incident-review-extension-decision.md`.
