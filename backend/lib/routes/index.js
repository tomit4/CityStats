'use strict'
// TODO: Provide proper jsdocs style comments here
module.exports = async fastify => {
    await fastify.register(require('./states/get-all-states'))
    await fastify.register(require('./states/get-single-state'))
}
