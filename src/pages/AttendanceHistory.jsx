import React, { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { getTodayDate, formatDateForDisplay, formatDateShort } from "../utils/validation";
import {
  getAttendanceHistory,
  getAttendanceSummaryForDate,
} from "../services/attendanceService";
import "../styles/attendance-history.css";

export default function AttendanceHistory() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [history, setHistory] = useState({});
  const [summary, setSummary] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const allHistory = getAttendanceHistory();
    setHistory(allHistory);
    
    const dates = Object.keys(allHistory).sort().reverse();
    setAvailableDates(dates);

    // Set selected date to first available or today
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const attendanceSummary = getAttendanceSummaryForDate(selectedDate);
      setSummary(attendanceSummary);
    }
  }, [selectedDate]);

  if (availableDates.length === 0) {
    return (
      <AdminLayout>
        <div className="page-container">
          <div className="page-header">
            <h1>Attendance History</h1>
          </div>

          <div className="empty-state">
            <p>No attendance records found.</p>
            <p className="empty-state-hint">
              Start marking attendance to view history.
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Attendance History</h1>
          <p className="page-subtitle">View past attendance records</p>
        </div>

        <div className="history-selector">
          <label htmlFor="date-select">Select Date:</label>
          <select
            id="date-select"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-select"
          >
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {formatDateShort(date)}
              </option>
            ))}
          </select>
        </div>

        {summary && (
          <div className="history-summary-section">
            <h3>{formatDateForDisplay(selectedDate)}</h3>
            <div className="history-summary">
              <div className="summary-card">
                <span className="card-label">Total Students</span>
                <span className="card-value">{summary.totalStudents}</span>
              </div>
              <div className="summary-card present-card">
                <span className="card-label">Present</span>
                <span className="card-value">{summary.present}</span>
              </div>
              <div className="summary-card absent-card">
                <span className="card-label">Absent</span>
                <span className="card-value">{summary.absent}</span>
              </div>
              <div className="summary-card not-marked-card">
                <span className="card-label">Not Marked</span>
                <span className="card-value">{summary.notMarked}</span>
              </div>
              <div className="summary-card percentage-card">
                <span className="card-label">Attendance %</span>
                <span className="card-value">{summary.percentage}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
