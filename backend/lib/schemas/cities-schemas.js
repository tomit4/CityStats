'use strict'
const joi = require('./joi')

/**
 * Base class for cities/single_city schemas
 * JSON Verification For Fastify Routes
 * @constructor { void }
 * returns { object } CitiesSchema
 * */
class CitiesSchema {
    constructor() {
        this.singleCity = {
            type: 'object',
            required: [
                'id',
                'city_name',
                'state_name',
                'coordinates',
                'settled_founded',
                'incorporated',
                'elevation',
                'time_zone',
                'fips_code',
                'url',
                'counties',
                'government',
                'area',
                'population',
                'zip_codes',
                'area_codes',
                'gnis_feature_ids',
            ],
            properties: {
                id: joi.number(),
                city_name: joi.string(),
                state_name: joi.string(),
                coordinates: joi.string(),
                settled_founded: joi.string(),
                incorporated: joi.string(),
                elevation: joi.string(),
                time_zone: joi.string(),
                fips_code: joi.string(),
                url: joi.string(),
                counties: joi.array(),
                government: joi.object({
                    type: joi.string(),
                    mayor: joi.string(),
                    city_council: joi.array(),
                }),
                area: joi.object({
                    city: joi.string(),
                    land: joi.string(),
                    water: joi.string(),
                }),
                population: joi.object({
                    city: joi.string(),
                    density: joi.string(),
                    metro: joi.string(),
                }),
                zip_codes: joi.array(),
                area_codes: joi.array(),
                gnis_feature_ids: joi.array(),
            },
        }
        this.singleCityWithField = {
            type: 'object',
            required: ['id', 'city_name', 'state_name'],
            properties: {
                ...this.singleCity.properties,
                city_council: joi.array(),
                council_member: joi.string(),
            },
        }
    }
}

module.exports = new CitiesSchema()
