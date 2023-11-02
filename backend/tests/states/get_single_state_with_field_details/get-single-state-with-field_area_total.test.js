const registerPlugins = require('../../../test_utils/state-utils')
const fastify = require('fastify')()
const test = require('ava')
const mock = require('../../mocks/states/mock_get-single-state-with-field-details_area_total.json')

const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/states/:id/:field/:details',
            handler: async (request, reply) => {
                const { id, field, details } = request.params
                const { knex, stateService } = fastify
                const payload = await stateService.grabRelDataByIdWithDeets(
                    knex,
                    id,
                    field,
                    details,
                )
                reply.send(payload)
            },
        })
    }
    fastify.register(newRoute)
}

test('requests the /states route with param id of 5 and field of area and details of total', async t => {
    t.plan(3)
    await registerPlugins(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/states/5/area/total',
    })

    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, JSON.stringify(mock))
    await fastify.close()
})
