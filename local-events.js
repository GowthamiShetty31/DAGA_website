const events = [
    {
        name: "Traditional Yakshagana",
        location: "Dakshina Kannada",
        category: "Cultural Experience",
        details: "Discover the traditional coastal performance art of Yakshagana."
    },
    {
        name: "Coastal Food Experience",
        location: "Mangaluru",
        category: "Food and Culture",
        details: "Explore local coastal cuisine and food traditions."
    },
    {
        name: "Local Handicraft Experience",
        location: "Dakshina Kannada",
        category: "Handicrafts",
        details: "Discover locally made crafts and traditional skills."
    },
    {
        name: "Nature Exploration",
        location: "Western Ghats region",
        category: "Nature",
        details: "Learn about the region's natural surroundings and biodiversity."
    }
];

const eventList = document.getElementById("eventList");

events.forEach(event => {
    const card = document.createElement("div");
    card.className = "extra-card";

    const title = document.createElement("h3");
    title.textContent = event.name;

    const location = document.createElement("p");
    location.textContent = "Location: " + event.location;

    const category = document.createElement("p");
    category.textContent = event.category;

    const details = document.createElement("p");
    details.textContent = event.details;

    const link = document.createElement("a");
    link.href = "services.html";
    link.textContent = "Explore Services";

    card.append(title, location, category, details, link);
    eventList.appendChild(card);
});