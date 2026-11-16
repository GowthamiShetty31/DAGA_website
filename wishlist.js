function getWishlist() {
    return JSON.parse(localStorage.getItem("dagaWishlist")) || [];
}

function showWishlist(type) {
    const container = document.getElementById("wishlistItems");
    container.innerHTML = "";

    let items = getWishlist();

    if (type !== "All") {
        items = items.filter(item => item.type === type);
    }

    if (items.length === 0) {
        container.textContent = "No saved items found.";
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "extra-card";

        const heading = document.createElement("h3");
        heading.textContent = item.name;

        const typeText = document.createElement("p");
        typeText.textContent = item.type;

        const link = document.createElement("a");
        link.href = item.link || "destinations.html";
        link.textContent = "View Details";

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.onclick = function () {
            const updated = getWishlist().filter(saved =>
                saved.id !== item.id || saved.type !== item.type
            );
            localStorage.setItem("dagaWishlist", JSON.stringify(updated));
            showWishlist(type);
        };

        card.append(heading, typeText, link, remove);
        container.appendChild(card);
    });
}

showWishlist("All");