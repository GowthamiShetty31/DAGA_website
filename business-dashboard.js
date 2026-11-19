
// GET LOGGED-IN BUSINESS OWNER
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

// ACCEPT OR REJECT BOOKING REQUEST
function updateRequest(status) {

    const statusElement = document.getElementById("bookingStatus");

    if (!statusElement) {
        alert("Booking status element not found!");
        return;
    }

    if (status === "confirmed") {
        statusElement.textContent = "Accepted";
        alert("Booking request accepted successfully!");
    }

    else if (status === "rejected") {
        statusElement.textContent = "Rejected";
        alert("Booking request rejected!");
    }

    // SAVE STATUS
    localStorage.setItem("dagaBookingStatus", status);

    // DISABLE BUTTONS AFTER RESPONSE
    document.querySelectorAll(".owner-booking-card button").forEach(button => {
        button.disabled = true;
    });
}

// RESTORE PREVIOUS BOOKING STATUS
const savedStatus = localStorage.getItem("dagaBookingStatus");

if (savedStatus) {
    const statusElement = document.getElementById("bookingStatus");

    if (statusElement) {
        statusElement.textContent =
            savedStatus === "confirmed" ? "Accepted" : "Rejected";

        document.querySelectorAll(".owner-booking-card button").forEach(button => {
            button.disabled = true;
        });
    }
}

// LOGOUT
function businessLogout() {
    localStorage.removeItem("dagaLoggedInOwner");
    window.location.href = "business-login.html";
}
