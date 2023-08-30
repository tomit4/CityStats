'use strict'
// TODO: implement Joi validation
// ERROR: Currently receiving isFluentSchema error, see following to troubleshoot:
// https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#schema-validator
// https://www.nearform.com/blog/validate-the-fastify-input-with-joi/
// https://github.com/Eomm/joi-compiler

module.exports = async (fastify, options, done) => {
    const Joi = fastify.joi
    await fastify.route({
        method: 'GET',
        url: '/test',
        schema: {
            // params: {
            // type: 'object',
            // properties: {
            // id: { type: 'string' },
            // },
            // },
            response: Joi.object({
                test: Joi.string(),
            }),
        },
        handler: async (request, reply) => {
            reply.send({ test: 'test' })
        },
    })
    done()
}
