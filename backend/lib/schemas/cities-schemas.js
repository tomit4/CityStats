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
                state_name: { type: 'string', nullable: true },
                coordinates: joi.string(),
                settled_founded: { type: 'string', nullable: true },
                incorporated: { type: 'string', nullable: true },
                elevation: joi.string(),
                time_zone: joi.string(),
                fips_code: { type: 'string', nullable: true },
                url: joi.string(),
                counties: joi.array(),
                government: joi.object({
                    type: { type: 'string', nullable: true },
                    mayor: joi.string(),
                    img_url: { type: 'string', nullable: true },
                    city_council: { type: 'array' },
                }),
                area: joi.object({
                    city: joi.string(),
                    land: joi.string(),
                    water: { type: 'string', nullable: true },
                }),
                population: joi.object({
                    city: joi.string(),
                    density: joi.string(),
                    metro: { type: 'string', nullable: true },
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
                council_member: {
                    type: 'object',
                    properties: {
                        council_member: { type: 'string' },
                        img_url: { type: 'string', nullable: true },
                    },
                },
                img_url: joi.string(),
            },
        }
    }
}

module.exports = new CitiesSchema()
