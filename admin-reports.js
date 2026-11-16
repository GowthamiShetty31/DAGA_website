if (sessionStorage.getItem("dagaAdminLoggedIn") !== "true") {
    window.location.replace("admin-login.html");
}

function readData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function makeReportLine(label, value) {
    const line = document.createElement("div");
    line.className = "extra-card";

    const text = document.createElement("p");
    text.textContent = label + ": " + value;

    line.appendChild(text);
    return line;
}

function loadReports() {
    const users = readData("dagaUsers");
    const owners = readData("dagaOwners");
    const services = readData("dagaServices");
    const bookings = readData("dagaBookings");
    const reviews = readData("dagaReviews");

    document.getElementById("reportUsers").textContent = users.length;
    document.getElementById("reportOwners").textContent = owners.length;
    document.getElementById("reportServices").textContent = services.length;
    document.getElementById("reportBookings").textContent = bookings.length;

    const businessReport = document.getElementById("businessReport");
    businessReport.innerHTML = "";

    const approved = owners.filter(o => o.status === "Approved").length;
    const pending = owners.filter(o => !o.status || o.status === "Pending").length;
    const rejected = owners.filter(o => o.status === "Rejected").length;

    businessReport.append(
        makeReportLine("Approved businesses", approved),
        makeReportLine("Pending businesses", pending),
        makeReportLine("Rejected businesses", rejected)
    );

    const bookingReport = document.getElementById("bookingReport");
    bookingReport.innerHTML = "";

    ["Pending", "Accepted", "Rejected", "Confirmed", "Cancelled"].forEach(status => {
        const count = bookings.filter(b => b.status === status).length;
        bookingReport.appendChild(makeReportLine(status + " bookings", count));
    });

    const reviewReport = document.getElementById("reviewReport");
    reviewReport.innerHTML = "";

    const average = reviews.length
        ? (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length).toFixed(1)
        : "No ratings";

    reviewReport.append(
        makeReportLine("Total reviews", reviews.length),
        makeReportLine("Average rating", average)
    );
}

function adminLogout() {
    if (confirm("Are you sure you want to logout?")) {
        sessionStorage.removeItem("dagaAdminLoggedIn");
        window.location.replace("admin-login.html");
    }
}

if (sessionStorage.getItem("dagaAdminLoggedIn") === "true") {
    loadReports();
}