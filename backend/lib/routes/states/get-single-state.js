'use strict'

// TODO: Implement proper error handling (i.e. try, catch, throw)
module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states/:id',
        schema: {
            // TODO: resolve how to use registered singleState shcema here
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string' },
                },
            },
            response: {
                200: { $ref: 'singleState#/response' },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params
            const { knex, stateService } = fastify
            reply.send(await stateService.grabAllStateById(knex, id))
        },
    })
    done()
}
