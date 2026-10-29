// Storage utilities for localStorage operations
// This is a simple abstraction that can be replaced with API calls later

export const STORAGE_KEYS = {
  STUDENTS: "studyLibrary_students",
  ATTENDANCE: "studyLibrary_attendance",
  IS_LOGGED_IN: "studyLibrary_isLoggedIn",
};

// Students storage
export function getStudentsFromStorage() {
  const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  return data ? JSON.parse(data) : [];
}

export function saveStudentsToStorage(students) {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
}

// Attendance storage
export function getAttendanceFromStorage(date) {
  const allAttendance = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
  const data = allAttendance ? JSON.parse(allAttendance) : {};
  return data[date] || {};
}

export function saveAttendanceToStorage(date, attendance) {
  const allAttendance = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
  const data = allAttendance ? JSON.parse(allAttendance) : {};
  data[date] = attendance;
  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(data));
}

export function getAllAttendance() {
  const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
  return data ? JSON.parse(data) : {};
}

// Authentication storage
export function setLoggedIn(isLoggedIn) {
  if (isLoggedIn) {
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "true");
  } else {
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
  }
}

export function isLoggedIn() {
  return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === "true";
}
