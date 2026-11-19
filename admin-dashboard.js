
// Check admin login
if (sessionStorage.getItem("dagaAdminLoggedIn") !== "true") {
    window.location.replace("admin-login.html");
}

// Read data safely from localStorage
function getStoredData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        console.error("Could not read " + key, error);
        return [];
    }
}

// Update dashboard statistics
function updateAdminStats() {
    const tourists = getStoredData("dagaUsers");
    const owners = getStoredData("dagaOwners");
    const services = getStoredData("dagaServices");
    const bookings = getStoredData("dagaBookings");

    const pendingBusinesses = owners.filter(function(owner) {
        return (owner.status || "Pending").toLowerCase() === "pending";
    });

    document.getElementById("touristCount").textContent = tourists.length;
    document.getElementById("businessCount").textContent = owners.length;
    document.getElementById("pendingCount").textContent = pendingBusinesses.length;
    document.getElementById("serviceCount").textContent = services.length;
    document.getElementById("bookingCount").textContent = bookings.length;
}

// Display registered tourists
function displayTourists() {
    const tourists = getStoredData("dagaUsers");
    const touristList = document.getElementById("touristList");

    touristList.replaceChildren();

    if (tourists.length === 0) {
        const empty = document.createElement("p");
        empty.className = "admin-empty";
        empty.textContent = "No tourists have registered yet.";
        touristList.appendChild(empty);
        return;
    }

    tourists.forEach(function(tourist) {
        const card = document.createElement("div");
        card.className = "admin-item";

        const name = document.createElement("h3");
        name.textContent = tourist.name || "Tourist";

        const email = document.createElement("p");
        email.textContent = "Email: " + (tourist.email || "Not provided");

        const phone = document.createElement("p");
        phone.textContent = "Phone: " + (tourist.phone || "Not provided");

        card.append(name, email, phone);
        touristList.appendChild(card);
    });
}

// Display registered businesses
function displayBusinesses() {
    const owners = getStoredData("dagaOwners");
    const businessList = document.getElementById("businessList");

    businessList.replaceChildren();

    if (owners.length === 0) {
        const empty = document.createElement("p");
        empty.className = "admin-empty";
        empty.textContent = "No businesses have registered yet.";
        businessList.appendChild(empty);
        return;
    }

    owners.forEach(function(owner) {
        const card = document.createElement("div");
        card.className = "admin-item";

        const name = document.createElement("h3");
        name.textContent = owner.businessName || "Business";

        const ownerName = document.createElement("p");
        ownerName.textContent = "Owner: " + (owner.ownerName || "Not provided");

        const email = document.createElement("p");
        email.textContent = "Email: " + (owner.email || "Not provided");

        const phone = document.createElement("p");
        phone.textContent = "Phone: " + (owner.phone || "Not provided");

        const category = document.createElement("p");
        category.textContent = "Category: " + (owner.category || "Not provided");

        const location = document.createElement("p");
        location.textContent = "Location: " + (owner.location || "Not provided");

        const description = document.createElement("p");
        description.textContent = "Description: " + (owner.description || "Not provided");

        const statusValue = owner.status || "Pending";
        const status = document.createElement("span");
        status.className = "admin-status";

        if (statusValue.toLowerCase() === "approved") {
            status.classList.add("approved");
        } else if (statusValue.toLowerCase() === "rejected") {
            status.classList.add("rejected");
        }

        status.textContent = "Status: " + statusValue;

        card.append(
            name,
            ownerName,
            email,
            phone,
            category,
            location,
            description,
            status
        );

        // Show approval buttons only for pending registrations
        if (statusValue.toLowerCase() === "pending") {
            const actions = document.createElement("div");
            actions.className = "admin-actions";

            const approveButton = document.createElement("button");
            approveButton.className = "approve-btn";
            approveButton.textContent = "Approve";
            approveButton.addEventListener("click", function() {
                updateBusinessStatus(owner.email, "Approved");
            });

            const rejectButton = document.createElement("button");
            rejectButton.className = "reject-btn";
            rejectButton.textContent = "Reject";
            rejectButton.addEventListener("click", function() {
                updateBusinessStatus(owner.email, "Rejected");
            });

            actions.append(approveButton, rejectButton);
            card.appendChild(actions);
        }

        businessList.appendChild(card);
    });
}

// Approve or reject a business
function updateBusinessStatus(email, newStatus) {
    if (!email) {
        alert("Business email is missing.");
        return;
    }

    const owners = getStoredData("dagaOwners");

    const ownerIndex = owners.findIndex(function(owner) {
        return owner.email &&
            owner.email.toLowerCase() === email.toLowerCase();
    });

    if (ownerIndex === -1) {
        alert("Business not found.");
        return;
    }

    if ((owners[ownerIndex].status || "Pending").toLowerCase() !== "pending") {
        alert("This business has already been reviewed.");
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to " + newStatus.toLowerCase() +
        " this business?"
    );

    if (!confirmed) return;

    owners[ownerIndex].status = newStatus;

    localStorage.setItem("dagaOwners", JSON.stringify(owners));

    renderAdminDashboard();

    alert(
        "Business " + newStatus.toLowerCase() + " successfully."
    );
}

// Render all admin dashboard content
function renderAdminDashboard() {
    updateAdminStats();
    displayTourists();
    displayBusinesses();
}

// Admin logout
function adminLogout() {
    const confirmed = confirm("Are you sure you want to logout?");

    if (confirmed) {
        sessionStorage.removeItem("dagaAdminLoggedIn");
        window.location.replace("admin-login.html");
    }
}

// Initial dashboard load
renderAdminDashboard();
