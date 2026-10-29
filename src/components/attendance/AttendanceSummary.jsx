import React from "react";
import "../../styles/attendance-summary.css";

export default function AttendanceSummary({ summary }) {
  if (!summary) {
    return null;
  }

  return (
    <div className="attendance-summary">
      <div className="summary-item summary-total">
        <span className="summary-label">Total Students</span>
        <span className="summary-value">{summary.totalStudents}</span>
      </div>
      <div className="summary-item summary-present">
        <span className="summary-label">Present</span>
        <span className="summary-value">{summary.present}</span>
      </div>
      <div className="summary-item summary-absent">
        <span className="summary-label">Absent</span>
        <span className="summary-value">{summary.absent}</span>
      </div>
      <div className="summary-item summary-not-marked">
        <span className="summary-label">Not Marked</span>
        <span className="summary-value">{summary.notMarked}</span>
      </div>
      <div className="summary-item summary-percentage">
        <span className="summary-label">Attendance %</span>
        <span className="summary-value">{summary.percentage}%</span>
      </div>
    </div>
  );
}
