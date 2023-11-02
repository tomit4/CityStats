const registerPlugins = require('../../../test_utils/state-utils')
const fastify = require('fastify')()
const test = require('ava')
const mock = require('../../mocks/states/mock_get-single-state-with-field_senators.json')
const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/states/:id/:field/:details/:subdeets?',
            handler: async (request, reply) => {
                const { id, field, details, subdeets } = request.params
                const { knex, stateService } = fastify
                reply.send(
                    await stateService.grabRelDataByIdWithDeets(
                        knex,
                        id,
                        field,
                        details,
                        subdeets,
                    ),
                )
            },
        })
    }
    fastify.register(newRoute)
}

test('requests the /states route with param id of 5 and field of senators', async t => {
    t.plan(3)
    await registerPlugins(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/states/5/government/senators',
    })

    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, JSON.stringify(mock))
    await fastify.close()
})
