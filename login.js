
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://127.0.0.1:5000/api/tourist/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem(
                    "dagaLoggedInUser",
                    JSON.stringify(data.user)
                );

                alert("Login successful!");
                window.location.href = "home.html";

            } else {
                alert(data.message || "Invalid email or password.");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("Cannot connect to the server. Please start the Flask backend.");
        }
    });
}
