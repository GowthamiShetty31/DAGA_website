function getNotifications() {
    return JSON.parse(localStorage.getItem("dagaNotifications")) || [];
}

function loadNotifications() {
    const email = document.getElementById("notificationEmail").value.trim().toLowerCase();
    const container = document.getElementById("notificationList");
    container.innerHTML = "";

    if (!email) {
        container.textContent = "Please enter your email address.";
        return;
    }

    const items = getNotifications().filter(n =>
        (n.touristEmail || "").toLowerCase() === email
    );

    if (items.length === 0) {
        container.textContent = "No notifications found for this email.";
        return;
    }

    items.slice().reverse().forEach(item => {
        const card = document.createElement("div");
        card.className = "extra-card";

        const heading = document.createElement("h3");
        heading.textContent = item.title || "DAGA Update";

        const message = document.createElement("p");
        message.textContent = item.message || "";

        const date = document.createElement("small");
        date.textContent = item.date || "";

        const status = document.createElement("p");
        status.textContent = item.read ? "Read" : "Unread";

        card.append(heading, message, date, status);
        container.appendChild(card);
    });
}

function markAllRead() {
    const email = document.getElementById("notificationEmail").value.trim().toLowerCase();

    if (!email) {
        alert("Enter your email first.");
        return;
    }

    const items = getNotifications().map(n => {
        if ((n.touristEmail || "").toLowerCase() === email) {
            n.read = true;
        }
        return n;
    });

    localStorage.setItem("dagaNotifications", JSON.stringify(items));
    loadNotifications();
}