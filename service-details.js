
const params = new URLSearchParams(window.location.search);
const serviceId = params.get("id");

const services = JSON.parse(localStorage.getItem("dagaServices")) || [];
const owners = JSON.parse(localStorage.getItem("dagaOwners")) || [];

const service = services.find(item => String(item.id) === String(serviceId));

const owner = service
    ? owners.find(item =>
        item.email.toLowerCase() === service.ownerEmail.toLowerCase() &&
        item.status === "Approved"
    )
    : null;

const message = document.getElementById("detailMessage");
const bookButton = document.getElementById("bookServiceButton");

if (!service || !owner) {
    document.getElementById("detailName").textContent = "Service Unavailable";
    message.textContent = "This service is unavailable or not verified.";
    bookButton.hidden = true;
} else {
    document.getElementById("detailName").textContent = service.name;
    document.getElementById("detailDescription").textContent = service.description;
    document.getElementById("detailCategory").textContent = service.category;
    document.getElementById("detailBusiness").textContent = owner.businessName;
    document.getElementById("detailLocation").textContent = owner.location;
    document.getElementById("detailContact").textContent = owner.phone;
    document.getElementById("detailPrice").textContent = service.price;
    document.getElementById("detailUnit").textContent = service.unit;

    message.textContent = "This service is provided by an approved business.";

    bookButton.addEventListener("click", function() {
        window.location.href =
            "service-booking.html?id=" + encodeURIComponent(service.id);
    });
}
