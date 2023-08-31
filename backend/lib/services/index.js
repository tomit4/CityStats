'use strict'
module.exports = async fastify => {
    await fastify.register(require('./states-services'))
    await fastify.register(require('./single-state-services'))
}
