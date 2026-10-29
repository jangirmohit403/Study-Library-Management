import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import StudentForm from "../components/students/StudentForm";
import { getStudentById, updateStudent, getStudents } from "../services/studentService";
import { validateStudentForm } from "../utils/validation";
import "../styles/form-page.css";

export default function EditStudent() {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const studentData = getStudentById(id);
    if (!studentData) {
      navigate("/students");
      return;
    }
    setStudent(studentData);
  }, [id, navigate]);

  const handleSubmit = (formData, setFormErrors) => {
    setIsLoading(true);

    // Validate form
    const students = getStudents();
    const errors = validateStudentForm(formData, students, parseInt(id));

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    // Update student
    try {
      updateStudent(id, formData);
      setSuccessMessage("Student updated successfully!");

      // Redirect after a short delay
      setTimeout(() => {
        navigate(`/students/${id}`);
      }, 1000);
    } catch (error) {
      setFormErrors({ submit: error.message });
      setIsLoading(false);
    }
  };

  if (!student) {
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
          <h1>Edit Student</h1>
          <p className="page-subtitle">Update student information</p>
        </div>

        {successMessage && (
          <div className="success-banner">{successMessage}</div>
        )}

        <div className="form-wrapper">
          <StudentForm initialData={student} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </AdminLayout>
  );
}
