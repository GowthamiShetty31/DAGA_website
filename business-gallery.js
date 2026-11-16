const galleryOwner = JSON.parse(localStorage.getItem("dagaLoggedInOwner"));

if (!galleryOwner) {
    window.location.replace("business-login.html");
}

function getGallery() {
    return JSON.parse(localStorage.getItem("dagaGallery")) || [];
}

function displayGallery() {
    const container = document.getElementById("galleryItems");
    container.innerHTML = "";

    const items = getGallery().filter(item =>
        item.ownerEmail === galleryOwner.email
    );

    if (items.length === 0) {
        container.textContent = "No gallery images added yet.";
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "extra-card";

        const image = document.createElement("img");
        image.src = item.url;
        image.alt = item.caption;
        image.style.width = "100%";
        image.style.height = "180px";
        image.style.objectFit = "cover";

        image.onerror = function() {
            this.alt = "Image could not be loaded";
            this.style.display = "none";
        };

        const caption = document.createElement("p");
        caption.textContent = item.caption;

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.onclick = function() {
            const updated = getGallery().filter(g => g.id !== item.id);
            localStorage.setItem("dagaGallery", JSON.stringify(updated));
            displayGallery();
        };

        card.append(image, caption, remove);
        container.appendChild(card);
    });
}

document.getElementById("galleryForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const url = document.getElementById("galleryUrl").value.trim();
    const caption = document.getElementById("galleryCaption").value.trim();

    if (!url.startsWith("https://") && !url.startsWith("http://")) {
        alert("Enter a valid image URL.");
        return;
    }

    const items = getGallery();

    items.push({
        id: "G-" + Date.now(),
        ownerEmail: galleryOwner.email,
        url,
        caption
    });

    localStorage.setItem("dagaGallery", JSON.stringify(items));

    document.getElementById("galleryMessage").textContent = "Image added.";
    this.reset();
    displayGallery();
});

function businessLogout() {
    localStorage.removeItem("dagaLoggedInOwner");
    window.location.href = "business-login.html";
}

if (galleryOwner) displayGallery();