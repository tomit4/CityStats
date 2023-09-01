'use strict'

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states/:id/:field/:details',
        schema: {
            description:
                'returns a single state entity by id with specified field data and nested data details',
            params: {
                type: 'object',
                required: ['id', 'field', 'details'],
                properties: {
                    id: { type: 'string' },
                    field: { type: 'string' },
                    details: { type: 'string' },
                },
            },
            // response: {
            // 200: { $ref: 'singleStateWithField#/' },
            // },
        },
        handler: async (request, reply) => {
            const { id, field, details } = request.params
            if (!details)
                throw Error('No nested subquery passed within URL string')
            const { knex, singleStateService } = fastify
            if (!singleStateService.relatedFields.includes(field))
                throw Error('Passed subquery is not found in states entity')
            reply.send(
                await singleStateService.grabRelDataByIdWithDeets(
                    knex,
                    id,
                    field,
                    details,
                ),
            )
        },
    })
    done()
}
