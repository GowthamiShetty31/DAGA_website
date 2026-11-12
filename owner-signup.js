
const ownerSignupForm = document.getElementById("ownerSignupForm");

ownerSignupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const ownerName = document.getElementById("ownerName").value.trim();
    const businessName = document.getElementById("businessName").value.trim();
    const email = document.getElementById("ownerEmail").value.trim();
    const phone = document.getElementById("ownerPhone").value.trim();
    const category = document.getElementById("businessCategory").value;
    const location = document.getElementById("businessLocation").value.trim();
    const description = document.getElementById("businessDescription").value.trim();
    const password = document.getElementById("ownerPassword").value;
    const confirmPassword = document.getElementById("confirmOwnerPassword").value;
    const message = document.getElementById("ownerSignupMessage");

    if (password.length < 6) {
        message.textContent = "Password must contain at least 6 characters.";
        message.style.color = "red";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        return;
    }

    const owners = JSON.parse(localStorage.getItem("dagaOwners")) || [];

    const existingOwner = owners.find(function(owner) {
        return owner.email.toLowerCase() === email.toLowerCase();
    });

    if (existingOwner) {
        message.textContent = "This email is already registered.";
        message.style.color = "red";
        return;
    }

    const newOwner = {
        ownerName: ownerName,
        businessName: businessName,
        email: email,
        phone: phone,
        category: category,
        location: location,
        description: description,
        password: password
    };

    owners.push(newOwner);

    localStorage.setItem("dagaOwners", JSON.stringify(owners));

    message.textContent = "Business registered successfully!";
    message.style.color = "green";

    ownerSignupForm.reset();
});
