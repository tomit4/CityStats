'use strict'
const fp = require('fastify-plugin')

class StatesService {
    constructor() {
        this.allStates = []
        this.singleState = []
        this.statesAreas = {}
        this.statesPopulations = {}
        this.senators = []
        this.house_delegates = []
    }
    async grabAllStateInfo(knex) {
        this.allStates = await knex('states')
        this.dbErr(this.allStates)
    }
    async grabAllStateAreas(knex) {
        this.statesAreas = await knex
            .select('total', 'land', 'water')
            .from('states_area')
        this.dbErr(this.statesAreas)
    }
    async grabAllStatePopulations(knex) {
        this.statesPopulations = await knex
            .select('total', 'density', 'median_household_income')
            .from('states_population')
        this.dbErr(this.statesPopulations)
    }
    async grabAllStateSenators(knex) {
        this.senators = await knex('states_senators')
        this.dbErr(this.senators)
    }
    async grabAllHouseDelegates(knex) {
        this.house_delegates = await knex('states_house_delegates')
        this.dbErr(this.house_delegates)
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
    dbErr(data) {
        if (!data.length)
            throw Error(`ERROR: No Data retrieved from DB for ${data}`)
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

    // TODO: Move Single State Service into separate
    // Class that extends this class
    // and is registered as a separate fastify plugin(???)
    async grabAreaById(knex, id) {
        return await knex
            .where('state_id', id)
            .select('total', 'land', 'water')
            .from('states_area')
            .first()
    }
    async grabPopulationById(knex, id) {
        return await knex
            .where('state_id', id)
            .select('total', 'density', 'median_household_income')
            .from('states_population')
            .first()
    }
    async grabSenatorsById(knex, id) {
        return await knex
            .where('state_id', id)
            .select('senator_name')
            .from('states_senators')
    }
    async grabDelegatesById(knex, id) {
        return await knex
            .where('state_id', id)
            .select('delegate_name')
            .from('states_house_delegates')
    }
    async grabAllStateById(knex, id) {
        this.singleState = await knex('states').where('id', id).first()
        this.singleState.area = await this.grabAreaById(knex, id)
        this.singleState.population = await this.grabPopulationById(knex, id)
        this.singleState.senators = (await this.grabSenatorsById(knex, id)).map(
            senator => senator.senator_name,
        )
        this.singleState.house_delegates = (
            await this.grabDelegatesById(knex, id)
        ).map(delegate => delegate.delegate_name)
        return this.singleState
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
