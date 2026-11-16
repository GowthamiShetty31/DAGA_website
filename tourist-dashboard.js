const profile = JSON.parse(localStorage.getItem("dagaProfile")) || {};
const trips = JSON.parse(localStorage.getItem("dagaTrips")) || [];
const bookings = JSON.parse(localStorage.getItem("dagaBookings")) || [];
const wishlist = JSON.parse(localStorage.getItem("dagaWishlist")) || [];
const notifications = JSON.parse(localStorage.getItem("dagaNotifications")) || [];

document.getElementById("touristWelcome").textContent =
    profile.fullName ? "Welcome, " + profile.fullName + "!" : "Welcome to DAGA!";

document.getElementById("touristEmail").textContent =
    profile.email || "Update your tourist profile to add your details.";

document.getElementById("tripCount").textContent = trips.length;
document.getElementById("bookingCount").textContent = bookings.length;
document.getElementById("wishlistCount").textContent = wishlist.length;

const unread = notifications.filter(n =>
    !profile.email || n.touristEmail === profile.email
).filter(n => !n.read).length;

document.getElementById("notificationCount").textContent = unread;

const tripContainer = document.getElementById("dashboardTrips");

if (trips.length === 0) {
    tripContainer.textContent = "You have not saved any trips yet.";
} else {
    trips.slice(-3).reverse().forEach(trip => {
        const card = document.createElement("div");
        card.className = "extra-card";
        card.textContent =
            (trip.location || "Trip") + " - " +
            (trip.days || 1) + " day(s)";
        tripContainer.appendChild(card);
    });
}