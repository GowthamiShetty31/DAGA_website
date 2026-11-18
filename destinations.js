// DAGA - Explore Destinations

function filterDestinations() {
    const searchText = document.getElementById("placeSearch").value.toLowerCase().trim();
    const location = document.getElementById("locationFilter").value;
    const category = document.getElementById("categoryFilter").value;

    const cards = document.querySelectorAll(".place-card");
    let count = 0;

    cards.forEach(function(card) {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const cardLocation = card.dataset.location;
        const cardCategory = card.dataset.category;

        const matchesName = name.includes(searchText);
        const matchesLocation = location === "all" || location === cardLocation;
        const matchesCategory = category === "all" || category === cardCategory;

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

function openDestination(placeName) {
    window.location.href =
        "destination-details.html?place=" + encodeURIComponent(placeName);
}

// Read search filters passed from the home page
const params = new URLSearchParams(window.location.search);
const homeSearch = params.get("search");
const homeCategory = params.get("category");

if (homeSearch) {
    document.getElementById("placeSearch").value = homeSearch;
}

if (homeCategory) {
    const categoryMap = {
        "Tourist Places": "all",
        "Homestays": "all",
        "Local Food": "all",
        "Adventure": "all",
        "Cultural Experiences": "all",
        "Local Guides": "all"
    };

    document.getElementById("categoryFilter").value =
        categoryMap[homeCategory] || "all";
}

filterDestinations();