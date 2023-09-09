// TODO: For very large data sets like zip_codes,
// divide up by entires of 500 for sqlite3 limitations on single insert statement
const fs = require('fs')

const statesData = require('./states.json')
const citiesData = require('./cities.json')

const grabStateIdByStateName = stateName => {
    let stateId = undefined
    const stateIndex = statesData.findIndex(
        state => state.state_name === stateName,
    )
    stateId = stateIndex + 1
    if (stateId === 0) {
        stateId = 51 + stateId
    }
    return stateId
}

const baseData = (() => {
    const returnArr = citiesData.map(city => {
        return {
            state_id: grabStateIdByStateName(city.state_name),
            city_name: city.city_name,
            state_name: city.state_name,
            coordinates: city.coordinates,
            settled_founded: city.settled_founded,
            incorporated: city.incorporated,
            elevation: city.elevation,
            time_zone: city.time_zone,
            fips_code: city.fips_code,
            url: city.url,
        }
    })
    return returnArr
})()

const cityAreas = citiesData.map(base => {
    return {
        city: base.area.city,
        land: base.area.land,
        water: base.area.water,
    }
})
const cityPopulation = citiesData.map(base => {
    return {
        city: base.population.city,
        density: base.population.density,
        metro: base.population.metro,
    }
})

const cityGov = citiesData.map((base, i) => {
    return {
        city_id: i + 1,
        type: base.government.type,
        mayor: base.government.mayor,
    }
})
const areaCodes = (() => {
    const returnArr = []
    let returnObj = {}
    citiesData.forEach((city, i) => {
        city.area_codes.forEach(areaCode => {
            returnObj = {
                city_id: i + 1,
                area_code: areaCode,
            }
            returnArr.push(returnObj)
        })
    })
    return returnArr
})()
const counties = (() => {
    const returnArr = []
    let returnObj = {}
    citiesData.forEach((city, i) => {
        city.counties.forEach(county => {
            returnObj = {
                city_id: i + 1,
                county_name: county,
            }
            returnArr.push(returnObj)
        })
    })
    return returnArr
})()
const gnisIds = (() => {
    const returnArr = []
    let returnObj = {}
    citiesData.forEach((city, i) => {
        city.gnis_feature_ids.forEach(id => {
            returnObj = {
                city_id: i + 1,
                gnis_feature_id: id,
            }
            returnArr.push(returnObj)
        })
    })
    return returnArr
})()
const cityGovCouncils = (() => {
    const returnArr = []
    let returnObj = {}
    citiesData.forEach((city, i) => {
        city.government.city_council.forEach(member => {
            returnObj = {
                city_id: i + 1,
                council_member: member,
            }
            returnArr.push(returnObj)
        })
    })
    return returnArr
})()
const zipCodes = (() => {
    const returnArr = []
    let returnObj = {}
    citiesData.forEach((city, i) => {
        city.zip_codes.forEach(zip => {
            returnObj = {
                city_id: i + 1,
                zip_code: zip,
            }
            returnArr.push(returnObj)
        })
    })
    return returnArr
})()

fs.writeFileSync('base_cities.json', JSON.stringify(baseData), err => {
    if (err) {
        throw err
    }
})
fs.writeFileSync('base_cities_areas.json', JSON.stringify(cityAreas), err => {
    if (err) {
        throw err
    }
})
fs.writeFileSync(
    'base_cities_population.json',
    JSON.stringify(cityPopulation),
    err => {
        if (err) {
            throw err
        }
    },
)
fs.writeFileSync(
    'base_cities_areas_codes.json',
    JSON.stringify(areaCodes),
    err => {
        if (err) {
            throw err
        }
    },
)
fs.writeFileSync(
    'base_cities_zip_codes.json',
    JSON.stringify(zipCodes),
    err => {
        if (err) {
            throw err
        }
    },
)

fs.writeFileSync('base_cities_counties.json', JSON.stringify(counties), err => {
    if (err) {
        throw err
    }
})
fs.writeFileSync('base_cities_gnis_ids.json', JSON.stringify(gnisIds), err => {
    if (err) {
        throw err
    }
})
fs.writeFileSync(
    'base_cities_government.json',
    JSON.stringify(cityGov),
    err => {
        if (err) {
            throw err
        }
    },
)
fs.writeFileSync(
    'base_cities_government_council.json',
    JSON.stringify(cityGovCouncils),
    err => {
        if (err) {
            throw err
        }
    },
)
