
const servicesList = document.getElementById("touristServicesList");
const searchInput = document.getElementById("serviceSearch");
const categoryFilter = document.getElementById("serviceCategoryFilter");

const allOwners = JSON.parse(localStorage.getItem("dagaOwners")) || [];
const allServices = JSON.parse(localStorage.getItem("dagaServices")) || [];

const approvedOwners = allOwners.filter(function(owner) {
    return owner.status === "Approved";
});

const approvedEmails = approvedOwners.map(function(owner) {
    return owner.email.toLowerCase();
});

const publicServices = allServices.filter(function(service) {
    return approvedEmails.includes(service.ownerEmail.toLowerCase());
});

function renderPublicServices() {
    const search = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;

    const filtered = publicServices.filter(function(service) {
        const owner = approvedOwners.find(function(item) {
            return item.email.toLowerCase() === service.ownerEmail.toLowerCase();
        });

        const searchableText = (
            service.name + " " +
            service.description + " " +
            service.category + " " +
            (owner ? owner.location : "")
        ).toLowerCase();

        return searchableText.includes(search) &&
            (!category || service.category === category);
    });

    servicesList.replaceChildren();

    if (filtered.length === 0) {
        const empty = document.createElement("p");
        empty.className = "service-empty-message";
        empty.textContent = "No approved services found. Please check again later.";
        servicesList.appendChild(empty);
        return;
    }

    filtered.forEach(function(service) {
        const owner = approvedOwners.find(function(item) {
            return item.email.toLowerCase() === service.ownerEmail.toLowerCase();
        });

        const card = document.createElement("div");
        card.className = "managed-service-card";

        const title = document.createElement("h3");
        title.textContent = service.name;

        const description = document.createElement("p");
        description.textContent = service.description;

        const categoryText = document.createElement("p");
        categoryText.textContent = "Category: " + service.category;

        const location = document.createElement("p");
        location.textContent = "Location: " + (owner?.location || "Not provided");

        const price = document.createElement("p");
        price.textContent = "Price: ₹" + service.price + " / " + service.unit;

        const button = document.createElement("button");
        button.textContent = "View Details";
        button.addEventListener("click", function() {
            window.location.href =
                "service-details.html?id=" + encodeURIComponent(service.id);
        });

        card.append(title, description, categoryText, location, price, button);
        servicesList.appendChild(card);
    });
}

searchInput.addEventListener("input", renderPublicServices);
categoryFilter.addEventListener("change", renderPublicServices);

renderPublicServices();
