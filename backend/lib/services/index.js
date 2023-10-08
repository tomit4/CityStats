module.exports = async fastify => {
    await fastify.register(require('./states/'))
    await fastify.register(require('./cities/'))
}
