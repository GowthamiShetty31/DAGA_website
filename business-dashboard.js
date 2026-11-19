
const owner = JSON.parse(localStorage.getItem("dagaLoggedInOwner"));

if (!owner) {
    alert("Please login as a business owner.");
    window.location.href = "business-login.html";
} else {
    document.getElementById("dashboardBusinessName").textContent =
        owner.businessName || "Not provided";

    document.getElementById("dashboardLocation").textContent =
        owner.location || "Not provided";

    document.getElementById("dashboardCategory").textContent =
        owner.category || "Not provided";

    document.getElementById("dashboardEmail").textContent =
        owner.email || "Not provided";
}

// UPDATE BOOKING STATUS
function updateRequest(status) {

    localStorage.setItem("dagaBookingStatus", status);

    displayBookingStatus(status);
}

// DISPLAY STATUS AND HIDE BUTTONS
function displayBookingStatus(status) {

    const statusElement = document.getElementById("bookingStatus");
    const actionsElement = document.getElementById("bookingActions");

    if (statusElement) {
        statusElement.textContent =
            status === "confirmed" ? "Accepted" : "Rejected";
    }

    if (actionsElement) {
        actionsElement.style.display = "none";
    }
}

// RESTORE SAVED STATUS
const savedStatus = localStorage.getItem("dagaBookingStatus");

if (savedStatus) {
    displayBookingStatus(savedStatus);
}

// LOGOUT
function businessLogout() {
    localStorage.removeItem("dagaLoggedInOwner");
    window.location.href = "business-login.html";
}
