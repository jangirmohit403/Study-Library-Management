import React from "react";
import { Link } from "react-router-dom";
import "../../styles/recent-items.css";

export default function RecentStudents({ students }) {
  const recentStudents = students.slice(0, 5);

  if (recentStudents.length === 0) {
    return (
      <div className="recent-section">
        <h3>Recent Students</h3>
        <p className="no-data">No students yet</p>
      </div>
    );
  }

  return (
    <div className="recent-section">
      <h3>Recent Students</h3>
      <div className="recent-list">
        {recentStudents.map((student) => (
          <Link
            key={student.id}
            to={`/students/${student.id}`}
            className="recent-item"
          >
            <div className="recent-info">
              <p className="recent-name">{student.name}</p>
              <p className="recent-desk">Desk {student.deskNumber}</p>
            </div>
            <span className="recent-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
