'use strict'
// const fs = require('fs')
const registerPlugins = require('../../test_utils/city-utils')
const fastify = require('fastify')()
const test = require('ava')
const mock = require('../mocks/cities/mock_get-all-cities.json')

const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/cities',
            handler: async (request, reply) => {
                const { knex, cityService } = fastify
                reply.send(await cityService.grabAllCities(knex))
            },
        })
    }
    fastify.register(newRoute)
}

test('requests the /cities route', async t => {
    t.plan(3)
    await registerPlugins(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/cities',
    })
    // fs.writeFileSync(
    // './tests/mocks/cities/mock_get-all-cities.json',
    // JSON.stringify(response.payload),
    // err => {
    // if (err) {
    // throw err
    // }
    // },
    // )
    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, mock)
    await fastify.close()
})
