'use strict'

/** Intermediary Class for Single City Object
 * @constructor
 * returns { SingleCityService }
 * */
class SingleCityService {
    constructor() {
        this.testData = 'oh hi there'
        this.singleCity = {}
    }
    async _grabCityById(knex, id) {
        const city = await knex
            .select(...this._cityTableFields)
            .from('cities')
            .where('id', id)
            .first()
        if (!city) throw Error(`No City Found For Id: ${id}`)
        return city
    }
    async _grabCountiesById(knex, id) {
        const counties = await knex('cities_counties').where('city_id', id)
        if (!counties) throw Error(`No Counties Data Found Id: ${id}`)
        return counties.map(county => {
            return county.county_name
        })
    }
    async _grabGovCouncilMembersById(knex, id) {
        const councilMembers = await knex
            .select('council_member')
            .from('cities_government_council')
            .where('city_id', id)
        if (!councilMembers)
            throw Error(
                `No Cities Government Council Members Found For Id: ${id}`,
            )
        return councilMembers.map(member => {
            return member.council_member
        })
    }
    async _grabBaseGovInfoById(knex, id) {
        const councilMembers = await this._grabGovCouncilMembersById(knex, id)
        const gov = await knex
            .select('type', 'mayor')
            .from('cities_government')
            .where('id', id)
            .first()
        if (!gov) throw Error(`No Cities Government Data Found For Id: ${id}`)
        gov.city_council = councilMembers
        return gov
    }
    async _grabAreaById(knex, id) {
        const area = await knex
            .select('city', 'land', 'water')
            .from('cities_area')
            .where('city_id', id)
            .first()
        if (!area) throw Error(`No Cities Area Data Found For Id: ${id}`)
        return area
    }
    async _grabPopulationById(knex, id) {
        const population = await knex
            .select('city', 'density', 'metro')
            .from('cities_population')
            .where('city_id', id)
            .first()
        if (!population)
            throw Error(`No Cities Population Data Found For Id: ${id}`)
        return population
    }
    async _grabZipCodesById(knex, id) {
        const zips = await knex
            .select('zip_code')
            .from('cities_zip_codes')
            .where('city_id', id)
        if (!zips) throw Error(`No Cities Zip Codes Data Found For Id: ${id}`)
        return zips.map(zip => {
            return zip.zip_code
        })
    }
    async _grabAreaCodesById(knex, id) {
        const areaCodes = await knex
            .select('area_code')
            .from('cities_area_codes')
            .where('city_id', id)
        if (!areaCodes)
            throw Error(`No Cities Area Codes Data Found For Id: ${id}`)
        return areaCodes.map(code => {
            return code.area_code
        })
    }
    async _grabGnisIdsById(knex, id) {
        const gnisIds = await knex
            .select('gnis_feature_id')
            .from('cities_gnis_ids')
            .where('city_id', id)
        if (!gnisIds)
            throw Error(`No Cities Gnis Feature Ids Data Found For Id: ${id}`)
        return gnisIds.map(id => {
            return id.gnis_feature_id
        })
    }
    /**
     * Aggregates single city data
     * @params { promise } knex
     * returns { object } singleCity
     * */
    async grabSingleCityById(knex, id) {
        this.singleCity = await this._grabCityById(knex, id)
        this.singleCity.counties = await this._grabCountiesById(knex, id)
        this.singleCity.government = await this._grabBaseGovInfoById(knex, id)
        this.singleCity.area = await this._grabAreaById(knex, id)
        this.singleCity.population = await this._grabPopulationById(knex, id)
        this.singleCity.zip_codes = await this._grabZipCodesById(knex, id)
        this.singleCity.area_codes = await this._grabAreaCodesById(knex, id)
        this.singleCity.gnis_feature_ids = await this._grabGnisIdsById(knex, id)
        return this.singleCity
    }
}

module.exports = SingleCityService
