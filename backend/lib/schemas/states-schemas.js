const joi = require('./joi')

/**
 * Base class for states/single_state schemas
 * JSON Verification For Fastify Routes
 * @constructor { void }
 * returns { object } StatesSchema
 * */
class StatesSchema {
    constructor() {
        this.government = {
            type: 'object',
            properties: {
                governor: joi.object({
                    governor_name: joi.string(),
                    img_url: joi.string(),
                }),
                senators: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            senator_name: joi.string(),
                            img_url: joi.string(),
                        },
                    },
                },
                house_delegates: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            delegate_name: joi.string(),
                            img_url: joi.string(),
                        },
                    },
                },
            },
        }
        this.singleState = {
            type: 'object',
            required: [
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
                'area',
                'population',
                'government',
            ],
            properties: {
                id: joi.number(),
                state_name: joi.string(),
                state_abbreviation: joi.string(),
                date_admitted: joi.string(),
                capital: joi.string(),
                largest_city: joi.string(),
                elevation: joi.string(),
                time_zone: joi.string(),
                latitude: joi.string(),
                longitude: joi.string(),
                url: joi.string(),
                flag_url: joi.string(),
                insignia_url: joi.string(),
                area: joi.object({
                    total: joi.string(),
                    land: { type: 'string', nullable: true },
                    water: { type: 'string', nullable: true },
                }),
                population: joi.object({
                    total: joi.string(),
                    density: joi.string(),
                    median_household_income: joi.string(),
                }),
                government: this.government,
            },
        }
        this.singleStateWithField = {
            type: 'object',
            required: ['id', 'state_name', 'state_abbreviation'],
            properties: {
                ...this.singleState.properties,
                government: this.government,
            },
        }
    }
}

module.exports = new StatesSchema()
