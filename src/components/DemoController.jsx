const steps = [
  { id: "match", view: "world" },
  { id: "join", view: "task" },
  { id: "checkin", view: "task" },
  { id: "claim", view: "task" },
  { id: "activate", view: "task" },
  { id: "redeem", view: "task" },
  { id: "ops", view: "ops" }
];

export function DemoController({ currentStep, helpers, isDemoMode, onReset, onRunStep, onToggleDemo, onView, viewMode }) {
  const activeStep = steps[Math.min(currentStep, steps.length - 1)];
  const completedSteps = Math.min(currentStep, steps.length);

  return (
    <section className="demo-controller">
      <div className="demo-controller-header">
        <div>
          <p className="eyebrow">{helpers.t("demo.eyebrow", "Hackathon Demo Mode")}</p>
          <h2>{helpers.t("demo.title", "One story, seven visible state changes")}</h2>
        </div>
        <div className="demo-controller-actions">
          <button className="demo-next-button" disabled={!isDemoMode || currentStep >= steps.length} onClick={() => onRunStep(currentStep)}>
            {currentStep >= steps.length
              ? helpers.t("demo.complete", "Story complete")
              : helpers.t("demo.next", "Run next step")}
          </button>
          <button className={isDemoMode ? "active" : ""} onClick={onToggleDemo}>
            {isDemoMode ? helpers.t("demo.on", "Demo mode on") : helpers.t("demo.off", "Demo mode off")}
          </button>
          <button onClick={onReset}>{helpers.t("demo.reset", "Reset story")}</button>
        </div>
      </div>
      <nav className="view-switcher" aria-label="Product view">
        {["world", "task", "ops"].map((view) => (
          <button className={viewMode === view ? "active" : ""} key={view} onClick={() => onView(view)}>
            {helpers.t(`demo.views.${view}`, view)}
          </button>
        ))}
      </nav>
      {isDemoMode && (
        <>
          <div className="demo-progress" aria-live="polite">
            <div>
              <span>{helpers.t("demo.progress", "Story progress")}</span>
              <strong>{completedSteps}/{steps.length}</strong>
            </div>
            <p>
              {currentStep >= steps.length
                ? helpers.t("demo.complete", "Story complete")
                : helpers.t(`demo.steps.${activeStep.id}.title`, activeStep.id)}
            </p>
            <i><span style={{ width: `${(completedSteps / steps.length) * 100}%` }}></span></i>
          </div>
          <div className="demo-steps">
            {steps.map((step, index) => (
              <button
                aria-current={index === currentStep ? "step" : undefined}
                className={`${index < currentStep ? "completed" : ""} ${index === currentStep ? "current" : ""}`}
                disabled={index > currentStep}
                key={step.id}
                onClick={() => onRunStep(index)}
              >
                <span>{index + 1}</span>
                <strong>{helpers.t(`demo.steps.${step.id}.title`, step.id)}</strong>
                <small>{helpers.t(`demo.steps.${step.id}.hint`, step.view)}</small>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
