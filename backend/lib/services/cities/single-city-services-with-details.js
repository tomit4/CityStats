'use strict'

/** Base Class for Single City Object
 * @constructor
 * returns { SingleCityService }
 * */
class SingleCityServiceDetails {
    constructor() {
        this._objFields = ['government', 'area', 'population']
        this._arrFields = [
            'counties',
            'zip_codes',
            'area_codes',
            'gnis_feature_ids',
        ]
        this.fieldWithNested = ['government']
    }
    async _grabObjDetails(knex, id, details, table) {
        try {
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
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabArrDetails(knex, id, index, fieldName) {
        try {
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
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }

    /**
     * TODO: Refactor to not be so long...
     * Aggregates Single Relational Data Point On City
     * (i.e. specific government/area/population, counties, zip_codes, area_codes, gnis_feature_ids, etc.)
     * @params { promise } knex
     * @params { string } id
     * @ params { string } field
     * @params { string } details
     * returns { object }
     * */
    async grabRelDataByIdWithDeets(knex, idOrName, field, details) {
        const id = await this.grabCityIdByName(knex, idOrName)
        const cityIds =
            typeof id === 'object' ? id.map(cityId => cityId.id) : []
        // TODO: Change id to idOrName and pass it appropriately
        if (!cityIds.length) {
            const city = await this._grabMinCityInfo(knex, id)
            if (this._objFields.includes(field) && isNaN(Number(details))) {
                const table = `cities_${field}`
                const deets = await this._grabObjDetails(
                    knex,
                    id,
                    details,
                    table,
                )
                return { ...city, ...deets }
            } else if (
                this._arrFields.includes(field) &&
                !isNaN(Number(details))
            ) {
                const index = details - 1
                const fieldName = field.slice(0, -1)
                const deets = await this._grabArrDetails(
                    knex,
                    id,
                    index,
                    fieldName,
                )
                return { ...city, ...deets }
            }
        } else {
            const multipleCities = []
            for (const id of cityIds) {
                const city = await this._grabMinCityInfo(knex, id)
                if (this._objFields.includes(field) && isNaN(Number(details))) {
                    const table = `cities_${field}`
                    const deets = await this._grabObjDetails(
                        knex,
                        id,
                        details,
                        table,
                    )
                    if (!deets)
                        throw Error(
                            `No details for id: ${id} at field: ${fieldName} at table: ${table}.`,
                        )
                    multipleCities.push({ ...city, ...deets })
                } else if (
                    this._arrFields.includes(field) &&
                    !isNaN(Number(details))
                ) {
                    const index = details - 1
                    const fieldName = field.slice(0, -1)
                    const deets = await this._grabArrDetails(
                        knex,
                        id,
                        index,
                        fieldName,
                    )
                    if (!deets)
                        throw Error(
                            `No details for id: ${id} at field: ${fieldName} at index: ${index}.`,
                        )
                    console.log('deets :=>', deets)
                    multipleCities.push({ ...city, ...deets })
                }
            }
            return multipleCities
        }
    }

    /**
     * Grabs Single Government Council Member by Index
     * @params { promise } knex
     * @params { string } id
     * @params { string } query
     * returns { object }
     * */
    async grabSingleCouncilMember(knex, id, query) {
        // TODO: Change id to idOrName and pass it appropriately
        if (isNaN(Number(query)))
            throw Error(`Query: ${query} must be a number`)
        const city = await this._grabMinCityInfo(knex, id)
        try {
            const councilMember = (
                await knex
                    .where('city_id', id)
                    .select('council_member')
                    .from('cities_government_council')
                    .limit(1)
                    .offset(query - 1)
            ).map(member => {
                return member.council_member
            })
            if (!councilMember.length)
                throw Error(
                    `No Council Member returned for Queried Index: ${query}`,
                )
            return { ...city, council_member: councilMember[0] }
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(
                `No Council Member returned for Queried Index: ${query}`,
            )
        }
    }
}

module.exports = SingleCityServiceDetails
