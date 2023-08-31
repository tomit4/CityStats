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
                    items: { $ref: 'singleState#/response' },
                },
            },
        },
        handler: async (request, reply) => {
            const { knex, stateService } = fastify
            reply.send(await stateService.grabAllStates(knex))
        },
    })
    done()
}
