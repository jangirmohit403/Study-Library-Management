import React from "react";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";
import { getFeeStatus } from "../../services/studentService";
import "../../styles/student-table.css";

export default function StudentTable({ students, onDelete, onMarkFeePaid, onSendReminder }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>No students found.</p>
        <p className="empty-state-hint">Add your first student to start managing the library.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Desk</th>
            <th>Joining Date</th>
            <th>Fees (Rs. 500)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="cell-id">#{student.id}</td>
              <td className="cell-name">{student.name}</td>
              <td className="cell-phone">{student.phone}</td>
              <td className="cell-desk">
                <span className="desk-badge">Desk {student.deskNumber}</span>
              </td>
              <td className="cell-date">
                {new Date(student.joiningDate).toLocaleDateString("en-IN")}
              </td>
              <td className="cell-fee">
                <span className={`fee-badge ${getFeeStatus(student)}`}>
                  {getFeeStatus(student) === "paid"
                    ? "Deposited"
                    : getFeeStatus(student) === "trial"
                    ? "3-Day Trial"
                    : "Fee Due"}
                </span>
                {getFeeStatus(student) === "due" && (
                  <div className="fee-actions">
                    <button className="fee-action-btn" onClick={() => onMarkFeePaid(student.id)}>
                      Mark Deposited
                    </button>
                    <button className="fee-action-btn reminder-btn" onClick={() => onSendReminder(student)}>
                      Send Reminder
                    </button>
                  </div>
                )}
              </td>
              <td className="cell-actions">
                <Link
                  to={`/students/${student.id}`}
                  className="action-btn view-btn"
                  title="View"
                >
                  <Eye size={18} />
                </Link>
                <Link
                  to={`/students/edit/${student.id}`}
                  className="action-btn edit-btn"
                  title="Edit"
                >
                  <Edit size={18} />
                </Link>
                <button
                  className="action-btn delete-btn"
                  onClick={() => onDelete(student.id)}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
