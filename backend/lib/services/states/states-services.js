'use strict'
const fp = require('fastify-plugin')
const SingleStateService = require('./single-state-services')

/** Finalized Full Class for new State Object
 * @constructor
 * returns { StatesService }
 * */
class StatesService extends SingleStateService {
    constructor() {
        super()
        this.allStates = []
        this._statesAreas = {}
        this._statesPopulations = {}
        this._senators = []
        this._house_delegates = []
    }
    async _grabAllStateInfo(knex) {
        const allStates = await knex('states')
        if (!allStates) throw Error('No States Table Found')
        this.allStates = allStates
    }
    async _grabAllStateAreas(knex) {
        const _statesAreas = await knex
            .select('total', 'land', 'water')
            .from('states_area')
        if (!_statesAreas) throw Error('No States Areas Table Found')
        this._statesAreas = _statesAreas
    }
    async _grabAllStatePopulations(knex) {
        const _statesPopulations = await knex
            .select('total', 'density', 'median_household_income')
            .from('states_population')
        if (!_statesPopulations)
            throw Error('No States Populations Table Found')
        this._statesPopulations = _statesPopulations
    }
    async _grabAllStateSenators(knex) {
        const senators = await knex('states_senators')
        if (!senators) throw Error('No States Senators Table Found')
        this._senators = senators
    }
    async _grabAllHouseDelegates(knex) {
        const delegates = await knex('states_house_delegates')
        if (!delegates) throw Error('No States Delegates Table Found')
        this._house_delegates = delegates
    }
    // NOTE: These map functions can probably
    // be accomplished similarly using sql join in queries above
    _mapAreaAndPopulation() {
        this.allStates = this.allStates.map((state, i) => {
            return {
                ...state,
                area: this._statesAreas[i],
                population: this._statesPopulations[i],
            }
        })
    }
    _mapSenators() {
        this.allStates.forEach(state => {
            state.senators = this._senators
                .filter(senator => {
                    return state.id === senator.state_id
                })
                .map(senator => {
                    return senator.senator_name
                })
        })
    }
    _mapDelegates() {
        this.allStates.forEach(state => {
            state.house_delegates = this._house_delegates
                .filter(delegate => {
                    return state.id === delegate.state_id
                })
                .map(delegate => {
                    return delegate.delegate_name
                })
        })
    }
    /**
     * Aggregates all states data
     * @params { promise } knex
     * returns { array } allStates
     * */
    async grabAllStates(knex) {
        await this._grabAllStateInfo(knex)
        await this._grabAllStateAreas(knex)
        await this._grabAllStatePopulations(knex)
        await this._grabAllStateSenators(knex)
        await this._grabAllHouseDelegates(knex)
        this._mapAreaAndPopulation()
        this._mapSenators()
        this._mapDelegates()
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
