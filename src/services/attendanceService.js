// Attendance Service
// Handles all attendance-related operations

import { getAttendanceFromStorage, saveAttendanceToStorage, getAllAttendance } from "../utils/storage";
import { getActiveStudents } from "./studentService";
import { getTodayDate } from "../utils/validation";

// Mark attendance for a student on a specific date
export function markAttendance(date, studentId, status) {
  const attendance = getAttendanceFromStorage(date);
  attendance[studentId] = status; // "present" or "absent"
  saveAttendanceToStorage(date, attendance);
}

// Get attendance for a specific date
export function getAttendanceForDate(date) {
  return getAttendanceFromStorage(date);
}

// Get attendance for a student on a specific date
export function getStudentAttendanceForDate(date, studentId) {
  const attendance = getAttendanceFromStorage(date);
  return attendance[studentId] || null;
}

// Get attendance summary for a date
export function getAttendanceSummaryForDate(date) {
  const students = getActiveStudents();
  const attendance = getAttendanceFromStorage(date);

  let present = 0;
  let absent = 0;
  let notMarked = 0;

  students.forEach((student) => {
    const status = attendance[student.id];
    if (status === "present") {
      present++;
    } else if (status === "absent") {
      absent++;
    } else {
      notMarked++;
    }
  });

  return {
    date,
    totalStudents: students.length,
    present,
    absent,
    notMarked,
    percentage: students.length > 0 ? Math.round((present / students.length) * 100) : 0,
  };
}

// Get all attendance for a date with student details
export function getAttendanceWithStudentDetails(date) {
  const students = getActiveStudents();
  const attendance = getAttendanceFromStorage(date);

  return students.map((student) => ({
    ...student,
    attendance: attendance[student.id] || null,
  }));
}

// Get attendance history (all records)
export function getAttendanceHistory() {
  return getAllAttendance();
}

// Get attendance record for a specific date from history
export function getAttendanceRecord(date) {
  const history = getAllAttendance();
  return history[date] || null;
}

// Get attendance statistics for a date range
export function getAttendanceStatistics(startDate, endDate) {
  const history = getAllAttendance();
  const students = getActiveStudents();
  const stats = {};

  students.forEach((student) => {
    stats[student.id] = {
      name: student.name,
      present: 0,
      absent: 0,
      total: 0,
    };
  });

  Object.keys(history).forEach((date) => {
    if (date >= startDate && date <= endDate) {
      const attendance = history[date];
      students.forEach((student) => {
        if (student.id in attendance) {
          stats[student.id].total++;
          if (attendance[student.id] === "present") {
            stats[student.id].present++;
          } else if (attendance[student.id] === "absent") {
            stats[student.id].absent++;
          }
        }
      });
    }
  });

  return stats;
}

// Get today's date attendance
export function getTodayAttendance() {
  const today = getTodayDate();
  return getAttendanceWithStudentDetails(today);
}

// Get today's attendance summary
export function getTodayAttendanceSummary() {
  const today = getTodayDate();
  return getAttendanceSummaryForDate(today);
}
