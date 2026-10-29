import React, { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import AttendanceRow from "../components/attendance/AttendanceRow";
import AttendanceSummary from "../components/attendance/AttendanceSummary";
import { getTodayDate, formatDateForDisplay } from "../utils/validation";
import {
  getAttendanceWithStudentDetails,
  markAttendance,
  getAttendanceSummaryForDate,
} from "../services/attendanceService";
import "../styles/attendance-page.css";

export default function Attendance() {
  const [date, setDate] = useState(getTodayDate());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    loadAttendance();
  }, [date]);

  const loadAttendance = () => {
    const records = getAttendanceWithStudentDetails(date);
    const attendanceSummary = getAttendanceSummaryForDate(date);
    setAttendanceRecords(records);
    setSummary(attendanceSummary);
  };

  const handleAttendanceChange = (studentId, status) => {
    markAttendance(date, studentId, status);
    loadAttendance();
  };

  const handleMarkAllPresent = () => {
    attendanceRecords.forEach((record) => {
      markAttendance(date, record.id, "present");
    });
    loadAttendance();
  };

  if (attendanceRecords.length === 0 && summary) {
    return (
      <AdminLayout>
        <div className="page-container">
          <div className="page-header">
            <h1>Daily Attendance</h1>
          </div>

          <div className="empty-state">
            <p>No students found.</p>
            <p className="empty-state-hint">Add students first to mark attendance.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Daily Attendance</h1>
          <p className="page-subtitle">
            {formatDateForDisplay(date)}
          </p>
        </div>

        <div className="attendance-controls">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />
          <button onClick={handleMarkAllPresent} className="btn btn-success">
            ✓ Mark All Present
          </button>
        </div>

        {summary && <AttendanceSummary summary={summary} />}

        <div className="attendance-list">
          {attendanceRecords.map((record) => (
            <AttendanceRow
              key={record.id}
              student={record}
              attendance={record.attendance}
              onChange={(status) => handleAttendanceChange(record.id, status)}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
