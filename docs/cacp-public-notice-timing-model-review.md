# CACP Public Notice Timing Model Review

Updated: 2026-07-02

Status:

```text
public-notice remains an extension; timing is mature enough for validator baselines, not yet for a core field.
```

## Decision

Do not add a core `notice` field yet.

The five current timing patterns are now visible enough to validate common safety facts, but not stable enough to freeze schema surface. Keep `public-notice` as:

```text
https://community-spirit.dev/cacp/extensions/public-notice/v0.1
```

For v0.3, prefer extension-level evidence validation over a new core object or field.

## Timing Patterns Compared

| Pattern | Example contract | Lifecycle boundary | Current evidence shape | Core-field pressure |
| --- | --- | --- | --- | --- |
| Proposal notice boundary | `ctc-ai-suggested-garden-meetup` | AI proposal stays in operator review before resident contact | `operator_approval` evidence records no resident contact and no real identity use | Medium: timing is before resident contact, but no resident notice artifact exists yet. |
| Resident-touch notice boundary | `ctc-elder-friendly-walking-helper` | `needs_resident_notice -> needs_operator_approval` | `resident_notice` evidence and notice artifact | High: this is the cleanest protected transition. |
| Property scheduling boundary | `ctc-temporary-playground-repair-notice` | `needs_resident_notice -> needs_operator_approval` | `resident_notice` evidence before scheduling review | High: strong candidate for future `before_scheduling_review`. |
| Notice update boundary | `ctc-shared-garden-maintenance-notice-update` | superseded notice before scheduling review continues | `resident_notice` evidence with supersession facts | Medium-high: suggests `on_notice_update`, but facts are still example-shaped. |
| Notice failure / incident-review boundary | `ctc-playground-repair-notice-incident-review` | `running -> incident_review` after notice becomes inaccurate | `incident` evidence plus updated `resident_notice` evidence | Medium: may need `on_notice_failure`, but lifecycle plus facts are currently enough. |

## Why Not Core Yet

The candidate shape remains plausible:

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

But the current examples show that one enum would need to represent at least:

- `before_resident_contact`
- `before_operator_approval`
- `before_scheduling_review`
- `on_notice_update`
- `on_notice_failure`

That is enough signal to design the field, but not enough to make it core. The project should avoid creating a first-class notice object until it knows whether timing belongs in `permission`, `lifecycle`, `CommunityEvidence`, or a small core `notice` block.

## Stable Validator Baseline

These rules are stable enough now:

- A direct resident-touch contract using `public-notice` must include a resident notice artifact.
- A direct resident-touch contract using `public-notice` must include resident notice evidence.
- Resident notice evidence must keep `real_identity_stored=false`.
- Resident notice evidence must point to a `resident_notice` artifact.
- Resident notice artifacts must be visible to `community_summary` or `participant_and_operator`.

These rules intentionally avoid checking operator-contact facts, supersession facts, or notice-failure facts across every scenario because those facts still differ by timing pattern.

## Deferred Rules

Do not add these yet:

- require `operator_contact_available` for every resident notice evidence record;
- require `previous_notice_superseded` outside notice-update scenarios;
- require `notice_inaccurate_during_execution` outside incident-review scenarios;
- require AI proposal chains to produce a resident notice artifact before operator approval;
- require a core `notice.timing` field.

## Current Recommendation

Keep `public-notice` as:

```text
draft extension + core candidate + validator-backed evidence pattern
```

Next useful work after this review:

```text
add focused validator baselines, then revisit a core notice field only after another independent contributor or external-style scenario can use the same timing vocabulary.
```
