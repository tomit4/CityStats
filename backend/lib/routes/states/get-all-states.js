'use strict'

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states',
        schema: {
            description: 'returns all states entities',
            response: {
                200: {
                    type: 'array',
                    items: { $ref: 'singleState#' },
                },
            },
        },
        handler: async (request, reply) => {
            const { knex, stateService } = fastify
            return reply.send(await stateService.grabAllStates(knex))
        },
    })
    done()
}
