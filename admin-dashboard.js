function updateBusinessStatus(email, newStatus) {
    const owners = JSON.parse(localStorage.getItem("dagaOwners")) || [];

    const index = owners.findIndex(owner =>
        owner.email.toLowerCase() === email.toLowerCase()
    );

    if (index === -1) {
        alert("Business not found.");
        return;
    }

    owners[index].status = newStatus;

    localStorage.setItem("dagaOwners", JSON.stringify(owners));

    location.reload();
}