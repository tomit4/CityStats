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
        const state = await knex('states').where('id', id).first()
        if (!state) throw Error(`No State Found For Id: ${id}`)
        return state
    }
    async grabStateByName(knex, name) {
        const state = await knex('states').where('state_name', name).first()
        if (!state) throw Error(`No State Found By Name: ${name}`)
        return state
    }
    async grabAllStateNames(knex) {
        const allStateNames = await knex.select('state_name').from('states')
        if (!allStateNames)
            throw Error('Failure to retrieve all State Names from DB')
        return allStateNames.map(state => state.state_name)
    }
    async grabAreaById(knex, id) {
        const area = await knex
            .where('state_id', id)
            .select('total', 'land', 'water')
            .from('states_area')
            .first()
        if (!area) throw Error(`No Areas Found For Id: ${id}`)
        return area
    }
    async grabPopulationById(knex, id) {
        const population = await knex
            .where('state_id', id)
            .select('total', 'density', 'median_household_income')
            .from('states_population')
            .first()
        if (!population) throw Error(`No Populations Found For Id: ${id}`)
        return population
    }
    async grabSenatorsById(knex, id) {
        const senators = await knex
            .where('state_id', id)
            .select('senator_name')
            .from('states_senators')
        if (!senators) throw Error(`No Senators Found For Id: ${id}`)
        return senators.map(senator => senator.senator_name)
    }
    async grabDelegatesById(knex, id) {
        const delegates = await knex
            .where('state_id', id)
            .select('delegate_name')
            .from('states_house_delegates')
        if (!delegates) throw Error(`No Delegates Found For Id: ${id}`)
        return delegates.map(delegate => delegate.delegate_name)
    }
    async grabSingleStateById(knex, id) {
        let idOrName = id
        if (isNaN(Number(idOrName))) {
            const allStateNames = await this.grabAllStateNames(knex)
            if (allStateNames.includes(idOrName)) {
                this.singleState = await this.grabStateByName(knex, idOrName)
                idOrName = this.singleState.id
            } else throw Error(`No State Found by Name: ${idOrName}`)
        } else {
            this.singleState = await this.grabStateById(knex, id)
        }
        this.singleState.area = await this.grabAreaById(knex, idOrName)
        this.singleState.population = await this.grabPopulationById(
            knex,
            idOrName,
        )
        this.singleState.senators = await this.grabSenatorsById(knex, idOrName)
        this.singleState.house_delegates = await this.grabDelegatesById(
            knex,
            idOrName,
        )
        return this.singleState
    }
    async grabNativeFieldData(knex, id, field) {
        const nativeFieldData = await knex
            .where('id', id)
            .select('id')
            .select('state_name', 'state_abbreviation')
            .select(field)
            .from('states')
            .first()
        if (!nativeFieldData)
            throw Error(`No data retrieved for field: ${field} at id: ${id}`)
        return nativeFieldData
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
        const state = await knex
            .where('id', id)
            .select('id', 'state_name', 'state_abbreviation')
            .from('states')
            .first()
        if (!state) throw Error(`No state info retrieved for id: ${id}`)
        return state
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
