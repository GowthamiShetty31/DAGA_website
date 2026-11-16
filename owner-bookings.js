
const loggedOwner = JSON.parse(
    localStorage.getItem("dagaLoggedInOwner")
);

const ownerBookingsList = document.getElementById("ownerBookingsList");
const ownerBookingFilter = document.getElementById("ownerBookingFilter");

if (!loggedOwner) {
    window.location.replace("business-login.html");
}

let bookings = JSON.parse(localStorage.getItem("dagaBookings")) || [];

function getMyBookings() {
    return bookings.filter(function(booking) {
        return booking.ownerEmail &&
            booking.ownerEmail.toLowerCase() ===
            loggedOwner.email.toLowerCase();
    });
}

function updateOwnerBookingStats() {
    const myBookings = getMyBookings();

    document.getElementById("ownerTotalBookings").textContent =
        myBookings.length;

    document.getElementById("ownerPendingBookings").textContent =
        myBookings.filter(item => item.status === "Pending").length;

    document.getElementById("ownerAcceptedBookings").textContent =
        myBookings.filter(item => item.status === "Accepted").length;
}

function renderOwnerBookings() {
    bookings = JSON.parse(localStorage.getItem("dagaBookings")) || [];

    const myBookings = getMyBookings();
    const selectedStatus = ownerBookingFilter.value;

    const filteredBookings = myBookings.filter(function(booking) {
        return selectedStatus === "All" ||
            booking.status === selectedStatus;
    });

    ownerBookingsList.replaceChildren();

    if (filteredBookings.length === 0) {
        const empty = document.createElement("p");
        empty.className = "service-empty-message";
        empty.textContent = "No booking requests found.";
        ownerBookingsList.appendChild(empty);
        updateOwnerBookingStats();
        return;
    }

    filteredBookings.forEach(function(booking) {
        const card = document.createElement("div");
        card.className = "managed-service-card";

        const title = document.createElement("h3");
        title.textContent = booking.serviceName;

        const details = [
            "Booking ID: " + booking.id,
            "Tourist: " + booking.touristName,
            "Email: " + booking.touristEmail,
            "Phone: " + booking.touristPhone,
            "Date: " + booking.date,
            "Number of people: " + booking.guests,
            "Message: " + (booking.message || "No message"),
            "Status: " + booking.status
        ];

        card.appendChild(title);

        details.forEach(function(detail) {
            const paragraph = document.createElement("p");
            paragraph.textContent = detail;
            card.appendChild(paragraph);
        });

        if (booking.status === "Pending") {
            const acceptButton = document.createElement("button");
            acceptButton.textContent = "Accept";
            acceptButton.addEventListener("click", function() {
                updateBookingStatus(booking.id, "Accepted");
            });

            const rejectButton = document.createElement("button");
            rejectButton.textContent = "Reject";
            rejectButton.className = "delete-service-btn";
            rejectButton.addEventListener("click", function() {
                updateBookingStatus(booking.id, "Rejected");
            });

            card.append(acceptButton, rejectButton);
        }

        ownerBookingsList.appendChild(card);
    });

    updateOwnerBookingStats();
}

function updateBookingStatus(id, status) {
    const booking = bookings.find(function(item) {
        return item.id === id &&
            item.ownerEmail.toLowerCase() === loggedOwner.email.toLowerCase();
    });

    if (!booking || booking.status !== "Pending") return;

    booking.status = status;

    localStorage.setItem("dagaBookings", JSON.stringify(bookings));

    renderOwnerBookings();

    alert("Booking request " + status.toLowerCase() + ".");
}

function businessLogout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("dagaLoggedInOwner");
        window.location.replace("business-login.html");
    }
}

ownerBookingFilter.addEventListener("change", renderOwnerBookings);

if (loggedOwner) {
    renderOwnerBookings();
}
const notifications = JSON.parse(
    localStorage.getItem("dagaNotifications")
) || [];

notifications.push({
    id: "N-" + Date.now(),
    touristEmail: booking.touristEmail,
    title: "Booking " + status,
    message: "Your request for " + booking.serviceName +
             " was " + status.toLowerCase() + ".",
    date: new Date().toLocaleString(),
    read: false
});

localStorage.setItem("dagaNotifications", JSON.stringify(notifications));