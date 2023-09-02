'use strict'
const fp = require('fastify-plugin')

/** Finalized Full Class for new City Object
 * @constructor
 * returns { CityService }
 * */
class CityService {
    constructor() {
        this.allCities = []
    }
    async _grabAllCitiesInfo(knex) {
        const allCities = await knex('cities')
        if (!allCities) throw Error('No Cities Table Found')
        this.allCities = allCities
    }
    async grabAllCities(knex) {
        await this._grabAllCitiesInfo(knex)
        return this.allCities
    }
}

const citiesPlugin = (fastify, options, done) => {
    if (!fastify.cities) {
        const cityService = new CityService()
        fastify.decorate('cityService', cityService)
        fastify.addHook('onClose', (fastify, done) => {
            if (fastify.cities === cityService) {
                fastify.cities.destroy(done)
            }
        })
    }
    done()
}

module.exports = fp(citiesPlugin, { name: 'fastify-cities-plugin' })
