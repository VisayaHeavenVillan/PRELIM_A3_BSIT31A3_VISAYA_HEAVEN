function showHobbies() {
    alert("My hobbies include playing computer games, cleaning my pc/laptop hardware, and go outside!");
}

function validateForm(event) {
    event.preventDefault(); // Prevents form submission for validation

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || subject === "" || message === "") {
        alert("Please fill out all fields before submitting.");
        return false;
    }

    alert("Message sent successfully!");
    return true;
}
