document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const message = {
        id: "MSG-" + Date.now(),
        name: document.getElementById("contactName").value.trim(),
        email: document.getElementById("contactEmail").value.trim(),
        subject: document.getElementById("contactSubject").value.trim(),
        message: document.getElementById("contactMessage").value.trim(),
        date: new Date().toLocaleString()
    };

    const messages = JSON.parse(localStorage.getItem("dagaMessages")) || [];
    messages.push(message);

    localStorage.setItem("dagaMessages", JSON.stringify(messages));

    document.getElementById("contactStatus").textContent =
        "Your message has been saved in this browser demo.";

    this.reset();
});