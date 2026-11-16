if (sessionStorage.getItem("dagaAdminLoggedIn") !== "true") {
    window.location.replace("admin-login.html");
}

const settingsKey = "dagaPortalSettings";

const defaultSettings = {
    portalName: "DAGA",
    portalTagline: "Discover Around Go Again",
    supportEmail: "",
    defaultRegion: "Dakshina Kannada"
};

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem(settingsKey)) || defaultSettings;

    document.getElementById("portalName").value = settings.portalName;
    document.getElementById("portalTagline").value = settings.portalTagline;
    document.getElementById("supportEmail").value = settings.supportEmail;
    document.getElementById("defaultRegion").value = settings.defaultRegion;
}

document.getElementById("settingsForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const settings = {
        portalName: document.getElementById("portalName").value.trim(),
        portalTagline: document.getElementById("portalTagline").value.trim(),
        supportEmail: document.getElementById("supportEmail").value.trim(),
        defaultRegion: document.getElementById("defaultRegion").value.trim()
    };

    localStorage.setItem(settingsKey, JSON.stringify(settings));
    document.getElementById("settingsMessage").textContent =
        "Portal settings saved in this browser.";
});

function downloadBackup() {
    const keys = [
        "dagaUsers",
        "dagaOwners",
        "dagaServices",
        "dagaBookings",
        "dagaReviews",
        "dagaMessages",
        "dagaTrips",
        "dagaWishlist",
        "dagaNotifications",
        "dagaGallery",
        "dagaAvailability"
    ];

    const backup = {};

    keys.forEach(key => {
        backup[key] = JSON.parse(localStorage.getItem(key)) || [];
    });

    backup.dagaPortalSettings =
        JSON.parse(localStorage.getItem(settingsKey)) || defaultSettings;

    const blob = new Blob(
        [JSON.stringify(backup, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "DAGA-data-backup.json";
    link.click();

    URL.revokeObjectURL(url);
}

function adminLogout() {
    sessionStorage.removeItem("dagaAdminLoggedIn");
    window.location.replace("admin-login.html");
}

if (sessionStorage.getItem("dagaAdminLoggedIn") === "true") {
    loadSettings();
}