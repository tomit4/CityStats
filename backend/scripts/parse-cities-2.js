const fs = require('fs')
const path = require('path')

// Directory path where the JSON files are located
const directoryPath = './scrapers/cities/new_council_members/json/'

// Initialize an empty JavaScript array to store the combined data
const combinedData = []

// Read and combine the JSON files
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
            combinedData.push(jsonData.slice(1, jsonData.length))
        } else {
            combinedData.push(null)
        }
    })

// Write the combined data to a new JSON file
const outputFile = 'base_cities_government_council.json'
const outputFilePath = path.join(__dirname, outputFile)
console.log('length of combinedData.flat() :=>', combinedData.flat().length)
fs.writeFileSync(outputFilePath, JSON.stringify(combinedData.flat(), null, 2)) // Use 2 for pretty-printing

console.log(`Combined data written to ${outputFile}`)
