# Demo QA Checklist

Use this checklist before recording or submitting. Browser interaction remains a manual presenter check; automated integrity is handled by the release gate.

## Automated Release Gate

Run:

```powershell
npm.cmd run check
```

Expected:

- Data validation reports 13 POIs, 8 routes, 9 tasks, 4 activities, 3 pulses, 3 profiles, 3 seasons, and 3 benefits.
- Pulse lifecycle validation passes join, leave, capacity, expiry, and end-state rules.
- The legacy static script has valid JavaScript syntax.
- Vite production build completes.
- Submission validation confirms required documents, current product markers, synthetic-data declarations, and built assets.

## React Demo

Start:

```powershell
npm.cmd run dev -- --port 5173
```

Open:

```text
http://127.0.0.1:5173/
```

Manual presenter checks:

- **Reset story** restores the first resident, basketball Pulse, wallet, benefits, lifecycle, season state, view, and URL.
- **Run next step** completes the seven-step story in order and prevents future steps from being selected early.
- Joining creates the task, route, participant place, and World Ops join.
- Leaving before check-in releases the place and removes the resident from the join funnel.
- Pulse lifecycle `full` and `expired` prevent new joins while preserving confirmed participants.
- Pulse lifecycle `ended` prevents check-in.
- First check-in awards XP, badge progress, Spirit Points, season progress, and task history once.
- Claim, activate, and redeem produce a synthetic benefit pass and itemized wallet entries.
- Repeated claim, check-in, activation, or redemption does not duplicate rewards or spending.
- English and Chinese copy remain usable across all three views.
- Task deep links and JSON export work.

## Mobile

At a narrow viewport, confirm:

- Story progress remains compact.
- Seven demo steps scroll horizontally.
- Product view tabs remain accessible.
- Resident profiles and Pulse recommendations scroll horizontally.
- Primary actions remain touch-sized.
- The map, wallet ledger, and World Ops cards do not overflow horizontally.

## Privacy Review

- Only fictional or synthetic data is present.
- No real resident names, unit numbers, phone numbers, vehicle plates, access records, payment records, camera feeds, or security logs appear.
- The demo does not imply a live connection to property, merchant, payment, or robot systems.
