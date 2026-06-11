const DATA_BASE = "../../data/";

const state = {
  pois: [],
  routes: [],
  tasks: [],
  activities: [],
  i18n: null,
  language: "en",
  selectedTask: null,
  selectedRoute: null,
  selectedActivity: null,
};

const promptSamples = [
  {
    label: "Guide my guest to Building 3",
    prompt: "How can my guest get from the North Gate to Building 3?",
    taskId: "task-guide-visitor-to-building-3",
  },
  {
    label: "Find the package locker",
    prompt: "Where is the package locker from Building 3?",
    taskId: "task-pick-up-package",
  },
  {
    label: "Join weekend activity",
    prompt: "What activities are happening this weekend?",
    taskId: "task-join-parent-child-activity",
  },
  {
    label: "Report broken light",
    prompt: "I want to report a broken light near the kids' playground.",
    taskId: "task-report-playground-light",
  },
  {
    label: "Generate robot patrol",
    prompt: "Generate a patrol route for a service robot.",
    taskId: "task-robot-fire-passage-patrol",
  },
];

const labelOverrides = {
  "poi-kids-playground": { label: "Playground", dx: -7, dy: -7, anchor: "end" },
  "poi-fire-passage": { label: "Fire Pass.", dx: -7, dy: 9, anchor: "end" },
  "poi-basketball-court": { label: "Court", dx: -7, dy: 2, anchor: "end" },
  "poi-underground-garage-entrance": { label: "Garage", dx: -7, dy: 2, anchor: "end" },
  "poi-waste-collection": { label: "Waste Point", dx: 6, dy: 2, anchor: "start" },
  "poi-package-locker": { label: "Locker", dx: 6, dy: 2, anchor: "start" },
  "poi-property-center": { label: "Property", dx: 6, dy: 2, anchor: "start" },
};

const els = {
  langEnButton: document.querySelector("#langEnButton"),
  langZhButton: document.querySelector("#langZhButton"),
  promptInput: document.querySelector("#promptInput"),
  askButton: document.querySelector("#askButton"),
  promptButtons: document.querySelector("#promptButtons"),
  answerText: document.querySelector("#answerText"),
  communityMap: document.querySelector("#communityMap"),
  mapSubtitle: document.querySelector("#mapSubtitle"),
  taskTitle: document.querySelector("#taskTitle"),
  taskGoal: document.querySelector("#taskGoal"),
  taskChips: document.querySelector("#taskChips"),
  shareTaskButton: document.querySelector("#shareTaskButton"),
  exportTaskButton: document.querySelector("#exportTaskButton"),
  taskActionStatus: document.querySelector("#taskActionStatus"),
  routeSteps: document.querySelector("#routeSteps"),
  contextTitle: document.querySelector("#contextTitle"),
  contextBody: document.querySelector("#contextBody"),
  dashboardSummary: document.querySelector("#dashboardSummary"),
  dashboardMetrics: document.querySelector("#dashboardMetrics"),
  operationQueue: document.querySelector("#operationQueue"),
  spatialInsight: document.querySelector("#spatialInsight"),
};

async function loadJson(file) {
  const response = await fetch(`${DATA_BASE}${file}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${file}`);
  }
  return response.json();
}

async function boot() {
  try {
    const [poiData, routeData, taskData, activityData, i18nData] = await Promise.all([
      loadJson("sample-pois.json"),
      loadJson("sample-routes.json"),
      loadJson("sample-tasks.json"),
      loadJson("sample-activities.json"),
      loadJson("i18n.zh-CN.json").catch(() => null),
    ]);

    state.pois = poiData.pois;
    state.routes = routeData.routes;
    state.tasks = taskData.tasks;
    state.activities = activityData.activities;
    state.i18n = i18nData;

    applyLanguage();
    renderPromptButtons();
    selectTask(initialTaskId());
  } catch (error) {
    els.mapSubtitle.textContent = "Could not load demo data.";
    els.answerText.textContent = error.message;
  }
}

function byId(collection, id) {
  return collection.find((item) => item.id === id);
}

function getPoi(id) {
  return byId(state.pois, id);
}

function getRoute(id) {
  return byId(state.routes, id);
}

function getTask(id) {
  return byId(state.tasks, id);
}

function getActivity(id) {
  return byId(state.activities, id);
}

function renderPromptButtons() {
  els.promptButtons.innerHTML = "";
  promptSamples.forEach((sample) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = t(`promptSamples.${sample.taskId}`, sample.label);
    button.dataset.taskId = sample.taskId;
    button.addEventListener("click", () => {
      els.promptInput.value = sample.prompt;
      selectTask(sample.taskId);
    });
    els.promptButtons.appendChild(button);
  });
}

function initialTaskId() {
  const params = new URLSearchParams(window.location.search);
  const taskId = params.get("task");
  if (taskId && getTask(taskId)) return taskId;
  return promptSamples[0].taskId;
}

function matchPromptToTask(prompt) {
  const text = prompt.toLowerCase();
  if (text.includes("robot") || text.includes("patrol") || text.includes("fire")) {
    return "task-robot-fire-passage-patrol";
  }
  if (text.includes("broken") || text.includes("repair") || text.includes("light")) {
    return "task-report-playground-light";
  }
  if (text.includes("activity") || text.includes("weekend") || text.includes("parent")) {
    return "task-join-parent-child-activity";
  }
  if (text.includes("package") || text.includes("delivery") || text.includes("locker")) {
    return "task-pick-up-package";
  }
  if (text.includes("guest") || text.includes("visitor") || text.includes("building 3")) {
    return "task-guide-visitor-to-building-3";
  }
  return "task-guide-visitor-to-building-3";
}

function selectTask(taskId) {
  state.selectedTask = getTask(taskId);
  state.selectedRoute = state.selectedTask.linked_route_id
    ? getRoute(state.selectedTask.linked_route_id)
    : null;
  state.selectedActivity = state.selectedTask.linked_activity_id
    ? getActivity(state.selectedTask.linked_activity_id)
    : null;

  renderActivePrompt(taskId);
  renderMap();
  renderDetails();
  renderAnswer();
  renderDashboard();
  syncTaskUrl(taskId);
}

function renderActivePrompt(taskId) {
  document.querySelectorAll("#promptButtons button").forEach((button) => {
    button.classList.toggle("active", button.dataset.taskId === taskId);
  });
}

function svg(tag, attrs = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });
  return element;
}

function accessClass(poi) {
  if (poi.public_visibility === "property_only") return "property";
  if (poi.access_level.includes("resident")) return "resident";
  return "public";
}

function poiColor(poi) {
  const cls = accessClass(poi);
  if (cls === "property") return "#c07b22";
  if (cls === "resident") return "#18745b";
  return "#2f6fc2";
}

function routePoints(route) {
  if (!route) return [];
  return route.waypoints
    .map((waypoint) => {
      if (waypoint.poi_id) return getPoi(waypoint.poi_id)?.position;
      return waypoint.position;
    })
    .filter(Boolean);
}

function renderMap() {
  els.communityMap.innerHTML = "";
  els.mapSubtitle.textContent = t(
    "map.subtitle",
    "OmniWeave Community: POIs, routes, tasks, and robot-ready semantics.",
  );

  drawMapBackground();

  const route = state.selectedRoute;
  const points = routePoints(route);
  if (points.length > 1) {
    const d = points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${210 - point.y}`)
      .join(" ");

    els.communityMap.appendChild(svg("path", { d, class: "route-shadow" }));
    els.communityMap.appendChild(svg("path", { d, class: "route-line" }));
  }

  state.pois.forEach((poi) => renderPoi(poi));
}

function drawMapBackground() {
  const boundary = svg("rect", {
    x: 8,
    y: 8,
    width: 154,
    height: 194,
    rx: 4,
    fill: "rgba(255,255,255,0.25)",
    stroke: "rgba(27,37,32,0.22)",
    "stroke-width": 1,
  });
  els.communityMap.appendChild(boundary);

  [
    { x: 18, y: 66, width: 28, height: 24 },
    { x: 70, y: 54, width: 28, height: 24 },
    { x: 16, y: 120, width: 28, height: 24 },
    { x: 72, y: 120, width: 28, height: 24 },
    { x: 126, y: 138, width: 24, height: 20 },
  ].forEach((block) => {
    els.communityMap.appendChild(
      svg("rect", {
        ...block,
        rx: 2,
        class: "building-block",
      }),
    );
  });

  const garden = svg("ellipse", {
    cx: 82,
    cy: 102,
    rx: 34,
    ry: 24,
    fill: "rgba(68,160,118,0.14)",
    stroke: "rgba(24,116,91,0.25)",
    "stroke-width": 1,
  });
  els.communityMap.appendChild(garden);
}

function renderPoi(poi) {
  const override = labelOverrides[poi.id];
  const labelOnLeft = poi.position.x > 118;
  const labelX = poi.position.x + (override?.dx ?? (labelOnLeft ? -6 : 6));
  const labelY = 210 - poi.position.y + (override?.dy ?? 1.8);
  const labelAnchor = override?.anchor ?? (labelOnLeft ? "end" : "start");
  const label = override?.label ?? poi.name;
  const group = svg("g", {
    class: `poi ${state.selectedTask?.target_poi_id === poi.id ? "selected" : ""}`,
    tabindex: 0,
    role: "button",
    "aria-label": poi.name,
  });
  group.addEventListener("click", () => showPoiContext(poi));

  group.appendChild(
    svg("circle", {
      cx: poi.position.x,
      cy: 210 - poi.position.y,
      r: 4.8,
      fill: poiColor(poi),
    }),
  );
  group.appendChild(
    svg("text", {
      x: labelX,
      y: labelY,
      "text-anchor": labelAnchor,
    }),
  ).textContent = label;

  els.communityMap.appendChild(group);
}

function renderDetails() {
  const task = state.selectedTask;
  const route = state.selectedRoute;

  els.taskTitle.textContent = translateTask(task, "name");
  els.taskGoal.textContent = translateTask(task, "goal");

  els.taskChips.innerHTML = "";
  [task.type, task.primary_user_role, task.status, task.priority].forEach((value) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = value.replaceAll("_", " ");
    els.taskChips.appendChild(chip);
  });

  els.routeSteps.innerHTML = "";
  if (route) {
    route.waypoints.forEach((waypoint, index) => {
      const li = document.createElement("li");
      const poi = waypoint.poi_id ? getPoi(waypoint.poi_id) : null;
      li.textContent = poi
        ? `${translatePoi(poi, "name")}: ${translateWaypoint(route.id, index, waypoint.instruction)}`
        : translateWaypoint(route.id, index, waypoint.instruction);
      els.routeSteps.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "This task does not require a route yet.";
    els.routeSteps.appendChild(li);
  }

  renderContext();
}

function syncTaskUrl(taskId) {
  const url = new URL(window.location.href);
  url.searchParams.set("task", taskId);
  window.history.replaceState({}, "", url);
}

function currentTaskExport() {
  const task = state.selectedTask;
  const route = state.selectedRoute;
  const activity = state.selectedActivity;
  return {
    schema_version: "0.1.0",
    exported_at: new Date().toISOString(),
    community_id: "omniweave-community",
    task,
    route,
    activity,
    dashboard_context: {
      managed_pois: state.pois.length,
      robot_ready_pois: state.pois.filter((poi) => poi.robot_accessible).length,
      open_activities: state.activities.filter((item) => item.status === "open_for_signup").length,
    },
    data_policy: "fictional_or_synthetic_only",
  };
}

function taskShareUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("task", state.selectedTask.id);
  return url.toString();
}

async function copyTaskLink() {
  const url = taskShareUrl();
  try {
    await navigator.clipboard.writeText(url);
    showActionStatus(t("actions.linkCopied", "Task link copied."));
  } catch {
    showActionStatus(url);
  }
}

function exportTaskJson() {
  const data = JSON.stringify(currentTaskExport(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${state.selectedTask.id}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  showActionStatus(t("actions.exported", "Current workflow JSON exported."));
}

function showActionStatus(message) {
  els.taskActionStatus.textContent = message;
  window.clearTimeout(showActionStatus.timer);
  showActionStatus.timer = window.setTimeout(() => {
    els.taskActionStatus.textContent = "";
  }, 2600);
}

function renderContext() {
  const task = state.selectedTask;
  const route = state.selectedRoute;

  els.contextBody.innerHTML = "";

  if (task.type === "activity_participation" && state.selectedActivity) {
    els.contextTitle.textContent = t("context.activityTitle", "Activity Context");
    addMetric(t("fields.activity", "Activity"), translateActivity(state.selectedActivity, "name"));
    addMetric(
      t("fields.signup", "Signup"),
      state.selectedActivity.signup_required ? t("status.required", "Required") : t("status.notRequired", "Not required"),
    );
    addMetric(t("fields.residentValue", "Resident value"), translateActivity(state.selectedActivity, "resident_value"));
    addMetric(t("fields.propertyValue", "Property value"), translateActivity(state.selectedActivity, "property_value"));
    return;
  }

  if (task.type === "repair_reporting") {
    els.contextTitle.textContent = t("context.repairTitle", "Repair Ticket Preview");
    addMetric(t("fields.issueType", "Issue type"), route.repair_context.issue_type);
    addMetric(t("fields.priority", "Priority"), route.repair_context.issue_priority);
    addMetric(t("fields.location", "Location"), translatePoi(getPoi(route.repair_context.location_poi_id), "name"));
    addMetric(
      t("fields.description", "Description"),
      t("repair.exampleDescription", route.repair_context.example_description),
    );
    return;
  }

  if (task.type === "robot_patrol") {
    els.contextTitle.textContent = t("context.robotTitle", "Robot-ready Export");
    const exportData = {
      task_id: task.id,
      route_id: route.id,
      robot_types: route.robot_context.allowed_robot_types,
      route: route.waypoints.map((waypoint) => ({
        poi_id: waypoint.poi_id,
        action: waypoint.instruction,
      })),
      privacy_policy: {
        require_property_approval: true,
        store_raw_video: false,
        enter_private_space: false,
      },
    };
    addJson(exportData);
    return;
  }

  els.contextTitle.textContent = t("context.valueTitle", "Task Value");
  addMetric(t("fields.residentValue", "Resident value"), translateTask(task, "user_value"));
  addMetric(t("fields.propertyValue", "Property value"), translateTask(task, "property_value"));
  if (route) {
    addMetric(t("fields.estimatedTime", "Estimated time"), `${route.estimated_minutes} ${t("units.minutes", "minutes")}`);
    addMetric(t("fields.distance", "Distance"), `${route.distance_meters} ${t("units.meters", "meters")}`);
  }
}

function addMetric(title, body) {
  const card = document.createElement("div");
  card.className = "metric-card";
  card.innerHTML = `<strong>${escapeHtml(title)}</strong><p>${escapeHtml(String(body))}</p>`;
  els.contextBody.appendChild(card);
}

function addJson(data) {
  const pre = document.createElement("pre");
  pre.className = "json-card";
  pre.textContent = JSON.stringify(data, null, 2);
  els.contextBody.appendChild(pre);
}

function renderAnswer() {
  const task = state.selectedTask;
  const route = state.selectedRoute;
  const outputs = task.expected_outputs.map((item) => item.replaceAll("_", " ")).join(", ");
  if (state.language === "zh" && state.i18n) {
    const routePart = route ? ` 已绑定路线：${translateRoute(route, "name")}。` : "";
    els.answerText.textContent = `已将意图匹配到「${translateTask(task, "name")}」。${routePart}预期输出：${outputs}。`;
    return;
  }

  const routePart = route ? ` It uses ${route.name}.` : "";
  els.answerText.textContent = `Matched intent to "${task.name}".${routePart} Expected outputs: ${outputs}.`;
}

function showPoiContext(poi) {
  els.contextTitle.textContent = t("context.poiTitle", "POI Detail");
  els.contextBody.innerHTML = "";
  addMetric(t("fields.name", "Name"), translatePoi(poi, "name"));
  addMetric(t("fields.type", "Type"), poi.type.replaceAll("_", " "));
  addMetric(t("fields.access", "Access"), poi.access_level.replaceAll("_", " "));
  addMetric(t("fields.robotAccessible", "Robot accessible"), poi.robot_accessible ? t("status.yes", "Yes") : t("status.no", "No"));
  addMetric(t("fields.description", "Description"), translatePoi(poi, "description"));
}

function renderDashboard() {
  const openActivities = state.activities.filter((activity) => activity.status === "open_for_signup").length;
  const repairTasks = state.tasks.filter((task) => task.type === "repair_reporting").length;
  const robotRoutes = state.routes.filter((route) => route.scenario === "robot_patrol").length;
  const robotPois = state.pois.filter((poi) => poi.robot_accessible).length;
  const propertyTasks = state.tasks.filter((task) =>
    task.secondary_user_roles.includes("property_operator") || task.primary_user_role === "property_operator",
  );

  els.dashboardSummary.textContent = t(
    "dashboard.summary",
    "A compact operator view derived from the same public prototype data.",
  );

  const metrics = [
    { label: t("dashboard.metrics.pois", "Managed POIs"), value: state.pois.length },
    { label: t("dashboard.metrics.openActivities", "Open activities"), value: openActivities },
    { label: t("dashboard.metrics.repairTickets", "Repair tickets"), value: repairTasks },
    { label: t("dashboard.metrics.robotReady", "Robot-ready POIs"), value: robotPois },
  ];

  els.dashboardMetrics.innerHTML = "";
  metrics.forEach((metric) => {
    const card = document.createElement("div");
    card.className = "dashboard-metric";
    card.innerHTML = `<strong>${escapeHtml(String(metric.value))}</strong><span>${escapeHtml(metric.label)}</span>`;
    els.dashboardMetrics.appendChild(card);
  });

  els.operationQueue.innerHTML = "";
  propertyTasks.slice(0, 4).forEach((task) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "queue-item";
    item.innerHTML = `<strong>${escapeHtml(translateTask(task, "name"))}</strong><span>${escapeHtml(task.status.replaceAll("_", " "))}</span>`;
    item.addEventListener("click", () => selectTask(task.id));
    els.operationQueue.appendChild(item);
  });

  const selectedRoute = state.selectedRoute;
  const selectedDistance = selectedRoute ? `${selectedRoute.distance_meters} ${t("units.meters", "meters")}` : t("status.noRoute", "No route");
  els.spatialInsight.innerHTML = `
    <strong>${escapeHtml(t("dashboard.insightSelected", "Selected workflow"))}</strong>
    <p>${escapeHtml(translateTask(state.selectedTask, "name"))}</p>
    <dl>
      <div><dt>${escapeHtml(t("fields.distance", "Distance"))}</dt><dd>${escapeHtml(selectedDistance)}</dd></div>
      <div><dt>${escapeHtml(t("dashboard.metrics.robotRoutes", "Robot routes"))}</dt><dd>${escapeHtml(String(robotRoutes))}</dd></div>
    </dl>
  `;
}

function applyLanguage() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    if (!node.dataset.i18nDefault) node.dataset.i18nDefault = node.textContent;
    const fallback = node.dataset.i18nDefault;
    node.textContent = t(node.dataset.i18n, fallback);
  });
  els.langEnButton.classList.toggle("active", state.language === "en");
  els.langZhButton.classList.toggle("active", state.language === "zh");
}

function t(path, fallback) {
  if (state.language !== "zh" || !state.i18n) return fallback;
  return path.split(".").reduce((value, key) => value?.[key], state.i18n) ?? fallback;
}

function translateEntity(group, entity, field) {
  if (state.language !== "zh" || !entity || !state.i18n) return entity?.[field] ?? "";
  return state.i18n.entities?.[group]?.[entity.id]?.[field] ?? entity[field] ?? "";
}

function translatePoi(poi, field) {
  return translateEntity("pois", poi, field);
}

function translateRoute(route, field) {
  return translateEntity("routes", route, field);
}

function translateTask(task, field) {
  return translateEntity("tasks", task, field);
}

function translateActivity(activity, field) {
  return translateEntity("activities", activity, field);
}

function translateWaypoint(routeId, index, fallback) {
  if (state.language !== "zh" || !state.i18n) return fallback;
  return state.i18n.entities?.routes?.[routeId]?.waypoints?.[index] ?? fallback;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

els.askButton.addEventListener("click", () => {
  selectTask(matchPromptToTask(els.promptInput.value));
});

els.promptInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    selectTask(matchPromptToTask(els.promptInput.value));
  }
});

els.shareTaskButton.addEventListener("click", copyTaskLink);
els.exportTaskButton.addEventListener("click", exportTaskJson);

els.langEnButton.addEventListener("click", () => {
  state.language = "en";
  applyLanguage();
  renderPromptButtons();
  selectTask(state.selectedTask?.id ?? initialTaskId());
});

els.langZhButton.addEventListener("click", () => {
  state.language = "zh";
  applyLanguage();
  renderPromptButtons();
  selectTask(state.selectedTask?.id ?? initialTaskId());
});

boot();
