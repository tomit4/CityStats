'use strict'
// const fs = require('fs')
const fastify = require('fastify')()
const test = require('ava')
const fp = require('fastify-plugin')
const knexFile = require('../../../knexfile').development
const knex = require('knex')(knexFile)
const StatesService = require('../../../lib/services/states/states-services')
const mock = require('../../mocks/mock_get-single-state-with-field-details_senators_1.json')

const statesPlugin = (fastify, options, done) => {
    if (!fastify.states) {
        const stateService = new StatesService()
        fastify.decorate('stateService', stateService)
    }
    done()
}

const knexPlugin = (fastify, options, done) => {
    if (!fastify.knex) {
        fastify.decorate('knex', knex)
    }
    done()
}

const registerPlugins = async fastify => {
    const statePlug = fp(statesPlugin, { name: 'fastify-states-plugin' })
    const knexPlug = fp(knexPlugin, { name: 'fastify-knex-plugin' })
    await fastify.register(statePlug)
    await fastify.register(knexPlug)
}

const registerRoute = async fastify => {
    const newRoute = async fastify => {
        await fastify.route({
            method: 'GET',
            url: '/states/:id/:field/:details',
            handler: async (request, reply) => {
                const { id, field, details } = request.params
                const { knex, stateService } = fastify
                const payload = await stateService.grabRelDataByIdWithDeets(
                    knex,
                    id,
                    field,
                    details,
                )
                reply.send(payload)
            },
        })
    }
    fastify.register(newRoute)
}

test('requests the /states route with param id of 5 and field of senators and details of 1', async t => {
    t.plan(3)
    await registerPlugins(fastify)
    await registerRoute(fastify)
    await fastify.listen()
    await fastify.ready()

    const response = await fastify.inject({
        method: 'GET',
        url: '/states/5/senators/1',
    })

    // fs.writeFileSync(
    // './tests/mocks/mock_get-single-state-with-field-details_senators_1.json',
    // JSON.stringify(response.payload),
    // err => {
    // if (err) throw err
    // },
    // )

    t.is(response.statusCode, 200)
    t.is(response.headers['content-type'], 'application/json; charset=utf-8')
    t.is(response.payload, mock)
    await fastify.close()
})
