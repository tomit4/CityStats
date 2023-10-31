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
    // TODO:
    // ERROR HANDLING: try/catch/throw is necessary on all db queries,
    // see grabSingleCouncilMember() for proper implementation
    async _grabAllStateInfo(knex) {
        try {
            const allStates = await knex('states')
            if (!allStates) throw Error('No States Table Found')
            this.allStates = allStates
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAllStateAreas(knex) {
        try {
            const _statesAreas = await knex
                .select('total', 'land', 'water')
                .from('states_area')
            if (!_statesAreas) throw Error('No States Areas Table Found')
            this._statesAreas = _statesAreas
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAllStatePopulations(knex) {
        try {
            const _statesPopulations = await knex
                .select('total', 'density', 'median_household_income')
                .from('states_population')
            if (!_statesPopulations)
                throw Error('No States Populations Table Found')
            this._statesPopulations = _statesPopulations
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAllStateSenators(knex) {
        try {
            const senators = await knex('states_senators')
            if (!senators) throw Error('No States Senators Table Found')
            this._senators = senators
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAllHouseDelegates(knex) {
        try {
            const delegates = await knex('states_house_delegates')
            if (!delegates) throw Error('No States Delegates Table Found')
            this._house_delegates = delegates
        } catch (err) {
            console.error('ERROR :=>', err)
        }
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
        for (const state of this.allStates) {
            state.senators = this._senators
                .filter(senator => {
                    return state.id === senator.state_id
                })
                .map(senator => {
                    return {
                        senator_name: senator.senator_name,
                        img_url: senator.img_url,
                    }
                })
        }
    }
    _mapDelegates() {
        for (const state of this.allStates) {
            state.house_delegates = this._house_delegates
                .filter(delegate => {
                    return state.id === delegate.state_id
                })
                .map(delegate => {
                    return {
                        delegate_name: delegate.delegate_name,
                        img_url: delegate.img_url,
                    }
                })
        }
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

module.exports = StatesService
