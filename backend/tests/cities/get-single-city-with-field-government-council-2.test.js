'use strict'
const registerPlugins = require('../../test_utils/city-utils')
const fastify = require('fastify')()
const test = require('ava')
const mock = require('../mocks/cities/mock_get-single-city-with-field-government-council-2.json')

const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/cities/:id/:field/:details/:query',
            handler: async (request, reply) => {
                const { id, field, details, query } = request.params
                const { knex, cityService } = fastify
                reply.send(
                    await cityService.grabSingleCouncilMember(knex, id, query),
                )
            },
        })
    }
    fastify.register(newRoute)
}

test('requests the /cities route with param id of 252 and field of government and details of council and sub of 2', async t => {
    t.plan(3)
    await registerPlugins(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/cities/252/government/city_council/2',
    })

    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, mock)
    await fastify.close()
})
