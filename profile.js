const profileForm = document.getElementById("profileForm");

const loggedInUser = JSON.parse(
    localStorage.getItem("dagaLoggedInUser")
);

if (!loggedInUser) {
    alert("Please login first.");
    window.location.href = "index.html";
} else {
    const savedProfiles = JSON.parse(
        localStorage.getItem("dagaProfile")
    ) || {};

    const profile = savedProfiles[loggedInUser.email] || {};

    document.getElementById("fullName").value =
        profile.name || loggedInUser.name || "";

    document.getElementById("profileEmail").value =
        loggedInUser.email || "";

    document.getElementById("phone").value =
        profile.phone || loggedInUser.phone || "";

    document.getElementById("homeLocation").value =
        profile.homeLocation || "";

    document.getElementById("travelPreference").value =
        profile.travelPreference || "";
}

profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!loggedInUser) return;

    const profiles = JSON.parse(
        localStorage.getItem("dagaProfile")
    ) || {};

    const updatedProfile = {
        name: document.getElementById("fullName").value.trim(),
        email: loggedInUser.email,
        phone: document.getElementById("phone").value.trim(),
        homeLocation: document.getElementById("homeLocation").value.trim(),
        travelPreference: document.getElementById("travelPreference").value
    };

    profiles[loggedInUser.email] = updatedProfile;

    localStorage.setItem("dagaProfile", JSON.stringify(profiles));

    loggedInUser.name = updatedProfile.name;
    loggedInUser.phone = updatedProfile.phone;

    localStorage.setItem(
        "dagaLoggedInUser",
        JSON.stringify(loggedInUser)
    );

    document.getElementById("profileMessage").textContent =
        "Profile updated successfully.";
});