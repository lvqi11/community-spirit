export function Topbar({ helpers, language, onLanguage }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{helpers.t("app.eyebrow", "Community Spirit Open Prototype")}</p>
        <h1>{helpers.t("app.title", "Community Spirit")}</h1>
        <p className="title-subtitle">
          {helpers.t(
            "app.subtitle",
            "A community life RPG engine that turns OmniWeave Community into quests, activities, world operations, and robot-ready reality tasks."
          )}
        </p>
        <div className="world-mode-strip" aria-label="Community Spirit product directions">
          <span>{helpers.t("app.modes.rpg", "Living RPG")}</span>
          <span>{helpers.t("app.modes.quest", "Spatial quest engine")}</span>
          <span>{helpers.t("app.modes.ops", "World ops console")}</span>
          <span>{helpers.t("app.modes.robot", "Robot-ready reality layer")}</span>
        </div>
      </div>
      <div className="topbar-actions">
        <div className="topbar-meta">
          <span>{helpers.t("badges.digitalTwin", "Community life RPG")}</span>
          <span>{helpers.t("badges.spatialTasks", "Spatial tasks")}</span>
          <span>{helpers.t("badges.robotReady", "Robot-ready map")}</span>
        </div>
        <div className="language-switch">
          <button className={language === "en" ? "active" : ""} onClick={() => onLanguage("en")}>
            EN
          </button>
          <button className={language === "zh" ? "active" : ""} onClick={() => onLanguage("zh")}>
            中
          </button>
        </div>
      </div>
    </header>
  );
}
