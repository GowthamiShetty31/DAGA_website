
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("dagaUsers")) || [];

        const validUser = users.find(function(user) {
            return user.email.toLowerCase() === email &&
                   user.password === password;
        });

        if (validUser) {
            localStorage.setItem("dagaLoggedInUser", JSON.stringify({
                name: validUser.name,
                email: validUser.email,
                phone: validUser.phone
            }));

            window.location.href = "home.html";
        } else {
            alert("Invalid email or password. Please sign up first.");
        }
    });
}
