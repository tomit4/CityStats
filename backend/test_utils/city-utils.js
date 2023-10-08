const fp = require('fastify-plugin')
const knexFile = require('../knexfile').development
const knex = require('knex')(knexFile)
const CityService = require('../lib/services/cities/cities-services')

const cityPlugin = (fastify, options, done) => {
    if (!fastify.states) {
        const cityService = new CityService()
        fastify.decorate('cityService', cityService)
    }
    done()
}

const knexPlugin = (fastify, options, done) => {
    if (!fastify.knex) {
        fastify.decorate('knex', knex)
    }
    done()
}

const registerPlugins = async fastify => {
    const cityPlug = fp(cityPlugin, { name: 'fastify-cities-plugin' })
    const knexPlug = fp(knexPlugin, { name: 'fastify-knex-plugin' })
    await fastify.register(cityPlug)
    await fastify.register(knexPlug)
}

module.exports = registerPlugins
