/** Base Class for new State Object
 * @constructor
 * returns { SingleStateServiceDetails }
 * */
class SingleStateServiceDetails {
    constructor() {
        this._statsFields = ['area', 'population']
        this._repFields = ['senators', 'house_delegates']
        this.relatedFields = [...this._statsFields, ...this._repFields]
    }
    async _grabAllStateNames(knex) {
        try {
            const allStateNames = await knex.select('state_name').from('states')
            if (!allStateNames)
                throw Error('Failure to retrieve all State Names from DB')
            return allStateNames.map(state => state.state_name)
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabStateIdByName(knex, name) {
        try {
            const stateId = (
                await knex('states')
                    .select('id')
                    .where('state_name', name)
                    .first()
            ).id
            if (!stateId) throw Error(`No State Id Found By Name: ${name}`)
            return stateId
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async grabIdByName(knex, idOrName) {
        try {
            let id
            if (Number.isNaN(Number(idOrName))) {
                const allStateNames = await this._grabAllStateNames(knex)
                if (allStateNames.includes(idOrName)) {
                    id = await this._grabStateIdByName(knex, idOrName)
                } else throw Error(`No State Found by Name: ${idOrName}`)
            } else {
                id = idOrName
            }
            return id
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async grabSenatorsById(knex, id) {
        try {
            const senators = await knex
                .where('state_id', id)
                .select('senator_name', 'img_url')
                .from('states_senators')
            if (!senators) throw Error(`No Senators Found For Id: ${id}`)
            return senators.map(senator => {
                return {
                    senator_name: senator.senator_name,
                    img_url: senator.img_url,
                }
            })
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async grabDelegatesById(knex, id) {
        try {
            const delegates = await knex
                .where('state_id', id)
                .select('delegate_name', 'img_url')
                .from('states_house_delegates')
            if (!delegates) throw Error(`No Delegates Found For Id: ${id}`)
            return delegates.map(delegate => {
                return {
                    delegate_name: delegate.delegate_name,
                    img_url: delegate.img_url,
                }
            })
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
    async _grabDetails(knex, id, details, table) {
        const field = table.split('_').pop()
        const deets = {}
        try {
            deets[field] = await knex
                .where('state_id', id)
                .select(details)
                .from(table)
                .first()
            if (!deets[field])
                throw Error(
                    `No detail information found for id: ${id} in field ${field} for details: ${details}`,
                )
            return deets
        } catch (err) {
            throw Error(
                `No detail information found for id: ${id} in field ${field} for details: ${details}`,
            )
        }
    }
    _deetConditionals(field, details) {
        return {
            relFieldIsValid:
                this._statsFields.includes(field) &&
                Number.isNaN(Number(details)),
            relFieldIsInvalid:
                this._statsFields.includes(field) &&
                !Number.isNaN(Number(details)),
            senFieldIsValid:
                field === 'senators' && !Number.isNaN(Number(details)),
            delFieldIsValid:
                field === 'house_delegates' && !Number.isNaN(Number(details)),
            deetsNotInRange: reps =>
                Number(details) > reps.length || Number(details) === 0,
            throwNoDeetsErr: (details, field) => {
                throw new Error(
                    `No Info on subquery: ${details} in field: ${field}`,
                )
            },
        }
    }

    /**
     * Aggregates Single Relational Data Point On State
     * (i.e. specific area/total, senator/senator_id, etc.)
     * @params { promise } knex
     * @params { string } idOrName
     * @ params { string } field
     * @params { string } details
     * returns { object }
     * */
    async grabRelDataByIdWithDeets(knex, idOrName, field, details) {
        const id = await this.grabIdByName(knex, idOrName)
        const state = await this._grabMinStateInfo(knex, id)
        const returnData = []
        let dataAsObj = {}
        const {
            relFieldIsValid,
            relFieldIsInvalid,
            senFieldIsValid,
            delFieldIsValid,
            deetsNotInRange,
            throwNoDeetsErr,
        } = this._deetConditionals(field, details)

        if (relFieldIsValid) {
            const table = `states_${field}`
            const deets = await this._grabDetails(knex, id, details, table)
            dataAsObj = { ...state, ...deets }
        } else if (relFieldIsInvalid) {
            throwNoDeetsErr(details, field)
        } else if (senFieldIsValid) {
            const senators = await this.grabSenatorsById(knex, id)
            if (deetsNotInRange(senators)) throwNoDeetsErr(details, field)
            dataAsObj = { ...state, senator: senators[details - 1] }
        } else if (delFieldIsValid) {
            const delegates = await this.grabDelegatesById(knex, id)
            if (deetsNotInRange(delegates)) throwNoDeetsErr(details, field)
            dataAsObj = {
                ...state,
                house_delegate: delegates[Number(details - 1)],
            }
        } else
            throw Error(
                `No data found for subquery: '${details}' in query: '${idOrName}/${field}'`,
            )
        returnData.push(dataAsObj)
        return returnData
    }
}

module.exports = SingleStateServiceDetails
