const params = new URLSearchParams(window.location.search);
const bookingId = params.get("id");

const bookings = JSON.parse(
    localStorage.getItem("dagaBookings")
) || [];

const booking = bookings.find(item =>
    String(item.id) === String(bookingId)
);

const container = document.getElementById("confirmationDetails");

if (booking && container) {
    container.innerHTML = `
        <h2>Booking Request Submitted!</h2>
        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><strong>Service:</strong> ${booking.serviceName}</p>
        <p><strong>Business:</strong> ${booking.businessName}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Guests:</strong> ${booking.guests}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
        <p>Your request is awaiting business approval.</p>
        <a href="bookings.html">View My Bookings</a>
    `;
} else if (container) {
    container.textContent = "Booking details could not be found.";
}