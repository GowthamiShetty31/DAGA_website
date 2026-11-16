
const params = new URLSearchParams(window.location.search);
const serviceId = params.get("id");

const services = JSON.parse(localStorage.getItem("dagaServices")) || [];
const owners = JSON.parse(localStorage.getItem("dagaOwners")) || [];

const service = services.find(function(item) {
    return item.id === serviceId;
});

const owner = service ? owners.find(function(item) {
    return item.email.toLowerCase() === service.ownerEmail.toLowerCase()
        && item.status === "Approved";
}) : null;

const message = document.getElementById("detailMessage");
const bookButton = document.getElementById("bookServiceButton");

if (!service || !owner) {
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

    bookButton.addEventListener("click", function() {
        window.location.href =
            "service-booking.html?id=" + encodeURIComponent(service.id);
            function saveToWishlist(type, name, link) {
    const items = JSON.parse(localStorage.getItem("dagaWishlist")) || [];

    const id = name.toLowerCase().replaceAll(" ", "-");

    if (items.some(item => item.id === id && item.type === type)) {
        alert("Already added to your wishlist.");
        return;
    }

    items.push({ id, type, name, link });
    localStorage.setItem("dagaWishlist", JSON.stringify(items));
    alert("Added to your wishlist!");
}
    });
}
