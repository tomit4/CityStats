'use strict'
const fp = require('fastify-plugin')
const StatesService = require('./states-services.js')

class ParentStatesService extends StatesService {}
const statesPlugin = (fastify, options, done) => {
    if (!fastify.states) {
        const stateService = new ParentStatesService()
        fastify.decorate('stateService', stateService)
        fastify.addHook('onClose', (fastify, done) => {
            if (fastify.states === stateService) {
                fastify.states.destroy(done)
            }
        })
    }
    done()
}

module.exports = fp(statesPlugin, { name: 'fastify-states-plugin' })
