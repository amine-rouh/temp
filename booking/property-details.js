document.addEventListener('DOMContentLoaded', function() {
    // Use the properties array from data.js
    const selectedPropertyId = parseInt(sessionStorage.getItem('selectedPropertyId'), 10);
    const property = properties.find(p => p.id === selectedPropertyId);

    if (property) {
        sessionStorage.setItem('selectedPropertyName', property.name);

        const propertyDetails = document.getElementById('propertyDetails');
        propertyDetails.innerHTML = `
            <img src="${property.image}" alt="${property.name}">
            <h2>${property.name}</h2>
            <p>Price: $${property.price}/night</p>
            <p>Rating: ${property.rating} Stars</p>
            <p>Description: ${property.description}</p>
        `;
    }
});

function bookNow() {
    window.location.href = 'confirmation.html';
}
