'use strict'

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/cities/:id',
        schema: {
            description: 'returns a single city entity by id',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string' },
                },
            },
            response: {
                200: { $ref: 'singleCity#' },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params
            if (!id) throw Error('No id passed within URL string')
            const { knex, cityService } = fastify
            reply.send(await cityService.grabSingleCityById(knex, id))
        },
    })
    done()
}
