import { Metric } from "./Metric";
import { TaskContractView } from "./TaskContractView";
import { canCheckinPulse, hasActivePulsePlace, isPulseAcceptingJoins } from "../pulseLifecycle";

export function TaskDetails({
  contract,
  helpers,
  poiContext,
  selectedActivity,
  selectedRoute,
  selectedTask,
  actionStatus,
  onCopyLink,
  onExportJson,
  onSelectTask,
  pulse,
  pulseStage,
  pulseOperationalState,
  onPulseJoin,
  onPulseCheckin,
  onPulseLeave
}) {
  if (poiContext) {
    return (
      <section className="panel-section">
        <p className="eyebrow">{helpers.t("context.poiTitle", "POI Detail")}</p>
        <h2>{helpers.poiText(poiContext, "name")}</h2>
        <div className="context-body">
          <Metric title={helpers.t("fields.type", "Type")} body={poiContext.type.replaceAll("_", " ")} />
          <Metric title={helpers.t("fields.access", "Access")} body={poiContext.access_level.replaceAll("_", " ")} />
          <Metric
            title={helpers.t("fields.robotAccessible", "Robot accessible")}
            body={poiContext.robot_accessible ? helpers.t("status.yes", "Yes") : helpers.t("status.no", "No")}
          />
          <Metric title={helpers.t("fields.description", "Description")} body={helpers.poiText(poiContext, "description")} />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="panel-section">
        <p className="eyebrow">Selected Task</p>
        <h2>{helpers.taskText(selectedTask, "name")}</h2>
        <p className="muted">{helpers.taskText(selectedTask, "goal")}</p>
        <div className="chip-row">
          {[selectedTask.type, selectedTask.primary_user_role, selectedTask.status, selectedTask.priority].map((value) => (
            <span className="chip" key={value}>
              {value.replaceAll("_", " ")}
            </span>
          ))}
        </div>
        <div className="task-actions">
          <button onClick={onCopyLink}>{helpers.t("actions.copyLink", "Copy Link")}</button>
          <button className="secondary-button" onClick={onExportJson}>
            {helpers.t("actions.exportJson", "Export JSON")}
          </button>
        </div>
        <p className="action-status" aria-live="polite">
          {actionStatus}
        </p>
      </section>
      <section className="panel-section">
        <h3>Route Steps</h3>
        <ol className="route-steps">
          {selectedRoute ? (
            selectedRoute.waypoints.map((waypoint, index) => {
              const poi = waypoint.poi_id ? helpers.poi(waypoint.poi_id) : null;
              const text = helpers.waypointText(selectedRoute.id, index, waypoint.instruction);
              return <li key={`${selectedRoute.id}-${index}`}>{poi ? `${helpers.poiText(poi, "name")}: ${text}` : text}</li>;
            })
          ) : (
            <li>This task does not require a route yet.</li>
          )}
        </ol>
      </section>
      <section className="panel-section">
        <h3>{contextTitle(selectedTask, helpers)}</h3>
        <div className="context-body">
          {contextBody(
            selectedTask,
            selectedRoute,
            selectedActivity,
            helpers,
            onSelectTask,
            pulse,
            pulseStage,
            pulseOperationalState,
            onPulseJoin,
            onPulseCheckin,
            onPulseLeave
          )}
        </div>
      </section>
      <TaskContractView contract={contract} helpers={helpers} />
    </>
  );
}

function contextTitle(task, helpers) {
  if (task.type === "activity_participation") return helpers.t("context.activityTitle", "Activity Context");
  if (task.type === "community_quest") return helpers.t("context.questTitle", "Quest Context");
  if (task.type === "world_maintenance") return helpers.t("context.maintenanceTitle", "World Maintenance Context");
  if (task.type === "repair_reporting") return helpers.t("context.repairTitle", "Repair Ticket Preview");
  if (task.type === "robot_patrol") return helpers.t("context.robotTitle", "Robot-ready Export");
  return helpers.t("context.valueTitle", "Task Value");
}

function contextBody(task, route, activity, helpers, onSelectTask, pulse, pulseStage, pulseOperationalState, onPulseJoin, onPulseCheckin, onPulseLeave) {
  if (task.type === "activity_participation" && activity) {
    return [
      task.id === pulse?.linked_task_id && (
        <PulseParticipationCard
          key="pulse"
          helpers={helpers}
          pulse={pulse}
          pulseStage={pulseStage}
          operationalState={pulseOperationalState}
          onJoin={onPulseJoin}
          onCheckin={onPulseCheckin}
          onLeave={onPulseLeave}
        />
      ),
      <ScheduleCard key="schedule" task={task} activity={activity} helpers={helpers} />,
      <Metric key="activity" title={helpers.t("fields.activity", "Activity")} body={helpers.activityText(activity, "name")} />,
      <Metric
        key="signup"
        title={helpers.t("fields.signup", "Signup")}
        body={activity.signup_required ? helpers.t("status.required", "Required") : helpers.t("status.notRequired", "Not required")}
      />,
      <Metric key="rv" title={helpers.t("fields.residentValue", "Resident value")} body={helpers.activityText(activity, "resident_value")} />,
      <Metric key="pv" title={helpers.t("fields.propertyValue", "Property value")} body={helpers.activityText(activity, "property_value")} />
    ];
  }
  if (task.type === "community_quest") {
    return [
      <QuestIdentityCard key="identity" activity={activity} helpers={helpers} route={route} onSelectTask={onSelectTask} />,
      <Metric key="rv" title={helpers.t("fields.residentValue", "Resident value")} body={helpers.taskText(task, "user_value")} />,
      <Metric key="pv" title={helpers.t("fields.propertyValue", "Property value")} body={helpers.taskText(task, "property_value")} />,
      <Metric key="checkins" title={helpers.t("fields.questCheckins", "Quest check-ins")} body={route ? `${route.waypoints.length} POIs` : "No route"} />,
      <Metric key="reward" title={helpers.t("fields.reward", "Reward")} body={activity?.rewards?.[0]?.name ?? "Community badge"} />
    ];
  }
  if (task.type === "world_maintenance") {
    return [
      <ScheduleCard key="schedule" task={task} helpers={helpers} />,
      <Metric key="rv" title={helpers.t("fields.residentValue", "Resident value")} body={helpers.taskText(task, "user_value")} />,
      <Metric key="pv" title={helpers.t("fields.propertyValue", "Property value")} body={helpers.taskText(task, "property_value")} />,
      <Metric key="loop" title={helpers.t("fields.maintenanceLoop", "Maintenance loop")} body={helpers.t("maintenance.loop", "Discover -> report -> triage -> resident-visible update")} />,
      <Metric key="reward" title={helpers.t("fields.reward", "Reward")} body={helpers.t("maintenance.reward", "Resident Helper progress")} />
    ];
  }
  if (task.type === "repair_reporting") {
    return [
      <Metric key="issue" title={helpers.t("fields.issueType", "Issue type")} body={route.repair_context.issue_type} />,
      <Metric key="priority" title={helpers.t("fields.priority", "Priority")} body={route.repair_context.issue_priority} />,
      <Metric
        key="location"
        title={helpers.t("fields.location", "Location")}
        body={helpers.poiText(helpers.poi(route.repair_context.location_poi_id), "name")}
      />,
      <Metric
        key="desc"
        title={helpers.t("fields.description", "Description")}
        body={helpers.t("repair.exampleDescription", route.repair_context.example_description)}
      />
    ];
  }
  if (task.type === "robot_patrol") {
    const exportData = {
      task_id: task.id,
      route_id: route.id,
      robot_types: route.robot_context.allowed_robot_types,
      route: route.waypoints.map((waypoint) => ({ poi_id: waypoint.poi_id, action: waypoint.instruction })),
      privacy_policy: { require_property_approval: true, store_raw_video: false, enter_private_space: false }
    };
    return <pre className="json-card">{JSON.stringify(exportData, null, 2)}</pre>;
  }
  return [
    <Metric key="rv" title={helpers.t("fields.residentValue", "Resident value")} body={helpers.taskText(task, "user_value")} />,
    <Metric key="pv" title={helpers.t("fields.propertyValue", "Property value")} body={helpers.taskText(task, "property_value")} />,
    route && (
      <Metric
        key="time"
        title={helpers.t("fields.estimatedTime", "Estimated time")}
        body={`${route.estimated_minutes} ${helpers.t("units.minutes", "minutes")}`}
      />
    ),
    route && (
      <Metric key="distance" title={helpers.t("fields.distance", "Distance")} body={`${route.distance_meters} ${helpers.t("units.meters", "meters")}`} />
    )
  ];
}

function PulseParticipationCard({ helpers, pulse, pulseStage, operationalState, onJoin, onCheckin, onLeave }) {
  const joined = hasActivePulsePlace(pulseStage);
  const checkedIn = pulseStage === "checked_in";
  const acceptingJoins = isPulseAcceptingJoins(operationalState);
  const xp = pulse.resident_xp ?? pulse.reward.xp;

  return (
    <article className="pulse-participation-card">
      <div>
        <span>{helpers.t("pulse.participation", "Pulse participation")}</span>
        <strong>{helpers.t(`pulse.stage.${pulseStage}`, pulseStage.replaceAll("_", " "))}</strong>
      </div>
      <ol>
        <li className="done">{helpers.t("pulse.steps.matched", "Matched by interests and availability")}</li>
        <li className={joined ? "done" : ""}>{helpers.t("pulse.steps.joined", "Confirm a low-pressure participant slot")}</li>
        <li className={checkedIn ? "done" : ""}>{helpers.t("pulse.steps.checkedIn", "Check in at the real community space")}</li>
      </ol>
      {!joined && acceptingJoins && <button onClick={onJoin}>{helpers.t("pulse.join", "Join the pulse")}</button>}
      {!joined && !acceptingJoins && <p>{helpers.t(`pulse.unavailable.${operationalState}`, "This Pulse is not accepting new participants.")}</p>}
      {joined && !checkedIn && (
        <div className="participation-actions">
          <button disabled={!canCheckinPulse(pulseStage, operationalState)} onClick={onCheckin}>{helpers.t("pulse.checkin", "Simulate arrival check-in")}</button>
          <button onClick={onLeave}>{helpers.t("pulse.leave", "Leave pulse")}</button>
        </div>
      )}
      {checkedIn && (
        <p>
          <strong>+{xp} XP</strong>
          {helpers.t("pulse.identityUpgrade", "This progress was added to your resident identity.")}
        </p>
      )}
      <small>{helpers.t("pulse.safety", "Profiles stay private until participation is mutually confirmed.")}</small>
    </article>
  );
}

function QuestIdentityCard({ activity, helpers, route, onSelectTask }) {
  const totalCheckins = route?.waypoints.length ?? 0;
  const completedCheckins = Math.min(2, totalCheckins);
  const reward = activity?.rewards?.[0]?.name ?? "Community Spirit Seeker";
  const nextSideQuests = [
    {
      taskId: "task-join-evening-basketball",
      title: helpers.t("quest.sideQuests.sports.title", "Find the evening basketball meetup"),
      time: helpers.t("quest.sideQuests.sports.time", "Tonight 20:00-21:30"),
      place: helpers.t("quest.sideQuests.sports.place", "Basketball Court"),
      status: helpers.t("quest.sideQuests.sports.status", "Draft party"),
      action: helpers.t("quest.sideQuests.sports.action", "Bring one neighbor or join solo.")
    },
    {
      taskId: "task-join-parent-child-activity",
      title: helpers.t("quest.sideQuests.family.title", "Join a parent-child weekend activity"),
      time: helpers.t("quest.sideQuests.family.time", "Saturday 10:00-11:30"),
      place: helpers.t("quest.sideQuests.family.place", "Kids' Playground"),
      status: helpers.t("quest.sideQuests.family.status", "Open signup"),
      action: helpers.t("quest.sideQuests.family.action", "Check in to unlock the family explorer stamp.")
    },
    {
      taskId: "task-maintain-shared-world",
      title: helpers.t("quest.sideQuests.helper.title", "Report one world maintenance issue"),
      time: helpers.t("quest.sideQuests.helper.time", "Anytime this week"),
      place: helpers.t("quest.sideQuests.helper.place", "Shared outdoor areas"),
      status: helpers.t("quest.sideQuests.helper.status", "Resident helper"),
      action: helpers.t("quest.sideQuests.helper.action", "Submit one location-aware issue to help maintain the world.")
    }
  ];

  return (
    <article className="quest-identity-card">
      <div className="quest-identity-header">
        <div>
          <span>{helpers.t("quest.identityLabel", "Resident Identity")}</span>
          <strong>{helpers.t("quest.identityName", "Community Spirit Seeker")}</strong>
        </div>
        <b>{helpers.t("quest.level", "Lv. 1")}</b>
      </div>
      <div className="quest-progress">
        <div>
          <span>{helpers.t("quest.progress", "Quest progress")}</span>
          <strong>
            {completedCheckins}/{totalCheckins || 4}
          </strong>
        </div>
        <i style={{ width: `${totalCheckins ? (completedCheckins / totalCheckins) * 100 : 50}%` }}></i>
      </div>
      <div className="quest-reward">
        <span>{helpers.t("quest.badgeReward", "Badge reward")}</span>
        <strong>{reward}</strong>
      </div>
      <div className="quest-sidequests">
        <span>{helpers.t("quest.nextSideQuests", "Next side quests")}</span>
        <ul>
          {nextSideQuests.map((quest) => (
            <li key={quest.title}>
              <button className="sidequest-button" onClick={() => onSelectTask(quest.taskId)}>
              <strong>{quest.title}</strong>
              <small>{quest.time}</small>
              <em>{quest.place}</em>
              <b>{quest.status}</b>
              <p>{quest.action}</p>
              <span>{helpers.t("quest.openSideQuest", "Open side quest ->")}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ScheduleCard({ task, activity, helpers }) {
  const schedule = task.schedule_context;
  if (!schedule && !activity?.time_window) return null;

  return (
    <article className="schedule-card">
      <span>{helpers.t("schedule.eyebrow", "Scheduled side quest")}</span>
      <dl>
        <div>
          <dt>{helpers.t("schedule.time", "Time")}</dt>
          <dd>{helpers.taskText(task, "schedule_time") || schedule?.time_label || activity?.time_window?.start}</dd>
        </div>
        <div>
          <dt>{helpers.t("schedule.place", "Place")}</dt>
          <dd>{helpers.taskText(task, "schedule_place") || schedule?.place_label}</dd>
        </div>
        <div>
          <dt>{helpers.t("schedule.status", "Status")}</dt>
          <dd>{helpers.taskText(task, "schedule_status") || schedule?.participation_status || activity?.status.replaceAll("_", " ")}</dd>
        </div>
      </dl>
      <p>{helpers.taskText(task, "schedule_action") || schedule?.action_hint}</p>
    </article>
  );
}
