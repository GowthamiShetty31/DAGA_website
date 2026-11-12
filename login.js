
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (email !== "" && password !== "") {
            window.location.href = "./home.html";
        } else {
            alert("Please enter your email and password.");
        }
    });
}
