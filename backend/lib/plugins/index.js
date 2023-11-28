const path = require('node:path')

module.exports = async fastify => {
    await fastify.register(require('@fastify/cors'))
    await fastify.register(require('@fastify/compress'), {
        global: false,
        encodings: ['deflate', 'gzip'],
        customTypes: /image\/.+/,
    })
    await fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, '../images'),
    })
    await fastify.register(require('@fastify/helmet'))
    await fastify.register(require('@fastify/rate-limit'), {
        max: 100,
        timeWindow: '1 minute',
    })
    await fastify.register(require('@fastify/swagger'))
    await fastify.register(require('@fastify/swagger-ui'))
    await fastify.register(require('./knex'))
    await fastify.register(require('fastify-graceful-shutdown'))
}
