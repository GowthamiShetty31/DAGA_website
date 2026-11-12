// DAGA - Smart Trip Planner

const tripForm = document.getElementById("tripForm");

tripForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get tourist preferences
    const location = document.getElementById("location").value;
    const interest = document.getElementById("interest").value;
    const budget = Number(document.getElementById("budget").value);
    const days = Number(document.getElementById("days").value);
    const people = Number(document.getElementById("people").value);

    if (budget <= 0 || people <= 0) {
        alert("Please enter valid budget and traveller details.");
        return;
    }

    // Sample destination recommendations
    const trips = {

        dakshina: {
            nature: ["Charmadi Ghat", "Bandaje Falls", "Western Ghats"],
            beach: ["Panambur Beach", "Someshwara Beach", "Tannirbhavi Beach"],
            religious: ["Kukke Subramanya", "Dharmasthala", "Kateel Temple"],
            adventure: ["Bandaje Falls Trek", "Western Ghats Exploration"],
            culture: ["Puttur Local Experiences", "Traditional Coastal Food"]
        },

        udupi: {
            nature: ["Kudlu Falls", "Western Ghats"],
            beach: ["Malpe Beach", "Kaup Beach", "Maravanthe Beach"],
            religious: ["Udupi Sri Krishna Temple", "Kollur Mookambika Temple"],
            adventure: ["St. Mary's Island Visit", "Coastal Activities"],
            culture: ["Udupi Cuisine", "Traditional Yakshagana Experience"]
        },

        kodagu: {
            nature: ["Abbey Falls", "Raja's Seat", "Coffee Plantations"],
            beach: ["No beach destinations in this location"],
            religious: ["Omkareshwara Temple", "Talacauvery"],
            adventure: ["Trekking Experiences", "Outdoor Nature Activities"],
            culture: ["Kodava Cultural Experiences", "Local Coffee Experiences"]
        }

    };

    const locationNames = {
        dakshina: "Dakshina Kannada",
        udupi: "Udupi",
        kodagu: "Kodagu"
    };

    const interestNames = {
        nature: "Nature and Mountains",
        beach: "Beaches and Coastal Activities",
        religious: "Temples and Spiritual Places",
        adventure: "Adventure and Trekking",
        culture: "Culture and Local Experiences"
    };

    const selectedPlaces = trips[location][interest];

    if (selectedPlaces[0].startsWith("No beach")) {
        alert("Beach experiences are not available in the selected location. Please choose another interest.");
        return;
    }

    // Generate itinerary
    let itineraryHTML = "";

    for (let day = 1; day <= days; day++) {

        const place = selectedPlaces[(day - 1) % selectedPlaces.length];

        itineraryHTML += `
            <div class="trip-day">
                <h3>Day ${day}</h3>
                <p><strong>Suggested Experience:</strong> ${place}</p>
                <p>Explore the area, enjoy local experiences and discover nearby attractions.</p>
            </div>
        `;
    }

    // Display trip summary
    const output = document.getElementById("tripOutput");

    output.innerHTML = `
        <div class="trip-summary">

            <h3>Trip Overview</h3>

            <p><strong>Location:</strong> ${locationNames[location]}</p>
            <p><strong>Interests:</strong> ${interestNames[interest]}</p>
            <p><strong>Duration:</strong> ${days} day(s)</p>
            <p><strong>Travellers:</strong> ${people}</p>

            ${itineraryHTML}

            <div class="trip-budget">
                <h3>Your Budget</h3>
                <p>Total Budget: ₹${budget.toLocaleString("en-IN")}</p>
                <p>Budget Per Person: ₹${Math.round(budget / people).toLocaleString("en-IN")}</p>
            </div>

            <p class="trip-note">
                This is a sample itinerary generated from your selected
                preferences. Travel, food, accommodation and activity
                costs are not verified live prices. Confirm availability
                and expenses before travelling.
            </p>

        </div>
    `;

    // Show results
    document.getElementById("tripResults").style.display = "block";

    document.getElementById("tripResults").scrollIntoView({
        behavior: "smooth"
    });

});