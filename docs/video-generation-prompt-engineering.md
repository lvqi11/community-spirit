# Video Generation Prompt Engineering

Use this document to generate and compare demo-video drafts in Manus, Seedance / ByteDance video models, or other video tools.

The goal is not a glossy ad. The goal is a judge-friendly product demo: clear, working, emotionally memorable, and grounded in the actual deployed app.

## Reference Principles

Devpost recommends a screencast-style demo because judges need to understand and evaluate how the app works, not just watch a marketing montage:

```text
Use the real product screen as the backbone.
Show the project in action within the first 20 seconds.
Keep the video to 2-3 minutes.
Make the narration explain the problem, product loop, and proof.
Do not rely on generated visuals for core functionality.
```

World Product Day specifically asks for:

```text
A short demo video, 2-3 minutes, showing the project in action.
Upload to YouTube, Vimeo, or Loom.
Make it public or unlisted.
Show Novus.ai installed via a dashboard screenshot.
```

## Core Creative Direction

```text
Community Spirit is a community life RPG and physical-AI social layer.

It turns underused real community spaces into playable quests, low-pressure social participation, resident growth, shared goals, World Ops metrics, Novus product analytics, and CACP task contracts for future AI agents and robots.
```

Tone:

```text
Warm, product-focused, practical, lightly cinematic.
Not a smart-community dashboard.
Not a generic AI assistant.
Not a robot-control claim.
Not a real-resident deployment.
```

Visual identity:

```text
Clean product screencast.
Subtle captions.
Light map/world metaphor.
Small RPG language: quest, pulse, check-in, reward, world ops.
Avoid sci-fi city stock footage.
Avoid real CCTV, access control, payment, robot patrol, or real resident footage.
```

## Recommended Video Structure

Target length: 2:30-2:55.

```text
0:00-0:12 Hook
Open on the actual Community Spirit page.
Line: "What if a quiet basketball court could become a small community quest?"

0:12-0:35 Problem
Show the Community Pulse card and matching reasons.
Explain noisy group chats, underused spaces, weak participation loops.

0:35-1:25 Resident RPG Loop
Run next step: join, route, check in.
Show XP, badge, Spirit Points, shared community goal.

1:25-1:55 Benefits and Retention
Claim, activate, redeem benefit.
Show wallet ledger and resident pass.

1:55-2:20 World Ops
Switch to ops.
Show recommendations, opens, joins, check-ins, activation, retention, commerce.

2:20-2:38 CACP / Physical-AI Layer
Show Task Contract / robot-ready export.
Explain intent, permission, privacy boundary, fallback, and task handoff.

2:38-2:52 Novus Proof
Show Novus Track Events: All 17, Tracked 17, representative events.

2:52-3:00 Close
Line: "Community Spirit is the social layer physical AI needs before it enters everyday community life."
```

## Manus Prompt

Paste this into Manus as the master task:

```text
You are producing a 2-3 minute Devpost hackathon demo video for a product called Community Spirit.

Competition context:
- Mind the Product presents World Product Day: Everyone Ships Now.
- The video must show the working product in action, not only a pitch.
- Novus.ai integration proof should appear near the end.

Product positioning:
Community Spirit is a community life RPG + physical-AI social layer + CACP protocol reference implementation.
It is not a generic smart-community dashboard.
It uses fictional / synthetic data only.
It does not connect to real residents, real communities, access control, cameras, payments, robots, or sensor logs.

Live demo:
https://lvqi11.github.io/community-spirit/

GitHub:
https://github.com/lvqi11/community-spirit

Main story:
Tonight's underused basketball court needs two more players.
Community Pulse matches Lin, an after-work mover, because he likes basketball, is available tonight, prefers activity-first social connection, and is a short walk away.
He joins the pulse, gets a route, checks in, earns XP, Spirit Points, and badge progress, helps unlock a shared community movie-night goal, then claims/activates/redeems a contextual sports benefit.
The same event becomes World Ops metrics for the property team.
The same task model becomes CACP / robot-ready task contract context for future physical AI.
Novus Track Events proves the product loop is instrumented.

Required video style:
- Make the real product screen recording the main visual.
- Use subtle title cards and captions only where they help.
- No fake residents, no fake real-world deployment footage, no real CCTV/access/payment/robot scenes.
- Keep it warm, product-focused, and understandable by a judge in the first 20 seconds.
- Avoid generic AI buzzwords. Show the loop.

Video structure:
0:00-0:12 Hook:
Show the app hero / Community Pulse.
Narration: "What if a quiet basketball court could become a small community quest?"

0:12-0:35 Problem:
Show matching reasons and pulse card.
Narration: "Community activities usually disappear into noisy group chats. Residents need a low-pressure reason to show up, and operators need to know what actually happened after the recommendation."

0:35-1:25 Resident RPG:
Click Run next step / Join / Check in.
Show route, task, check-in, XP, Spirit Points, badge, shared goal.
Narration: "Community Spirit turns the moment into a playable loop: Pulse, route, check-in, reward, shared goal."

1:25-1:55 Benefit and retention:
Show claim, activate, redeem benefit.
Show wallet / resident pass / season arc.
Narration: "Rewards are useful, traceable, and synthetic in this demo. They create a retention loop without using real resident data."

1:55-2:20 World Ops:
Switch to ops.
Show conversion, lifecycle, space activation, retention, commerce.
Narration: "Operators see the same story as measurable World Ops, not a separate dashboard."

2:20-2:38 CACP / Physical AI:
Show task contract / robot-ready export if visible.
Narration: "CACP adds the task contract physical AI needs: intent, place, permission, privacy boundary, fallback, and human handoff."

2:38-2:52 Novus proof:
Show Novus Track Events dashboard.
Required visible details: All 17, Tracked 17, Not Tracked 0, and events like pulse_joined, pulse_checked_in, benefit_claimed, workflow_json_exported, demo_completed.
Narration: "The deployed demo is instrumented with Novus, so the product loop is measurable."

2:52-3:00 Close:
Return to the app or final title card.
Narration: "Community Spirit is the social layer physical AI needs before it enters everyday community life."

Deliverables:
1. A shot-by-shot edit plan.
2. A narration script under 430 English words.
3. A caption list.
4. A visual generation plan that uses real product screencast as the primary source.
5. A warning list of what not to show or claim.
```

## ByteDance / Seedance Video Model Prompt

Use this for AI-generated title cards, transitional B-roll, or intro/outro clips only. Do not use it to fake product functionality.

```text
Create a short cinematic-but-clean product-demo intro for "Community Spirit".

Duration: 5-8 seconds.
Aspect ratio: 16:9.
Style: polished product demo, warm civic technology, map-like community world, soft daylight, clean UI-inspired composition, subtle RPG quest energy.

Visual concept:
A fictional community map softly comes alive: a basketball court, walking route, small quest marker, shared goal progress, and simple product captions.
No real people close-ups.
No real residential surveillance.
No access-control devices.
No payment terminals.
No robots.
No real city footage.

On-screen text:
"Community Spirit"
"Community life RPG for real spaces"

Mood:
optimistic, grounded, practical, judge-friendly, not sci-fi.

End frame should leave space for a cut into a real product screencast.
```

Optional outro prompt:

```text
Create a 5-second closing title card for a Devpost product demo.

Product: Community Spirit.
Message: "Pulse -> Check-in -> Reward -> World Ops -> CACP"
Style: clean map-grid background, soft green and blue accents, small quest markers, product-demo polish.
No real people, no surveillance, no payment, no robot footage.
End text: "Synthetic data only. Built for World Product Day."
```

## Narration Script

Use this as the first draft for voiceover:

```text
What if a quiet basketball court could become a small community quest?

Community Spirit is a community life RPG and physical-AI social layer. Instead of broadcasting another activity into a noisy group chat, Community Pulse finds the right resident for the right real-space moment.

Here, tonight's court needs two more players. Lin matches because he likes basketball, is free tonight, prefers activity-first social connection, and is only a short walk away.

When Lin joins, the recommendation becomes a real task and route. The product connects resident intent to a place, schedule, activity, safety rule, and expected output.

Now he checks in at the court. His resident identity grows with XP, badge progress, Spirit Points, and a shared community movie-night goal. This is not just a digital reward. It is a lightweight reason for people to show up in the physical community.

Spirit Points can unlock a contextual benefit. In this demo, the benefit pass, activation, redemption, wallet entries, and resident profile are all synthetic. No real residents, payments, merchants, access systems, cameras, robots, or sensor logs are connected.

The same event also becomes World Ops. Operators can see recommendations, opens, joins, check-ins, retention, commerce conversion, and projected space activation from the same underlying task model.

Community Spirit also introduces CACP, the Community AI Collaboration Protocol. Before an AI agent or future robot acts in a shared place, the community needs a contract: intent, place, permission, privacy boundary, fallback, feedback, and human handoff.

Finally, the deployed demo is instrumented with Novus. Track Events show the product loop is measurable across join, check-in, benefit, workflow export, and guided demo completion.

Community Spirit is the social layer physical AI needs before it enters everyday community life.
```

## Caption Pack

```text
Quiet space -> playable community quest
Community Pulse matches intent, time, comfort, and walking distance
Join creates a route and real-space task
Check-in grows XP, badges, Spirit Points, and shared goals
Benefits create a traceable retention loop
World Ops measures the same story
CACP turns community action into a task contract
Novus Track Events: 17/17 tracked
Synthetic data only
```

## If I Generate It

I would not use an image or video model to invent the main product UI.

Recommended pipeline:

```text
1. Record real screen capture from the deployed app.
2. Record real screen capture from Novus Track Events.
3. Use a small model / fast text model to tighten narration and captions.
4. Use an image model only for thumbnail, title card, or optional clean background cards.
5. Use Seedance / video model only for 5-8 second intro/outro or subtle transition clips.
6. Edit in a conventional video editor so product evidence stays real.
```

Use image generation only if needed:

```text
Thumbnail prompt:
"A clean product-demo thumbnail for Community Spirit, a community life RPG for real spaces. Show a stylized fictional community map, route line to a basketball court, small quest marker, and UI-inspired panels. Text: Community Spirit. Warm, modern, judge-friendly, not sci-fi, no real people, no cameras, no robots, no payment devices."
```

Do not use image/video models for:

```text
Novus dashboard screenshots
Actual product interaction
GitHub/Devpost proof
Real resident scenes
Claims of deployed real-world operation
```

## Selection Rubric

Choose the generated version that scores highest on:

```text
Clarity in first 20 seconds
Real product shown, not hidden
Resident RPG loop is obvious
World Ops is understandable
CACP is mentioned simply
Novus proof is visible
No unsafe real-world claims
Fits under 3 minutes
Feels memorable rather than generic
```

Reject versions that:

```text
Look like a smart-city dashboard ad
Spend too long on abstract animation
Use fake residents or fake deployment footage
Say "robot control" or imply real devices are connected
Hide the actual product until late
Skip Novus proof
Run longer than 3 minutes
```
