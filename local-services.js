
const searchInput = document.getElementById("serviceSearch");
const categorySelect = document.getElementById("serviceCategory");
const locationSelect = document.getElementById("serviceLocation");
const searchButton = document.getElementById("searchServiceBtn");

const serviceCards = document.querySelectorAll(".service-card");
const noServices = document.getElementById("noServices");

function filterServices() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;
    const selectedLocation = locationSelect.value;

    let visibleCount = 0;

    serviceCards.forEach(function(card) {

        const cardText = card.innerText.toLowerCase();
        const cardCategory = card.dataset.category;
        const cardLocation = card.dataset.location;

        const matchesSearch = cardText.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;

        const matchesLocation =
            selectedLocation === "all" ||
            cardLocation === selectedLocation;

        if (matchesSearch && matchesCategory && matchesLocation) {

            card.style.display = "block";
            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });

    noServices.style.display =
        visibleCount === 0 ? "block" : "none";
}


// Search button
searchButton.addEventListener("click", filterServices);


// Search while typing
searchInput.addEventListener("input", filterServices);


// Category filter
categorySelect.addEventListener("change", filterServices);


// Location filter
locationSelect.addEventListener("change", filterServices);


// Service details
function showServiceDetails(serviceName) {

    alert(
        serviceName +
        "\n\nDetailed information and booking options will be available soon!"
    );

}
