'use strict'
const SingleStateServiceDetails = require('./single-state-services-with-details')

/**
 * Intermediary Class for new State Object
 * @constructor
 * returns { SingleStateService }
 * */
class SingleStateService extends SingleStateServiceDetails {
    constructor() {
        super()
        this.singleState = {}
        this._nativeFields = [
            'id',
            'state_name',
            'state_abbreviation',
            'date_admitted',
            'capital',
            'largest_city',
            'govenor',
            'elevation',
            'time_zone',
            'latitude',
            'longitude',
            'url',
            'flag_url',
            'insignia_url',
        ]
        this.fields = [...this._nativeFields, ...this.relatedFields]
    }
    async _grabStateById(knex, id) {
        const state = await knex('states').where('id', id).first()
        if (!state) throw Error(`No State Found For Id: ${id}`)
        return state
    }
    async _grabAreaById(knex, id) {
        const area = await knex
            .where('state_id', id)
            .select('total', 'land', 'water')
            .from('states_area')
            .first()
        if (!area) throw Error(`No Areas Found For Id: ${id}`)
        return area
    }
    async _grabPopulationById(knex, id) {
        const population = await knex
            .where('state_id', id)
            .select('total', 'density', 'median_household_income')
            .from('states_population')
            .first()
        if (!population) throw Error(`No Populations Found For Id: ${id}`)
        return population
    }
    async _grabMinStateInfo(knex, id) {
        const state = await knex
            .where('id', id)
            .select('id', 'state_name', 'state_abbreviation')
            .from('states')
            .first()
        if (!state) throw Error(`No state info retrieved for id: ${id}`)
        return state
    }
    async _grabNativeFieldData(knex, id, field) {
        const nativeFieldData = await knex
            .where('id', id)
            .select('id', 'state_name', 'state_abbreviation')
            .select(field)
            .from('states')
            .first()
        if (!nativeFieldData)
            throw Error(`No data retrieved for field: ${field} at id: ${id}`)
        return nativeFieldData
    }
    async _grabRelatedFieldData(knex, id, field) {
        const state = await this._grabMinStateInfo(knex, id)
        let returnVal = null
        switch (field) {
            case 'area':
                returnVal = await this._grabAreaById(knex, id)
                returnVal = { area: returnVal }
                break
            case 'population':
                returnVal = await this._grabPopulationById(knex, id)
                returnVal = { population: returnVal }
                break
            case 'senators':
                returnVal = await this.grabSenatorsById(knex, id)
                returnVal = { senators: returnVal }
                break
            case 'house_delegates':
                returnVal = await this.grabDelegatesById(knex, id)
                returnVal = { house_delegates: returnVal }
                break
            default:
                throw Error(
                    `Unable to find state info for id: ${id} on field: ${field}`,
                )
        }
        return { ...state, ...returnVal }
    }
    /**
     * Aggregates all state info by id
     * @params { promise } knex
     * @params { string } idORName
     * returns { object } singleState
     * */
    async grabSingleStateById(knex, idOrName) {
        const id = await this.grabIdByName(knex, idOrName)
        this.singleState = await this._grabStateById(knex, id)
        this.singleState.area = await this._grabAreaById(knex, id)
        this.singleState.population = await this._grabPopulationById(knex, id)
        this.singleState.senators = await this.grabSenatorsById(knex, id)
        this.singleState.house_delegates = await this.grabDelegatesById(
            knex,
            id,
        )
        return this.singleState
    }
    /**
     * Aggregates min state info with single query field
     * @params { promise } knex
     * @params { string } idOrName
     * @params { string } field
     * returns { object }
     * */
    async grabRelDataById(knex, idOrName, field) {
        const id = await this.grabIdByName(knex, idOrName)
        if (this._nativeFields.includes(field)) {
            return await this._grabNativeFieldData(knex, id, field)
        } else {
            return await this._grabRelatedFieldData(knex, id, field)
        }
    }
}

module.exports = SingleStateService
