'use strict'
const SingleStateServiceDetails = require('./single-state-services-with-details')

class SingleStateService extends SingleStateServiceDetails {
    constructor() {
        super()
        this.singleState = {}
        this.nativeFields = [
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
        this.relatedFieldObjectKeys = ['area', 'population']
        this.relatedFieldArrayKeys = ['senators', 'house_delegates']
        this.relatedFields = [
            ...this.relatedFieldObjectKeys,
            ...this.relatedFieldArrayKeys,
        ]
        this.fields = [...this.nativeFields, ...this.relatedFields]
    }
    async grabStateById(knex, id) {
        try {
            const state = await knex('states').where('id', id).first()
            return state
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No State Found For Id: ${id}`)
        }
    }
    async grabAreaById(knex, id) {
        try {
            const area = await knex
                .where('state_id', id)
                .select('total', 'land', 'water')
                .from('states_area')
                .first()
            return area
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No Areas Found For Id: ${id}`)
        }
    }
    async grabPopulationById(knex, id) {
        try {
            const population = await knex
                .where('state_id', id)
                .select('total', 'density', 'median_household_income')
                .from('states_population')
                .first()
            return population
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No Populations Found For Id: ${id}`)
        }
    }
    async grabSenatorsById(knex, id) {
        try {
            const senators = await knex
                .where('state_id', id)
                .select('senator_name')
                .from('states_senators')
            return senators.map(senator => senator.senator_name)
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No Senators Found For Id: ${id}`)
        }
    }
    async grabDelegatesById(knex, id) {
        try {
            const delegates = await knex
                .where('state_id', id)
                .select('delegate_name')
                .from('states_house_delegates')
            return delegates.map(delegate => delegate.delegate_name)
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No Delegates Found For Id: ${id}`)
        }
    }
    async grabSingleStateById(knex, id) {
        this.singleState = await this.grabStateById(knex, id)
        this.singleState.area = await this.grabAreaById(knex, id)
        this.singleState.population = await this.grabPopulationById(knex, id)
        this.singleState.senators = await this.grabSenatorsById(knex, id)
        this.singleState.house_delegates = await this.grabDelegatesById(
            knex,
            id,
        )
        return this.singleState
    }
    async grabNativeFieldData(knex, id, field) {
        try {
            const nativeFieldData = await knex
                .where('id', id)
                .select('id')
                .select('state_name', 'state_abbreviation')
                .select(field)
                .from('states')
                .first()
            return nativeFieldData
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No data retrieved for field: ${field} at id: ${id}`)
        }
    }
    async grabRelatedFieldData(knex, id, field) {
        const state = await this.grabMinStateInfo(knex, id)
        let area = null
        let population = null
        let senators = null
        let delegates = null
        let returnVal = null
        switch (field) {
            case 'area':
                area = await this.grabAreaById(knex, id)
                returnVal = { area }
                break
            case 'population':
                population = await this.grabPopulationById(knex, id)
                returnVal = { population }
                break
            case 'senators':
                senators = await this.grabSenatorsById(knex, id)
                returnVal = { senators }
                break
            case 'house_delegates':
                delegates = await this.grabDelegatesById(knex, id)
                returnVal = { house_delegates: delegates }
                break
            default:
                throw Error('Unable to find info on field')
        }
        return { state_id: Number(id), ...state, ...returnVal }
    }
    async grabMinStateInfo(knex, id) {
        try {
            const state = await knex
                .where('id', id)
                .select('id', 'state_name', 'state_abbreviation')
                .from('states')
                .first()
            return state
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No state info retrieved for id: ${id}`)
        }
    }
    async grabRelDataById(knex, id, field) {
        if (this.nativeFields.includes(field)) {
            return await this.grabNativeFieldData(knex, id, field)
        } else {
            return await this.grabRelatedFieldData(knex, id, field)
        }
    }
}

module.exports = SingleStateService
