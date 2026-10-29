import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import StudentTable from "../components/students/StudentTable";
import { getStudents, deleteStudent, searchStudents, markFeeAsPaid } from "../services/studentService";
import "../styles/students-page.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchQuery, statusFilter]);

  const loadStudents = () => {
    const data = getStudents();
    setStudents(data);
  };

  const filterStudents = () => {
    let filtered = students;

    // Search filter
    if (searchQuery) {
      filtered = searchStudents(searchQuery);
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }

    setFilteredStudents(filtered);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudent(id);
      loadStudents();
    }
  };

  const handleMarkFeePaid = (id) => {
    markFeeAsPaid(id);
    loadStudents();
  };

  const handleSendReminder = (student) => {
    const subject = encodeURIComponent("Study Library fee reminder");
    const body = encodeURIComponent(
      `Hello ${student.name}, your monthly library fee of Rs. 500 is due. Please deposit it with the library admin.`
    );
    if (student.email) {
      window.open(`mailto:${student.email}?subject=${subject}&body=${body}`, "_blank");
    }
    window.open(`sms:${student.phone}?body=${body}`, "_blank");
  };

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Students Management</h1>
          <Link to="/students/add" className="btn btn-primary">
            ➕ Add Student
          </Link>
        </div>

        <div className="filters-section">
          <input
            type="text"
            placeholder="Search by name, phone, or desk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Students</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="results-info">
          <p>
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </div>

        <StudentTable
          students={filteredStudents}
          onDelete={handleDelete}
          onMarkFeePaid={handleMarkFeePaid}
          onSendReminder={handleSendReminder}
        />
      </div>
    </AdminLayout>
  );
}
