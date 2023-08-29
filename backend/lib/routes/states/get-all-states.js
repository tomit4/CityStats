'use strict'
// TODO: Break Out all Keys into mock, use Object.keys(), etc...
const stateKeys = [
    'id',
    'state_name',
    'state_abbreviation',
    'date_admitted',
    'capital',
    'largest_city',
    'govenor',
    'elevation',
    'time_zone',
    'latitude',
    'longitude',
    'url',
    'flag_url',
    'insignia_url',
]

module.exports = async (fastify, options, done) => {
    const knex = fastify.knex
    await fastify.route({
        method: 'GET',
        url: '/states',
        // TODO: break out schema appropriately
        // schema: {
        // response: {
        // 200: {
        // type: 'array',
        // properties: [{ state_name: 'string' }],
        // },
        // },
        // },
        handler: async (request, reply) => {
            // TODO: Break out all knex statements into services
            const allStates = await knex.select(...stateKeys).from('states')
            const allAreas = await knex
                .select('state_id', 'total', 'land', 'water')
                .from('states_area')
            // TODO: Structure All Data prior to sending (use JS Classes in a service...)
            reply.send({ ...allStates[0], area: { ...allAreas } })
        },
    })
    done()
}
