const fs = require('fs')

const statesData = require('./states.json')
const baseData = statesData.map(base => {
    return {
        state_name: base.state_name,
        state_abbreviation: base.state_abbreviation,
        date_admitted: base.date_admitted,
        capital: base.capital,
        largest_city: base.largest_city,
        govenor: base.govenor,
        elevation: base.elevation,
        time_zone: base.time_zone,
        latitude: base.latitude,
        longitude: base.longitude,
        url: base.url,
        flag_url: base.flag_url,
        insignia_url: base.insignia_url,
    }
})

const stateAreas = statesData.map((base, i) => {
    return {
        state_id: i + 1,
        total: base.area.total,
        land: base.area.land,
        water: base.area.water,
    }
})

const statePopulations = statesData.map((base, i) => {
    return {
        state_id: i + 1,
        total: base.population.total,
        density: base.population.density,
        median_household_income: base.population.median_household_income,
    }
})

const houseDelegation = (() => {
    const returnArr = []
    let returnObj = {}
    statesData.forEach((base, i) => {
        base.house_delegation.forEach(delegate => {
            returnObj = {
                state_id: i + 1,
                delegate_name: delegate,
            }
            returnArr.push(returnObj)
        })
    })
    return returnArr
})()

const stateSenators = (() => {
    const returnArr = []
    let returnObj = {}
    statesData.forEach((base, i) => {
        base.senators.forEach(senator => {
            returnObj = {
                state_id: i + 1,
                senator_name: senator,
            }
            returnArr.push(returnObj)
        })
    })
    return returnArr
})()

fs.writeFileSync('base_states.json', JSON.stringify(baseData), err => {
    if (err) {
        throw err
    }
})
fs.writeFileSync('base_state_areas.json', JSON.stringify(stateAreas), err => {
    if (err) {
        throw err
    }
})
fs.writeFileSync(
    'base_state_populations.json',
    JSON.stringify(statePopulations),
    err => {
        if (err) {
            throw err
        }
    },
)
fs.writeFileSync(
    'base_state_delegates.json',
    JSON.stringify(houseDelegation),
    err => {
        if (err) {
            throw err
        }
    },
)
fs.writeFileSync(
    'base_state_senators.json',
    JSON.stringify(stateSenators),
    err => {
        if (err) {
            throw err
        }
    },
)
