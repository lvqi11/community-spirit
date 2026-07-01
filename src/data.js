import poiData from "../data/sample-pois.json";
import routeData from "../data/sample-routes.json";
import taskData from "../data/sample-tasks.json";
import activityData from "../data/sample-activities.json";
import pulseData from "../data/sample-pulses.json";
import seasonData from "../data/sample-seasons.json";
import benefitData from "../data/sample-benefits.json";
import basketballContract from "../examples/contracts/evening-basketball-social-pulse.json";
import walkingContract from "../examples/contracts/elder-friendly-walking-helper.json";
import robotPatrolContract from "../examples/contracts/robot-fire-passage-patrol.json";
import aiGardenMeetupContract from "../examples/contracts/ai-suggested-garden-meetup.json";
import residentCompanionActor from "../examples/actors/resident-companion-app.json";
import operatorConsoleActor from "../examples/actors/community-operator-console.json";
import futurePatrolRobotActor from "../examples/actors/future-patrol-robot.json";
import elderHelperPairActor from "../examples/actors/elder-helper-pair.json";
import communityAiAssistantActor from "../examples/actors/community-ai-assistant.json";
import elderWalkNoticeArtifact from "../examples/artifacts/elder-walk-resident-notice.json";
import basketballScheduleArtifact from "../examples/artifacts/basketball-schedule-record.json";
import robotPatrolApprovalArtifact from "../examples/artifacts/robot-patrol-approval-record.json";
import aiGardenReviewArtifact from "../examples/artifacts/ai-garden-meetup-review-record.json";
import elderWalkNoticeEvidence from "../examples/evidence/elder-walk-resident-notice.json";
import basketballScheduleEvidence from "../examples/evidence/basketball-schedule-confirmation.json";
import robotPatrolApprovalEvidence from "../examples/evidence/robot-patrol-operator-approval.json";
import aiGardenReviewEvidence from "../examples/evidence/ai-garden-meetup-operator-review.json";
import elderWalkNoticeTransition from "../examples/transitions/elder-walk-notice-to-review.json";
import basketballScheduleTransition from "../examples/transitions/basketball-approved-to-scheduled.json";
import robotPatrolApprovalTransition from "../examples/transitions/robot-patrol-review-to-approved.json";
import aiGardenReviewTransition from "../examples/transitions/ai-garden-meetup-review-to-approved.json";
import basketballPilotReadiness from "../examples/pilot-readiness/evening-basketball-social-pulse.json";
import walkingPilotReadiness from "../examples/pilot-readiness/elder-friendly-walking-helper.json";
import robotPatrolPilotReadiness from "../examples/pilot-readiness/robot-fire-passage-patrol.json";
import aiGardenPilotReadiness from "../examples/pilot-readiness/ai-suggested-garden-meetup.json";

export const communityData = {
  pois: poiData.pois,
  routes: routeData.routes,
  tasks: taskData.tasks,
  activities: activityData.activities,
  residentProfiles: pulseData.resident_profiles,
  pulses: pulseData.pulses,
  seasons: seasonData.seasons,
  benefits: benefitData.benefits,
  benefitCurrency: benefitData.currency,
  benefitOperatorBaseline: benefitData.operator_baseline,
  communityTaskContracts: [basketballContract, walkingContract, robotPatrolContract, aiGardenMeetupContract],
  communityActors: [residentCompanionActor, operatorConsoleActor, futurePatrolRobotActor, elderHelperPairActor, communityAiAssistantActor],
  communityArtifacts: [elderWalkNoticeArtifact, basketballScheduleArtifact, robotPatrolApprovalArtifact, aiGardenReviewArtifact],
  communityEvidence: [elderWalkNoticeEvidence, basketballScheduleEvidence, robotPatrolApprovalEvidence, aiGardenReviewEvidence],
  communityTransitions: [elderWalkNoticeTransition, basketballScheduleTransition, robotPatrolApprovalTransition, aiGardenReviewTransition],
  communityPilotReadiness: [basketballPilotReadiness, walkingPilotReadiness, robotPatrolPilotReadiness, aiGardenPilotReadiness]
};

export const promptSamples = [
  {
    label: "Start explorer quest",
    prompt: "Start explorer quest.",
    taskId: "task-community-explorer-quest"
  },
  {
    label: "Guide my guest to Building 3",
    prompt: "How can my guest get from the North Gate to Building 3?",
    taskId: "task-guide-visitor-to-building-3"
  },
  {
    label: "Find the package locker",
    prompt: "Where is the package locker from Building 3?",
    taskId: "task-pick-up-package"
  },
  {
    label: "Join weekend activity",
    prompt: "What activities are happening this weekend?",
    taskId: "task-join-parent-child-activity"
  },
  {
    label: "Join evening basketball",
    prompt: "Join tonight's basketball meetup.",
    taskId: "task-join-evening-basketball"
  },
  {
    label: "Start world maintenance",
    prompt: "Start a world maintenance side quest.",
    taskId: "task-maintain-shared-world"
  },
  {
    label: "Report broken light",
    prompt: "I want to report a broken light near the kids' playground.",
    taskId: "task-report-playground-light"
  },
  {
    label: "Generate robot patrol",
    prompt: "Generate a patrol route for a service robot.",
    taskId: "task-robot-fire-passage-patrol"
  }
];

export const labelOverrides = {
  "poi-kids-playground": { label: "Playground", dx: -7, dy: -7, anchor: "end" },
  "poi-fire-passage": { label: "Fire Pass.", dx: -7, dy: 9, anchor: "end" },
  "poi-basketball-court": { label: "Court", dx: -7, dy: 2, anchor: "end" },
  "poi-underground-garage-entrance": { label: "Garage", dx: -7, dy: 2, anchor: "end" },
  "poi-waste-collection": { label: "Waste", dx: 6, dy: 2, anchor: "start" },
  "poi-package-locker": { label: "Locker", dx: 6, dy: 2, anchor: "start" },
  "poi-property-center": { label: "Property", dx: 6, dy: 2, anchor: "start" }
};
