import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import StudentForm from "../components/students/StudentForm";
import { addStudent, getStudents } from "../services/studentService";
import { validateStudentForm } from "../utils/validation";
import "../styles/form-page.css";

export default function AddStudent() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (formData, setFormErrors) => {
    setIsLoading(true);

    // Validate form
    const students = getStudents();
    const errors = validateStudentForm(formData, students);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    // Add student
    try {
      addStudent(formData);
      setSuccessMessage("Student added successfully!");
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/students");
      }, 1000);
    } catch (error) {
      setFormErrors({ submit: error.message });
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Add New Student</h1>
          <p className="page-subtitle">Fill in the student details below</p>
        </div>

        {successMessage && (
          <div className="success-banner">{successMessage}</div>
        )}

        <div className="form-wrapper">
          <StudentForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </AdminLayout>
  );
}
