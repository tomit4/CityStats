const registerPlugins = require('../../test_utils/city-utils')
const fastify = require('fastify')()
const test = require('ava')
const mock = require('../mocks/cities/mock_get-single-city-with-field-government-type.json')

const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/cities/:id/:field/:details',
            handler: async (request, reply) => {
                const { id, field, details } = request.params
                const { knex, cityService } = fastify
                const returnVal = await cityService.grabRelDataByIdWithDeets(
                    knex,
                    id,
                    field,
                    details,
                )
                return returnVal
            },
        })
    }
    fastify.register(newRoute)
}

test('requests the /cities route with param id of 252 and field of government and details of type', async t => {
    t.plan(3)
    await registerPlugins(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/cities/252/government/type',
    })

    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, mock)
    await fastify.close()
})
