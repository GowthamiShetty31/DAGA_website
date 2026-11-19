
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
        return getBookings().filter(function(booking) {
            return booking.ownerEmail &&
                booking.ownerEmail.trim().toLowerCase() ===
                (loggedOwner.email || "").trim().toLowerCase();
        });
    }

    function updateOwnerBookingStats() {
        const bookings = getMyBookings();

        document.getElementById("ownerTotalBookings").textContent =
            bookings.length;

        document.getElementById("ownerPendingBookings").textContent =
            bookings.filter(b =>
                (b.status || "Pending").toLowerCase() === "pending"
            ).length;

        document.getElementById("ownerAcceptedBookings").textContent =
            bookings.filter(b =>
                (b.status || "").toLowerCase() === "accepted"
            ).length;
    }

    function updateBookingStatus(bookingId, newStatus) {
        const allBookings = getBookings();

        const booking = allBookings.find(function(item) {
            return String(item.id) === String(bookingId) &&
                item.ownerEmail &&
                item.ownerEmail.trim().toLowerCase() ===
                (loggedOwner.email || "").trim().toLowerCase();
        });

        if (!booking) {
            alert("Booking not found. Please refresh the page.");
            return;
        }

        if ((booking.status || "Pending").toLowerCase() !== "pending") {
            alert("This booking has already been processed.");
            renderOwnerBookings();
            return;
        }

        if (!confirm("Are you sure you want to " +
            newStatus.toLowerCase() + " this booking?")) {
            return;
        }

        booking.status = newStatus;

        localStorage.setItem(
            "dagaBookings",
            JSON.stringify(allBookings)
        );

        // Send notification to tourist
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
    }

    function renderOwnerBookings() {
        const bookings = getMyBookings();
        const selectedStatus = ownerBookingFilter.value.toLowerCase();

        const filteredBookings = bookings.filter(function(booking) {
            const status = (booking.status || "Pending").toLowerCase();

            return selectedStatus === "all" ||
                status === selectedStatus;
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
                "Booking ID: " + (booking.id || "Not available"),
                "Tourist: " + (booking.touristName || "Not available"),
                "Email: " + (booking.touristEmail || "Not available"),
                "Phone: " + (booking.touristPhone || "Not available"),
                "Date: " + (booking.date || "Not available"),
                "Number of people: " + (booking.guests || "Not available"),
                "Message: " + (booking.message || "No message"),
                "Status: " + (booking.status || "Pending")
            ];

            details.forEach(function(detail) {
                const paragraph = document.createElement("p");
                paragraph.textContent = detail;
                card.appendChild(paragraph);
            });

            const status = (booking.status || "Pending").toLowerCase();

            if (status === "pending") {
                const acceptButton = document.createElement("button");
                acceptButton.type = "button";
                acceptButton.textContent = "Accept";

                acceptButton.addEventListener("click", function() {
                    updateBookingStatus(booking.id, "Accepted");
                });

                const rejectButton = document.createElement("button");
                rejectButton.type = "button";
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

    ownerBookingFilter.addEventListener("change", renderOwnerBookings);

    renderOwnerBookings();
}

// Logout
function businessLogout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("dagaLoggedInOwner");
        window.location.replace("business-login.html");
    }
}
