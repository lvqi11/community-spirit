# CACP New Contributor Walkthrough

This walkthrough is for a new contributor who wants to understand or extend the Community AI Collaboration Protocol inside Community Spirit.

Community Spirit is the first reference implementation. CACP is still a draft protocol capsule inside this repository, not a separate package yet.

## 0. Keep the demo boundary clear

All public CACP examples must remain `fictional_or_synthetic_only`.

Do not add real residents, unit numbers, access credentials, camera payloads, sensor streams, payment records, property keys, or live robot operation logs. Real pilots require separate approval, consent or lawful notice, privacy review, audit logging, human oversight, incident handling, and retention policy.

## 1. Run the project checks first

From the repository root:

```powershell
cd F:\xinghe_shequ\community-spirit
npm.cmd run check
```

To run only the CACP capsule:

```powershell
node scripts\validate-cacp.mjs
```

The CACP-only command validates actor cards, contracts, lifecycle transitions, artifacts, evidence, workflow bundles, pilot-readiness checklists, manifest references, and full-chain example coverage.

## 2. Read the protocol in this order

1. `README.md` for the product/protocol positioning.
2. `cacp.manifest.json` for the current protocol asset map.
3. `docs/cacp-spec-v0.1.md` for the draft object model.
4. `docs/cacp-developer-guide.md` for contributor workflow.
5. `docs/cacp-context-fixture-contract.md` for portable place-context rules.
6. `docs/cacp-validator-troubleshooting.md` when a validator fails.

The shortest mental model is:

```text
CommunityActorCard -> CommunityTaskContract -> CommunityTaskTransition
                   -> CommunityArtifact + CommunityEvidence
                   -> CACPWorkflowProtocolBundle
                   -> CACPPilotReadinessChecklist
```

## 3. Trace one full CACP chain

Use the AI-assisted garden meetup example as a compact full chain:

- actor card: `examples/actors/community-ai-assistant.json`
- task contract: `examples/contracts/ai-suggested-garden-meetup.json`
- transition: `examples/transitions/ai-garden-meetup-review-to-approved.json`
- artifact: `examples/artifacts/ai-garden-meetup-review-record.json`
- evidence: `examples/evidence/ai-garden-meetup-operator-review.json`
- workflow bundle: `examples/exports/ai-suggested-garden-meetup.json`
- pilot readiness: `examples/pilot-readiness/ai-suggested-garden-meetup.json`

That chain demonstrates the intended CACP pattern: an AI agent may propose a community task, but a protected transition still needs human/operator review evidence before it becomes approved.

## 4. Add a new scenario without changing schemas first

When adding a new scenario, prefer examples before schema changes:

1. Reuse an existing context id from `examples/context/community-reference-context.json` unless the scenario truly needs a new `poi`, `route`, `task`, or `activity`.
2. Pick the actor type. Reuse an existing `CommunityActorCard` unless the new scenario needs a genuinely new actor capability.
3. Add the `CommunityTaskContract`.
4. Add at least one lifecycle transition.
5. Add the linked artifact and evidence.
6. Add the workflow export bundle.
7. Add the pilot readiness checklist.
8. Run `node scripts\validate-cacp.mjs`.
9. Run `node scripts\validate-cacp-portable-extraction.mjs`.
10. Run `npm.cmd run check`.

Only propose a schema change after at least one complete example proves that the missing field is a stable protocol concept, not just one scenario's local wording.

## 5. Verify the reference UI

Open the React demo and inspect the Task Contract View:

```powershell
npm.cmd run dev -- --port 5173
```

The reference UI should answer five questions:

- What is the current task contract?
- Which lifecycle step is current or next?
- Which evidence justifies the transition?
- Which artifact was produced?
- Why does pilot readiness remain `public_demo_only`?

The goal is not visual complexity. The goal is that CACP is both machine-verifiable and human-readable.

## 6. Before opening a PR

Run:

```powershell
npm.cmd run check
git diff --check
```

Then confirm:

- every new contract has a full CACP chain;
- examples remain synthetic-only;
- validator failure messages are understandable;
- README or docs point to any new protocol concept;
- UI changes do not hide pilot-readiness or safety boundaries.
