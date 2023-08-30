'use strict'

const factory = require('./lib/plugins/joifactory')
const fastify = require('fastify')({
    logger: true,
    schemaController: {
        compilersFactory: {
            buildValidator: factory.buildValidator,
        },
    },
})
require('dotenv').config()
const registerPlugins = require('./lib/plugins')
const registerServices = require('./lib/services/')
const registerRoutes = require('./lib/routes/')

const start = async () => {
    try {
        await registerPlugins(fastify)
        await registerServices(fastify)
        await registerRoutes(fastify)
        await fastify.ready()
        fastify.swagger()
        fastify.listen({ port: process.env.PORT })
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()
