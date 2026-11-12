const profileForm = document.getElementById("profileForm");

// Load previously saved profile details
function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("dagaProfile")) || {};

    document.getElementById("fullName").value = profile.name || "";
    document.getElementById("profileEmail").value = profile.email || "";
    document.getElementById("phone").value = profile.phone || "";
    document.getElementById("homeLocation").value = profile.location || "";
    document.getElementById("travelPreference").value =
        profile.preference || "";
}

// Save profile details
profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const profile = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("profileEmail").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        location: document.getElementById("homeLocation").value.trim(),
        preference: document.getElementById("travelPreference").value
    };

    localStorage.setItem("dagaProfile", JSON.stringify(profile));

    document.getElementById("profileMessage").textContent =
        "Profile saved successfully!";
});

// Load details when page opens
loadProfile();