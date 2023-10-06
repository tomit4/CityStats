'use strict'

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/cities/:id',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
        schema: {
            description: 'returns a city entities by id or name',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string' },
                },
            },
            // TODO: once multiple-cities route/logic is written
            // add multipleCities# schema and uncomment:
            // response: {
            // 200: { $ref: 'singleCity#' },
            // },
        },
        // TODO: in single-city-services.js,
        // we have implemented multiple city returns by same name logic
        // Break this logic out to separate cities/:ids route and figure out how to parse
        // the ids in url (should reply.redirect() from here)
        handler: async (request, reply) => {
            const { id } = request.params
            if (!id) throw Error('No id passed within URL string')
            const { knex, cityService } = fastify
            reply.send(await cityService.grabCitiesById(knex, id))
        },
    })
    done()
}
