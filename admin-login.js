
const adminLoginForm = document.getElementById("adminLoginForm");

adminLoginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;
    const message = document.getElementById("adminLoginMessage");

    // Demo admin credentials
    const adminEmail = "admin@daga.com";
    const adminPassword = "DagaAdmin123";

    if (email === adminEmail && password === adminPassword) {

        sessionStorage.setItem("dagaAdminLoggedIn", "true");

        message.textContent = "Login successful! Opening dashboard...";
        message.style.color = "green";

        setTimeout(function() {
            window.location.href = "admin-dashboard.html";
        }, 1000);

    } else {
        message.textContent = "Invalid admin email or password.";
        message.style.color = "red";
    }
});
