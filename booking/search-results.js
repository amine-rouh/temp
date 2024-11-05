document.addEventListener('DOMContentLoaded', function() {
    // Fetch search data from sessionStorage
    const searchData = JSON.parse(sessionStorage.getItem('searchData'));
    const destination = searchData ? searchData.destination : "your destination";

    // Use the properties array from data.js
    function getRandomProperties() {
        const shuffledProperties = properties.sort(() => Math.random() - 0.5);
        return shuffledProperties.slice(0, 5);
    }

    // Display properties initially
    const propertyList = document.getElementById('propertyList');
    const searchMessage = document.getElementById('searchMessage'); // Get the search message element

    function displayProperties(sortedProperties) {
        propertyList.innerHTML = ""; // Clear existing properties
        searchMessage.textContent = `${sortedProperties.length} available hotels in "${destination}"`; // Update the search message

        sortedProperties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.classList.add('property-card');
            propertyCard.innerHTML = `
                <img src="${property.image}" alt="${property.name}">
                <h3>${property.name}</h3>
                <p>Price: $${property.price}/night</p>
                <p>Rating: ${property.rating} Stars</p>
                <button onclick="viewDetails(${property.id})">View Details</button>
            `;
            propertyList.appendChild(propertyCard);
        });
    }

    // Get random 5 properties
    const randomProperties = getRandomProperties();

    // Function to apply sorting and filtering
    function applySortingAndFilters() {
        // Get filter values
        const sortValue = document.getElementById('sort').value;
        const filterValue = document.getElementById('filter').value;

        // Create a copy of random properties to avoid mutating the original data
        let sortedProperties = [...randomProperties];

        // Sort properties based on selected sort value
        if (sortValue === "priceLowHigh") {
            sortedProperties.sort((a, b) => a.price - b.price); // Low to High
        } else if (sortValue === "priceHighLow") {
            sortedProperties.sort((a, b) => b.price - a.price); // High to Low
        } else if (sortValue === "ratingHighLow") {
            sortedProperties.sort((a, b) => b.rating - a.rating); // High to Low
        }

        // Filter properties based on selected filter value
        if (filterValue === "4stars") {
            sortedProperties = sortedProperties.filter(property => property.rating >= 4);
        } else if (filterValue === "3stars") {
            sortedProperties = sortedProperties.filter(property => property.rating >= 3);
        }

        // Display sorted and filtered properties
        displayProperties(sortedProperties);
    }

    // Apply default sorting on page load
    applySortingAndFilters();

    // Event listeners for sorting and filtering
    document.getElementById('sort').addEventListener('change', applySortingAndFilters);
    document.getElementById('filter').addEventListener('change', applySortingAndFilters);
});

function viewDetails(propertyId) {
    // Store selected property ID in sessionStorage
    sessionStorage.setItem('selectedPropertyId', propertyId);
    window.location.href = 'property-details.html';
}
