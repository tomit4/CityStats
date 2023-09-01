'use strict'
const SingleStateService = require('./single-state-services')

class StatesService extends SingleStateService {
    constructor() {
        super()
        this.allStates = []
        this.statesAreas = {}
        this.statesPopulations = {}
        this.senators = []
        this.house_delegates = []
    }
    async grabAllStateInfo(knex) {
        try {
            const allStates = await knex('states')
            this.allStates = allStates
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error('No States Table Found')
        }
    }
    async grabAllStateAreas(knex) {
        try {
            const statesAreas = await knex
                .select('total', 'land', 'water')
                .from('states_area')
            this.statesAreas = statesAreas
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error('No States Areas Table Found')
        }
    }
    async grabAllStatePopulations(knex) {
        try {
            const statesPopulations = await knex
                .select('total', 'density', 'median_household_income')
                .from('states_population')
            this.statesPopulations = statesPopulations
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error('No States Populations Table Found')
        }
    }
    async grabAllStateSenators(knex) {
        try {
            const senators = await knex('states_senators')
            this.senators = senators
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error('No States Senators Table Found')
        }
    }
    async grabAllHouseDelegates(knex) {
        try {
            const delegates = await knex('states_house_delegates')
            this.house_delegates = delegates
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error('No States Delegates Table Found')
        }
    }
    // NOTE: These map functions can probably
    // be accomplished similarly using sql join in queries above
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

module.exports = StatesService
