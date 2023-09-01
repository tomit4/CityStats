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
        const state = await knex('states').where('id', id).first()
        if (!state) throw Error(`No State Found For Id: ${id}`)
        return state
    }
    async grabAreaById(knex, id) {
        const area = await knex
            .where('state_id', id)
            .select('total', 'land', 'water')
            .from('states_area')
            .first()
        if (!area) throw Error(`No Areas Found For Id: ${id}`)
        return area
    }
    async grabPopulationById(knex, id) {
        const population = await knex
            .where('state_id', id)
            .select('total', 'density', 'median_household_income')
            .from('states_population')
            .first()
        if (!population) throw Error(`No Populations Found For Id: ${id}`)
        return population
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
        const nativeFieldData = await knex
            .where('id', id)
            .select('id')
            .select('state_name', 'state_abbreviation')
            .select(field)
            .from('states')
            .first()
        if (!nativeFieldData)
            throw Error(`No data retrieved for field: ${field} at id: ${id}`)
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
        const state = await knex
            .where('id', id)
            .select('id', 'state_name', 'state_abbreviation')
            .from('states')
            .first()
        if (!state) throw Error(`No state info retrieved for id: ${id}`)
        return state
    }
    async grabRelDataById(knex, id, field) {
        if (this.nativeFields.includes(field)) {
            return await this.grabNativeFieldData(knex, id, field)
        } else {
            return await this.grabRelatedFieldData(knex, id, field)
        }
    }
    async grabDetails(knex, id, details, stateField) {
        const deets = await knex
            .where('state_id', id)
            .select(details)
            .from(stateField)
            .first()
        if (!deets)
            throw Error(
                `No detail information found for id: ${id} 
                    in field ${stateField} for details: ${details}`,
            )
        return deets
    }
    async grabRelDataByIdWithDeets(knex, id, field, details) {
        const stateField = `states_${field}`
        const state = await this.grabMinStateInfo(knex, id)

        // Conditional Statements For Parsing Details
        const relFieldIsValid =
            this.relatedFieldObjectKeys.includes(field) &&
            !isNaN(Number(details))
        const relFieldIsInvalid =
            this.relatedFieldObjectKeys.includes(field) &&
            isNaN(Number(details))
        const senFieldIsValid = field === 'senators' && !isNaN(Number(details))
        const delFieldIsValid =
            field === 'house_delegates' && !isNaN(Number(details))

        // Returns either obj or array based off of details followed
        if (relFieldIsValid) {
            const deets = await this.grabDetails(knex, id, details, stateField)
            return { ...state, ...deets }
        } else if (relFieldIsInvalid) {
            throw Error(`No Info on subquery: ${details} in field: ${field}`)
        } else if (senFieldIsValid) {
            const senators = await this.grabSenatorsById(knex, id)
            if (Number(details) > senators.length || Number(details) === 0) {
                throw Error(
                    `No Info on subquery: ${details} in field: ${field}`,
                )
            }
            return { ...state, senator: senators[Number(details - 1)] }
        } else if (delFieldIsValid) {
            const delegates = await this.grabDelegatesById(knex, id)
            if (Number(details) > delegates.length || Number(details) === 0) {
                throw Error(
                    `No Info on subquery: ${details} in field: ${field}`,
                )
            }
            return {
                ...state,
                house_delegate: delegates[Number(details - 1)],
            }
        }
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
