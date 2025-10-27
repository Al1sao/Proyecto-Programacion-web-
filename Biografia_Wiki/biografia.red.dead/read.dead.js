// --- Login visual ---
const loginBtn = document.getElementById('login-btn');
const user = localStorage.getItem('username');
if (user) {
  loginBtn.textContent = user;
  loginBtn.href = "#";
} else {
  loginBtn.textContent = "Login";
  loginBtn.href = "../login.html";
}
