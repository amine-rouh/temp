document.addEventListener('DOMContentLoaded', function() {
    const errorContainer = document.getElementById('errorContainer');
    const searchButton = document.querySelector('[data-testid="search-button"]');
    const destinationInput = document.getElementById('destination');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsInput = document.getElementById('guests');

    // Form submission handler
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous error messages
        errorContainer.innerHTML = "";
        errorContainer.style.display = "none"; // Hide the error container initially
        const errors = [];

        // Get today's date in YYYY-MM-DD format
        const currentDate = new Date();
        const today = currentDate.toISOString().split('T')[0];

        // Get values from the form
        const destination = destinationInput.value.trim();
        const checkinDate = checkinInput.value;
        const checkoutDate = checkoutInput.value;
        const guests = guestsInput.value;

        // Custom validation for each field
        if (!destination) {
            errors.push("Destination is required.");
        } else if (destination.length > 100) { // Limit to 100 characters
            errors.push("Destination cannot exceed 100 characters.");
        }

        if (!checkinDate || checkinDate < today) {
            errors.push("Check-in date cannot be in the past or empty.");
        }

        if (!checkoutDate || checkoutDate <= checkinDate) {
            errors.push("Check-out date must be after the check-in date.");
        }

        if (!guests || guests <= 0) {
            errors.push("Number of guests must be at least 1.");
        } else if (guests > 100) { // Limit the number of guests to a reasonable maximum
            errors.push("Number of guests cannot exceed 100.");
        }

        // If there are errors, display them in the error container
        if (errors.length > 0) {
            errorContainer.innerHTML = errors.join("<br>");
            errorContainer.style.display = "block"; // Show the error container
            return;
        }

        // Proceed with search if all validations pass
        const searchData = {
            destination,
            checkin: checkinDate,
            checkout: checkoutDate,
            guests,
        };
        sessionStorage.setItem('searchData', JSON.stringify(searchData));
        window.location.href = 'search-results.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get today's date in YYYY-MM-DD format
    const currentDate = new Date();
    const today = currentDate.toISOString().split('T')[0];

    // Set the min attribute for check-in and check-out inputs
    document.getElementById('checkin').setAttribute('min', today);
    document.getElementById('checkout').setAttribute('min', today);
});
