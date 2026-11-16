if (sessionStorage.getItem("dagaAdminLoggedIn") !== "true") {
    window.location.replace("admin-login.html");
}

function getBusinesses() {
    return JSON.parse(localStorage.getItem("dagaOwners")) || [];
}

function displayBusinesses(filter = "All") {
    const container = document.getElementById("adminBusinessList");
    container.innerHTML = "";

    const businesses = getBusinesses();

    const filtered = businesses.filter(b => {
        const status = b.status || "Pending";
        return filter === "All" || status === filter;
    });

    if (filtered.length === 0) {
        container.textContent = "No businesses found.";
        return;
    }

    filtered.forEach(business => {
        const card = document.createElement("div");
        card.className = "extra-card";

        const title = document.createElement("h3");
        title.textContent = business.businessName || "Business";

        const owner = document.createElement("p");
        owner.textContent = "Owner: " + (business.ownerName || "");

        const email = document.createElement("p");
        email.textContent = "Email: " + (business.email || "");

        const location = document.createElement("p");
        location.textContent = "Location: " + (business.location || "");

        const status = document.createElement("p");
        status.textContent = "Status: " + (business.status || "Pending");

        card.append(title, owner, email, location, status);

        if ((business.status || "Pending") === "Pending") {
            const approve = document.createElement("button");
            approve.textContent = "Approve";
            approve.onclick = () => updateBusinessStatus(business.email, "Approved");

            const reject = document.createElement("button");
            reject.textContent = "Reject";
            reject.onclick = () => updateBusinessStatus(business.email, "Rejected");

            card.append(approve, reject);
        }

        container.appendChild(card);
    });
}

function updateBusinessStatus(email, status) {
    const businesses = getBusinesses();
    const index = businesses.findIndex(b => b.email === email);

    if (index === -1) return;

    businesses[index].status = status;
    localStorage.setItem("dagaOwners", JSON.stringify(businesses));
    displayBusinesses("All");
}

function adminLogout() {
    sessionStorage.removeItem("dagaAdminLoggedIn");
    window.location.replace("admin-login.html");
}

if (sessionStorage.getItem("dagaAdminLoggedIn") === "true") {
    displayBusinesses();
}