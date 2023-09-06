const fp = require('fastify-plugin')
const CityService = require('./cities-services')

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
