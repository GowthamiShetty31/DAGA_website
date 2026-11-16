const analyticsOwner = JSON.parse(localStorage.getItem("dagaLoggedInOwner"));

if (!analyticsOwner) {
    window.location.replace("business-login.html");
}

function loadAnalytics() {
    const services = JSON.parse(localStorage.getItem("dagaServices")) || [];
    const bookings = JSON.parse(localStorage.getItem("dagaBookings")) || [];
    const reviews = JSON.parse(localStorage.getItem("dagaReviews")) || [];

    const myServices = services.filter(s =>
        s.ownerEmail &&
        s.ownerEmail.toLowerCase() === analyticsOwner.email.toLowerCase()
    );

    const myBookings = bookings.filter(b =>
        b.ownerEmail &&
        b.ownerEmail.toLowerCase() === analyticsOwner.email.toLowerCase()
    );

    const serviceIds = myServices.map(s => String(s.id));

    const myReviews = reviews.filter(r =>
        serviceIds.includes(String(r.serviceId))
    );

    document.getElementById("analyticsServices").textContent = myServices.length;
    document.getElementById("analyticsBookings").textContent = myBookings.length;
    document.getElementById("analyticsPending").textContent =
        myBookings.filter(b => b.status === "Pending").length;
    document.getElementById("analyticsAccepted").textContent =
        myBookings.filter(b => b.status === "Accepted" || b.status === "Confirmed").length;
    document.getElementById("analyticsReviews").textContent = myReviews.length;

    const summary = document.getElementById("analyticsSummary");
    summary.innerHTML = "";

    ["Pending", "Accepted", "Rejected", "Confirmed", "Cancelled"].forEach(status => {
        const count = myBookings.filter(b => b.status === status).length;
        const line = document.createElement("p");
        line.textContent = status + ": " + count;
        summary.appendChild(line);
    });
}

function businessLogout() {
    localStorage.removeItem("dagaLoggedInOwner");
    window.location.href = "business-login.html";
}

if (analyticsOwner) loadAnalytics();