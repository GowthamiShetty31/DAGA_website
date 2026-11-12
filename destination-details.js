// DAGA - Destination Details

const destinations = {

    "Panambur Beach": {
        location: "Mangaluru, Dakshina Kannada",
        category: "Beach",
        description: "Panambur Beach is a popular coastal destination known for its beautiful shoreline, sunset views and beach activities.",
        activities: ["Beach walks", "Sunset photography", "Water activities"],
        bestTime: "October to February",
        budget: "₹500 - ₹1,500 per person"
    },

    "Kukke Subramanya": {
        location: "Subramanya, Dakshina Kannada",
        category: "Religious",
        description: "Kukke Subramanya is a famous pilgrimage destination surrounded by the beautiful Western Ghats.",
        activities: ["Temple visit", "Nature exploration", "Local food"],
        bestTime: "October to March",
        budget: "₹500 - ₹1,500 per person"
    },

    "Malpe Beach": {
        location: "Udupi",
        category: "Beach",
        description: "Malpe Beach is known for its golden sands, coastal scenery and nearby island experiences.",
        activities: ["Beach activities", "Boating", "Sunset viewing"],
        bestTime: "October to February",
        budget: "₹500 - ₹2,000 per person"
    },

    "Coorg": {
        location: "Kodagu",
        category: "Nature",
        description: "Coorg is known for its coffee plantations, green hills, pleasant climate and beautiful landscapes.",
        activities: ["Coffee plantation visits", "Nature walks", "Photography"],
        bestTime: "October to March",
        budget: "₹1,500 - ₹3,000 per person"
    },

    "Bandaje Falls": {
        location: "Dakshina Kannada",
        category: "Waterfall",
        description: "Bandaje Falls is a scenic waterfall in the Western Ghats, popular among trekking and nature enthusiasts.",
        activities: ["Trekking", "Nature exploration", "Photography"],
        bestTime: "November to February",
        budget: "₹1,000 - ₹2,500 per person"
    },

    "Charmadi Ghat": {
        location: "Dakshina Kannada",
        category: "Nature",
        description: "Charmadi Ghat is a beautiful mountain route surrounded by forests, hills and scenic viewpoints.",
        activities: ["Scenic drives", "Photography", "Nature exploration"],
        bestTime: "October to February",
        budget: "₹500 - ₹1,500 per person"
    }

};


// Get selected destination from URL
const params = new URLSearchParams(window.location.search);
const placeName = params.get("place");

const place = destinations[placeName];

if (place) {

    document.getElementById("placeName").textContent = placeName;
    document.getElementById("placeLocation").textContent = place.location;
    document.getElementById("placeCategory").textContent = place.category;

    document.getElementById("placeDescription").textContent = place.description;

    document.getElementById("bestTime").textContent = place.bestTime;

    document.getElementById("sidebarLocation").textContent = place.location;
    document.getElementById("sidebarCategory").textContent = place.category;
    document.getElementById("placeBudget").textContent = place.budget;

    const activityList = document.getElementById("activitiesList");
    activityList.innerHTML = "";

    place.activities.forEach(function(activity) {
        const item = document.createElement("li");
        item.textContent = activity;
        activityList.appendChild(item);
    });

} else {

    document.getElementById("placeName").textContent = "Destination Not Found";
    document.getElementById("placeDescription").textContent =
        "Please return to the destinations page and select a valid destination.";

}


// Plan visit button

function openDestination(placeName) {
    window.location.href =
        "destination-details.html?place=" +
        encodeURIComponent(placeName);
}