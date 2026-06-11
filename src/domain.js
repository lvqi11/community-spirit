import zhCn from "../data/i18n.zh-CN.json";

export function createHelpers(data, language) {
  const byId = (items, id) => items.find((item) => item.id === id);
  const t = (path, fallback) => {
    if (language !== "zh") return fallback;
    return path.split(".").reduce((value, key) => value?.[key], zhCn) ?? fallback;
  };
  const entity = (group, item, field) => {
    if (!item) return "";
    if (language !== "zh") return item[field] ?? "";
    return zhCn.entities?.[group]?.[item.id]?.[field] ?? item[field] ?? "";
  };

  return {
    t,
    poi: (id) => byId(data.pois, id),
    route: (id) => byId(data.routes, id),
    task: (id) => byId(data.tasks, id),
    activity: (id) => byId(data.activities, id),
    season: (id) => byId(data.seasons, id),
    benefit: (id) => byId(data.benefits, id),
    poiText: (item, field) => entity("pois", item, field),
    routeText: (item, field) => entity("routes", item, field),
    taskText: (item, field) => entity("tasks", item, field),
    activityText: (item, field) => entity("activities", item, field),
    pulseText: (item, field) => entity("pulses", item, field),
    profileText: (item, field) => entity("profiles", item, field),
    seasonText: (item, field) => entity("seasons", item, field),
    benefitText: (item, field) => entity("benefits", item, field),
    waypointText: (routeId, index, fallback) =>
      language === "zh" ? zhCn.entities?.routes?.[routeId]?.waypoints?.[index] ?? fallback : fallback
  };
}

export function matchPromptToTask(prompt) {
  const text = prompt.toLowerCase();
  if (text.includes("basketball") || text.includes("sports") || text.includes("约球") || text.includes("篮球")) return "task-join-evening-basketball";
  if (text.includes("maintenance") || text.includes("maintain") || text.includes("shared area") || text.includes("维护")) return "task-maintain-shared-world";
  if (text.includes("quest") || text.includes("explore") || text.includes("badge") || text.includes("rpg")) return "task-community-explorer-quest";
  if (text.includes("robot") || text.includes("patrol") || text.includes("fire")) return "task-robot-fire-passage-patrol";
  if (text.includes("broken") || text.includes("repair") || text.includes("light")) return "task-report-playground-light";
  if (text.includes("activity") || text.includes("weekend") || text.includes("parent")) return "task-join-parent-child-activity";
  if (text.includes("package") || text.includes("delivery") || text.includes("locker")) return "task-pick-up-package";
  return "task-guide-visitor-to-building-3";
}

export function routePoints(route, helpers) {
  if (!route) return [];
  return route.waypoints
    .map((waypoint) => (waypoint.poi_id ? helpers.poi(waypoint.poi_id)?.position : waypoint.position))
    .filter(Boolean);
}

export function accessClass(poi) {
  if (poi.public_visibility === "property_only") return "property";
  if (poi.access_level.includes("resident")) return "resident";
  return "public";
}

export function poiColor(poi) {
  const cls = accessClass(poi);
  if (cls === "property") return "#c07b22";
  if (cls === "resident") return "#18745b";
  return "#2f6fc2";
}

export function answerText(task, route, helpers, language) {
  const outputs = task.expected_outputs.map((item) => item.replaceAll("_", " ")).join(", ");
  if (language === "zh") {
    const routePart = route ? ` 已绑定路线：${helpers.routeText(route, "name")}。` : "";
    return `已将意图匹配到“${helpers.taskText(task, "name")}”。${routePart}预期输出：${outputs}。`;
  }
  const routePart = route ? ` It uses ${route.name}.` : "";
  return `Matched intent to "${task.name}".${routePart} Expected outputs: ${outputs}.`;
}

export function rankPulses(pulses, resident) {
  return pulses
    .map((pulse) => {
      const interestMatches = pulse.match_tags.filter((tag) => resident.interests.includes(tag));
      const availabilityMatches = pulse.availability_tags.filter((tag) => resident.availability.includes(tag));
      const socialMatch = pulse.social_modes.includes(resident.social_mode);
      const distanceScore = Math.max(0, 12 - pulse.distance_minutes);
      const score = interestMatches.length * 24 + availabilityMatches.length * 18 + (socialMatch ? 16 : 0) + distanceScore;
      return {
        pulse,
        score,
        reasons: {
          interestMatches,
          availabilityMatches,
          socialMatch
        }
      };
    })
    .sort((left, right) => right.score - left.score || left.pulse.distance_minutes - right.pulse.distance_minutes);
}

export function seasonForPulse(seasons, pulseId) {
  return seasons.find((season) => season.linked_pulse_ids.includes(pulseId));
}

export function residentLevel(xp) {
  return Math.max(1, Math.floor(xp / 150) + 1);
}
