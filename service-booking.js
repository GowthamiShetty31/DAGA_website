
const params = new URLSearchParams(window.location.search);
const serviceId = params.get("id");

const services = JSON.parse(localStorage.getItem("dagaServices")) || [];
const owners = JSON.parse(localStorage.getItem("dagaOwners")) || [];

const loggedInUser = JSON.parse(
    localStorage.getItem("dagaLoggedInUser")
);

const service = services.find(item => String(item.id) === String(serviceId));

const owner = service
    ? owners.find(item =>
        item.email.toLowerCase() === service.ownerEmail.toLowerCase() &&
        item.status === "Approved"
    )
    : null;

const form = document.getElementById("serviceBookingForm");
const message = document.getElementById("bookingFormMessage");
const dateInput = document.getElementById("bookingDate");

if (!loggedInUser) {
    form.hidden = true;
    message.textContent = "Please login before booking.";
} else if (!service || !owner) {
    form.hidden = true;
    message.textContent = "This service is unavailable or not verified.";
} else {
    const today = new Date();
    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localToday;

    document.getElementById("bookingServiceName").textContent = service.name;
    document.getElementById("bookingBusinessName").textContent =
        "Business: " + owner.businessName;
    document.getElementById("bookingServicePrice").textContent =
        "Price: ₹" + service.price + " / " + service.unit;

    document.getElementById("touristName").value = loggedInUser.name || "";
    document.getElementById("touristEmail").value = loggedInUser.email || "";
    document.getElementById("touristPhone").value = loggedInUser.phone || "";

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (dateInput.value < localToday) {
            message.textContent = "Please select a valid future date.";
            return;
        }

        const bookings = JSON.parse(
            localStorage.getItem("dagaBookings")
        ) || [];

        const booking = {
            id: "DAGA-" + Date.now(),
            serviceId: service.id,
            serviceName: service.name,
            ownerEmail: owner.email,
            businessName: owner.businessName,
            touristName: document.getElementById("touristName").value.trim(),
            touristEmail: loggedInUser.email,
            touristPhone: document.getElementById("touristPhone").value.trim(),
            date: dateInput.value,
            guests: Number(document.getElementById("bookingGuests").value),
            message: document.getElementById("bookingMessage").value.trim(),
            price: service.price,
            status: "Pending",
            createdAt: new Date().toISOString()
        };

        bookings.push(booking);
        localStorage.setItem("dagaBookings", JSON.stringify(bookings));

        window.location.href =
            "booking-confirmation.html?id=" + encodeURIComponent(booking.id);
    });
}
