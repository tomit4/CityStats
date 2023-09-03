'use strict'
const fp = require('fastify-plugin')

/** Finalized Full Class for new City Object
 * @constructor
 * returns { CityService }
 * */
class CityService {
    constructor() {
        this.allCities = []
        this._allCounties = []
        this._allGovs = []
        this._allCouncilMembers = []
        this._allAreas = []
        this._allPopulations = []
        this._allZips = []
        this._allAreaCodes = []
        this._allGnisIds = []
    }
    // NOTE: Try and refactor and see if you can
    // simply return from most grab funcs
    async _grabAllCitiesInfo(knex) {
        const allCities = await knex('cities')
        if (!allCities) throw Error('No Cities Table Found')
        this.allCities = allCities
    }
    async _grabAllCounties(knex) {
        const allCounties = await knex('cities_counties')
        if (!allCounties) throw Error('No Cities Counties Table Found')
        this._allCounties = allCounties
    }
    async _grabBaseGovInfo(knex) {
        const allGovs = await knex
            .select('type', 'mayor')
            .from('cities_government')
        if (!allGovs) throw Error('No Cities Government Table Found')
        this._allGovs = allGovs
    }
    async _grabGovCouncilMembers(knex) {
        const allCouncilMembers = await knex
            .select('city_id', 'council_member')
            .from('cities_government_council')
        if (!allCouncilMembers)
            throw Error('No Cities Government Council Table Found')
        this._allCouncilMembers = allCouncilMembers
    }
    async _grabAllAreas(knex) {
        const allAreas = await knex
            .select('city', 'land', 'water')
            .from('cities_area')
        if (!allAreas) throw Error('No Cities Areas Table Found')
        this._allAreas = allAreas
    }
    async _grabAllPopulations(knex) {
        const allPopulations = await knex
            .select('city', 'density', 'metro')
            .from('cities_population')
        if (!allPopulations) throw Error('No Cities Population Table Found')
        this._allPopulations = allPopulations
    }
    async _grabAllZipCodes(knex) {
        const allZips = await knex
            .select('city_id', 'zip_code')
            .from('cities_zip_codes')
        if (!allZips) throw Error('No Cities Zip Codes Table Found')
        this._allZips = allZips
    }
    async _grabAllAreaCodes(knex) {
        const allAreaCodes = await knex
            .select('city_id', 'area_code')
            .from('cities_area_codes')
        if (!allAreaCodes) throw Error('No Cities Area Codes Table Found')
        this._allAreaCodes = allAreaCodes
    }
    async _grabAllGnisIds(knex) {
        const allGnisIds = await knex
            .select('city_id', 'gnis_feature_id')
            .from('cities_gnis_ids')
        if (!allGnisIds) throw Error('No Cities Gnis Ids Table Found')
        this._allGnisIds = allGnisIds
    }
    // Yeah... break this up and rethink...
    async _mapGovernmentsAndAreasAndPopulations(knex) {
        await this._grabBaseGovInfo(knex)
        await this._grabAllAreas(knex)
        await this._grabAllPopulations(knex)
        this.allCities = this.allCities.map((city, i) => {
            return {
                ...city,
                government: this._allGovs[i],
                area: this._allAreas[i],
                population: this._allPopulations[i],
            }
        })
    }
    async _mapCounties(knex) {
        await this._grabAllCounties(knex)
        this.allCities.forEach(city => {
            city.counties = this._allCounties
                .filter(county => {
                    return city.id === county.city_id
                })
                .map(county => {
                    return county.county_name
                })
        })
    }
    // NOTE: Further refactoring needed,
    // this is just a clone of the _aggregate func
    // with ['government'] the only differing variable...
    async _mapCouncilors(knex) {
        await this._grabGovCouncilMembers(knex)
        const holder = {}
        this._allCouncilMembers.forEach(member => {
            if (!Object.hasOwn(holder, member.city_id)) {
                holder[member.city_id] = {}
            }
            if (!Object.hasOwn(holder[member.city_id], 'council_members')) {
                holder[member.city_id]['council_members'] = []
            }
            if (member.city_id in holder) {
                holder[member.city_id]['council_members'].push(
                    member['council_member'],
                )
            }
            this.allCities[member.city_id - 1]['government']['city_council'] =
                holder[member.city_id]['council_members']
        })
    }
    async _parseCodes(knex, codesToAgg) {
        const parsedCodes = {}
        if (codesToAgg === 'zip_codes') {
            await this._grabAllZipCodes(knex)
            parsedCodes.table = this._allZips
            parsedCodes.key = 'zip_code'
        } else if (codesToAgg === 'area_codes') {
            await this._grabAllAreaCodes(knex)
            parsedCodes.table = this._allAreaCodes
            parsedCodes.key = 'area_code'
        } else if (codesToAgg === 'gnis_feature_ids') {
            await this._grabAllGnisIds(knex)
            parsedCodes.table = this._allGnisIds
            parsedCodes.key = 'gnis_feature_id'
        } else {
            throw Error(`Passed codes: ${codesToAgg} is not acceptable format`)
        }
        return parsedCodes
    }
    // NOTE: Attempt refactor to return holder
    // and assign to this.allCities in grabAllCities func below
    async _aggregate(knex, codesToAgg) {
        const holder = {}
        const parsedCodes = await this._parseCodes(knex, codesToAgg)
        const tableToAgg = parsedCodes.table
        const key = parsedCodes.key
        tableToAgg.forEach(prop => {
            if (!Object.hasOwn(holder, prop.city_id)) {
                holder[prop.city_id] = {}
            }
            if (!Object.hasOwn(holder[prop.city_id], codesToAgg)) {
                holder[prop.city_id][codesToAgg] = []
            }
            if (prop.city_id in holder) {
                holder[prop.city_id][codesToAgg].push(prop[key])
            }
            this.allCities[prop.city_id - 1][codesToAgg] =
                holder[prop.city_id][codesToAgg]
        })
    }
    async grabAllCities(knex) {
        await this._grabAllCitiesInfo(knex)
        await this._mapCounties(knex)
        await this._mapGovernmentsAndAreasAndPopulations(knex)
        await this._mapCouncilors(knex)
        await this._aggregate(knex, 'zip_codes')
        await this._aggregate(knex, 'area_codes')
        await this._aggregate(knex, 'gnis_feature_ids')
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
