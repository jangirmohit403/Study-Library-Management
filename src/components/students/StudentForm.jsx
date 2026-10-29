import React, { useState, useEffect } from "react";
import "../../styles/form.css";

export default function StudentForm({ initialData = null, onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      phone: "",
      email: "",
      deskNumber: "",
      gender: "",
      joiningDate: "",
      notes: "",
      feeStatus: "unpaid",
    }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({ feeStatus: "unpaid", ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setErrors);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Student Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
          className={errors.name ? "error" : ""}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
          
      <div className="form-group">
          <label htmlFor="gender">Gender *</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className={errors.gender ? "error" : ""}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        {errors.gender && <span className="error-message">{errors.gender}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g., 9876543210"
          className={errors.phone ? "error" : ""}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="student@example.com"
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="deskNumber">Desk Number *</label>
        <input
          type="number"
          id="deskNumber"
          name="deskNumber"
          value={formData.deskNumber}
          onChange={handleChange}
          placeholder="e.g., 12"
          min="1"
          max="57"
          className={errors.deskNumber ? "error" : ""}
        />
        {errors.deskNumber && (
          <span className="error-message">{errors.deskNumber}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="joiningDate">Joining Date *</label>
        <input
          type="date"
          id="joiningDate"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
          className={errors.joiningDate ? "error" : ""}
        />
        {errors.joiningDate && (
          <span className="error-message">{errors.joiningDate}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="feeAmount">Monthly Fee</label>
        <input type="text" id="feeAmount" value="Rs. 500" readOnly />
        <label htmlFor="feeStatus">Payment Status</label>
        <select id="feeStatus" name="feeStatus" value={formData.feeStatus || "unpaid"} onChange={handleChange}>
          <option value="unpaid">Not Deposited</option>
          <option value="paid">Deposited</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes (Optional)</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          placeholder="Add any additional notes..."
          rows="3"
        ></textarea>
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? "Saving..." : initialData ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}
