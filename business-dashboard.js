const owner = JSON.parse(localStorage.getItem("dagaLoggedInOwner"));

if (!owner) {
    alert("Please login as a business owner.");
    window.location.href = "business-login.html";
} else {
    document.getElementById("dashboardBusinessName").textContent =
        owner.businessName || "Not provided";

    document.getElementById("dashboardLocation").textContent =
        owner.location || "Not provided";

    document.getElementById("dashboardCategory").textContent =
        owner.category || "Not provided";

    document.getElementById("dashboardEmail").textContent =
        owner.email || "Not provided";
}

function businessLogout() {
    localStorage.removeItem("dagaLoggedInOwner");
    window.location.href = "business-login.html";
}