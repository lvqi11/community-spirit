# CACP Incident Review Extension Decision

Updated: 2026-07-02

Status:

```text
incident-review remains a draft general extension, not a core field.
```

## Decision

Keep `incident-review` as:

```text
https://community-spirit.dev/cacp/extensions/incident-review/v0.1
```

It is no longer robot-only, because it now appears in:

- `ctc-robot-fire-passage-patrol`: robot/operator obstruction or safety review.
- `ctc-playground-repair-notice-incident-review`: operator-led notice failure and blocked alternate route review.

However, it should not become core yet.

## Why It Is General, But Not Core

The extension now represents a reusable lifecycle concern:

```text
something happened during or around task execution that requires human review before the task can safely continue, complete, fail, or be canceled.
```

That is broader than robot patrol. It can apply to:

- robot confidence or obstruction findings;
- resident-facing notice failure;
- blocked alternate access;
- safety boundary changes;
- human handoff after a task is paused.

But only two chains use it today. The current examples prove that incident review is not robot-specific, but they do not yet prove a stable core object shape.

## What Is Stable

These semantics look stable enough to preserve:

- `incident_review` is a lifecycle state, not just an artifact label.
- A transition into `incident_review` must have `incident` evidence.
- Incident evidence must stay synthetic-only in public examples.
- Incident review should route back to a human operator or safety owner.
- Incident artifacts must avoid real identity, raw video, unit, access, payment, and sensor payloads.

Existing validator coverage already enforces the most important lifecycle rule:

```text
transition.to_state = incident_review -> requires evidence_type = incident
```

## What Is Not Stable Yet

These points should stay open:

- whether incident review needs a core `incident` object;
- whether all incident cases need a `resident_notice` update;
- whether incident facts should be standardized by category;
- whether `incident_review` should always imply `manual_stop` or `human_handoff`;
- whether post-review resolution needs a separate transition pattern.

## Validator Direction

Do not add strict fact-level rules yet.

Current validators should keep checking:

- transition into `incident_review` requires `incident` evidence;
- same-contract artifact and evidence references;
- synthetic-only evidence and artifact policy.

Future validator candidates:

- if a contract uses `incident-review`, its pilot-readiness `incident_review` gate cannot be `not_applicable`;
- incident artifacts should use `incident_report` or a clearly related artifact type;
- incident evidence should include a handoff or review owner fact;
- incident-review examples should avoid raw sensor, camera, access-control, or resident identity payload keys.

Only add these after another incident-review chain or external-style example shows whether the facts are stable.

## Current Recommendation

Keep `incident-review` as:

```text
draft general extension
```

Next useful work:

```text
improve validator diagnostics and contributor repair guidance before adding more incident-review schema surface.
```
