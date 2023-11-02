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
        try {
            const state = await knex('states').where('id', id).first()
            if (!state) throw Error(`No State Found For Id: ${id}`)
            return state
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAreaById(knex, id) {
        try {
            const area = await knex
                .where('state_id', id)
                .select('total', 'land', 'water')
                .from('states_area')
                .first()
            if (!area) throw Error(`No Areas Found For Id: ${id}`)
            return area
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabPopulationById(knex, id) {
        try {
            const population = await knex
                .where('state_id', id)
                .select('total', 'density', 'median_household_income')
                .from('states_population')
                .first()
            if (!population) throw Error(`No Populations Found For Id: ${id}`)
            return population
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabMinStateInfo(knex, id) {
        try {
            const state = await knex
                .where('id', id)
                .select('id', 'state_name', 'state_abbreviation')
                .from('states')
                .first()
            if (!state) throw Error(`No state info retrieved for id: ${id}`)
            return state
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabNativeFieldData(knex, id, field) {
        try {
            const nativeFieldData = await knex
                .where('id', id)
                .select('id', 'state_name', 'state_abbreviation')
                .select(field)
                .from('states')
                .first()
            if (!nativeFieldData)
                throw Error(
                    `No data retrieved for field: ${field} at id: ${id}`,
                )
            return nativeFieldData
        } catch (err) {
            console.error('ERROR :=>', err)
        }
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
            case 'government':
                returnVal = {
                    government: {
                        governor: await this.grabGovernorById(knex, id),
                        senators: await this.grabSenatorsById(knex, id),
                        house_delegates: await this.grabDelegatesById(knex, id),
                    },
                }
                break
            // case 'senators':
            // returnVal = await this.grabSenatorsById(knex, id)
            // returnVal = { government: { senators: returnVal } }
            // break
            // case 'house_delegates':
            // returnVal = await this.grabDelegatesById(knex, id)
            // returnVal = { government: { house_delegates: returnVal } }
            // break
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
        const returnData = []
        this.singleState = await this._grabStateById(knex, id)
        this.singleState.area = await this._grabAreaById(knex, id)
        this.singleState.population = await this._grabPopulationById(knex, id)
        this.singleState.government = !Object.hasOwn(
            this.singleState,
            'government',
        )
            ? {}
            : this.singleState.government
        this.singleState.government.governor = await this.grabGovernorById(
            knex,
            id,
        )
        this.singleState.government.senators = await this.grabSenatorsById(
            knex,
            id,
        )
        this.singleState.government.house_delegates =
            await this.grabDelegatesById(knex, id)
        returnData.push(this.singleState)
        return returnData
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
        const returnData = []
        let returnObj = {}
        if (this._nativeFields.includes(field)) {
            returnObj = await this._grabNativeFieldData(knex, id, field)
        } else {
            returnObj = await this._grabRelatedFieldData(knex, id, field)
        }
        returnData.push(returnObj)
        return returnData
    }
}

module.exports = SingleStateService
