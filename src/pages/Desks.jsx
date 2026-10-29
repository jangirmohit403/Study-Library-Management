import React, { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import DeskGrid from "../components/desks/DeskGrid";
import DeskLegend from "../components/desks/DeskLegend";
import { getDeskAvailability, getOccupiedDesks } from "../services/studentService";
import "../styles/desks-page.css";

export default function Desks() {
  const [stats, setStats] = useState(null);
  const [occupiedDesks, setOccupiedDesks] = useState({});
  const [selectedDesk, setSelectedDesk] = useState(null);

  useEffect(() => {
    loadDeskData();
  }, []);

  const loadDeskData = () => {
    const availability = getDeskAvailability();
    const occupied = getOccupiedDesks();
    setStats(availability);
    setOccupiedDesks(occupied);
  };

  const handleDeskClick = (deskNumber, student) => {
    if (student) {
      setSelectedDesk(student);
    }
  };

  if (!stats) {
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
          <h1>Desk Availability</h1>
          <p className="page-subtitle">View desk status and assignments</p>
        </div>

        <DeskLegend stats={stats} />

        {selectedDesk && (
          <div className="desk-info-modal">
            <div className="desk-info-content">
              <button
                className="close-btn"
                onClick={() => setSelectedDesk(null)}
              >
                ✕
              </button>
              <h3>Desk {selectedDesk.deskNumber} - Assigned to</h3>
              <div className="student-info">
                <p className="student-name">{selectedDesk.name}</p>
                <p className="student-phone">📱 {selectedDesk.phone}</p>
                <p className="student-id">ID: #{selectedDesk.id}</p>
                <p className="joining-date">
                  Joined: {new Date(selectedDesk.joiningDate).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        )}

        <DeskGrid occupiedDesks={occupiedDesks} onDeskClick={handleDeskClick} />
      </div>
    </AdminLayout>
  );
}
