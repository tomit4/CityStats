'use strict'
// TODO: Implement proper error handling (i.e. try, catch, throw)

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states',
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
