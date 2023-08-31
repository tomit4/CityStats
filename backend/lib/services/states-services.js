'use strict'
const fp = require('fastify-plugin')

class StatesService {
    constructor() {
        this.allStates = []
        this.singleState = {}
        this.statesAreas = {}
        this.statesPopulations = {}
        this.senators = []
        this.house_delegates = []
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
    async grabAllStateInfo(knex) {
        const allStates = await knex('states')
        if (!allStates) throw Error('No States Table Found')
        this.allStates = allStates
    }
    async grabAllStateAreas(knex) {
        const statesAreas = await knex
            .select('total', 'land', 'water')
            .from('states_area')
        if (!statesAreas) throw Error('No States Areas Table Found')
        this.statesAreas = statesAreas
    }
    async grabAllStatePopulations(knex) {
        const statesPopulations = await knex
            .select('total', 'density', 'median_household_income')
            .from('states_population')
        if (!statesPopulations) throw Error('No States Populations Table Found')
        this.statesPopulations = statesPopulations
    }
    async grabAllStateSenators(knex) {
        const senators = await knex('states_senators')
        if (!senators) throw Error('No States Senators Table Found')
        this.senators = senators
    }
    async grabAllHouseDelegates(knex) {
        const delegates = await knex('states_house_delegates')
        if (!delegates) throw Error('No States Delegates Table Found')
        this.house_delegates = delegates
    }
    mapAreaAndPopulation() {
        this.allStates = this.allStates.map((state, i) => {
            return {
                ...state,
                area: this.statesAreas[i],
                population: this.statesPopulations[i],
            }
        })
    }
    mapSenators() {
        this.allStates.forEach(state => {
            state.senators = this.senators
                .filter(senator => {
                    return state.id === senator.state_id
                })
                .map(senator => {
                    return senator.senator_name
                })
        })
    }
    mapDelegates() {
        this.allStates.forEach(state => {
            state.house_delegates = this.house_delegates
                .filter(delegate => {
                    return state.id === delegate.state_id
                })
                .map(delegate => {
                    return delegate.delegate_name
                })
        })
    }
    async grabAllStates(knex) {
        await this.grabAllStateInfo(knex)
        await this.grabAllStateAreas(knex)
        await this.grabAllStatePopulations(knex)
        await this.grabAllStateSenators(knex)
        await this.grabAllHouseDelegates(knex)
        this.mapAreaAndPopulation()
        this.mapSenators()
        this.mapDelegates()
        return this.allStates
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

const statesPlugin = (fastify, options, done) => {
    if (!fastify.states) {
        const stateService = new StatesService()
        fastify.decorate('stateService', stateService)
        fastify.addHook('onClose', (fastify, done) => {
            if (fastify.states === stateService) {
                fastify.states.destroy(done)
            }
        })
    }
    done()
}

module.exports = fp(statesPlugin, { name: 'fastify-states-plugin' })
