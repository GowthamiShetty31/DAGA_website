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

    const profile = savedProfiles[loggedInUser.email] || loggedInUser;

    if (document.getElementById("profileName")) {
        document.getElementById("profileName").value = profile.name || "";
    }

    if (document.getElementById("profileEmail")) {
        document.getElementById("profileEmail").value = loggedInUser.email;
    }

    if (document.getElementById("profilePhone")) {
        document.getElementById("profilePhone").value = profile.phone || "";
    }
}

if (profileForm) {
    profileForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!loggedInUser) return;

        const name = document.getElementById("profileName").value.trim();
        const phone = document.getElementById("profilePhone").value.trim();

        const profiles = JSON.parse(
            localStorage.getItem("dagaProfile")
        ) || {};

        profiles[loggedInUser.email] = {
            name,
            email: loggedInUser.email,
            phone
        };

        localStorage.setItem("dagaProfile", JSON.stringify(profiles));

        loggedInUser.name = name;
        loggedInUser.phone = phone;

        localStorage.setItem(
            "dagaLoggedInUser",
            JSON.stringify(loggedInUser)
        );

        alert("Profile updated successfully.");
    });
}