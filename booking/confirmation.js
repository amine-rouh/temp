    document.addEventListener('DOMContentLoaded', function() {
        // Mock booking data (you can customize this based on your application)
        const bookingDetails = {
            propertyName: sessionStorage.getItem('selectedPropertyName') || "Unknown Property",
            checkin: JSON.parse(sessionStorage.getItem('searchData')).checkin,
            checkout: JSON.parse(sessionStorage.getItem('searchData')).checkout,
            guests: JSON.parse(sessionStorage.getItem('searchData')).guests,
            date: new Date().toLocaleDateString() // Current date
        };

        // Save booking details to localStorage
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(bookingDetails);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    });

    function returnToHome() {
        window.location.href = 'index.html';
    }
