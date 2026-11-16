
const bookingParams = new URLSearchParams(window.location.search);
const selectedServiceId = bookingParams.get("id");

const serviceData = JSON.parse(localStorage.getItem("dagaServices")) || [];
const ownerData = JSON.parse(localStorage.getItem("dagaOwners")) || [];

const selectedService = serviceData.find(function(item) {
    return item.id === selectedServiceId;
});

const selectedOwner = selectedService ? ownerData.find(function(owner) {
    return owner.email.toLowerCase() === selectedService.ownerEmail.toLowerCase()
        && owner.status === "Approved";
}) : null;

const bookingForm = document.getElementById("serviceBookingForm");
const bookingFormMessage = document.getElementById("bookingFormMessage");
const dateInput = document.getElementById("bookingDate");

const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;

if (!selectedService || !selectedOwner) {
    bookingForm.hidden = true;
    bookingFormMessage.textContent =
        "This service is unavailable or has not been verified.";
} else {
    document.getElementById("bookingServiceName").textContent =
        selectedService.name;

    document.getElementById("bookingBusinessName").textContent =
        "Business: " + selectedOwner.businessName;

    document.getElementById("bookingServicePrice").textContent =
        "Price: ₹" + selectedService.price + " / " + selectedService.unit;
}

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!selectedService || !selectedOwner) return;

    const bookingDate = dateInput.value;

    if (bookingDate < localToday) {
        bookingFormMessage.textContent = "Please select a future date.";
        bookingFormMessage.style.color = "red";
        return;
    }

    const bookings = JSON.parse(localStorage.getItem("dagaBookings")) || [];

    const newBooking = {
        id: "DAGA-" + Date.now(),
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        ownerEmail: selectedOwner.email,
        businessName: selectedOwner.businessName,
        touristName: document.getElementById("touristName").value.trim(),
        touristEmail: document.getElementById("touristEmail").value.trim(),
        touristPhone: document.getElementById("touristPhone").value.trim(),
        date: bookingDate,
        guests: Number(document.getElementById("bookingGuests").value),
        message: document.getElementById("bookingMessage").value.trim(),
        price: selectedService.price,
        status: "Pending",
        createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    localStorage.setItem("dagaBookings", JSON.stringify(bookings));

    window.location.href =
        "booking-confirmation.html?id=" + encodeURIComponent(newBooking.id);
});
