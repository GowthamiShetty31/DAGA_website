if (sessionStorage.getItem("dagaAdminLoggedIn") !== "true") {
    window.location.replace("admin-login.html");
}

function displayMessages() {
    const messages = JSON.parse(localStorage.getItem("dagaMessages")) || [];
    const container = document.getElementById("adminMessageList");

    container.innerHTML = "";

    if (messages.length === 0) {
        container.textContent = "No contact messages received.";
        return;
    }

    messages.slice().reverse().forEach(message => {
        const card = document.createElement("div");
        card.className = "extra-card";

        const subject = document.createElement("h3");
        subject.textContent = message.subject || "Contact Message";

        const name = document.createElement("p");
        name.textContent = "Name: " + (message.name || "");

        const email = document.createElement("p");
        email.textContent = "Email: " + (message.email || "");

        const content = document.createElement("p");
        content.textContent = message.message || "";

        const date = document.createElement("small");
        date.textContent = message.date || "";

        const remove = document.createElement("button");
        remove.textContent = "Delete Message";
        remove.onclick = function() {
            const updated = messages.filter(m => m.id !== message.id);
            localStorage.setItem("dagaMessages", JSON.stringify(updated));
            displayMessages();
        };

        card.append(subject, name, email, content, date, remove);
        container.appendChild(card);
    });
}

function adminLogout() {
    sessionStorage.removeItem("dagaAdminLoggedIn");
    window.location.replace("admin-login.html");
}

if (sessionStorage.getItem("dagaAdminLoggedIn") === "true") {
    displayMessages();
}