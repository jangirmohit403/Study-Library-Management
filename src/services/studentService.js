// Student Service
// This service handles all student data operations
// Uses localStorage for persistence but is designed to work with a backend API later

import { getStudentsFromStorage, saveStudentsToStorage } from "../utils/storage";
import studentsData from "../data/students.json";

const MONTHLY_FEE = 500;
const TRIAL_DAYS = 3;

function normalizeStudent(student) {
  return {
    ...student,
    feeAmount: MONTHLY_FEE,
    feeStatus: student.feeStatus === "paid" ? "paid" : "unpaid",
  };
}

export function getFeeStatus(student, today = new Date()) {
  if (student.feeStatus === "paid") return "paid";

  const joiningDate = new Date(`${student.joiningDate}T00:00:00`);
  const currentDate = new Date(today);
  joiningDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  const daysSinceJoining = Math.floor((currentDate - joiningDate) / 86400000);

  return daysSinceJoining >= TRIAL_DAYS ? "due" : "trial";
}

// Initialize students from JSON data if localStorage is empty
export function initializeStudents() {
  const existing = getStudentsFromStorage();
  if (existing.length === 0) {
    saveStudentsToStorage(studentsData);
  }
}

// Get all students
export function getStudents() {
  const students = getStudentsFromStorage().map(normalizeStudent);
  saveStudentsToStorage(students);
  return students;
}

// Get active students only
export function getActiveStudents() {
  const students = getStudents();
  return students.filter((s) => s.status === "active");
}

// Get a single student by ID
export function getStudentById(id) {
  const students = getStudents();
  return students.find((s) => s.id === parseInt(id));
}

// Add a new student
export function addStudent(studentData) {
  const students = getStudentsFromStorage();
  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    ...studentData,
    feeAmount: MONTHLY_FEE,
    feeStatus: studentData.feeStatus === "paid" ? "paid" : "unpaid",
    deskNumber: parseInt(studentData.deskNumber),
    status: "active",
  };

  students.push(newStudent);
  saveStudentsToStorage(students);
  return newStudent;
}

// Update a student
export function updateStudent(id, studentData) {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === parseInt(id));

  if (index === -1) {
    throw new Error("Student not found");
  }

  students[index] = {
    ...students[index],
    ...studentData,
    feeAmount: MONTHLY_FEE,
    feeStatus: studentData.feeStatus === "paid" ? "paid" : "unpaid",
    deskNumber: parseInt(studentData.deskNumber),
    id: parseInt(id),
  };

  saveStudentsToStorage(students);
  return students[index];
}

export function markFeeAsPaid(id) {
  return updateStudent(id, { feeStatus: "paid" });
}

// Delete a student (soft delete - mark as inactive)
export function deleteStudent(id) {
  const students = getStudentsFromStorage();
  const index = students.findIndex((s) => s.id === parseInt(id));

  if (index === -1) {
    throw new Error("Student not found");
  }

  students.splice(index, 1);
  saveStudentsToStorage(students);
}

// Get desk availability
export function getDeskAvailability() {
  const students = getActiveStudents();
  const occupiedDesks = {};

  students.forEach((student) => {
    occupiedDesks[student.deskNumber] = student;
  });

  return {
    occupiedDesks,
    totalDesks: 57,
    occupiedCount: students.length,
    emptyCount: 57 - students.length,
  };
}

// Get occupied desks
export function getOccupiedDesks() {
  const students = getActiveStudents();
  const occupied = {};
  students.forEach((student) => {
    occupied[student.deskNumber] = student;
  });
  return occupied;
}

// Check if desk is available
export function isDeskAvailable(deskNumber, excludeStudentId = null) {
  const students = getActiveStudents();
  const deskOccupied = students.find(
    (s) => s.deskNumber === parseInt(deskNumber) && s.id !== excludeStudentId
  );
  return !deskOccupied;
}

// Search students
export function searchStudents(query) {
  const students = getStudents();
  const lowerQuery = query.toLowerCase();

  return students.filter((student) => {
    return (
      student.name.toLowerCase().includes(lowerQuery) ||
      student.phone.includes(lowerQuery) ||
      student.deskNumber.toString().includes(lowerQuery)
    );
  });
}
