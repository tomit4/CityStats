module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/cities/:id',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
        schema: {
            description: 'returns a city entities by id or name',
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
            const { knex, cityService } = fastify
            reply.send(await cityService.grabCitiesById(knex, id))
        },
    })
    done()
}
