
const confirmationParams = new URLSearchParams(window.location.search);
const bookingId = confirmationParams.get("id");

const allBookings = JSON.parse(localStorage.getItem("dagaBookings")) || [];

const booking = allBookings.find(function(item) {
    return item.id === bookingId;
});

if (booking) {
    document.getElementById("confirmId").textContent = booking.id;
    document.getElementById("confirmService").textContent = booking.serviceName;
    document.getElementById("confirmBusiness").textContent = booking.businessName;
    document.getElementById("confirmDate").textContent = booking.date;
    document.getElementById("confirmGuests").textContent = booking.guests;
    document.getElementById("confirmStatus").textContent = booking.status;
} else {
    document.querySelector(".confirmation-card").innerHTML =
        "<h2>Booking Not Found</h2><p>Please check your booking details.</p>" +
        '<a href="services.html">Return to Services</a>';
}
