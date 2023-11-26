document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(".login-form button");
  const emailInput = document.querySelector('.login-form input[type="email"]');
  const passwordInput = document.querySelector(
    '.login-form input[type="password"]'
  );

  loginButton.addEventListener("click", function () {
    const email = emailInput.value;
    const password = passwordInput.value;

    // Simple validation
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // API call to check credentials
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Redirect to admin page on successful login
          window.location.href = "admin.html";
        } else {
          alert("Login failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
