
// Get logged-in business owner
const ownerData = JSON.parse(
    localStorage.getItem("dagaLoggedInOwner")
);

// Check login status
if (!ownerData) {
    alert("Please login first!");
    window.location.href = "business-login.html";
} else {

    document.getElementById("ownerWelcome").textContent =
        "Welcome, " + ownerData.ownerName + "!";

    document.getElementById("dashboardBusinessName").textContent =
        ownerData.businessName;

    document.getElementById("dashboardLocation").textContent =
        ownerData.location;

    document.getElementById("dashboardCategory").textContent =
        ownerData.category;

    document.getElementById("dashboardEmail").textContent =
        ownerData.email;
}

// Edit business
function editBusiness() {
    alert("Business profile editing will be available soon!");
}

// Edit service
function editService(serviceName) {
    alert("You selected: " + serviceName);
}

// Add service
function addService() {
    alert("Add New Service feature will be available soon!");
}

// Update booking request
function updateRequest(status) {
    if (status === "confirmed") {
        alert("Booking request accepted!");
    } else {
        alert("Booking request rejected.");
    }
}
