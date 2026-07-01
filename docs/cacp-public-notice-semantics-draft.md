# CACP Public Notice Semantics Draft

This document narrows the meaning of the `public-notice` extension.

`public-notice` is currently the strongest extension promotion candidate because it appears in three scenario families:

- AI-agent proposal reviewed by an operator;
- elder-friendly helper coordination.
- resident-facing property operation scheduling.

It should still remain an extension until notice timing, evidence facts, and pilot-readiness gates are stable across more property operation and resident-facing cases.

## Extension URI

```text
https://community-spirit.dev/cacp/extensions/public-notice/v0.1
```

Registry:

```text
examples/extensions/registry.json
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

## Three current timing patterns

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

## Evidence relationship

`public-notice` can be represented in two places:

- `CommunityEvidence` proves a protocol transition had the required notice facts.
- `CACPPilotReadinessChecklist.gates.resident_notice` records whether real-world notice obligations are only simulated, still need review, or are actually satisfied.

Do not treat synthetic evidence as real pilot readiness.

## Promotion blocker

The third example removes the first promotion blocker by showing notice for a non-elder, non-AI task.

Remaining blockers before `public-notice` can move into core:

- decide whether the core object needs explicit notice timing fields instead of relying on lifecycle state and evidence facts;
- stabilize the minimum resident notice evidence facts across property operations, helper workflows, and AI proposals;
- add validator rules only after those facts stop changing between examples.

## Validator expectations

Current validators should keep checking:

- contracts with `permission.resident_notice_required=true` cannot mark the pilot-readiness `resident_notice` gate as `not_applicable`;
- lifecycle transitions leaving `needs_resident_notice` require `resident_notice` evidence;
- `public-notice` extension URIs must be registered and match the contract actor and interaction mode.

Future validators may check public-notice-specific evidence facts after more examples stabilize.
