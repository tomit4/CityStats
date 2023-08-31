'use strict'
const fp = require('fastify-plugin')

class StatesService {
    constructor() {
        this.allStates = []
        this.statesAreas = {}
        this.statesPopulations = {}
        this.senators = []
        this.house_delegates = []
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
