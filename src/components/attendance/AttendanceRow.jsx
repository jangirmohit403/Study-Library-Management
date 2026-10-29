import React from "react";
import "../../styles/attendance-row.css";

export default function AttendanceRow({ student, attendance, onChange }) {
  return (
    <div className="attendance-row">
      <div className="attendance-student-info">
        <p className="attendance-name">{student.name}</p>
        <p className="attendance-phone">{student.phone}</p>
        <p className="attendance-desk">Desk {student.deskNumber}</p>
      </div>
      <div className="attendance-buttons">
        <button
          className={`attendance-btn present-btn ${
            attendance === "present" ? "active" : ""
          }`}
          onClick={() => onChange("present")}
        >
          ✓ Present
        </button>
        <button
          className={`attendance-btn absent-btn ${
            attendance === "absent" ? "active" : ""
          }`}
          onClick={() => onChange("absent")}
        >
          ✗ Absent
        </button>
        {attendance && (
          <button
            className="attendance-btn clear-btn"
            onClick={() => onChange(null)}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
