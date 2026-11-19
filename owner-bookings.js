
const loggedOwner = JSON.parse(
    localStorage.getItem("dagaLoggedInOwner")
);

const ownerBookingsList = document.getElementById("ownerBookingsList");
const ownerBookingFilter = document.getElementById("ownerBookingFilter");

if (!loggedOwner) {
    window.location.replace("business-login.html");
} else if (ownerBookingsList && ownerBookingFilter) {

    function getBookings() {
        try {
            return JSON.parse(localStorage.getItem("dagaBookings")) || [];
        } catch (error) {
            console.error("Error reading bookings:", error);
            return [];
        }
    }

    function getMyBookings() {
        const allBookings = getBookings();

        return allBookings.filter(function(booking) {
            return booking.ownerEmail &&
                booking.ownerEmail.trim().toLowerCase() ===
                loggedOwner.email.trim().toLowerCase();
        });
    }

    function updateOwnerBookingStats() {
        const myBookings = getMyBookings();

        document.getElementById("ownerTotalBookings").textContent =
            myBookings.length;

        document.getElementById("ownerPendingBookings").textContent =
            myBookings.filter(item =>
                item.status.toLowerCase() === "pending"
            ).length;

        document.getElementById("ownerAcceptedBookings").textContent =
            myBookings.filter(item =>
                item.status.toLowerCase() === "accepted"
            ).length;
    }

    function renderOwnerBookings() {
        const myBookings = getMyBookings();
        const selectedStatus = ownerBookingFilter.value.toLowerCase();

        const filteredBookings = myBookings.filter(function(booking) {
            return selectedStatus === "all" ||
                booking.status.toLowerCase() === selectedStatus;
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
            title.textContent = booking.serviceName || "Service";

            card.appendChild(title);

            const details = [
                "Booking ID: " + booking.id,
                "Tourist: " + (booking.touristName || "Not available"),
                "Email: " + (booking.touristEmail || "Not available"),
                "Phone: " + (booking.touristPhone || "Not available"),
                "Date: " + (booking.date || "Not available"),
                "Number of people: " + (booking.guests || "Not available"),
                "Message: " + (booking.message || "No message"),
                "Status: " + booking.status
            ];

            details.forEach(function(detail) {
                const paragraph = document.createElement("p");
                paragraph.textContent = detail;
                card.appendChild(paragraph);
            });

            if (booking.status.toLowerCase() === "pending") {
                const acceptButton = document.createElement("button");
                acceptButton.textContent = "Accept";
                acceptButton.type = "button";
                acceptButton.dataset.bookingId = booking.id;
                acceptButton.dataset.action = "Accepted";

                const rejectButton = document.createElement("button");
                rejectButton.textContent = "Reject";
                rejectButton.type = "button";
                rejectButton.className = "delete-service-btn";
                rejectButton.dataset.bookingId = booking.id;
                rejectButton.dataset.action = "Rejected";

                card.append(acceptButton, rejectButton);
            }

            ownerBookingsList.appendChild(card);
        });

        updateOwnerBookingStats();
    }

    // Handle Accept and Reject button clicks
    ownerBookingsList.addEventListener("click", function(event) {
        const button = event.target.closest("button[data-booking-id]");

        if (!button) return;

        const bookingId = button.dataset.bookingId;
        const newStatus = button.dataset.action;

        if (newStatus !== "Accepted" && newStatus !== "Rejected") {
            return;
        }

        const confirmed = confirm(
            "Are you sure you want to " +
            newStatus.toLowerCase() + " this booking?"
        );

        if (!confirmed) return;

        const allBookings = getBookings();

        const booking = allBookings.find(function(item) {
            return String(item.id) === String(bookingId) &&
                item.ownerEmail &&
                item.ownerEmail.trim().toLowerCase() ===
                loggedOwner.email.trim().toLowerCase();
        });

        if (!booking) {
            alert("Booking not found. Please refresh the page.");
            return;
        }

        if (booking.status.toLowerCase() !== "pending") {
            alert("This booking has already been processed.");
            renderOwnerBookings();
            return;
        }

        booking.status = newStatus;

        localStorage.setItem(
            "dagaBookings",
            JSON.stringify(allBookings)
        );

        // Notify the tourist
        if (booking.touristEmail) {
            let notifications = [];

            try {
                notifications = JSON.parse(
                    localStorage.getItem("dagaNotifications")
                ) || [];
            } catch (error) {
                notifications = [];
            }

            notifications.push({
                id: "N-" + Date.now(),
                touristEmail: booking.touristEmail,
                title: "Booking " + newStatus,
                message: "Your request for " +
                    (booking.serviceName || "a service") +
                    " was " + newStatus.toLowerCase() + ".",
                date: new Date().toLocaleString(),
                read: false
            });

            localStorage.setItem(
                "dagaNotifications",
                JSON.stringify(notifications)
            );
        }

        renderOwnerBookings();

        alert("Booking " + newStatus.toLowerCase() + " successfully!");
    });

    ownerBookingFilter.addEventListener(
        "change",
        renderOwnerBookings
    );

    renderOwnerBookings();
}

// Business logout
function businessLogout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("dagaLoggedInOwner");
        window.location.replace("business-login.html");
    }
}
