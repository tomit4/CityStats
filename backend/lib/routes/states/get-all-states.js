'use strict'
// TODO: Implement proper error handling (i.e. try, catch, throw)
// TODO: implement Joi validation

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        // NOTE: different route for ALL states
        url: '/states',
        // NOTE: different route for SINGLE states
        // url: '/states/:id',
        // TODO: break out schema appropriately
        // schema: {
        // response: {
        // 200: {
        // type: 'array',
        // properties: [{ state_name: 'string' }],
        // },
        // },
        // },
        handler: async (request, reply) => {
            const { knex, stateService } = fastify
            reply.send(await stateService.grabAllStates(knex))
        },
    })
    done()
}
