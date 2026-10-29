import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import { getStudentById, getFeeStatus } from "../services/studentService";
import { getStudentAttendanceForDate } from "../services/attendanceService";
import { formatDateForDisplay, getTodayDate } from "../utils/validation";
import "../styles/details-page.css";

export default function StudentDetails() {
  const [student, setStudent] = useState(null);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const studentData = getStudentById(id);
    if (!studentData) {
      navigate("/students");
      return;
    }
    setStudent(studentData);

    const today = getTodayDate();
    const attendance = getStudentAttendanceForDate(today, parseInt(id));
    setTodayAttendance(attendance);
  }, [id, navigate]);

  if (!student) {
    return (
      <AdminLayout>
        <div className="page-container">Loading...</div>
      </AdminLayout>
    );
  }

  const attendanceText =
    todayAttendance === "present"
      ? "✓ Present"
      : todayAttendance === "absent"
      ? "✗ Absent"
      : "Not Marked";

  const attendanceClass =
    todayAttendance === "present"
      ? "present"
      : todayAttendance === "absent"
      ? "absent"
      : "unmarked";
  const feeStatus = getFeeStatus(student);

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>{student.name}</h1>
          <div className="header-actions">
            <Link to={`/students/edit/${student.id}`} className="btn btn-secondary">
              ✏️ Edit
            </Link>
            <Link to="/students" className="btn btn-outline">
              ← Back
            </Link>
          </div>
        </div>

        <div className="details-grid">
          <div className="details-card">
            <h3>Student Information</h3>
            <div className="info-group">
              <label>Student ID</label>
              <p>#{student.id}</p>
            </div>
            <div className="info-group">
              <label>Full Name</label>
              <p>{student.name}</p>
            </div>
            <div className="info-group">
              <label>Phone Number</label>
              <p>{student.phone}</p>
            </div>
            <div className="info-group">
              <label>Status</label>
              <p className="status-badge">{student.status}</p>
            </div>
          </div>

          <div className="details-card">
            <h3>Desk & Dates</h3>
            <div className="info-group">
              <label>Assigned Desk</label>
              <p className="desk-highlight">Desk {student.deskNumber}</p>
            </div>
            <div className="info-group">
              <label>Joining Date</label>
              <p>{formatDateForDisplay(student.joiningDate)}</p>
            </div>
            {student.notes && (
              <div className="info-group">
                <label>Notes</label>
                <p>{student.notes}</p>
              </div>
            )}
          </div>

          <div className="details-card">
            <h3>Fees</h3>
            <div className="info-group">
              <label>Trial Period</label>
              <p>3 days from joining date</p>
            </div>
            <div className="info-group">
              <label>Monthly Fee</label>
              <p>Rs. 500</p>
            </div>
            <div className="info-group">
              <label>Payment Status</label>
              <p className={`fee-status ${feeStatus}`}>
                {feeStatus === "paid" ? "Deposited" : feeStatus === "trial" ? "3-Day Trial" : "Fee Due"}
              </p>
            </div>
          </div>

          <div className="details-card">
            <h3>Attendance</h3>
            <div className="info-group">
              <label>Today's Status</label>
              <p className={`attendance-status ${attendanceClass}`}>
                {attendanceText}
              </p>
            </div>
            <Link to="/attendance" className="btn btn-primary btn-block">
              Mark Attendance
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
