'use strict'
// TODO: Provide proper jsdocs style comments here
module.exports = async fastify => {
    await fastify.register(require('@fastify/swagger'))
    await fastify.register(require('@fastify/swagger-ui'))
    await fastify.register(require('./knex'))
    await fastify.register(require('./joi'))
}
