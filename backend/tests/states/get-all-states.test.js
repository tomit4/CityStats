const registerPlugins = require('../../test_utils/state-utils')
const fastify = require('fastify')()
const test = require('ava')
const mock = require('../mocks/states/mock_get-all-states.json')

const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/states',
            handler: async (request, reply) => {
                const { knex, stateService } = fastify
                reply.send(await stateService.grabAllStates(knex))
            },
        })
    }
    fastify.register(newRoute)
}

test('requests the /states route', async t => {
    t.plan(3)
    await registerPlugins(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/states',
    })

    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, JSON.stringify(mock))
    await fastify.close()
})
