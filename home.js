// DAGA Home Page

function searchPlaces() {
    const searchText = document.getElementById("homeSearch").value.trim();
    const category = document.getElementById("homeCategory").value;

    if (searchText === "" && category === "") {
        alert("Enter a destination or select a category.");
        return;
    }

    const params = new URLSearchParams();

    if (searchText) {
        params.set("search", searchText);
    }

    if (category) {
        params.set("category", category);
    }

    window.location.href = "destinations.html?" + params.toString();
}

function touristLogout() {
    localStorage.removeItem("dagaLoggedInUser");
    window.location.href = "index.html";
}