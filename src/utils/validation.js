// Date utilities
export function getTodayDate() {
  const today = new Date();
  return formatDateForInput(today);
}

export function formatDateForInput(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

export function formatDateForDisplay(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Validation utilities
export function isValidIndianPhoneNumber(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

export function isValidDeskNumber(deskNumber) {
  const num = parseInt(deskNumber);
  return !isNaN(num) && num >= 1 && num <= 57;
}

// Desk gender policy: desks 1-33 -> boys, desks 34-57 -> girls
export function isDeskAllowedForGender(deskNumber, gender) {
  const num = parseInt(deskNumber);
  if (isNaN(num)) return false;
  if (!gender) return true; // no gender provided, don't enforce

  const g = String(gender).toLowerCase();
  if (g === "male") return num >= 1 && num <= 33;
  if (g === "female") return num >= 34 && num <= 57;
  // for 'other' or unspecified, allow any desk
  return true;
}

export function validateStudentForm(formData, existingStudents, excludeId = null) {
  const errors = {};

  if (!formData.name || formData.name.trim() === "") {
    errors.name = "Student name is required";
  }

  if (!formData.phone || formData.phone.trim() === "") {
    errors.phone = "Phone number is required";
  } else if (!isValidIndianPhoneNumber(formData.phone)) {
    errors.phone = "Please enter a valid Indian mobile number (10 digits starting with 6-9)";
  }

  if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.deskNumber) {
    errors.deskNumber = "Desk number is required";
  } else if (!isValidDeskNumber(formData.deskNumber)) {
    errors.deskNumber = "Desk number must be between 1 and 57";
  } else {
    // Enforce gender-specific desk ranges if gender is provided
    if (formData.gender && !isDeskAllowedForGender(formData.deskNumber, formData.gender)) {
      errors.deskNumber = `Desk ${formData.deskNumber} is not allowed for ${formData.gender}`;
    } else {
    // Check if desk is already assigned to another student
    const deskAssigned = existingStudents.find(
      (s) => s.deskNumber === parseInt(formData.deskNumber) && 
             s.status === "active" &&
             s.id !== excludeId
    );
    if (deskAssigned) {
      errors.deskNumber = `Desk ${formData.deskNumber} is already occupied by ${deskAssigned.name}`;
    }
    }
  }

  if (!formData.gender || (formData.gender && formData.gender.trim() === "")) {
    errors.gender = "Gender is required";
  }

  if (!formData.joiningDate) {
    errors.joiningDate = "Joining date is required";
  }

  return errors;
}
