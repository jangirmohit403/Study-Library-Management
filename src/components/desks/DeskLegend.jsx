import React from "react";
import "../../styles/desk-legend.css";

export default function DeskLegend({ stats }) {
  return (
    <div className="desk-legend">
      <div className="legend-item">
        <div className="legend-label">Total Desks</div>
        <div className="legend-value">{stats.totalDesks}</div>
      </div>
      <div className="legend-item">
        <div className="legend-indicator occupied"></div>
        <div className="legend-label">Occupied</div>
        <div className="legend-value">{stats.occupiedCount}</div>
      </div>
      <div className="legend-item">
        <div className="legend-indicator empty"></div>
        <div className="legend-label">Empty</div>
        <div className="legend-value">{stats.emptyCount}</div>
      </div>
    </div>
  );
}
