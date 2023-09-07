'use strict'

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/cities',
        schema: {
            description: 'returns all cities entities',
            response: {
                200: {
                    type: 'array',
                    items: { $ref: 'singleCity' },
                },
            },
        },
        handler: async (request, reply) => {
            const { knex, cityService } = fastify
            reply.send(await cityService.grabAllCities(knex))
        },
    })
    done()
}
