const CityServiceField = require('./cities-services-field')

/** Finalized Full Class for new City Object
 * @constructor
 * returns { CityService }
 * */
class CityService extends CityServiceField {
    constructor() {
        super()
        this.allCities = []
        this._cityTableFields = [
            'id',
            'city_name',
            'state_name',
            'coordinates',
            'settled_founded',
            'incorporated',
            'elevation',
            'time_zone',
            'fips_code',
            'url',
        ]
    }
    async _grabAllCitiesInfo(knex) {
        try {
            const allCities = await knex
                .select(...this._cityTableFields)
                .from('cities')
            if (!allCities) throw Error('No Cities Table Found')
            return allCities
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAllCounties(knex) {
        try {
            const allCounties = await knex('cities_counties')
            if (!allCounties) throw Error('No Cities Counties Table Found')
            return allCounties
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabBaseGovInfo(knex) {
        try {
            const allGovs = await knex
                .select('type', 'mayor')
                .from('cities_government')
            if (!allGovs) throw Error('No Cities Government Table Found')
            return allGovs
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabGovCouncilMembers(knex) {
        try {
            const allCouncilMembers = await knex
                .select('city_id', 'council_member')
                .from('cities_government_council')
            if (!allCouncilMembers)
                throw Error('No Cities Government Council Table Found')
            return allCouncilMembers
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAllAreas(knex) {
        try {
            const allAreas = await knex
                .select('city', 'land', 'water')
                .from('cities_area')
            if (!allAreas) throw Error('No Cities Areas Table Found')
            return allAreas
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAllPopulations(knex) {
        try {
            const allPopulations = await knex
                .select('city', 'density', 'metro')
                .from('cities_population')
            if (!allPopulations) throw Error('No Cities Population Table Found')
            return allPopulations
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAllZipCodes(knex) {
        try {
            const allZips = await knex
                .select('city_id', 'zip_code')
                .from('cities_zip_codes')
            if (!allZips) throw Error('No Cities Zip Codes Table Found')
            return allZips
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAllAreaCodes(knex) {
        try {
            const allAreaCodes = await knex
                .select('city_id', 'area_code')
                .from('cities_area_codes')
            if (!allAreaCodes) throw Error('No Cities Area Codes Table Found')
            return allAreaCodes
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAllGnisIds(knex) {
        try {
            const allGnisIds = await knex
                .select('city_id', 'gnis_feature_id')
                .from('cities_gnis_feature_ids')
            if (!allGnisIds) throw Error('No Cities Gnis Ids Table Found')
            return allGnisIds
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _mapObjectFields(knex) {
        const allGovs = await this._grabBaseGovInfo(knex)
        const allAreas = await this._grabAllAreas(knex)
        const allPopulations = await this._grabAllPopulations(knex)
        this.allCities = this.allCities.map((city, i) => {
            return {
                ...city,
                government: allGovs[i],
                area: allAreas[i],
                population: allPopulations[i],
            }
        })
    }
    async _mapCounties(knex) {
        const counties = await this._grabAllCounties(knex)
        this.allCities.forEach(city => {
            city.counties = counties
                .filter(county => {
                    return city.id === county.city_id
                })
                .map(county => {
                    return county.county_name
                })
        })
    }
    async _parseCodes(knex, codesToAgg) {
        const parsedCodes = {}
        parsedCodes.key = codesToAgg.slice(0, -1)
        if (codesToAgg === 'zip_codes') {
            const allZips = await this._grabAllZipCodes(knex)
            parsedCodes.table = allZips
        } else if (codesToAgg === 'area_codes') {
            const allAreaCodes = await this._grabAllAreaCodes(knex)
            parsedCodes.table = allAreaCodes
        } else if (codesToAgg === 'gnis_feature_ids') {
            const allGnisIds = await this._grabAllGnisIds(knex)
            parsedCodes.table = allGnisIds
        } else if (codesToAgg === 'council_members') {
            const allCouncilMembers = await this._grabGovCouncilMembers(knex)
            parsedCodes.table = allCouncilMembers
        } else {
            throw Error(`Passed codes: ${codesToAgg} is not acceptable format`)
        }
        return parsedCodes
    }
    async _aggregateCodes(knex, codesToAgg) {
        const aggregated = {}
        const parsedCodes = await this._parseCodes(knex, codesToAgg)
        const tableToAgg = parsedCodes.table
        const key = parsedCodes.key
        tableToAgg.forEach(prop => {
            if (!Object.hasOwn(aggregated, prop.city_id)) {
                aggregated[prop.city_id] = {}
            }
            if (!Object.hasOwn(aggregated[prop.city_id], codesToAgg)) {
                aggregated[prop.city_id][codesToAgg] = []
            }
            if (prop.city_id in aggregated) {
                aggregated[prop.city_id][codesToAgg].push(prop[key])
            }
        })
        return aggregated
    }
    async _aggregate(knex, codesToAgg) {
        const dataToBeNested = codesToAgg === 'council_members'
        const aggregated = await this._aggregateCodes(knex, codesToAgg)
        const aggregatedKeys = Object.keys(aggregated).map(key => {
            return Number(key)
        })
        this.allCities.forEach((city, i) => {
            const aggregatedData =
                aggregated[String(aggregatedKeys[i])][codesToAgg]
            if (city.id === aggregatedKeys[i]) {
                if (dataToBeNested) {
                    city['government']['city_council'] = aggregatedData
                } else if (!dataToBeNested) {
                    city[codesToAgg] = aggregatedData
                }
            } else
                throw Error(
                    `No ${codesToAgg} data found for city_id: ${city.id} at aggregated_id: ${aggregatedKeys[i]}`,
                )
        })
    }
    /**
     * Aggregates all cities data
     * @params { promise } knex
     * returns { array } allCities
     * */
    async grabAllCities(knex) {
        this.allCities = await this._grabAllCitiesInfo(knex)
        await this._mapCounties(knex)
        await this._mapObjectFields(knex)
        await this._aggregate(knex, 'zip_codes')
        await this._aggregate(knex, 'area_codes')
        await this._aggregate(knex, 'gnis_feature_ids')
        await this._aggregate(knex, 'council_members')
        return this.allCities
    }
}

module.exports = CityService
