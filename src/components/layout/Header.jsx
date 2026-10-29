import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import "../../styles/header.css";

export default function Header({ onMenuClick }) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-IN", { hour12: true })
  );

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-IN", { hour12: true }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="admin-header">
      <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
        <Menu size={24} />
      </button>
      <div className="header-content">
        <h2 className="header-title">Admin Panel</h2>
        <div className="header-info">
          <p className="header-date">{today}</p>
          <p className="header-clock">{currentTime}</p>
        </div>
      </div>
    </header>
  );
}
