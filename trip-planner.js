
const tripForm = document.getElementById("tripForm");

tripForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get user preferences
    const location = document.getElementById("location").value;
    const interest = document.getElementById("interest").value;
    const budget = Number(document.getElementById("budget").value);
    const duration = document.getElementById("duration").value;
    const groupSize = Number(document.getElementById("groupSize").value);

    // Validate budget
    if (budget <= 0 || groupSize <= 0) {
        alert("Please enter valid budget and group size.");
        return;
    }

    // Trip suggestions based on interests
    const tripSuggestions = {

        Nature: {
            title: "Nature & Waterfall Exploration",
            places: [
                "Morning: Explore a scenic natural location.",
                "Afternoon: Discover nearby greenery and viewpoints.",
                "Evening: Enjoy a peaceful nature experience."
            ],
            reason: "Selected because you enjoy nature and scenic places."
        },

        Culture: {
            title: "Culture & Heritage Experience",
            places: [
                "Morning: Visit a local heritage destination.",
                "Afternoon: Explore traditional architecture and culture.",
                "Evening: Discover local traditions and crafts."
            ],
            reason: "Selected because you are interested in local culture and heritage."
        },

        Food: {
            title: "Traditional Food Trail",
            places: [
                "Morning: Discover traditional breakfast options.",
                "Afternoon: Experience authentic coastal cuisine.",
                "Evening: Explore local snacks and food specialties."
            ],
            reason: "Selected because you enjoy discovering local food."
        },

        Adventure: {
            title: "Adventure & Outdoor Experience",
            places: [
                "Morning: Begin with an outdoor activity.",
                "Afternoon: Explore scenic surroundings.",
                "Evening: Enjoy a relaxing outdoor experience."
            ],
            reason: "Selected because you enjoy adventure and outdoor activities."
        },

        Relaxation: {
            title: "Relaxing Local Getaway",
            places: [
                "Morning: Enjoy a peaceful homestay experience.",
                "Afternoon: Explore the surrounding countryside.",
                "Evening: Experience local hospitality and food."
            ],
            reason: "Selected because you prefer peaceful and relaxing experiences."
        },

        Mixed: {
            title: "Complete Local Discovery",
            places: [
                "Morning: Explore a popular local destination.",
                "Afternoon: Experience local food and culture.",
                "Evening: Enjoy nature and nearby attractions."
            ],
            reason: "Selected because you enjoy different types of experiences."
        }

    };


    // Get selected trip
    const trip = tripSuggestions[interest];

    // Create itinerary based on duration
    let itinerary = "";

    if (duration === "Half Day") {

        itinerary = `
            <div class="trip-day">
                <h3>Half Day Experience</h3>
                <p>${trip.places[0]}</p>
                <p>${trip.places[1]}</p>
            </div>
        `;

    } else if (duration === "Full Day") {

        itinerary = `
            <div class="trip-day">
                <h3>Day 1 – Your Local Journey</h3>
                <p>${trip.places[0]}</p>
                <p>${trip.places[1]}</p>
                <p>${trip.places[2]}</p>
            </div>
        `;

    } else {

        const days = Number(duration.charAt(0));

        for (let i = 1; i <= days; i++) {

            itinerary += `
                <div class="trip-day">
                    <h3>Day ${i}</h3>
                    <p>${trip.places[(i - 1) % 3]}</p>
                    <p>${trip.places[i % 3]}</p>
                    <p>Enjoy more local experiences around ${location}.</p>
                </div>
            `;

        }

    }


    // Display results
    const tripSummary = document.getElementById("tripSummary");

    tripSummary.innerHTML = `

        <h2>${trip.title}</h2>

        <p><strong>Preferred Location:</strong> ${location}</p>

        <p><strong>Interest:</strong> ${interest}</p>

        <p><strong>Duration:</strong> ${duration}</p>

        <p><strong>Travellers:</strong> ${groupSize}</p>

        <p><strong>Total Budget:</strong> ₹${budget.toLocaleString("en-IN")}</p>

        <hr>

        <h3>Your Suggested Itinerary</h3>

        ${itinerary}

        <div class="trip-budget">

            <h3>Budget Information</h3>

            <p>Your available group budget: ₹${budget.toLocaleString("en-IN")}</p>

            <p>Budget per traveller: ₹${(budget / groupSize).toFixed(2)}</p>

        </div>

        <p class="trip-note">
            <strong>Why this trip?</strong> ${trip.reason}
        </p>

        <p class="trip-note">
            This is a demonstration itinerary generated from
            your selected preferences. Actual destinations,
            routes, provider availability and prices need verification.
        </p>

    `;


    // Show results
    const results = document.getElementById("tripResults");

    results.style.display = "block";

    results.scrollIntoView({
        behavior: "smooth"
    });

});
