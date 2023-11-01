module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
        schema: {
            description: 'returns all states entities',
            // response: {
            // 200: {
            // type: 'array',
            // items: { $ref: 'singleState#' },
            // },
            // },
        },
        handler: async (request, reply) => {
            const { knex, stateService } = fastify
            reply.send(await stateService.grabAllStates(knex))
        },
    })
    done()
}
