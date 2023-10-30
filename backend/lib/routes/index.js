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
    await fastify.register(require('./cities/get-cities.js'))
    await fastify.register(require('./cities/get-cities-with-field'))
    await fastify.register(require('./cities/get-cities-with-details'))
    await fastify.register(require('./cities/get-cities-with-query'))
    // Images
    await fastify.register(require('./images/get-cities-images'))
    await fastify.register(require('./images/get-states-images'))
}
