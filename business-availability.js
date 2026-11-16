const availabilityOwner = JSON.parse(localStorage.getItem("dagaLoggedInOwner"));

if (!availabilityOwner) {
    window.location.replace("business-login.html");
}

function availabilityKey() {
    return "dagaAvailability";
}

function getAvailability() {
    return JSON.parse(localStorage.getItem(availabilityKey())) || [];
}

function showAvailability() {
    const all = getAvailability();
    const item = all.find(a => a.ownerEmail === availabilityOwner.email);
    const container = document.getElementById("currentAvailability");

    if (!item) {
        container.textContent = "Availability has not been added yet.";
        return;
    }

    container.textContent =
        "Days: " + item.days.join(", ") +
        " | Time: " + item.opening + " - " + item.closing +
        " | Note: " + item.note;
}

document.getElementById("availabilityForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const days = Array.from(
        document.querySelectorAll(".availability-days input:checked")
    ).map(input => input.value);

    if (days.length === 0) {
        alert("Select at least one available day.");
        return;
    }

    const opening = document.getElementById("openingTime").value;
    const closing = document.getElementById("closingTime").value;

    if (opening >= closing) {
        alert("Closing time must be later than opening time.");
        return;
    }

    const all = getAvailability();
    const updated = {
        ownerEmail: availabilityOwner.email,
        days,
        opening,
        closing,
        note: document.getElementById("availabilityNote").value.trim()
    };

    const index = all.findIndex(a => a.ownerEmail === availabilityOwner.email);

    if (index >= 0) all[index] = updated;
    else all.push(updated);

    localStorage.setItem(availabilityKey(), JSON.stringify(all));

    document.getElementById("availabilityMessage").textContent =
        "Availability saved successfully.";

    showAvailability();
});

function businessLogout() {
    localStorage.removeItem("dagaLoggedInOwner");
    window.location.href = "business-login.html";
}

if (availabilityOwner) showAvailability();