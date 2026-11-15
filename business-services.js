
const currentOwner = JSON.parse(
    localStorage.getItem("dagaLoggedInOwner")
);

if (!currentOwner) {
    window.location.replace("business-login.html");
}

const serviceForm = document.getElementById("serviceForm");
const serviceName = document.getElementById("serviceName");
const serviceCategory = document.getElementById("serviceCategory");
const serviceDescription = document.getElementById("serviceDescription");
const servicePrice = document.getElementById("servicePrice");
const serviceUnit = document.getElementById("serviceUnit");
const serviceMessage = document.getElementById("serviceMessage");
const managedServicesList = document.getElementById("managedServicesList");
const serviceSubmitButton = document.getElementById("serviceSubmitButton");
const cancelEditButton = document.getElementById("cancelEditButton");

let editingServiceId = null;

let allServices = JSON.parse(localStorage.getItem("dagaServices")) || [];

function saveServices() {
    localStorage.setItem("dagaServices", JSON.stringify(allServices));
}

function getOwnerServices() {
    return allServices.filter(function(service) {
        return service.ownerEmail === currentOwner.email;
    });
}

function resetServiceForm() {
    serviceForm.reset();
    editingServiceId = null;
    serviceSubmitButton.textContent = "Add Service";
    document.getElementById("serviceFormTitle").textContent = "Add a New Service";
    cancelEditButton.hidden = true;
}

function displayServices() {
    const ownerServices = getOwnerServices();

    managedServicesList.replaceChildren();

    if (ownerServices.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "service-empty-message";
        emptyMessage.textContent = "You haven't added any services yet.";
        managedServicesList.appendChild(emptyMessage);
        return;
    }

    ownerServices.forEach(function(service) {
        const card = document.createElement("div");
        card.className = "managed-service-card";

        const title = document.createElement("h3");
        title.textContent = service.name;

        const category = document.createElement("p");
        category.textContent = "Category: " + service.category;

        const description = document.createElement("p");
        description.textContent = service.description;

        const price = document.createElement("p");
        price.textContent = "Price: ₹" + service.price + " / " + service.unit;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function() {
            editService(service.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-service-btn";
        deleteButton.addEventListener("click", function() {
            deleteService(service.id);
        });

        card.append(title, category, description, price, editButton, deleteButton);
        managedServicesList.appendChild(card);
    });
}

serviceForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const serviceData = {
        name: serviceName.value.trim(),
        category: serviceCategory.value,
        description: serviceDescription.value.trim(),
        price: Number(servicePrice.value),
        unit: serviceUnit.value
    };

    if (!serviceData.name || !serviceData.description ||
        serviceData.price < 0 || !Number.isFinite(serviceData.price)) {
        serviceMessage.textContent = "Please enter valid service details.";
        serviceMessage.style.color = "red";
        return;
    }

    if (editingServiceId !== null) {
        const service = allServices.find(function(item) {
            return item.id === editingServiceId &&
                item.ownerEmail === currentOwner.email;
        });

        if (!service) return;

        Object.assign(service, serviceData);

        serviceMessage.textContent = "Service updated successfully!";
    } else {
        allServices.push({
            id: Date.now().toString(),
            ownerEmail: currentOwner.email,
            ...serviceData
        });

        serviceMessage.textContent = "Service added successfully!";
    }

    serviceMessage.style.color = "green";
    saveServices();
    resetServiceForm();
    displayServices();
});

function editService(id) {
    const service = allServices.find(function(item) {
        return item.id === id && item.ownerEmail === currentOwner.email;
    });

    if (!service) return;

    editingServiceId = id;

    serviceName.value = service.name;
    serviceCategory.value = service.category;
    serviceDescription.value = service.description;
    servicePrice.value = service.price;
    serviceUnit.value = service.unit;

    serviceSubmitButton.textContent = "Update Service";
    document.getElementById("serviceFormTitle").textContent = "Edit Service";
    cancelEditButton.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteService(id) {
    const confirmDelete = confirm("Do you want to delete this service?");

    if (!confirmDelete) return;

    allServices = allServices.filter(function(service) {
        return !(service.id === id &&
            service.ownerEmail === currentOwner.email);
    });

    saveServices();
    displayServices();

    serviceMessage.textContent = "Service deleted successfully!";
    serviceMessage.style.color = "green";
}

cancelEditButton.addEventListener("click", resetServiceForm);

function businessLogout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("dagaLoggedInOwner");
        window.location.replace("business-login.html");
    }
}

if (currentOwner) {
    displayServices();
}
