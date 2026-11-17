
// DAGA - My Saved Trips

const tripsContainer = document.getElementById("tripsContainer");

function displayTrips() {
    const savedTrips = JSON.parse(
        localStorage.getItem("dagaTrips")
    ) || [];

    tripsContainer.innerHTML = "";

    if (savedTrips.length === 0) {
        tripsContainer.innerHTML = `
            <div class="empty-trips">
                <h3>No Trips Saved Yet!</h3>
                <p>Your planned trips will appear here after you save them.</p>
                <a href="planner.html" class="create-trip-btn">
                    Plan My First Trip
                </a>
            </div>
        `;
        return;
    }

    savedTrips.forEach(function(trip, index) {
        const card = document.createElement("div");
        card.className = "saved-trip-card";

        const title = document.createElement("h3");
        title.textContent = trip.location || "My Trip";

        const interest = document.createElement("p");
        interest.textContent = "Interest: " +
            (trip.interest || "Not specified");

        const days = document.createElement("p");
        days.textContent = "Duration: " + (trip.days || 1) + " day(s)";

        const people = document.createElement("p");
        people.textContent = "Travellers: " + (trip.people || 1);

        const budget = document.createElement("p");
        budget.textContent = "Budget: ₹" +
            (trip.budget || trip.amount || 0);

        card.append(title, interest, days, people, budget);

        if (Array.isArray(trip.itinerary)) {
            const placesHeading = document.createElement("h4");
            placesHeading.textContent = "Suggested Itinerary";
            card.appendChild(placesHeading);

            trip.itinerary.forEach(function(item) {
                const place = document.createElement("p");
                place.textContent =
                    "Day " + item.day + ": " + item.place;
                card.appendChild(place);
            });
        }

        if (trip.createdAt) {
            const created = document.createElement("p");
            created.textContent = "Created: " + trip.createdAt;
            card.appendChild(created);
        }

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Trip";

        removeButton.addEventListener("click", function() {
            deleteTrip(index);
        });

        card.appendChild(removeButton);
        tripsContainer.appendChild(card);
    });
}

function deleteTrip(index) {
    if (!confirm("Are you sure you want to remove this trip?")) {
        return;
    }

    const savedTrips = JSON.parse(
        localStorage.getItem("dagaTrips")
    ) || [];

    savedTrips.splice(index, 1);

    localStorage.setItem(
        "dagaTrips",
        JSON.stringify(savedTrips)
    );

    displayTrips();
}

if (tripsContainer) {
    displayTrips();
}
