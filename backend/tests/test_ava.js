'use strict'
// NOTE: This is just a 'hello world' test file
// to demonstrate using ava/nyc with fastify
// Actual tests will come soonish...
const fastify = require('fastify')
const test = require('ava')
// To see output from nyc, you must require files from
// your main app that you wish to test
// const server = require('../server.js')

const build = (opts = {}) => {
    return fastify(opts).get('/', async (request, reply) => {
        return { hello: 'world' }
    })
}

test('requests the "/" route', async t => {
    t.plan(3)
    const fastify = build()
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

// REFERENCE:
// https://fastify.dev/docs/latest/Guides/Testing
// https://github.com/avajs/ava/tree/main/docs
// https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
