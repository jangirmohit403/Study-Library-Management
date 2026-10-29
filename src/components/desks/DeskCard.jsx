import React from "react";
import "../../styles/desk-card.css";

export default function DeskCard({ deskNumber, student, onClick }) {
  const isOccupied = !!student;

  return (
    <div
      className={`desk-card ${isOccupied ? "occupied" : "empty"}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="desk-number">Desk {deskNumber}</div>
      {isOccupied ? (
        <div className="desk-content">
          <div className="occupancy-status occupied">OCCUPIED</div>
          <div className="student-name">{student.name}</div>
          <div className="student-phone">{student.phone}</div>
        </div>
      ) : (
        <div className="desk-content">
          <div className="occupancy-status empty">EMPTY</div>
        </div>
      )}
    </div>
  );
}
