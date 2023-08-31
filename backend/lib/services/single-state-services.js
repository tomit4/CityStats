'use strict'
const fp = require('fastify-plugin')

class SingleStateService {
    constructor() {
        this.allStates = []
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
        this.relatedFields = [
            'area',
            'population',
            'senators',
            'house_delegates',
        ]
        this.fields = [...this.nativeFields, ...this.relatedFields]
    }
    // TODO: Break all this individual state methods
    // out into it's own class/service file
    // (multiple classes for single states and subqueries)
    async grabStateById(knex, id) {
        const state = await knex('states').where('id', id).first()
        if (!state) throw Error(`No State Found For Id: ${id}`)
        return state
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
        return await knex
            .where('id', id)
            .select('id')
            .select('state_name', 'state_abbreviation')
            .select(field)
            .from('states')
            .first()
    }
    async grabRelatedFieldData(knex, id, field) {
        const state = await this.grabMinStateInfo(knex, id, field)
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
    async grabMinStateInfo(knex, id, field) {
        return await knex
            .where('id', id)
            .select('state_name', 'state_abbreviation')
            .from('states')
            .first()
    }
    async grabRelDataById(knex, id, field) {
        if (this.nativeFields.includes(field)) {
            return await this.grabNativeFieldData(knex, id, field)
        } else {
            return await this.grabRelatedFieldData(knex, id, field)
        }
    }
}

const singleStatePlugin = (fastify, options, done) => {
    if (!fastify.states) {
        const singleStateService = new SingleStateService()
        fastify.decorate('singleStateService', singleStateService)
        fastify.addHook('onClose', (fastify, done) => {
            if (fastify.states === stateService) {
                fastify.states.destroy(done)
            }
        })
    }
    done()
}

module.exports = fp(singleStatePlugin, { name: 'fastify-single-state-plugin' })
