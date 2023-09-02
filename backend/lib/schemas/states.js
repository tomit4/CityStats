'use strict'
const joi = require('./joi')

/**
 * Base class for states/single_state schemas
 * JSON Verification For Fastify Routes
 * @constructor { void }
 * returns { object } StatesSchema
 * */
class StatesSchema {
    constructor() {
        this.singleState = {
            type: 'object',
            required: [
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
                'area',
                'population',
                'senators',
                'house_delegates',
            ],
            properties: {
                id: joi.number(),
                state_name: joi.string(),
                state_abbreviation: joi.string(),
                date_admitted: joi.string(),
                capital: joi.string(),
                largest_city: joi.string(),
                govenor: joi.string(),
                elevation: joi.string(),
                time_zone: joi.string(),
                latitude: joi.string(),
                longitude: joi.string(),
                url: joi.string(),
                flag_url: joi.string(),
                insignia_url: joi.string(),
                area: joi.object({
                    total: joi.string(),
                    land: joi.string(),
                    water: joi.string(),
                }),
                population: joi.object({
                    total: joi.string(),
                    density: joi.string(),
                    median_household_income: joi.string(),
                }),
                senators: joi.array(),
                house_delegates: joi.array(),
            },
        }
        this.singleStateWithField = {
            type: 'object',
            required: ['id', 'state_name', 'state_abbreviation'],
            properties: {
                ...this.singleState.properties,
                senator: joi.string(),
                house_delegate: joi.string(),
            },
        }
    }
}

module.exports = new StatesSchema()
