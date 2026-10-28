
/* DAGA HOMEPAGE JAVASCRIPT */

// 1. DESTINATION SEARCH AND FILTERS

const filterButtons = document.querySelectorAll(".filter");
const placeCards = document.querySelectorAll(".place-card");
const placeSearch = document.getElementById("placeSearch");
const emptyState = document.getElementById("emptyState");

let selectedCategory = "all";

function filterPlaces() {
    const searchText = placeSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    placeCards.forEach(function(card) {
        const category = card.dataset.category;
        const name = card.dataset.name.toLowerCase();

        const categoryMatches =
            selectedCategory === "all" ||
            category === selectedCategory;

        const searchMatches = name.includes(searchText);

        if (categoryMatches && searchMatches) {
            card.hidden = false;
            visibleCount++;
        } else {
            card.hidden = true;
        }
    });

    emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.filter;

        filterPlaces();
    });
});

placeSearch.addEventListener("input", filterPlaces);


// 2. MOBILE NAVIGATION MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// 3. PLACE BUTTONS

const toast = document.getElementById("toast");
let toastTimer;

function showMessage(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}

document.querySelectorAll(".explore-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        const place = button.dataset.place;

        showMessage(
            place +
            " selected! Detailed information and local business listings " +
            "will be added in the next development stage."
        );
    });
});


// 4. SAMPLE TRIP RECOMMENDATIONS

const recommendations = {
    temple: {
        low: {
            place: "Kateel",
            reason: "Consider a temple visit and check transport costs."
        },
        medium: {
            place: "Kukke Subramanya",
            reason: "Consider a pilgrimage trip after checking travel and meal costs."
        },
        high: {
            place: "Dharmasthala",
            reason: "Consider a planned pilgrimage day with transport and meals."
        }
    },

    coast: {
        low: {
            place: "Panambur Beach",
            reason: "Consider a simple coastal outing and budget for transport."
        },
        medium: {
            place: "Tannirbhavi Beach",
            reason: "Consider a relaxed beach visit after checking the route."
        },
        high: {
            place: "Panambur Beach",
            reason: "Consider a longer coastal outing with suitable nearby stops."
        }
    },

    nature: {
        low: {
            place: "Pilikula Nisargadhama",
            reason: "Check entry fees and choose activities within your budget."
        },
        medium: {
            place: "Pilikula Nisargadhama",
            reason: "Consider a nature and heritage outing after checking entry fees."
        },
        high: {
            place: "Pilikula Nisargadhama",
            reason: "Plan a fuller day around attractions available on your visit date."
        }
    },

    all: {
        low: {
            place: "Kateel",
            reason: "Choose a destination and check transport costs before travelling."
        },
        medium: {
            place: "Pilikula Nisargadhama",
            reason: "Consider a nature and heritage outing after checking current prices."
        },
        high: {
            place: "Kukke Subramanya",
            reason: "Consider a day trip after checking travel time and expenses."
        }
    }
};


// 5. TRIP PLANNER FORM

const tripForm = document.getElementById("tripForm");
const plannerResult = document.getElementById("plannerResult");

tripForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const interest = document.getElementById("interest").value;
    const budget = document.getElementById("budget").value;
    const duration = document.getElementById("duration").value;
    const groupSize = document.getElementById("groupSize").value;

    const suggestion = recommendations[interest][budget];

    const durationNames = {
        hours: "A few hours",
        day: "One day",
        weekend: "Weekend"
    };

    const budgetNames = {
        low: "Under ₹500",
        medium: "₹500–₹1,500",
        high: "₹1,500+"
    };

    // Build the result safely without inserting user input as HTML.
    plannerResult.replaceChildren();

    const heading = document.createElement("h4");
    heading.textContent = "Your starting point: " + suggestion.place;

    const reason = document.createElement("p");
    reason.textContent = suggestion.reason;

    const details = document.createElement("p");
    details.textContent =
        "Available time: " + durationNames[duration] +
        " | Group size: " + groupSize +
        " | Budget: " + budgetNames[budget];

    const note = document.createElement("p");
    note.textContent =
        "This is a sample recommendation. Actual expenses, " +
        "availability and travel suitability have not been verified.";

    plannerResult.append(heading, reason, details, note);
    plannerResult.hidden = false;

    plannerResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});
