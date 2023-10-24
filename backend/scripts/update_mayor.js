const fs = require('fs')

// Load the JSON data from both files
const cityGovernmentData = require('./city_government_council.json')
let baseCitiesGovernmentData = require('./base_cities_government.json')

// Iterate through each city in cityGovernmentData
cityGovernmentData.forEach(cityData => {
    // Find the corresponding city entry in baseCitiesGovernmentData
    const matchingCity = baseCitiesGovernmentData.find(
        city => city.city_id === cityData[0].city_id,
    )

    // If a matching city is found, update the mayor field
    if (matchingCity) {
        matchingCity.mayor = cityData[0].council_member
        matchingCity.img_url = cityData[0].img_url
    }
})

// Save the updated baseCitiesGovernmentData back to the file
fs.writeFileSync(
    'base_cities_government.json',
    JSON.stringify(baseCitiesGovernmentData, null, 2),
)

console.log('Mayor data updated.')
