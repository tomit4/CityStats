'use strict'
const fp = require('fastify-plugin')

// TODO: Massive refactor necessary, WAY too much repetition
// BUT!! You learned something with your aggregator functions
// You avoided double for loops and there is good code buried here
// REFACTOR AND FIND IT!!!

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
    }
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
    // This is one way you can avoid
    // double for loops in other cases as well
    _aggregateZips() {
        const holder = {}
        this._allZips.forEach(zip => {
            if (!Object.hasOwn(holder, zip.city_id)) {
                holder[zip.city_id] = {}
            }
            if (!Object.hasOwn(holder[zip.city_id], 'zip_codes')) {
                holder[zip.city_id]['zip_codes'] = []
            }
            if (zip.city_id in holder) {
                holder[zip.city_id]['zip_codes'].push(zip.zip_code)
            }
            // Hack because zip.city_id in this case is always
            // 1 index higher than order of main cities array...
            this.allCities[zip.city_id - 1].zip_codes =
                holder[zip.city_id]['zip_codes']
        })
    }
    async _grabAllAreaCodes(knex) {
        const allAreaCodes = await knex
            .select('city_id', 'area_code')
            .from('cities_area_codes')
        if (!allAreaCodes) throw Error('No Cities Area Codes Table Found')
        return allAreaCodes
    }
    async _aggregateAreaCodes(knex) {
        const allAreaCodes = await this._grabAllAreaCodes(knex)
        const holder = {}
        allAreaCodes.forEach(areaCode => {
            if (!Object.hasOwn(holder, areaCode.city_id)) {
                holder[areaCode.city_id] = {}
            }
            if (!Object.hasOwn(holder[areaCode.city_id], 'area_codes')) {
                holder[areaCode.city_id]['area_codes'] = []
            }
            if (areaCode.city_id in holder) {
                holder[areaCode.city_id]['area_codes'].push(areaCode.area_code)
            }
            this.allCities[areaCode.city_id - 1].area_codes =
                holder[areaCode.city_id]['area_codes']
        })
    }
    async _grabAllGnisIds(knex) {
        const allGnisIds = await knex
            .select('city_id', 'gnis_feature_id')
            .from('cities_gnis_ids')
        if (!allGnisIds) throw Error('No Cities Gnis Ids Table Found')
        return allGnisIds
    }
    async _aggregateGnisIds(knex) {
        const allGnisIds = await this._grabAllGnisIds(knex)
        const holder = {}
        allGnisIds.forEach(gnis => {
            if (!Object.hasOwn(holder, gnis.city_id)) {
                holder[gnis.city_id] = {}
            }
            if (!Object.hasOwn(holder[gnis.city_id], 'gnis_feature_ids')) {
                holder[gnis.city_id]['gnis_feature_ids'] = []
            }
            if (gnis.city_id in holder) {
                holder[gnis.city_id]['gnis_feature_ids'].push(
                    gnis.gnis_feature_id,
                )
            }
            this.allCities[gnis.city_id - 1].gnis_feature_ids =
                holder[gnis.city_id]['gnis_feature_ids']
        })
    }
    // Yeah... break this up and rethink...
    async _mapGovernmentsAndAreasAndPopulations(knex) {
        await this._grabBaseGovInfo(knex)
        await this._grabGovCouncilMembers(knex)
        await this._grabAllAreas(knex)
        await this._grabAllPopulations(knex)
        this.allCities = this.allCities.map((state, i) => {
            return {
                ...state,
                government: this._allGovs[i],
                area: this._allAreas[i],
                population: this._allPopulations[i],
            }
        })
    }
    _mapCounties() {
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
    // NOTE: no double for loops...
    // Instead aggregate into {}, where {
    // city_id: 2,
    // council_members: ['blah', 'otherblahmember']
    // then assign based off of city_id
    // see _aggregateZips above
    // }
    _mapCouncilors() {
        this.allCities.forEach(city => {
            city.government.city_council = []
            this._allCouncilMembers.forEach(councilMember => {
                if (city.id === councilMember.city_id) {
                    city.government.city_council.push(
                        councilMember.council_member,
                    )
                }
            })
        })
    }
    async grabAllCities(knex) {
        await this._grabAllCitiesInfo(knex)
        await this._grabAllCounties(knex)
        await this._mapGovernmentsAndAreasAndPopulations(knex)
        await this._grabAllZipCodes(knex)
        await this._aggregateAreaCodes(knex)
        await this._aggregateGnisIds(knex)
        this._mapCounties()
        this._mapCouncilors()
        this._aggregateZips()

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
