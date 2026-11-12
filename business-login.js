
const businessLoginForm = document.getElementById("businessLoginForm");

businessLoginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("businessEmail").value.trim();
    const password = document.getElementById("businessPassword").value;
    const message = document.getElementById("businessLoginMessage");

    // Get registered business owners
    const owners = JSON.parse(localStorage.getItem("dagaOwners")) || [];

    // Find matching owner account
    const loggedInOwner = owners.find(function(owner) {
        return owner.email.toLowerCase() === email.toLowerCase()
            && owner.password === password;
    });

    if (loggedInOwner) {

        // Save currently logged-in owner
        localStorage.setItem(
            "dagaLoggedInOwner",
            JSON.stringify({
                ownerName: loggedInOwner.ownerName,
                businessName: loggedInOwner.businessName,
                email: loggedInOwner.email,
                category: loggedInOwner.category,
                location: loggedInOwner.location
            })
        );

        message.textContent = "Login successful!";
        message.style.color = "green";

        setTimeout(function() {
            window.location.href = "business-dashboard.html";
        }, 1000);

    } else {
        message.textContent = "Invalid email or password. Please register first.";
        message.style.color = "red";
    }
});
