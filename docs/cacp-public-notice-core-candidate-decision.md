# CACP Public Notice Core Candidate Decision

Updated: 2026-07-02

Status:

```text
public-notice remains a draft extension, but it is the strongest current core candidate.
```

## Decision

Do not promote `public-notice` into CACP core yet.

Keep it as:

```text
https://community-spirit.dev/cacp/extensions/public-notice/v0.1
```

Reason:

- it now appears across three scenario families;
- the concept is clearly reusable;
- the current examples still rely on lifecycle state and evidence facts rather than explicit notice timing fields;
- promoting too early would freeze semantics before we know whether notice belongs in `permission`, `lifecycle`, `CommunityEvidence`, a new notice object, or a combination of those surfaces.

## Why It Is The Strongest Core Candidate

Current coverage:

- `ctc-ai-suggested-garden-meetup`: AI proposal reviewed by an operator before resident contact.
- `ctc-elder-friendly-walking-helper`: resident-touch/helper-supported task with notice evidence before protected transition.
- `ctc-temporary-playground-repair-notice`: operator-led property operation notice before scheduling review.
- `ctc-shared-garden-maintenance-notice-update`: updated property operation notice that supersedes an earlier notice before scheduling review continues.
- `ctc-playground-repair-notice-incident-review`: notice failure during a running property operation that pauses work and enters incident review.

This is broader than the other current extensions:

- `ai-agent-suggestion` is still one actor family.
- `elder-friendly` is still one resident-support pattern.
- `light-social` is still one low-pressure social pattern.
- `robot-assist` and `incident-review` are still close to the robot patrol scenario.

`public-notice` is different because it describes a cross-cutting obligation:

```text
before a community task becomes visible, scheduled, assigned, or executed,
residents may need a plain-language explanation and escalation path.
```

## What Is Stable

These semantics look stable enough to preserve:

- resident-facing tasks can require notice before a protected lifecycle transition;
- synthetic notice evidence must not be treated as real pilot readiness;
- notice artifacts should avoid real identity, unit, camera, sensor, payment, and access-control data;
- pilot-readiness gates must record whether notice is simulated, still needs real-world review, or actually satisfied;
- notice must explain affected place or route, participation/impact, data boundary, opt-out or contact path, and human fallback.

## What Is Not Stable Yet

These points should stay open:

- whether CACP core needs an explicit `notice_timing` field;
- whether notice has its own first-class object or remains an artifact/evidence pattern;
- whether AI-proposal notice and property-operation notice should share the same required facts;
- whether `permission.resident_notice_required` is enough, or whether it should name the timing boundary;
- whether validator rules should inspect notice facts beyond `evidence_type=resident_notice`.

## Candidate Core Shape

If `public-notice` moves toward core, the likely minimal shape is not a full new object first. A conservative v0.x core proposal could add an optional contract field:

```json
{
  "notice": {
    "required": true,
    "timing": "before_scheduling_review",
    "audience": "affected_residents",
    "evidence_required": true,
    "artifact_required": true
  }
}
```

Possible `timing` values:

```text
before_operator_approval
before_resident_contact
before_scheduling_review
before_execution
on_notice_update
```

Do not add this field yet. Use the next example to test whether these timing values are sufficient.

Timing comparison:

```text
docs/cacp-public-notice-timing-model-review.md
```

## Notice Update Finding

The shared garden example adds the first `public-notice` chain where a previous notice becomes inaccurate and must be superseded.

Stable evidence facts from this example:

- `previous_notice_superseded`
- `updated_window_posted_before_review`
- `alternate_access_described`
- `operator_contact_available`
- `real_identity_stored=false`

This suggests notice updates may not require a separate first-class object yet, but they do need explicit timing and supersession facts if `public-notice` moves toward core.

## Notice Failure Finding

The playground incident-review example adds the first `public-notice` chain where the task is already running and the active notice becomes inaccurate.

Stable evidence facts from this example:

- `notice_inaccurate_during_execution`
- `closure_started_before_updated_notice`
- `alternate_route_blocked`
- `work_paused_for_review`
- `updated_notice_posted_after_pause`
- `previous_notice_marked_inaccurate`
- `blocked_alternate_route_described`
- `operator_contact_available`
- `real_identity_stored=false`

This suggests `public-notice` can cover notice failure and incident review, but the core field proposal still needs one more design pass before adding schema surface. The open question is whether a future timing enum needs `on_notice_failure` or whether notice failure can be modeled through lifecycle plus evidence facts.

## Next Design Step

The five public-notice timing patterns have now been compared in `docs/cacp-public-notice-timing-model-review.md`.

Current design answer:

```text
public-notice should stay as extension evidence facts for v0.3, with validator baselines for stable resident notice evidence and artifact rules.
```

The goal is to avoid freezing schema too early while still making the strongest repeated public-notice obligations machine-checkable.

## Validator Direction

Do not add strict fact-level validator rules yet.

Current validators should continue checking:

- registered extension URI;
- extension actor/mode applicability;
- no duplicate extension URI;
- direct resident touch requires `permission.resident_notice_required=true`;
- transitions leaving `needs_resident_notice` require `resident_notice` evidence;
- pilot-readiness resident_notice gate is not `not_applicable` when notice is required.

Future validator candidates:

- if a contract uses `public-notice`, it must either start in `needs_resident_notice` or explicitly explain proposal-review timing;
- resident notice evidence should include an operator contact or escalation fact;
- resident notice artifacts should be visible to `community_summary` or `participant_and_operator`;
- notice update scenarios should include a fact showing whether the previous notice was superseded;
- notice-failure incident scenarios should include facts showing whether the active notice was inaccurate, whether work paused, and whether an updated notice was posted.

Only add rules that are stable across the five timing patterns.

## Current Recommendation

Keep `public-notice` as:

```text
draft extension + core candidate
```

Next concrete work:

```text
add stable public-notice validator baselines, then revisit whether notice timing deserves a core field after another external-style scenario.
```

This gives CACP a better chance of becoming a serious protocol rather than a set of app-specific examples.
