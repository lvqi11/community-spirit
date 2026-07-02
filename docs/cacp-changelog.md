# CACP Changelog

This changelog tracks protocol-draft changes inside Community Spirit.

## v0.1 draft

- Added `CommunityTaskContract` schema and three synthetic contract examples.
- Added `CommunityActorCard` schema and synthetic actor cards for resident app, operator console, future patrol robot, and elder/helper pair.
- Added lifecycle transition, artifact, and evidence schemas.
- Added validators for contract references, lifecycle transitions, evidence, artifacts, workflow export bundles, and pilot readiness.
- Added visible Task Contract View and Contract Evidence View in the React reference implementation.
- Added workflow export `cacp_protocol_bundle`.
- Added `CACPPilotReadinessChecklist` as a real-pilot governance gate.
- Added consolidated `docs/cacp-spec-v0.1.md`.
- Added portable extraction dry-run, standalone README draft, context fixture contract, CLI contract draft, extracted repo layout draft, and versioning/compatibility draft to harden the future independent protocol shape.
- Added extension governance draft and stricter extension URI validation for public contract examples.
- Added extension registry schema and example registry so public contract extensions are auditable.
- Added extension coverage matrix to review core-candidate and single-chain extension status.
- Added public-notice semantics draft to clarify notice timing, evidence, and pilot-readiness relationships.
- Added `ctc-temporary-playground-repair-notice` as a fifth full synthetic chain covering resident-facing property operation notice before scheduling review.
- Updated `public-notice` coverage so it spans AI-agent proposal, elder-friendly helper coordination, and operator-led property operation notice.
- Added `docs/community-spirit-leadership-plan.md` as a living project leadership, roadmap, and progress-reporting plan.
- Added `docs/cacp-public-notice-core-candidate-decision.md` to keep public-notice as a draft extension while defining the core-candidate decision path.
- Added `ctc-shared-garden-maintenance-notice-update` as a sixth full synthetic chain covering resident-facing notice supersession before operator scheduling review continues.
- Added `ctc-playground-repair-notice-incident-review` as a seventh full synthetic chain covering a running playground repair whose resident notice becomes inaccurate, pauses work, and enters incident review.

## Release discipline

- Public examples must remain `fictional_or_synthetic_only`.
- Breaking schema changes before v1.0 should update the spec, examples, validators, and this changelog in the same change set.
- Breaking command-surface or validator-discipline changes before v1.0 should update the CLI contract, release checklist, and troubleshooting docs in the same change set.
- Extension URI or promotion-rule changes should update the extension governance draft, examples, validators, and changelog together.
- CACP should not claim production or pilot readiness unless pilot readiness gates are satisfied outside the public demo.
