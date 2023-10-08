const fp = require('fastify-plugin')
const knexFile = require('../../knexfile').development
const knex = require('knex')(knexFile)

const knexPlugin = (fastify, options, done) => {
    if (!fastify.knex) {
        fastify.decorate('knex', knex)
        fastify.addHook('onClose', (fastify, done) => {
            if (fastify.knex === knex) {
                fastify.knex.destroy(done)
            }
        })
    }
    done()
}

module.exports = fp(knexPlugin, { name: 'fastify-knex-plugin' })
