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
            response: {
                200: { $ref: 'singleStateWithField#/properties' },
            },
        },
        handler: async (request, reply) => {
            // TODO: Check if id is state_name and change accordingly...
            const { id, field } = request.params
            if (!field) throw Error('No subquery passed within URL string')
            const { knex, stateService } = fastify
            if (!stateService.fields.includes(field))
                throw Error('Passed subquery is not found in states entity')
            reply.send(await stateService.grabRelDataById(knex, id, field))
        },
    })
    done()
}
