'use strict'

module.exports = async fastify => {
    await fastify.register(require('./states-services'))
}
