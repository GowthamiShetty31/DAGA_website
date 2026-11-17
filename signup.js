
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("signupMessage");

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        message.style.color = "red";
        return;
    }

    const users = JSON.parse(localStorage.getItem("dagaUsers")) || [];

    if (users.some(user => user.email.toLowerCase() === email)) {
        message.textContent = "This email is already registered.";
        message.style.color = "red";
        return;
    }

    users.push({ name, email, phone, password });

    localStorage.setItem("dagaUsers", JSON.stringify(users));

    message.textContent = "Account created successfully! Please login.";
    message.style.color = "green";

    signupForm.reset();
});
