
const loggedOwner = JSON.parse(
    localStorage.getItem("dagaLoggedInOwner")
);

const ownerBookingsList = document.getElementById("ownerBookingsList");
const ownerBookingFilter = document.getElementById("ownerBookingFilter");

if (!loggedOwner) {
    window.location.replace("business-login.html");
} else if (ownerBookingsList && ownerBookingFilter) {

    let bookings = [];

    function getMyBookings() {
        return bookings.filter(function(booking) {
            return booking.ownerEmail &&
                booking.ownerEmail.toLowerCase() ===
                loggedOwner.email.toLowerCase();
        });
    }

    function updateOwnerBookingStats() {
        const myBookings = getMyBookings();

        const total = document.getElementById("ownerTotalBookings");
        const pending = document.getElementById("ownerPendingBookings");
        const accepted = document.getElementById("ownerAcceptedBookings");

        if (total) total.textContent = myBookings.length;

        if (pending) {
            pending.textContent = myBookings.filter(
                item => item.status === "Pending"
            ).length;
        }

        if (accepted) {
            accepted.textContent = myBookings.filter(
                item => item.status === "Accepted"
            ).length;
        }
    }

    function renderOwnerBookings() {
        bookings = JSON.parse(
            localStorage.getItem("dagaBookings")
        ) || [];

        const selectedStatus = ownerBookingFilter.value;
        const myBookings = getMyBookings();

        const filteredBookings = myBookings.filter(function(booking) {
            return selectedStatus === "All" ||
                selectedStatus === "all" ||
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
            title.textContent = booking.serviceName || booking.service || "Service";

            card.appendChild(title);

            const details = [
                "Booking ID: " + booking.id,
                "Tourist: " + (booking.touristName || "Not available"),
                "Email: " + (booking.touristEmail || "Not available"),
                "Phone: " + (booking.touristPhone || "Not available"),
                "Date: " + (booking.date || "Not available"),
                "Number of people: " + (booking.guests || booking.people || "Not available"),
                "Message: " + (booking.message || "No message"),
                "Status: " + booking.status
            ];

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
        bookings = JSON.parse(
            localStorage.getItem("dagaBookings")
        ) || [];

        const booking = bookings.find(function(item) {
            return String(item.id) === String(id) &&
                item.ownerEmail &&
                item.ownerEmail.toLowerCase() ===
                loggedOwner.email.toLowerCase();
        });

        if (!booking || booking.status !== "Pending") {
            return;
        }

        booking.status = status;

        localStorage.setItem(
            "dagaBookings",
            JSON.stringify(bookings)
        );

        // Notify the tourist
        if (booking.touristEmail) {
            const notifications = JSON.parse(
                localStorage.getItem("dagaNotifications")
            ) || [];

            notifications.push({
                id: "N-" + Date.now(),
                touristEmail: booking.touristEmail,
                title: "Booking " + status,
                message: "Your request for " +
                    (booking.serviceName || "a service") +
                    " was " + status.toLowerCase() + ".",
                date: new Date().toLocaleString(),
                read: false
            });

            localStorage.setItem(
                "dagaNotifications",
                JSON.stringify(notifications)
            );
        }

        renderOwnerBookings();
        alert("Booking request " + status.toLowerCase() + ".");
    }

    ownerBookingFilter.addEventListener(
        "change",
        renderOwnerBookings
    );

    renderOwnerBookings();
}

function businessLogout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("dagaLoggedInOwner");
        window.location.replace("business-login.html");
    }
}
