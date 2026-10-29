import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentStudents from "../components/dashboard/RecentStudents";
import { getActiveStudents, getDeskAvailability } from "../services/studentService";
import { getTodayAttendanceSummary } from "../services/attendanceService";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const students = getActiveStudents();
    const deskAvailability = getDeskAvailability();
    const attendance = getTodayAttendanceSummary();

    setStudents(students);
    setStats(deskAvailability);
    setAttendanceSummary(attendance);
  }, []);

  if (!stats || !attendanceSummary) {
    return (
      <AdminLayout>
        <div className="page-container">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p className="page-subtitle">Welcome to Study Library Management System</p>
        </div>

        <div className="stats-grid">
          <StatCard
            icon="📚"
            title="Total Students"
            value={stats.occupiedCount}
            color="blue"
          />
          <StatCard
            icon="🏢"
            title="Total Desks"
            value={stats.totalDesks}
            color="purple"
          />
          <StatCard
            icon="✓"
            title="Occupied Desks"
            value={stats.occupiedCount}
            color="green"
          />
          <StatCard
            icon="◯"
            title="Empty Desks"
            value={stats.emptyCount}
            color="orange"
          />
          <StatCard
            icon="👥"
            title="Present Today"
            value={attendanceSummary.present}
            color="green"
          />
          <StatCard
            icon="❌"
            title="Absent Today"
            value={attendanceSummary.absent}
            color="red"
          />
        </div>

        <div className="dashboard-sections">
          <div className="dashboard-section">
            <RecentStudents students={students} />
          </div>

          <div className="dashboard-section">
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                <Link to="/students/add" className="action-link">
                  <span>➕</span> Add Student
                </Link>
                <Link to="/students" className="action-link">
                  <span>👥</span> View All Students
                </Link>
                <Link to="/desks" className="action-link">
                  <span>🏢</span> View Desks
                </Link>
                <Link to="/attendance" className="action-link">
                  <span>✓</span> Mark Attendance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
