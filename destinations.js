// DAGA - Explore Destinations

// Search and filter destinations
function filterDestinations() {

    const searchText = document
        .getElementById("placeSearch")
        .value.toLowerCase();

    const location = document
        .getElementById("locationFilter")
        .value;

    const category = document
        .getElementById("categoryFilter")
        .value;

    const cards = document.querySelectorAll(".place-card");

    let count = 0;

    cards.forEach(function(card) {

        const name = card.querySelector("h3").textContent.toLowerCase();

        const cardLocation = card.dataset.location;
        const cardCategory = card.dataset.category;

        const matchesName = name.includes(searchText);

        const matchesLocation =
            location === "all" || location === cardLocation;

        const matchesCategory =
            category === "all" || category === cardCategory;

        if (matchesName && matchesLocation && matchesCategory) {
            card.style.display = "block";
            count++;
        } else {
            card.style.display = "none";
        }

    });

    document.getElementById("noResults").style.display =
        count === 0 ? "block" : "none";
}


// Destination details
function showDetails(placeName) {

    alert(
        "You selected " + placeName +
        ". More destination details and booking options will be available soon!"
    );

}
function openDestination(placeName) {
    window.location.href =
        "destination-details.html?place=" +
        encodeURIComponent(placeName);
}