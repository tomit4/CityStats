'use strict'
const registerPlugins = require('../../../test_utils/state-utils.js')
const fastify = require('fastify')()
const test = require('ava')
const mock = require('../../mocks/states/mock_get-single-state-with-field_delegates.json')

const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/states/:id/:field',
            handler: async (request, reply) => {
                const { id, field } = request.params
                const { knex, stateService } = fastify
                reply.send(await stateService.grabRelDataById(knex, id, field))
            },
        })
    }
    fastify.register(newRoute)
}

test('requests the /states route with param id of 5 and field of house_delegates', async t => {
    t.plan(3)
    await registerPlugins(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/states/5/house_delegates',
    })

    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, mock)
    await fastify.close()
})
