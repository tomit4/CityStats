'use strict'
const joi = require('./joi')

class StatesSchema {
    constructor() {
        this.singleState = {
            response: {
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
            },
        }
    }
}

module.exports = new StatesSchema()
