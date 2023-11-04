const fs = require('fs')
const path = require('path')

// Directory path where the JSON files are located
const directoryPath = './new_council_members/json/'
const citiesWithType = require('./cities_government_types_id.json')

const mayorData = []
const combinedData = []
const finMayorData = []

fs.readdirSync(directoryPath)
    .filter(file => file.endsWith('.json'))
    .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0])
        const numB = parseInt(b.match(/\d+/)[0])
        return numA - numB
    })
    .forEach(file => {
        const filePath = path.join(directoryPath, file)
        const jsonData = JSON.parse(fs.readFileSync(filePath))
        if (jsonData.length > 1) {
            mayorData.push(jsonData[0])
            combinedData.push(jsonData.slice(1, jsonData.length))
        } else {
            mayorData.push(null)
            combinedData.push(null)
        }
    })

mayorData.forEach(mD => {
    const newData = {
        city_id: mD.city_id,
        mayor: mD.council_member,
        img_url: mD.img_url,
    }
    citiesWithType.forEach(city => {
        if (mD.city_id === city.city_id) {
            newData.type = city.type

            finMayorData.push(newData)
        }
    })
})

const outputFile = '../../base/cities/json/base_cities_government_council.json'
const outputFilePath = path.join(__dirname, outputFile)
fs.writeFileSync(outputFilePath, JSON.stringify(combinedData.flat(), null, 2)) // Use 2 for pretty-printing

const mayorOutputFile = '../../base/cities/json/base_cities_government.json'
const mayorOutputFilePath = path.join(__dirname, mayorOutputFile)
fs.writeFileSync(
    mayorOutputFilePath,
    JSON.stringify(finMayorData.flat(), null, 2),
) // Use 2 for pretty-printing
//
console.log(`Combined City Council data written to ${outputFile}`)
console.log(`Combined Mayor data written to ${mayorOutputFile}`)
