if (sessionStorage.getItem("dagaAdminLoggedIn") !== "true") {
    window.location.replace("admin-login.html");
}

function displayAdminServices(search = "") {
    const services = JSON.parse(localStorage.getItem("dagaServices")) || [];
    const owners = JSON.parse(localStorage.getItem("dagaOwners")) || [];
    const container = document.getElementById("adminServiceList");

    container.innerHTML = "";

    const filtered = services.filter(service =>
        ((service.name || "") + (service.category || "") +
        (service.description || "")).toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0) {
        container.textContent = "No services found.";
        return;
    }

    filtered.forEach(service => {
        const owner = owners.find(o =>
            o.email === service.ownerEmail
        );

        const card = document.createElement("div");
        card.className = "extra-card";

        const title = document.createElement("h3");
        title.textContent = service.name || "Service";

        const category = document.createElement("p");
        category.textContent = "Category: " + (service.category || "");

        const description = document.createElement("p");
        description.textContent = service.description || "";

        const business = document.createElement("p");
        business.textContent = "Business: " +
            (owner ? owner.businessName : "Unknown business");

        const status = document.createElement("p");
        status.textContent = "Owner status: " +
            (owner ? owner.status || "Pending" : "Not found");

        card.append(title, category, description, business, status);
        container.appendChild(card);
    });
}

document.getElementById("serviceSearch").addEventListener("input", function() {
    displayAdminServices(this.value);
});

function adminLogout() {
    sessionStorage.removeItem("dagaAdminLoggedIn");
    window.location.replace("admin-login.html");
}

if (sessionStorage.getItem("dagaAdminLoggedIn") === "true") {
    displayAdminServices();
}