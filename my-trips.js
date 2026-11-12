const tripsContainer = document.getElementById("tripsContainer");

// Get saved trips from browser storage
function displayTrips() {
    const savedTrips = JSON.parse(localStorage.getItem("dagaTrips")) || [];

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

    savedTrips.forEach((trip, index) => {
        const card = document.createElement("div");
        card.className = "saved-trip-card";

        const title = document.createElement("h3");
        title.textContent = trip.location || "My Trip";

        const interest = document.createElement("p");
        interest.textContent = "Interest: " + (trip.interest || "Not specified");

        const days = document.createElement("p");
        days.textContent = "Duration: " + (trip.days || 1) + " day(s)";

        const people = document.createElement("p");
        people.textContent = "Travellers: " + (trip.people || 1);

        const budget = document.createElement("p");
        budget.textContent = "Budget: ₹" + (trip.budget || 0);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Trip";
        removeButton.addEventListener("click", function () {
            deleteTrip(index);
        });

        card.append(title, interest, days, people, budget, removeButton);
        tripsContainer.appendChild(card);
    });
}

// Delete a saved trip
function deleteTrip(index) {
    const savedTrips = JSON.parse(localStorage.getItem("dagaTrips")) || [];

    savedTrips.splice(index, 1);

    localStorage.setItem("dagaTrips", JSON.stringify(savedTrips));

    displayTrips();
}

// Display trips when page loads
displayTrips();