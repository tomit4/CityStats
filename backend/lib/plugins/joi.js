'use strict'
const fp = require('fastify-plugin')
const factory = require('./joifactory.js')

const joiPlugin = (fastify, options, done) => {
    if (!fastify.joi) {
        fastify.decorate('joi', factory.joi)
        fastify.addHook('onClose', (fastify, done) => {
            if (fastify.joi === factory.joi) {
                fastify.joi.destroy(done)
            }
        })
    }
    done()
}

module.exports = fp(joiPlugin, { name: 'fastify-joi-plugin' })
