'use strict'
const logOpts = require('./lib/plugins/logger')
const fastify = require('fastify')({ logger: logOpts })
require('dotenv').config()
const registerPlugins = require('./lib/plugins')
const registerServices = require('./lib/services')
const registerRoutes = require('./lib/routes')
const assignSchemas = require('./lib/schemas')

const start = async () => {
    try {
        await registerPlugins(fastify)
        await registerServices(fastify)
        await registerRoutes(fastify)
        assignSchemas(fastify)
        fastify.after(() => {
            fastify.gracefulShutdown((signal, next) => {
                next()
            })
        })
        await fastify.ready()
        fastify.swagger()
        fastify.listen({ port: process.env.PORT || 6969, host: '::' })
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()
