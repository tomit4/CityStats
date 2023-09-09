'use strict'

module.exports = async fastify => {
    // States
    await fastify.register(require('./states/get-all-states'))
    await fastify.register(require('./states/get-single-state'))
    await fastify.register(require('./states/get-single-state-with-field'))
    await fastify.register(
        require('./states/get-single-state-with-field-details'),
    )
    // Cities
    await fastify.register(require('./cities/get-all-cities'))
    await fastify.register(require('./cities/get-single-city'))
    await fastify.register(require('./cities/get-single-city-with-field'))
    await fastify.register(
        require('./cities/get-single-city-with-field-details'),
    )
    await fastify.register(
        require('./cities/get-single-city-with-field-details-query'),
    )
    // Images
    await fastify.register(require('./images/get-cities-images'))
}
