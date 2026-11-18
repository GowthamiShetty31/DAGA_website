// DAGA - Smart Trip Planner
// DAGA - Smart Trip Planner

const tripForm = document.getElementById("tripForm");

let generatedTrip = null;
// Preselect location when arriving from destination details
const requestedLocation = new URLSearchParams(window.location.search).get("location");

if (requestedLocation) {
    const locationSelect = document.getElementById("location");

    const locationMap = {
        "Panambur Beach": "dakshina",
        "Kukke Subramanya": "dakshina",
        "Bandaje Falls": "dakshina",
        "Charmadi Ghat": "dakshina",
        "Western Ghats": "dakshina",
        "Malpe Beach": "udupi",
        "Kudremukh": "udupi",
        "Coorg": "kodagu"
    };

    locationSelect.value = locationMap[requestedLocation] || "";
}

if (tripForm) {
    tripForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const location = document.getElementById("location").value;
        const interest = document.getElementById("interest").value;
        const budget = Number(document.getElementById("budget").value);
        const days = Number(document.getElementById("days").value);
        const people = Number(document.getElementById("people").value);

        if (budget <= 0 || days <= 0 || people <= 0) {
            alert("Please enter valid budget, duration and traveller details.");
            return;
        }

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

        if (!trips[location] || !trips[location][interest]) {
            alert("Please select a valid location and interest.");
            return;
        }

        const selectedPlaces = trips[location][interest];

        if (selectedPlaces[0].startsWith("No beach")) {
            alert("Beach experiences are not available in the selected location. Please choose another interest.");
            return;
        }

        const itinerary = [];

        let itineraryHTML = "";

        for (let day = 1; day <= days; day++) {
            const place = selectedPlaces[(day - 1) % selectedPlaces.length];

            itinerary.push({
                day: day,
                place: place
            });

            itineraryHTML += `
                <div class="trip-day">
                    <h3>Day ${day}</h3>
                    <p><strong>Suggested Experience:</strong> ${place}</p>
                    <p>Explore the area, enjoy local experiences and discover nearby attractions.</p>
                </div>
            `;
        }

        generatedTrip = {
            id: "TRIP-" + Date.now(),
            location: locationNames[location],
            interest: interestNames[interest],
            budget: budget,
            days: days,
            people: people,
            itinerary: itinerary,
            createdAt: new Date().toLocaleString()
        };

        const output = document.getElementById("tripOutput");

        output.innerHTML = `
            <div class="trip-summary">
                <h3>Trip Overview</h3>

                <p><strong>Location:</strong> ${generatedTrip.location}</p>
                <p><strong>Interests:</strong> ${generatedTrip.interest}</p>
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

                <button type="button" id="saveTripButton">
                    Save This Trip
                </button>
            </div>
        `;

        document.getElementById("tripResults").style.display = "block";

        document.getElementById("tripResults").scrollIntoView({
            behavior: "smooth"
        });

        document.getElementById("saveTripButton").addEventListener(
            "click",
            saveGeneratedTrip
        );
    });
}

function saveGeneratedTrip() {
    if (!generatedTrip) {
        alert("Please generate a trip first.");
        return;
    }

    const savedTrips = JSON.parse(
        localStorage.getItem("dagaTrips")
    ) || [];

    const alreadySaved = savedTrips.some(function(trip) {
        return trip.id === generatedTrip.id;
    });

    if (alreadySaved) {
        alert("This trip is already saved.");
        return;
    }

    savedTrips.push(generatedTrip);

    localStorage.setItem(
        "dagaTrips",
        JSON.stringify(savedTrips)
    );

    alert("Trip saved successfully! Open My Trips to view it.");
}
