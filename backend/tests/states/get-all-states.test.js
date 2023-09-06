'use strict'
const fastify = require('fastify')()
const test = require('ava')
const fp = require('fastify-plugin')
const { stub } = require('sinon')
const StatesService = require('../../lib/services/states/states-services')

const statesPlugin = (fastify, options, done) => {
    if (!fastify.states) {
        const stateService = new StatesService()
        fastify.decorate('stateService', stateService)
    }
    done()
}

const registerPlugin = async fastify => {
    const plugin = fp(statesPlugin, { name: 'fastify-states-plugin' })
    await fastify.register(plugin)
}

const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/',
            handler: async (request, reply) => {
                await reply.send({ hello: 'world' })
            },
        })
    }
    fastify.register(newRoute)
}

// Example Sinon stub to be expanded upon
// and used with our registered StatesService
// https://sinonjs.org/releases/v15/stubs/
const other = stub({ returnHello: 'world' }, 'returnHello').returns({
    hello: 'world',
})()
console.log('other :=>', other) // { hello: 'world' }

test('requests the "/" route', async t => {
    t.plan(3)
    await registerPlugin(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/',
    })

    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, '{"hello":"world"}')
    await fastify.close()
})
