'use strict'

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states/:id/:field',
        schema: {
            description:
                'returns a single state entity by id with specified field data',
            params: {
                type: 'object',
                required: ['id', 'field'],
                properties: {
                    id: { type: 'string' },
                    field: { type: 'string' },
                },
            },
            // TODO: Establish appropriate schema
            // response: {
            // 200: { $ref: 'singleState#/response' },
            // },
        },
        handler: async (request, reply) => {
            const { id, field } = request.params
            // NOTE: the fact that this throws shows that the
            // required field in params above is broken...
            if (!field) throw Error('No subquery passed within URL string')
            const { knex, singleStateService } = fastify
            if (!singleStateService.fields.includes(field))
                throw Error('Passed subquery is not found in states entity')
            reply.send(
                await singleStateService.grabRelDataById(knex, id, field),
            )
        },
    })
    done()
}
