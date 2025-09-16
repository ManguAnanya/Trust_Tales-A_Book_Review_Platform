// Simple auth that uses localStorage (demo)
const users = JSON.parse(localStorage.getItem("users")) || {
  user1: { password: "password1", verified: false },
  verifiedUser: { password: "password2", verified: true }
};

function toggleAuth(type) {
  document.querySelector(".login-box").classList.toggle("hidden", type === "signup");
  document.querySelector(".signup-box").classList.toggle("hidden", type === "login");
}

function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) return alert("Please enter username and password.");

  const stored = users[username];
  if (stored && stored.password === password) {
    localStorage.setItem("currentUser", username);
    // keep users in localStorage for app.js to read
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password.");
  }
}

function signup() {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  if (!username || !password) return alert("Choose username & password.");
  if (users[username]) return alert("Username already exists.");
  users[username] = { password, verified: false };
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created! Please log in.");
  toggleAuth("login");
}