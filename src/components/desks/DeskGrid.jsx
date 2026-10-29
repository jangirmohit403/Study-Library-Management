import React from "react";
import DeskCard from "./DeskCard";
import "../../styles/desk-grid.css";

export default function DeskGrid({ occupiedDesks, onDeskClick }) {
  const deskSections = [
    { label: "Boys' Desks (1–33)", desks: Array.from({ length: 33 }, (_, i) => i + 1) },
    { label: "Girls' Desks (34–57)", desks: Array.from({ length: 24 }, (_, i) => i + 34) },
  ];

  return (
    <div className="desk-sections">
      {deskSections.map(({ label, desks }) => (
        <section key={label} className="desk-section">
          <h2>{label}</h2>
          <div className="desk-grid">
            {desks.map((deskNumber) => (
              <DeskCard
                key={deskNumber}
                deskNumber={deskNumber}
                student={occupiedDesks[deskNumber] || null}
                onClick={() => onDeskClick?.(deskNumber, occupiedDesks[deskNumber])}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
