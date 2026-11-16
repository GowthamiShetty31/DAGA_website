function getBookings() {
    return JSON.parse(localStorage.getItem("dagaBookings")) || [];
}

function getReviews() {
    return JSON.parse(localStorage.getItem("dagaReviews")) || [];
}

function loadEligibleBookings() {
    const email = document.getElementById("reviewEmail").value.trim().toLowerCase();
    const select = document.getElementById("reviewBooking");
    select.innerHTML = '<option value="">Select booking</option>';

    if (!email) {
        alert("Enter your email address.");
        return;
    }

    const eligible = getBookings().filter(b =>
        (b.touristEmail || "").toLowerCase() === email &&
        ["Accepted", "Confirmed"].includes(b.status)
    );

    eligible.forEach(booking => {
        const option = document.createElement("option");
        option.value = booking.id;
        option.textContent = booking.serviceName + " (" + booking.id + ")";
        select.appendChild(option);
    });

    if (eligible.length === 0) {
        alert("No accepted bookings found for this email.");
    }
}

document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("reviewEmail").value.trim().toLowerCase();
    const bookingId = document.getElementById("reviewBooking").value;
    const rating = Number(document.getElementById("reviewRating").value);
    const message = document.getElementById("reviewText").value.trim();

    const booking = getBookings().find(b =>
        b.id === bookingId &&
        (b.touristEmail || "").toLowerCase() === email &&
        ["Accepted", "Confirmed"].includes(b.status)
    );

    if (!booking) {
        document.getElementById("reviewMessage").textContent =
            "Please select a valid accepted booking.";
        return;
    }

    const reviews = getReviews();

    if (reviews.some(r => r.bookingId === bookingId)) {
        document.getElementById("reviewMessage").textContent =
            "A review has already been submitted for this booking.";
        return;
    }

    reviews.push({
        id: "R-" + Date.now(),
        bookingId,
        serviceId: booking.serviceId || "",
        serviceName: booking.serviceName || "Service",
        touristEmail: email,
        rating,
        message,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("dagaReviews", JSON.stringify(reviews));
    document.getElementById("reviewMessage").textContent =
        "Your review has been submitted.";
    this.reset();
    displayReviews();
});

function displayReviews() {
    const container = document.getElementById("reviewList");
    container.innerHTML = "";

    const reviews = getReviews().slice().reverse();

    if (reviews.length === 0) {
        container.textContent = "No reviews have been submitted yet.";
        return;
    }

    reviews.forEach(review => {
        const card = document.createElement("div");
        card.className = "extra-card";

        const heading = document.createElement("h3");
        heading.textContent = review.serviceName;

        const rating = document.createElement("p");
        rating.textContent = "Rating: " + review.rating + "/5";

        const message = document.createElement("p");
        message.textContent = review.message;

        const date = document.createElement("small");
        date.textContent = review.date;

        card.append(heading, rating, message, date);
        container.appendChild(card);
    });
}

displayReviews();