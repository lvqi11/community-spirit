# CACP Public Notice Semantics Draft

This document narrows the meaning of the `public-notice` extension.

`public-notice` is currently the strongest extension promotion candidate because it appears in five scenario families:

- AI-agent proposal reviewed by an operator;
- elder-friendly helper coordination.
- resident-facing property operation scheduling.
- resident-facing property operation notice update.
- resident-facing property operation notice failure during execution.

It should still remain an extension until notice timing, evidence facts, and pilot-readiness gates are stable across more property operation and resident-facing cases.

## Extension URI

```text
https://community-spirit.dev/cacp/extensions/public-notice/v0.1
```

Registry:

```text
examples/extensions/registry.json
```

Core-candidate decision memo:

```text
docs/cacp-public-notice-core-candidate-decision.md
```

Timing model review:

```text
docs/cacp-public-notice-timing-model-review.md
```

## What public notice means

Public notice means a resident-facing explanation may be required before a task becomes visible, scheduled, assigned, or executed.

The notice should explain:

- what is being proposed;
- who or what initiated it;
- whether a human operator reviewed it;
- which place or route is affected;
- whether participation is optional;
- what data is not collected;
- how a resident can opt out, ask for help, or escalate.

## Five current timing patterns

### Proposal notice boundary

Used by:

```text
ctc-ai-suggested-garden-meetup
```

Meaning:

```text
AI may propose -> operator must review -> no resident contact before approval
```

Current evidence:

```text
evidence-ai-garden-meetup-operator-review
```

Current status:

- operator review is simulated;
- resident contact has not started;
- resident notice is still a real-pilot requirement;
- the public demo does not include a synthetic resident notice artifact for this chain.

### Resident-touch notice boundary

Used by:

```text
ctc-elder-friendly-walking-helper
```

Meaning:

```text
resident-facing or helper-supported task -> resident notice evidence before protected transition
```

Current evidence:

```text
evidence-elder-walk-resident-notice
```

Current status:

- resident notice is simulated for demo;
- operator approval remains a real-world review requirement;
- the notice artifact explains route, helper option, data boundary, and contact path.

### Property operation scheduling boundary

Used by:

```text
ctc-temporary-playground-repair-notice
```

Meaning:

```text
resident-facing property operation -> resident notice evidence -> operator scheduling review may proceed
```

Current evidence:

```text
evidence-playground-repair-resident-notice
```

Current status:

- resident notice is simulated for demo;
- the notice artifact explains repair window, affected amenity, safe boundary, alternate route, and operator contact path before scheduling review;
- operator approval, physical safety review, audit storage, and real resident communication channels remain real-pilot requirements.

### Notice update boundary

Used by:

```text
ctc-shared-garden-maintenance-notice-update
```

Meaning:

```text
previous resident notice becomes inaccurate -> updated resident notice evidence -> operator scheduling review may continue
```

Current evidence:

```text
evidence-shared-garden-maintenance-notice-update
```

Current status:

- resident notice update is simulated for demo;
- the notice artifact supersedes a previous shared garden maintenance notice;
- evidence records `previous_notice_superseded=true`, alternate access, operator contact, and no real identity storage;
- real pilot approval, production audit storage, and real resident communication channels remain real-world requirements.

### Execution notice failure / incident-review boundary

Used by:

```text
ctc-playground-repair-notice-incident-review
```

Meaning:

```text
active resident-facing task -> notice becomes inaccurate during execution -> pause and incident review -> updated resident notice evidence
```

Current evidence:

```text
evidence-playground-repair-notice-incident
evidence-playground-repair-incident-notice-update
```

Current status:

- resident notice failure and incident review are simulated for demo;
- the incident artifact records that the prior playground repair notice became inaccurate while the task was running;
- evidence records `notice_inaccurate_during_execution=true`, `closure_started_before_updated_notice=true`, `alternate_route_blocked=true`, `updated_notice_posted_after_pause=true`, and `real_identity_stored=false`;
- real pilot approval, physical safety review, production audit storage, and real resident communication channels remain real-world requirements.

## Evidence relationship

`public-notice` can be represented in two places:

- `CommunityEvidence` proves a protocol transition had the required notice facts.
- `CACPPilotReadinessChecklist.gates.resident_notice` records whether real-world notice obligations are only simulated, still need review, or are actually satisfied.

Do not treat synthetic evidence as real pilot readiness.

## Promotion blocker

The third example removes the first promotion blocker by showing notice for a non-elder, non-AI task.

The fourth example tests notice update semantics, but `public-notice` should still remain an extension.

The fifth example tests notice failure during execution and shows `public-notice` can combine with `incident-review`, but it still should not move into core until timing and minimum evidence facts are stable.

Remaining blockers before `public-notice` can move into core:

- decide whether the core object needs explicit notice timing fields instead of relying on lifecycle state and evidence facts;
- stabilize the minimum resident notice evidence facts across property operations, helper workflows, AI proposals, notice updates, and notice-failure incident review;
- decide whether notice-failure incident review needs a separate timing value such as `on_notice_failure` or can reuse `before_execution` / `on_notice_update`;
- add only validator rules that are stable across the five timing patterns.

## Validator expectations

Current validators should keep checking:

- contracts with `permission.resident_notice_required=true` cannot mark the pilot-readiness `resident_notice` gate as `not_applicable`;
- lifecycle transitions leaving `needs_resident_notice` require `resident_notice` evidence;
- `public-notice` extension URIs must be registered and match the contract actor and interaction mode.

The first stable public-notice validator baselines are documented in `docs/cacp-public-notice-timing-model-review.md`.
