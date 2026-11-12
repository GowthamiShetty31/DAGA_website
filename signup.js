const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message = document.getElementById("signupMessage");

    // Check whether passwords match
    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        return;
    }

    // Get existing demo accounts
    const users = JSON.parse(localStorage.getItem("dagaUsers")) || [];

    // Check whether email already exists
    const existingUser = users.find(function(user) {
        return user.email === email;
    });

    if (existingUser) {
        message.textContent = "This email is already registered!";
        message.style.color = "red";
        return;
    }

    // Save new demo account
    const newUser = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    users.push(newUser);

    localStorage.setItem("dagaUsers", JSON.stringify(users));

    message.textContent = "Account created successfully! Please login.";
    message.style.color = "#0c6b4f";

    signupForm.reset();
});