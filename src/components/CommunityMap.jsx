import { labelOverrides } from "../data";
import { poiColor, routePoints } from "../domain";

const buildingBlocks = [
  { x: 18, y: 66, width: 28, height: 24 },
  { x: 70, y: 54, width: 28, height: 24 },
  { x: 16, y: 120, width: 28, height: 24 },
  { x: 72, y: 120, width: 28, height: 24 },
  { x: 126, y: 138, width: 24, height: 20 }
];

export function CommunityMap({ data, helpers, selectedRoute, selectedTask, onPoi }) {
  const points = routePoints(selectedRoute, helpers);
  const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${210 - point.y}`).join(" ");

  return (
    <div className="map-frame">
      <svg id="communityMap" viewBox="0 0 190 210" role="img" aria-label="OmniWeave Community map">
        <rect x="8" y="8" width="154" height="194" rx="4" fill="rgba(255,255,255,0.25)" stroke="rgba(27,37,32,0.22)" />
        {buildingBlocks.map((block, index) => (
          <rect className="building-block" key={index} {...block} rx="2" />
        ))}
        <ellipse cx="82" cy="102" rx="34" ry="24" fill="rgba(68,160,118,0.14)" stroke="rgba(24,116,91,0.25)" />
        {points.length > 1 && <path d={pathData} className="route-shadow" />}
        {points.length > 1 && <path d={pathData} className="route-line" />}
        {data.pois.map((poi) => {
          const override = labelOverrides[poi.id];
          const labelOnLeft = poi.position.x > 118;
          const labelX = poi.position.x + (override?.dx ?? (labelOnLeft ? -6 : 6));
          const labelY = 210 - poi.position.y + (override?.dy ?? 1.8);
          const labelAnchor = override?.anchor ?? (labelOnLeft ? "end" : "start");
          return (
            <g
              className={`poi ${selectedTask?.target_poi_id === poi.id ? "selected" : ""}`}
              key={poi.id}
              onClick={() => onPoi(poi)}
              role="button"
              tabIndex="0"
            >
              <circle cx={poi.position.x} cy={210 - poi.position.y} r="4.8" fill={poiColor(poi)} />
              <text x={labelX} y={labelY} textAnchor={labelAnchor}>
                {override?.label ?? helpers.poiText(poi, "name")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
