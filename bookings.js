
const bookingsContainer = document.getElementById("bookingsContainer");
const statusFilter = document.getElementById("statusFilter");

const loggedInUser = JSON.parse(
    localStorage.getItem("dagaLoggedInUser")
);

function getTouristBookings() {
    const allBookings = JSON.parse(
        localStorage.getItem("dagaBookings")
    ) || [];

    if (!loggedInUser || !loggedInUser.email) {
        return [];
    }

    return allBookings.filter(function(booking) {
        return booking.touristEmail &&
            booking.touristEmail.toLowerCase() ===
            loggedInUser.email.toLowerCase();
    });
}

// Convert booking status into readable text
function getBookingStatus(status) {
    if (status === "Pending") return "Waiting for business approval";
    if (status === "Accepted") return "Booking Accepted";
    if (status === "Rejected") return "Booking Rejected";
    if (status === "Cancelled") return "Cancelled";

    return status || "Pending";
}

function displayBookings(list) {
    bookingsContainer.innerHTML = "";

    if (list.length === 0) {
        bookingsContainer.innerHTML = `
            <div class="empty-bookings">
                <h3>No bookings found</h3>
                <p>Your booking requests will appear here.</p>
            </div>
        `;
        return;
    }

    list.forEach(function(booking) {
        const card = document.createElement("div");
        card.className = "booking-card";

        const title = document.createElement("h3");
        title.textContent =
            booking.serviceName || booking.service || "Service";

        const details = [
            "Location: " + (booking.location || booking.businessName || "Not available"),
            "Date: " + (booking.date || "Not available"),
            "Travellers: " + (booking.guests || booking.people || "Not available"),
            "Amount: ₹" + (booking.price || booking.amount || 0)
        ];

        card.appendChild(title);

        details.forEach(function(detail) {
            const paragraph = document.createElement("p");
            paragraph.textContent = detail;
            card.appendChild(paragraph);
        });

        const status = document.createElement("span");
        status.className = "booking-status status-" +
            String(booking.status || "Pending").toLowerCase();

        status.textContent = getBookingStatus(booking.status);

        card.appendChild(status);

        if (booking.status === "Pending" ||
            booking.status === "Accepted") {

            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancel Booking";

            cancelButton.addEventListener("click", function() {
                cancelBooking(booking.id);
            });

            card.appendChild(cancelButton);
        }

        bookingsContainer.appendChild(card);
    });
}

function filterBookings() {
    const bookings = getTouristBookings();
    const selectedStatus = statusFilter.value;

    if (selectedStatus === "all" || selectedStatus === "All") {
        displayBookings(bookings);
    } else {
        const filtered = bookings.filter(function(booking) {
            return booking.status === selectedStatus;
        });

        displayBookings(filtered);
    }
}

function cancelBooking(id) {
    if (!confirm("Are you sure you want to cancel this booking?")) {
        return;
    }

    const allBookings = JSON.parse(
        localStorage.getItem("dagaBookings")
    ) || [];

    const booking = allBookings.find(function(item) {
        return String(item.id) === String(id) &&
            item.touristEmail &&
            loggedInUser &&
            item.touristEmail.toLowerCase() ===
            loggedInUser.email.toLowerCase();
    });

    if (!booking ||
        (booking.status !== "Pending" &&
         booking.status !== "Accepted")) {
        return;
    }

    booking.status = "Cancelled";

    localStorage.setItem(
        "dagaBookings",
        JSON.stringify(allBookings)
    );

    filterBookings();
}

if (bookingsContainer && statusFilter) {
    statusFilter.addEventListener("change", filterBookings);
    filterBookings();
}
