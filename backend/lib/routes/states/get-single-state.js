module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states/:id',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
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
                200: {
                    type: 'array',
                    items: { $ref: 'singleState#' },
                },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params
            if (!id) throw Error('No id passed within URL string')
            const { knex, stateService } = fastify
            reply.send(await stateService.grabSingleStateById(knex, id))
        },
    })
    done()
}
