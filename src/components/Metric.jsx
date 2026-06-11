export function Metric({ title, body }) {
  return (
    <div className="metric-card">
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}
