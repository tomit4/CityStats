'use strict'

class SingleStateServiceDetails {
    constructor() {
        this.relatedFieldObjectKeys = ['area', 'population']
        this.relatedFieldArrayKeys = ['senators', 'house_delegates']
        this.relatedFields = [
            ...this.relatedFieldObjectKeys,
            ...this.relatedFieldArrayKeys,
        ]
    }
    async grabAllStateNames(knex) {
        const allStateNames = await knex.select('state_name').from('states')
        if (!allStateNames)
            throw Error('Failure to retrieve all State Names from DB')
        return allStateNames.map(state => state.state_name)
    }
    async grabStateIdByname(knex, name) {
        const stateId = (
            await knex('states').select('id').where('state_name', name).first()
        ).id
        if (!stateId) throw Error(`No State Id Found By Name: ${name}`)
        return stateId
    }
    async grabIdByName(knex, idOrName) {
        let id
        if (isNaN(Number(idOrName))) {
            const allStateNames = await this.grabAllStateNames(knex)
            if (allStateNames.includes(idOrName)) {
                id = await this.grabStateIdByname(knex, idOrName)
            } else throw Error(`No State Found by Name: ${idOrName}`)
        } else {
            id = idOrName
        }
        return id
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
    async grabMinStateInfo(knex, id) {
        const state = await knex
            .where('id', id)
            .select('id', 'state_name', 'state_abbreviation')
            .from('states')
            .first()
        if (!state) throw Error(`No state info retrieved for id: ${id}`)
        return state
    }
    async grabDetails(knex, id, details, table) {
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
    deetConditionals(field, details) {
        return {
            relFieldIsValid:
                this.relatedFieldObjectKeys.includes(field) &&
                isNaN(Number(details)),
            relFieldIsInvalid:
                this.relatedFieldObjectKeys.includes(field) &&
                !isNaN(Number(details)),
            senFieldIsValid: field === 'senators' && !isNaN(Number(details)),
            delFieldIsValid:
                field === 'house_delegates' && !isNaN(Number(details)),
            deetsNotInRange: reps =>
                Number(details) > reps.length || Number(details) === 0,
            throwNoDeetsErr: (details, field) => {
                throw new Error(
                    `No Info on subquery: ${details} in field: ${field}`,
                )
            },
        }
    }
    // NOTE: Somewhat smelly code here, but does what it's supposed to.
    async grabRelDataByIdWithDeets(knex, idOrName, field, details) {
        const id = await this.grabIdByName(knex, idOrName)
        const state = await this.grabMinStateInfo(knex, id)
        // Grabs Conditionals
        const {
            relFieldIsValid,
            relFieldIsInvalid,
            senFieldIsValid,
            delFieldIsValid,
            deetsNotInRange,
            throwNoDeetsErr,
        } = this.deetConditionals(field, details)

        // Returns either obj or array based off of details passed
        if (relFieldIsValid) {
            const table = `states_${field}`
            const deets = await this.grabDetails(knex, id, details, table)
            return { ...state, ...deets }
        } else if (relFieldIsInvalid) {
            throwNoDeetsErr(details, field)
        } else if (senFieldIsValid) {
            const senators = await this.grabSenatorsById(knex, id)
            if (deetsNotInRange(senators)) throwNoDeetsErr(details, field)
            return { ...state, senator: senators[details - 1] }
        } else if (delFieldIsValid) {
            const delegates = await this.grabDelegatesById(knex, id)
            if (deetsNotInRange(delegates)) throwNoDeetsErr(details, field)
            return {
                ...state,
                house_delegate: delegates[Number(details - 1)],
            }
        } else
            throw Error(
                `No data found for subquery: '${details}' in query: '${idOrName}/${field}'`,
            )
    }
}

module.exports = SingleStateServiceDetails
