module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states/:id/:field/:details/:subdeets?',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
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
            // 200: {
            // type: 'array',
            // items: { $ref: 'singleStateWithField#' },
            // },
            // },
        },
        handler: async (request, reply) => {
            const { id, field, details, subdeets } = request.params
            if (!details)
                throw Error('No nested details passed within URL string')
            const { knex, stateService } = fastify
            if (!stateService.relatedFields.includes(field))
                throw Error('Passed field is not found in states entity')
            reply.send(
                await stateService.grabRelDataByIdWithDeets(
                    knex,
                    id,
                    field,
                    details,
                    subdeets,
                ),
            )
        },
    })
    done()
}
