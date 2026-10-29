// Authentication Service
// This is a fake frontend-only login system for demonstration
// In production, this should be replaced with real backend authentication

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "1234";

export function login(username, password) {
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    localStorage.setItem("studyLibrary_isLoggedIn", "true");
    return { success: true };
  }
  return { success: false, error: "Invalid username or password" };
}

export function logout() {
  localStorage.removeItem("studyLibrary_isLoggedIn");
}

export function isUserLoggedIn() {
  return localStorage.getItem("studyLibrary_isLoggedIn") === "true";
}
