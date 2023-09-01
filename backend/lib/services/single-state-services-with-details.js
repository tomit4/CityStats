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
    async grabSenatorsById(knex, id) {
        try {
            const senators = await knex
                .where('state_id', id)
                .select('senator_name')
                .from('states_senators')
            return senators.map(senator => senator.senator_name)
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No Senators Found For Id: ${id}`)
        }
    }
    async grabDelegatesById(knex, id) {
        try {
            const delegates = await knex
                .where('state_id', id)
                .select('delegate_name')
                .from('states_house_delegates')
            return delegates.map(delegate => delegate.delegate_name)
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No Delegates Found For Id: ${id}`)
        }
    }
    async grabMinStateInfo(knex, id) {
        try {
            const state = await knex
                .where('id', id)
                .select('id', 'state_name', 'state_abbreviation')
                .from('states')
                .first()
            return state
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No state info retrieved for id: ${id}`)
        }
    }
    // NOTE: Possibly extend this into its on subclass...
    async grabDetails(knex, id, details, table) {
        const field = table.split('_').pop()
        const deets = {}
        try {
            deets[field] = await knex
                .where('state_id', id)
                .select(details)
                .from(table)
                .first()
            return deets
        } catch (err) {
            console.error('ERROR :=>', err)
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
    async grabRelDataByIdWithDeets(knex, id, field, details) {
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
            return { ...state, senator: senators[Number(details - 1)] }
        } else if (delFieldIsValid) {
            const delegates = await this.grabDelegatesById(knex, id)
            if (deetsNotInRange(delegates)) throwNoDeetsErr(details, field)
            return {
                ...state,
                house_delegate: delegates[Number(details - 1)],
            }
        } else throw Error('All conditionals for field subquery failed')
    }
}

module.exports = SingleStateServiceDetails
