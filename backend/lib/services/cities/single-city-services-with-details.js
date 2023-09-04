'use strict'

/** Base Class for Single City Object
 * @constructor
 * returns { SingleCityService }
 * */
class SingleCityServiceDetails {
    constructor() {
        this.test = 'oh hi there'
        this._objFields = ['government', 'area', 'population']
        this._arrFields = [
            'counties',
            'zip_codes',
            'area_codes',
            'gnis_feature_ids',
        ]
    }
    async _grabObjDetails(knex, id, details, table) {
        let field = null
        const deets = {}
        if (details !== 'city_council') {
            field = table.split('_').pop()
            deets[field] = await knex
                .where('city_id', id)
                .select(details)
                .from(table)
                .first()
        } else {
            field = details
            deets[field] = await this._grabGovCouncilMembersById(knex, id)
        }
        if (!deets[field])
            throw Error(
                `No detail information for city id: ${id} in field ${field} for details: ${details}`,
            )
        return deets
    }
    async _grabArrDetails(knex, id, index, fieldName) {
        const deets = {}
        const table = `cities_${fieldName}s`
        const data = (
            await knex
                .select(fieldName)
                .from(table)
                .where('city_id', id)
                .limit(1)
                .offset(index)
        ).map(result => {
            return result[fieldName]
        })
        if (!data.length)
            throw Error(
                `No Details Found at Index: ${index} for Field: ${fieldName}s`,
            )
        deets[fieldName] = data
        return deets
    }
    // TODO: More extensive jsdocs here
    async grabRelDataByIdWithDeets(knex, id, field, details) {
        const city = await this._grabMinCityInfo(knex, id)
        if (this._objFields.includes(field) && isNaN(Number(details))) {
            const table = `cities_${field}`
            const deets = await this._grabObjDetails(knex, id, details, table)
            return { ...city, ...deets }
        } else if (this._arrFields.includes(field) && !isNaN(Number(details))) {
            const index = details - 1
            const fieldName = field.slice(0, -1)
            const deets = await this._grabArrDetails(knex, id, index, fieldName)
            return { ...city, ...deets }
        }
    }
    // async grabSingleCouncilMember(knex, id, index) {}
}

module.exports = SingleCityServiceDetails
