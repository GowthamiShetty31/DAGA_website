const guides = [
    {
        name: "Kukke Heritage Guide",
        location: "Kukke Subramanya",
        specialty: "Temple history and local culture",
        description: "A sample guide listing for visitors interested in local heritage."
    },
    {
        name: "Coastal Explorer",
        location: "Mangaluru",
        specialty: "Coastal culture and local attractions",
        description: "A sample guide listing for exploring the coastal region."
    },
    {
        name: "Nature Trail Guide",
        location: "Belthangady",
        specialty: "Nature and outdoor experiences",
        description: "A sample guide listing for nature-focused visitors."
    },
    {
        name: "Heritage Walk Guide",
        location: "Moodbidri",
        specialty: "Architecture and heritage",
        description: "A sample guide listing for discovering local heritage."
    }
];

function displayGuides(search = "") {
    const container = document.getElementById("guideList");
    container.innerHTML = "";

    const filtered = guides.filter(guide =>
        (guide.name + guide.location + guide.specialty)
        .toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0) {
        container.textContent = "No guides match your search.";
        return;
    }

    filtered.forEach(guide => {
        const card = document.createElement("div");
        card.className = "extra-card";

        const title = document.createElement("h3");
        title.textContent = guide.name;

        const location = document.createElement("p");
        location.textContent = "Location: " + guide.location;

        const specialty = document.createElement("p");
        specialty.textContent = "Specialty: " + guide.specialty;

        const description = document.createElement("p");
        description.textContent = guide.description;

        const contact = document.createElement("a");
        contact.href = "services.html";
        contact.textContent = "Explore Available Services";

        card.append(title, location, specialty, description, contact);
        container.appendChild(card);
    });
}

document.getElementById("guideSearch").addEventListener("input", function() {
    displayGuides(this.value);
});

displayGuides();