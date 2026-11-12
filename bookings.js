// Sample booking data for demonstration
const sampleBookings = [
    {
        id: 1,
        service: "Traditional Nature Homestay",
        location: "Dakshina Kannada",
        date: "2026-12-15",
        people: 2,
        amount: 2500,
        status: "Pending"
    },
    {
        id: 2,
        service: "Local Heritage Guide",
        location: "Kukke Subramanya",
        date: "2026-12-20",
        people: 4,
        amount: 1500,
        status: "Confirmed"
    },
    {
        id: 3,
        service: "Nature Trekking Experience",
        location: "Bandaje Falls",
        date: "2026-12-25",
        people: 3,
        amount: 1800,
        status: "Cancelled"
    }
];

// Load saved bookings or initialize demo data
let bookings = JSON.parse(localStorage.getItem("dagaBookings"));

if (bookings === null) {
    bookings = sampleBookings;
    localStorage.setItem("dagaBookings", JSON.stringify(bookings));
}

const bookingsContainer = document.getElementById("bookingsContainer");

// Display bookings
function displayBookings(list) {
    bookingsContainer.innerHTML = "";

    if (list.length === 0) {
        bookingsContainer.innerHTML = `
            <div class="empty-bookings">
                <h3>No bookings found</h3>
                <p>Your bookings will appear here.</p>
            </div>
        `;
        return;
    }

    list.forEach(function(booking) {
        const card = document.createElement("div");
        card.className = "booking-card";

        const title = document.createElement("h3");
        title.textContent = booking.service;

        const location = document.createElement("p");
        location.textContent = "Location: " + booking.location;

        const date = document.createElement("p");
        date.textContent = "Date: " + booking.date;

        const people = document.createElement("p");
        people.textContent = "Travellers: " + booking.people;

        const amount = document.createElement("p");
        amount.textContent = "Amount: ₹" + booking.amount;

        const status = document.createElement("span");
        status.className = "booking-status status-" + booking.status;
        status.textContent = booking.status;

        card.append(title, location, date, people, amount, status);

        if (booking.status !== "Cancelled") {
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

// Filter bookings by status
function filterBookings() {
    const selectedStatus =
        document.getElementById("statusFilter").value;

    if (selectedStatus === "all") {
        displayBookings(bookings);
    } else {
        const filtered = bookings.filter(function(booking) {
            return booking.status === selectedStatus;
        });

        displayBookings(filtered);
    }
}

// Cancel a booking
function cancelBooking(id) {
    const confirmCancel = confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
        return;
    }

    bookings = bookings.map(function(booking) {
        if (booking.id === id) {
            return { ...booking, status: "Cancelled" };
        }

        return booking;
    });

    localStorage.setItem("dagaBookings", JSON.stringify(bookings));

    filterBookings();
}

// Display bookings when page loads
displayBookings(bookings);