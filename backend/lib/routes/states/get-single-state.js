'use strict'
// TODO: Implement proper error handling (i.e. try, catch, throw)
// TODO: put schemas in separate route
const responseSchema = {
    type: 'object',
    required: [
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
        'area',
        'population',
        'senators',
        'house_delegates',
    ],
    properties: {
        id: { type: 'number' },
        state_name: { type: 'string' },
        state_abbreviation: { type: 'string' },
        date_admitted: { type: 'string' },
        capital: { type: 'string' },
        largest_city: { type: 'string' },
        govenor: { type: 'string' },
        elevation: { type: 'string' },
        time_zone: { type: 'string' },
        latitude: { type: 'string' },
        longitude: { type: 'string' },
        url: { type: 'string' },
        flag_url: { type: 'string' },
        insignia_url: { type: 'string' },
        area: {
            type: 'object',
            properties: {
                total: { type: 'string' },
                land: { type: 'string' },
                water: { type: 'string' },
            },
        },
        population: {
            type: 'object',
            properties: {
                total: { type: 'string' },
                density: { type: 'string' },
                median_household_income: { type: 'string' },
            },
        },
        senators: {
            type: 'array',
        },
        house_delegates: {
            type: 'array',
        },
    },
}
module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states/:id',
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                },
            },
            response: {
                200: responseSchema,
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params
            const { knex, stateService } = fastify
            reply.send(await stateService.grabAllStateById(knex, id))
        },
    })
    done()
}
