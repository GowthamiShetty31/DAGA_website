// DAGA Home Page JavaScript

// Search functionality
function searchPlaces() {
    const searchInput = document.querySelector(".search-box input").value;
    const category = document.querySelector(".search-box select").value;

    if (searchInput.trim() === "" && category === "") {
        alert("Please enter a destination or select a category.");
    } else {
        alert("Search functionality will be connected soon!");
    }
}

// Trip Planner
function openTripPlanner() {
    alert("Smart Trip Planner will be available soon!");
}