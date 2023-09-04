'use strict'

module.exports = async fastify => {
    await fastify.register(require('./states/get-all-states'))
    await fastify.register(require('./states/get-single-state'))
    await fastify.register(require('./states/get-single-state-with-field'))
    await fastify.register(
        require('./states/get-single-state-with-field-details'),
    )
    await fastify.register(require('./cities/get-all-cities'))
    await fastify.register(require('./cities/get-single-city'))
    await fastify.register(require('./cities/get-single-city-with-field'))
}
