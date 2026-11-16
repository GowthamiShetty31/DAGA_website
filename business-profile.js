const loggedOwner = JSON.parse(localStorage.getItem("dagaLoggedInOwner"));

if (!loggedOwner) {
    window.location.replace("business-login.html");
}

function getOwners() {
    return JSON.parse(localStorage.getItem("dagaOwners")) || [];
}

function loadBusinessProfile() {
    const owners = getOwners();
    const owner = owners.find(o =>
        o.email.toLowerCase() === loggedOwner.email.toLowerCase()
    );

    if (!owner) {
        alert("Business profile not found.");
        return;
    }

    document.getElementById("ownerName").value = owner.ownerName || "";
    document.getElementById("businessName").value = owner.businessName || "";
    document.getElementById("businessEmail").value = owner.email || "";
    document.getElementById("businessPhone").value = owner.phone || "";
    document.getElementById("businessCategory").value = owner.category || "";
    document.getElementById("businessLocation").value = owner.location || "";
    document.getElementById("businessDescription").value = owner.description || "";
}

document.getElementById("businessProfileForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const owners = getOwners();
    const index = owners.findIndex(o =>
        o.email.toLowerCase() === loggedOwner.email.toLowerCase()
    );

    if (index === -1) return;

    owners[index].ownerName = document.getElementById("ownerName").value.trim();
    owners[index].businessName = document.getElementById("businessName").value.trim();
    owners[index].phone = document.getElementById("businessPhone").value.trim();
    owners[index].category = document.getElementById("businessCategory").value;
    owners[index].location = document.getElementById("businessLocation").value.trim();
    owners[index].description = document.getElementById("businessDescription").value.trim();

    localStorage.setItem("dagaOwners", JSON.stringify(owners));

    const updatedSession = {
        ...loggedOwner,
        ownerName: owners[index].ownerName,
        businessName: owners[index].businessName,
        category: owners[index].category,
        location: owners[index].location
    };

    localStorage.setItem("dagaLoggedInOwner", JSON.stringify(updatedSession));
    document.getElementById("profileMessage").textContent = "Business profile updated.";
});

function businessLogout() {
    localStorage.removeItem("dagaLoggedInOwner");
    window.location.href = "business-login.html";
}

if (loggedOwner) loadBusinessProfile();