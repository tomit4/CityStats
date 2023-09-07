'use strict'
const registerPlugins = require('../../test_utils/state-utils.js')
const fastify = require('fastify')()
const test = require('ava')
const mock = require('../mocks/mock_get-single-state.json')

const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/states/:id',
            handler: async (request, reply) => {
                const { id } = request.params
                const { knex, stateService } = fastify
                reply.send(await stateService.grabSingleStateById(knex, id))
            },
        })
    }
    fastify.register(newRoute)
}

test('requests the /states route with param id of 5', async t => {
    t.plan(3)
    await registerPlugins(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/states/5',
    })

    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, mock)
    await fastify.close()
})
