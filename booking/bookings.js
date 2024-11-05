document.addEventListener('DOMContentLoaded', function() {
    const bookingHistoryContainer = document.getElementById('bookingHistory');
    
    // Retrieve bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    if (bookings.length === 0) {
        bookingHistoryContainer.innerHTML = "<p>No bookings found.</p>";
    } else {
        bookings.forEach(booking => {
            const bookingItem = document.createElement('div');
            bookingItem.classList.add('booking-item');
            bookingItem.innerHTML = `
                <h3>${booking.propertyName}</h3>
                <p>Check-in: ${booking.checkin}</p>
                <p>Check-out: ${booking.checkout}</p>
                <p>Guests: ${booking.guests}</p>
                <p>Booking Date: ${booking.date}</p>
            `;
            bookingHistoryContainer.appendChild(bookingItem);
        });
    }
});
