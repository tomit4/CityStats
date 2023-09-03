'use strict'
const fp = require('fastify-plugin')

/** Finalized Full Class for new City Object
 * @constructor
 * returns { CityService }
 * */
class CityService {
    constructor() {
        this.allCities = []
    }
    async _grabAllCitiesInfo(knex) {
        const allCities = await knex('cities')
        if (!allCities) throw Error('No Cities Table Found')
        return allCities
    }
    async _grabAllCounties(knex) {
        const allCounties = await knex('cities_counties')
        if (!allCounties) throw Error('No Cities Counties Table Found')
        return allCounties
    }
    async _grabBaseGovInfo(knex) {
        const allGovs = await knex
            .select('type', 'mayor')
            .from('cities_government')
        if (!allGovs) throw Error('No Cities Government Table Found')
        return allGovs
    }
    async _grabGovCouncilMembers(knex) {
        const allCouncilMembers = await knex
            .select('city_id', 'council_member')
            .from('cities_government_council')
        if (!allCouncilMembers)
            throw Error('No Cities Government Council Table Found')
        return allCouncilMembers
    }
    async _grabAllAreas(knex) {
        const allAreas = await knex
            .select('city', 'land', 'water')
            .from('cities_area')
        if (!allAreas) throw Error('No Cities Areas Table Found')
        return allAreas
    }
    async _grabAllPopulations(knex) {
        const allPopulations = await knex
            .select('city', 'density', 'metro')
            .from('cities_population')
        if (!allPopulations) throw Error('No Cities Population Table Found')
        return allPopulations
    }
    async _grabAllZipCodes(knex) {
        const allZips = await knex
            .select('city_id', 'zip_code')
            .from('cities_zip_codes')
        if (!allZips) throw Error('No Cities Zip Codes Table Found')
        return allZips
    }
    async _grabAllAreaCodes(knex) {
        const allAreaCodes = await knex
            .select('city_id', 'area_code')
            .from('cities_area_codes')
        if (!allAreaCodes) throw Error('No Cities Area Codes Table Found')
        return allAreaCodes
    }
    async _grabAllGnisIds(knex) {
        const allGnisIds = await knex
            .select('city_id', 'gnis_feature_id')
            .from('cities_gnis_ids')
        if (!allGnisIds) throw Error('No Cities Gnis Ids Table Found')
        return allGnisIds
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
        if (codesToAgg === 'zip_codes') {
            const allZips = await this._grabAllZipCodes(knex)
            parsedCodes.table = allZips
            parsedCodes.key = 'zip_code'
        } else if (codesToAgg === 'area_codes') {
            const allAreaCodes = await this._grabAllAreaCodes(knex)
            parsedCodes.table = allAreaCodes
            parsedCodes.key = 'area_code'
        } else if (codesToAgg === 'gnis_feature_ids') {
            const allGnisIds = await this._grabAllGnisIds(knex)
            parsedCodes.table = allGnisIds
            parsedCodes.key = 'gnis_feature_id'
        } else if (codesToAgg === 'council_members') {
            const allCouncilMembers = await this._grabGovCouncilMembers(knex)
            parsedCodes.table = allCouncilMembers
            parsedCodes.key = 'council_member'
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

const citiesPlugin = (fastify, options, done) => {
    if (!fastify.cities) {
        const cityService = new CityService()
        fastify.decorate('cityService', cityService)
        fastify.addHook('onClose', (fastify, done) => {
            if (fastify.cities === cityService) {
                fastify.cities.destroy(done)
            }
        })
    }
    done()
}

module.exports = fp(citiesPlugin, { name: 'fastify-cities-plugin' })
