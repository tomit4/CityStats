'use strict'
const registerPlugins = require('../../test_utils/city-utils')
const fastify = require('fastify')()
const test = require('ava')
const mock = require('../mocks/cities/mock_get-single-city-by-id.json')

const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/cities/:id',
            handler: async (request, reply) => {
                const { id } = request.params
                const { knex, cityService } = fastify
                reply.send(await cityService.grabSingleCityById(knex, id))
            },
        })
    }
    fastify.register(newRoute)
}

test('requests the /cities route with param id of 252', async t => {
    t.plan(3)
    await registerPlugins(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/cities/252',
    })

    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, mock)
    await fastify.close()
})
