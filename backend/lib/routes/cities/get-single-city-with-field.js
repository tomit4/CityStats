'use strict'

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/cities/:id/:field',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
        schema: {
            description:
                'returns a single city entity by id with specified field data',
            params: {
                type: 'object',
                required: ['id', 'field'],
                properties: {
                    id: { type: 'string' },
                    field: { type: 'string' },
                },
            },
            response: {
                200: {
                    type: 'array',
                    items: { $ref: 'singleCityWithField#' },
                },
            },
        },
        handler: async (request, reply) => {
            const { id, field } = request.params
            if (!field) throw Error('No subquery passed within URL string')
            const { knex, cityService } = fastify
            if (!cityService.fields.includes(field))
                throw Error(
                    `Passed subquery '${field}' is not found in states entity`,
                )
            reply.send(await cityService.grabRelDataById(knex, id, field))
        },
    })
    done()
}
