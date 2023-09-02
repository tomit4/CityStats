'use strict'

module.exports = async fastify => {
    await fastify.register(require('./states/states-services'))
    await fastify.register(require('./cities/cities-services'))
}
