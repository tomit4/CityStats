'use strict'
const fp = require('fastify-plugin')
const knexFile = require('../knexfile').development
const knex = require('knex')(knexFile)
const StatesService = require('../lib/services/states/states-services')

const statesPlugin = (fastify, options, done) => {
    if (!fastify.states) {
        const stateService = new StatesService()
        fastify.decorate('stateService', stateService)
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
    const statePlug = fp(statesPlugin, { name: 'fastify-states-plugin' })
    const knexPlug = fp(knexPlugin, { name: 'fastify-knex-plugin' })
    await fastify.register(statePlug)
    await fastify.register(knexPlug)
}

module.exports = registerPlugins
