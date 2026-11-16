const reviewOwner = JSON.parse(localStorage.getItem("dagaLoggedInOwner"));

if (!reviewOwner) {
    window.location.replace("business-login.html");
}

function loadBusinessReviews() {
    const reviews = JSON.parse(localStorage.getItem("dagaReviews")) || [];
    const services = JSON.parse(localStorage.getItem("dagaServices")) || [];

    const myServices = services.filter(s =>
        s.ownerEmail &&
        s.ownerEmail.toLowerCase() === reviewOwner.email.toLowerCase()
    );

    const serviceIds = myServices.map(s => String(s.id));

    const myReviews = reviews.filter(r =>
        serviceIds.includes(String(r.serviceId))
    );

    document.getElementById("reviewTotal").textContent = myReviews.length;

    const average = myReviews.length
        ? (myReviews.reduce((sum, r) => sum + Number(r.rating), 0) /
            myReviews.length).toFixed(1)
        : "0";

    document.getElementById("reviewAverage").textContent = average;

    const container = document.getElementById("businessReviewList");
    container.innerHTML = "";

    if (myReviews.length === 0) {
        container.textContent = "No reviews received yet.";
        return;
    }

    myReviews.slice().reverse().forEach(review => {
        const card = document.createElement("div");
        card.className = "extra-card";

        const title = document.createElement("h3");
        title.textContent = review.serviceName || "Service Review";

        const rating = document.createElement("p");
        rating.textContent = "Rating: " + review.rating + "/5";

        const message = document.createElement("p");
        message.textContent = review.message || "";

        const date = document.createElement("small");
        date.textContent = review.date || "";

        card.append(title, rating, message, date);
        container.appendChild(card);
    });
}

function businessLogout() {
    localStorage.removeItem("dagaLoggedInOwner");
    window.location.href = "business-login.html";
}

if (reviewOwner) loadBusinessReviews();