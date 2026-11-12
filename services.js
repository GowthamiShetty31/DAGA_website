// DAGA - Local Services

// Search and filter services
function filterServices() {

    const searchText = document
        .getElementById("serviceSearch")
        .value.toLowerCase().trim();

    const category = document
        .getElementById("serviceCategory")
        .value;

    const cards = document.querySelectorAll(".service-card");

    let count = 0;

    cards.forEach(function(card) {

        const details = card.querySelector(".service-info")
            .textContent.toLowerCase();

        const cardCategory = card.dataset.category;

        const matchesSearch = details.includes(searchText);

        const matchesCategory =
            category === "all" || category === cardCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            count++;
        } else {
            card.style.display = "none";
        }

    });

    document.getElementById("noServices").style.display =
        count === 0 ? "block" : "none";
}


// View service details
function viewService(serviceName) {
    alert(
        "You selected " + serviceName +
        ". Service details and booking will be connected soon!"
    );
}