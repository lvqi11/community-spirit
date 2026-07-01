# CACP Lifecycle, Artifacts, and Evidence

CACP separates four concerns that are easy to mix together:

```text
CommunityTaskContract = what is agreed
CommunityTaskTransition = what state change is requested
CommunityArtifact = what the task produces
CommunityEvidence = the minimum facts that justify or audit the change
```

The public reference implementation uses fictional or synthetic records only.

## Lifecycle Transition Validator

The validator treats lifecycle changes as explicit protocol events. It checks:

- the `from_state -> to_state` pair is part of the canonical state machine;
- the contract exists and, when the transition starts at its current state, declares the destination in `allowed_next_states`;
- the requesting actor exists;
- linked artifacts and evidence belong to the same contract;
- evidence was recorded before the transition;
- protected transitions include the required evidence type.

Protected transitions currently include:

| Transition condition | Required evidence |
| --- | --- |
| Leaving `needs_resident_notice` | `resident_notice` |
| Entering `approved` when human review is required | `operator_approval` |
| Entering `scheduled` | `schedule_confirmation` |
| Entering `running` | `task_start` |
| Entering `completed` | `task_completion` |
| Entering `incident_review` | `incident` |

Terminal states such as `completed`, `rejected`, and `canceled` cannot silently return to execution.

Public notice timing notes live in `docs/cacp-public-notice-semantics-draft.md`.

## CommunityArtifact

An artifact is a bounded task output, such as a notice, approval record, schedule, inspection report, benefit pass, incident report, or robot-ready payload.

The schema records:

- which contract produced it;
- which actor created it;
- who may see it;
- whether it contains personal data;
- how long it should be retained;
- a human-readable summary.

Public examples must set `contains_personal_data` to `false`.

## CommunityEvidence

Evidence is a smaller, audit-friendly fact record. It should prove only what a lifecycle decision needs, without becoming a surveillance archive.

Examples include:

- resident notice and opt-out availability;
- operator approval;
- schedule confirmation;
- task start or completion;
- human handoff;
- incident escalation.

Evidence may point to source artifacts, but it stores minimal facts rather than copying entire reports, sensor streams, or videos.

## Current Synthetic Examples

The draft validates three end-to-end decisions:

1. An elder-friendly walk moves from resident notice to operator review only after notice evidence exists.
2. An approved basketball Pulse becomes scheduled only after schedule evidence exists.
3. A future robot patrol becomes approved only after operator approval and safety/privacy facts exist.

Machine-readable assets:

```text
schemas/community-task-transition.schema.json
schemas/community-artifact.schema.json
schemas/community-evidence.schema.json
examples/transitions/
examples/artifacts/
examples/evidence/
scripts/validate-cacp-lifecycle.mjs
```

Run:

```powershell
npm.cmd run validate:protocol
```
