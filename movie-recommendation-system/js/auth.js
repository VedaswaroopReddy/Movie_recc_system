// ==========================================
// AUTH.JS — Authentication & Watch History Data Later
// ==========================================

// M3 Rule Implementation: Reset deprecated number arrays to prepare for Objects
(function clearOldHistories() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("watchHistory_")) {
      try {
        const val = safeJSONParse(localStorage.getItem(key), []);
        if (val.length > 0 && typeof val[0] === "number") {
          localStorage.setItem(key, "[]");
          console.log("Migrated Watch History for " + key);
        }
      } catch(e){}
    }
  }
})();

/**
 * Log a movie specifically into the User History including Timestamp and Analytics
 */
function addToHistory(movieId) {
  const user = getCurrentUser();
  if (!user) return;
  const key = "watchHistory_" + user;
  const history = safeJSONParse(localStorage.getItem(key), []);
  
  // Protect against duplicates within short intervals or just record frequency?
  // We'll record all unique plays for frequency tracking
  history.unshift({
    movieId: movieId,
    timestamp: Date.now()
  });
  
  localStorage.setItem(key, JSON.stringify(history));
}

// ==========================================

/**
 * Get all registered users from localStorage.
 * Returns an array of { username, password } objects.
 */
function getUsers() {
  return safeJSONParse(localStorage.getItem("registeredUsers"), []);
}

/**
 * Save the users array back to localStorage.
 */
function saveUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

/**
 * Get the currently logged-in username (or null).
 */
function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  if (!user) return null;
  if (user.startsWith("{")) {
    try {
      const parsed = safeJSONParse(user, {});
      const username = parsed.username || "admin";
      setCurrentUser(username);
      return username;
    } catch (e) {
      return user;
    }
  }
  return user;
}

/**
 * Set the current logged-in user.
 */
function setCurrentUser(username) {
  localStorage.setItem("currentUser", username);
}

/**
 * Log out — clear session and redirect to login.
 */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

/**
 * Require login on protected pages.
 * Call this at the top of any page that needs auth.
 */
function requireAuth() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  // Globally hide Admin nav link for non-admin users
  if (currentUser !== "admin") {
    document.querySelectorAll('a[href="admin.html"]').forEach(link => {
      link.style.display = "none";
    });
  } else {
    // Admin users do NOT need the Recommend page — hide it
    document.querySelectorAll('a[href="recommend.html"]').forEach(link => {
      link.style.display = "none";
    });
  }
}

// ==========================================
// Login Page Logic (runs only on index.html)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (!loginForm || !registerForm) return; // Not on login page

  const toggleBtn = document.getElementById("toggleFormBtn");
  const formTitle = document.getElementById("formTitle");
  const formSubtitle = document.getElementById("formSubtitle");
  const loginSection = document.getElementById("loginSection");
  const registerSection = document.getElementById("registerSection");
  const msgBox = document.getElementById("authMessage");

  let showingLogin = true;

  // Toggle between Login and Register
  toggleBtn.addEventListener("click", () => {
    showingLogin = !showingLogin;
    loginSection.classList.toggle("hidden");
    registerSection.classList.toggle("hidden");
    formTitle.textContent = showingLogin ? "Welcome Back" : "Create Account";
    formSubtitle.textContent = showingLogin
      ? "Sign in to continue to your movie dashboard"
      : "Register to start getting recommendations";
    toggleBtn.textContent = showingLogin
      ? "Don't have an account? Register"
      : "Already have an account? Login";
    msgBox.textContent = "";
    msgBox.className = "auth-msg";
  });

  // Handle Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value;

    if (!username || !password) {
      showMsg("Please fill in all fields.", "error");
      return;
    }

    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setCurrentUser(username);
      showMsg("Login successful! Redirecting...", "success");
      setTimeout(() => (window.location.href = "catalog.html"), 800);
    } else {
      showMsg("Invalid username or password.", "error");
    }
  });

  // Handle Register
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("regUser").value.trim();
    const password = document.getElementById("regPass").value;
    const confirm = document.getElementById("regConfirm").value;

    if (!username || !password || !confirm) {
      showMsg("Please fill in all fields.", "error");
      return;
    }
    if (password !== confirm) {
      showMsg("Passwords do not match.", "error");
      return;
    }
    if (password.length < 3) {
      showMsg("Password must be at least 3 characters.", "error");
      return;
    }

    const users = getUsers();
    if (users.find((u) => u.username === username)) {
      showMsg("Username already taken.", "error");
      return;
    }

    users.push({ username, password });
    saveUsers(users);
    showMsg("Registration successful! You can now log in.", "success");

    // Switch back to login form
    setTimeout(() => {
      showingLogin = true;
      loginSection.classList.remove("hidden");
      registerSection.classList.add("hidden");
      formTitle.textContent = "Welcome Back";
      formSubtitle.textContent = "Sign in to continue to your movie dashboard";
      toggleBtn.textContent = "Don't have an account? Register";
    }, 1000);
  });

  function showMsg(text, type) {
    msgBox.textContent = text;
    msgBox.className = "auth-msg " + type;
  }

  // If already logged in, redirect
  if (getCurrentUser()) {
    window.location.href = "catalog.html";
  }
});
