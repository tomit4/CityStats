const registerPlugins = async fastify => {
    await fastify.register(require('@fastify/swagger'))
    await fastify.register(require('@fastify/swagger-ui'))
    await fastify.register(require('./knex'))
    await fastify.register(require('../lib/routes/states/get-all-states'))
}

module.exports = registerPlugins
