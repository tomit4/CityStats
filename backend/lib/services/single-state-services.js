'use strict'
const fp = require('fastify-plugin')

class SingleStateService {
    constructor() {
        this.allStates = []
        this.singleState = {}
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
        this.relatedFieldObjectKeys = ['area', 'population']
        this.relatedFieldArrayKeys = ['senators', 'house_delegates']
        this.relatedFields = [
            ...this.relatedFieldObjectKeys,
            ...this.relatedFieldArrayKeys,
        ]
        this.fields = [...this.nativeFields, ...this.relatedFields]
    }
    async grabStateById(knex, id) {
        try {
            const state = await knex('states').where('id', id).first()
            return state
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No State Found For Id: ${id}`)
        }
    }
    async grabAreaById(knex, id) {
        try {
            const area = await knex
                .where('state_id', id)
                .select('total', 'land', 'water')
                .from('states_area')
                .first()
            return area
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No Areas Found For Id: ${id}`)
        }
    }
    async grabPopulationById(knex, id) {
        try {
            const population = await knex
                .where('state_id', id)
                .select('total', 'density', 'median_household_income')
                .from('states_population')
                .first()
            return population
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No Populations Found For Id: ${id}`)
        }
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
        try {
            const nativeFieldData = await knex
                .where('id', id)
                .select('id')
                .select('state_name', 'state_abbreviation')
                .select(field)
                .from('states')
                .first()
            return nativeFieldData
        } catch (err) {
            console.error('ERROR :=>', err)
            throw Error(`No data retrieved for field: ${field} at id: ${id}`)
        }
    }
    async grabRelatedFieldData(knex, id, field) {
        const state = await this.grabMinStateInfo(knex, id)
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
    async grabRelDataById(knex, id, field) {
        if (this.nativeFields.includes(field)) {
            return await this.grabNativeFieldData(knex, id, field)
        } else {
            return await this.grabRelatedFieldData(knex, id, field)
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

const singleStatePlugin = (fastify, options, done) => {
    if (!fastify.states) {
        const singleStateService = new SingleStateService()
        fastify.decorate('singleStateService', singleStateService)
        fastify.addHook('onClose', (fastify, done) => {
            if (fastify.states === stateService) {
                fastify.states.destroy(done)
            }
        })
    }
    done()
}

module.exports = fp(singleStatePlugin, { name: 'fastify-single-state-plugin' })
