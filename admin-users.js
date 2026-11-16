if (sessionStorage.getItem("dagaAdminLoggedIn") !== "true") {
    window.location.replace("admin-login.html");
}

const users = JSON.parse(localStorage.getItem("dagaUsers")) || [];

function displayUsers(search = "") {
    const container = document.getElementById("adminUserList");
    container.innerHTML = "";

    const filtered = users.filter(user =>
        ((user.fullName || user.name || "") + (user.email || ""))
        .toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0) {
        container.textContent = "No registered tourists found.";
        return;
    }

    filtered.forEach(user => {
        const card = document.createElement("div");
        card.className = "extra-card";

        const name = document.createElement("h3");
        name.textContent = user.fullName || user.name || "Tourist";

        const email = document.createElement("p");
        email.textContent = "Email: " + (user.email || "Not provided");

        const phone = document.createElement("p");
        phone.textContent = "Phone: " + (user.phone || "Not provided");

        card.append(name, email, phone);
        container.appendChild(card);
    });
}

document.getElementById("userSearch").addEventListener("input", function() {
    displayUsers(this.value);
});

function adminLogout() {
    sessionStorage.removeItem("dagaAdminLoggedIn");
    window.location.replace("admin-login.html");
}

if (sessionStorage.getItem("dagaAdminLoggedIn") === "true") {
    displayUsers();
}