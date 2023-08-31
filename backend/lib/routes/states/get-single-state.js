'use strict'

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states/:id',
        schema: {
            description: 'returns a single state entity by id',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string' },
                },
            },
            response: {
                200: { $ref: 'singleState#/response' },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params
            // NOTE: the fact that this throws shows that the
            // required field in params above is broken...
            if (!id) throw Error('No id passed within URL string')
            const { knex, singleStateService } = fastify
            return reply.send(
                await singleStateService.grabSingleStateById(knex, id),
            )
        },
    })
    done()
}
