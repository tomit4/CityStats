'use strict'

const fastify = require('fastify')({ logger: true })
require('dotenv').config()

const registerPlugins = async () => {
    await fastify.register(require('@fastify/swagger'))
    await fastify.register(require('@fastify/swagger-ui'))
    await fastify.register(require('./plugins/knex'))
    await fastify.register(require('./lib/routes/states/get-all-states'))
}

const start = async () => {
    try {
        await registerPlugins()
        await fastify.ready()
        fastify.swagger()
        fastify.listen({ port: process.env.PORT })
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()
