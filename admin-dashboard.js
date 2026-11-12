if (sessionStorage.getItem("dagaAdminLoggedIn") !== "true") {
    window.location.replace("admin-login.html");
}
// Read registered accounts from browser storage
let tourists = JSON.parse(localStorage.getItem("dagaUsers")) || [];
let businesses = JSON.parse(localStorage.getItem("dagaOwners")) || [];

// Display dashboard statistics
function updateStatistics() {
    const pendingBusinesses = businesses.filter(function(business) {
        return !business.status || business.status === "Pending";
    });

    document.getElementById("touristCount").textContent = tourists.length;
    document.getElementById("businessCount").textContent = businesses.length;
    document.getElementById("pendingCount").textContent = pendingBusinesses.length;
}

// Safely display user-provided text inside HTML
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function(character) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[character];
    });
}

// Display registered tourists
function displayTourists() {
    const touristList = document.getElementById("touristList");

    if (tourists.length === 0) {
        touristList.innerHTML =
            '<p class="admin-empty">No tourist accounts found.</p>';
        return;
    }

    touristList.innerHTML = tourists.map(function(tourist) {
        return `
            <div class="admin-item">
                <h3>${escapeHTML(tourist.name || "Tourist")}</h3>
                <p><strong>Email:</strong> ${escapeHTML(tourist.email)}</p>
                <p><strong>Phone:</strong> ${escapeHTML(tourist.phone || "Not provided")}</p>
            </div>
        `;
    }).join("");
}

// Display registered businesses
function displayBusinesses() {
    const businessList = document.getElementById("businessList");

    if (businesses.length === 0) {
        businessList.innerHTML =
            '<p class="admin-empty">No business registrations found.</p>';
        return;
    }

    businessList.innerHTML = businesses.map(function(business, index) {
        const status = business.status || "Pending";

        return `
            <div class="admin-item">
                <h3>${escapeHTML(business.businessName)}</h3>
                <p><strong>Owner:</strong> ${escapeHTML(business.ownerName)}</p>
                <p><strong>Email:</strong> ${escapeHTML(business.email)}</p>
                <p><strong>Category:</strong> ${escapeHTML(business.category)}</p>
                <p><strong>Location:</strong> ${escapeHTML(business.location)}</p>
                <p><strong>Description:</strong> ${escapeHTML(business.description)}</p>
                <p><strong>Status:</strong>
                    <span class="admin-status">${escapeHTML(status)}</span>
                </p>

                ${
                    status === "Pending"
                    ? `
                        <button onclick="verifyBusiness(${index}, 'Approved')">
                            Approve
                        </button>
                        <button class="admin-reject"
                            onclick="verifyBusiness(${index}, 'Rejected')">
                            Reject
                        </button>
                    `
                    : ""
                }
            </div>
        `;
    }).join("");
}

// Approve or reject a business
function verifyBusiness(index, status) {
    if (!businesses[index]) {
        return;
    }

    businesses[index].status = status;

    localStorage.setItem("dagaOwners", JSON.stringify(businesses));

    displayBusinesses();
    updateStatistics();

    alert("Business status updated to " + status + ".");
}

// Load dashboard
function loadAdminDashboard() {
    displayTourists();
    displayBusinesses();
    updateStatistics();
}

if (sessionStorage.getItem("dagaAdminLoggedIn") === "true") {
    loadAdminDashboard();
}
