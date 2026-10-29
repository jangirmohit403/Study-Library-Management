import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { logout } from "../../services/authService";
import "../../styles/sidebar.css";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavClick = () => {
    // Close sidebar on mobile after clicking
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">Study Library</h1>
          <button
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className="nav-link"
            onClick={handleNavClick}
          >
            <span>📊</span> Dashboard
          </Link>
          <Link
            to="/students"
            className="nav-link"
            onClick={handleNavClick}
          >
            <span>👥</span> Students
          </Link>
          <Link
            to="/students/add"
            className="nav-link"
            onClick={handleNavClick}
          >
            <span>➕</span> Add Student
          </Link>
          <Link
            to="/desks"
            className="nav-link"
            onClick={handleNavClick}
          >
            <span>🏢</span> Desks
          </Link>
          <Link
            to="/attendance"
            className="nav-link"
            onClick={handleNavClick}
          >
            <span>✓</span> Attendance
          </Link>
          <Link
            to="/attendance/history"
            className="nav-link"
            onClick={handleNavClick}
          >
            <span>📋</span> Attendance History
          </Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}
