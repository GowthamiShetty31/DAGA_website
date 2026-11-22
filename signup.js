
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("signupMessage");

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        return;
    }

    try {
        message.textContent = "Registering...";
        message.style.color = "blue";

        const response = await fetch(
            "http://127.0.0.1:5000/api/tourist/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            message.textContent = data.message;
            message.style.color = "green";

            signupForm.reset();

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {
            message.textContent = data.message || "Registration failed!";
            message.style.color = "red";
        }

    } catch (error) {
        message.textContent =
            "Cannot connect to server. Please try again.";
        message.style.color = "red";

        console.error("Registration error:", error);
    }
});
