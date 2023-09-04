'use strict'

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/cities/:id/:field/:details/:query',
        schema: {
            description:
                'returns a single city entity by id with specified field data and nested data details and specific subquery',
            params: {
                type: 'object',
                required: ['id', 'field', 'details', 'query'],
                properties: {
                    id: { type: 'string' },
                    field: { type: 'string' },
                    details: { type: 'string' },
                    query: { type: 'string' },
                },
            },
            response: {
                200: { $ref: 'singleCityWithField#' },
            },
        },
        handler: async (request, reply) => {
            const { id, field, details, query } = request.params
            const { knex, cityService } = fastify
            if (!cityService.relatedFields.includes(field))
                throw Error(
                    `Passed field '${field}' is not found in cities entity`,
                )
            if (!cityService.fieldWithNested.includes(field)) {
                throw Error(`Passed details ${details} do not hold nested data`)
            }
            if (!query) throw Error('No nested query passed within URL string')
            reply.send(
                await cityService.grabSingleCouncilMember(knex, id, query),
            )
        },
    })
    done()
}
