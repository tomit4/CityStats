const fs = require('fs')

// Load the JSON data from city_government_council.json
const cityGovernmentData = require('./city_government_council.json')

// Create a new array to store the flattened data without mayors
const flattenedData = []

// Iterate through each city's data
cityGovernmentData.forEach(cityData => {
    // Check if there is data for the city (skip empty arrays)
    if (cityData.length > 0) {
        // Remove the mayor (first council member) from the array
        const dataWithoutMayor = cityData.slice(1)
        // Push the remaining council members to the flattenedData array
        flattenedData.push(...dataWithoutMayor)
    }
})

// Save the flattenedData to a new JSON file
fs.writeFileSync(
    'base_cities_government_council.json',
    JSON.stringify(flattenedData, null, 2),
)

console.log(
    'Flattened data without mayors written to city_government_council_no_mayors.json.',
)
