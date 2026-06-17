# Novus / Pendo Analytics Integration

Mind the Product World Product Day requires Novus.ai to be installed on the deployed project before final Devpost submission.

Community Spirit includes a safe optional analytics layer for this requirement:

```text
src/analytics.js
```

## Current Behavior

- If `VITE_PENDO_API_KEY` is empty, no analytics script is loaded.
- If `VITE_PENDO_API_KEY` is set, the app loads the Pendo Web SDK from `cdn.pendo.io`.
- The demo initializes with synthetic visitor/account metadata only.
- Tracked metadata always includes `data_policy: fictional_or_synthetic_only`.

No real resident, community, access-control, camera, payment, robot, or sensor data is sent.

## Environment Variable

Create a local `.env` file or configure the deployment environment:

```text
VITE_PENDO_API_KEY=your_novus_or_pendo_web_sdk_key
```

Do not commit real keys.

## Tracked Product Events

- `task_selected`
- `resident_profile_selected`
- `pulse_selected`
- `pulse_joined`
- `pulse_checked_in`
- `pulse_left`
- `pulse_operational_state_changed`
- `benefit_claimed`
- `benefit_activated`
- `benefit_redeemed`
- `workflow_json_exported`
- `demo_step_run`
- `demo_reset`
- `view_selected`

## Devpost Final Submission Requirement

Before final submission:

1. Register or log in to Novus.ai.
2. Create/connect the deployed Community Spirit project.
3. Add the provided SDK key as `VITE_PENDO_API_KEY`.
4. Redeploy the app.
5. Open the deployed app and run the demo flow.
6. Confirm events appear in Novus/Pendo.
7. Capture the required Novus.ai dashboard screenshot.
8. Upload the demo video to YouTube, Vimeo, or Youku.

Do not final-submit Devpost until these are complete.
