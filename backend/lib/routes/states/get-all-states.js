'use strict'
// NOTE: Currently sits as very messy code, clean up sooner than later
// TODO: Implement proper error handling (i.e. try, catch, throw)
// TODO: implement Joi validation
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
        // NOTE: different route for ALL states
        // url: '/states',
        // NOTE: different route for SINGLE states
        url: '/states/:id',
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
            const { id } = request.params
            console.log('request.params :=>', request.params)
            // TODO: Break out all knex statements into services
            let allStates = await knex.select(...stateKeys).from('states')

            const allAreas = await knex
                .select('total', 'land', 'water')
                .from('states_area')
            const allPopulations = await knex
                .select('total', 'density', 'median_household_income')
                .from('states_population')

            allStates = allStates.map((state, i) => {
                return {
                    ...state,
                    area: allAreas[i],
                    population: allPopulations[i],
                }
            })

            const allSenators = await knex
                .select('state_id', 'senator_name')
                .from('states_senators')
            const allDelegates = await knex
                .select('state_id', 'delegate_name')
                .from('states_house_delegates')

            // Embarrassing code smell...
            allStates.forEach(state => {
                state.senators = allSenators
                    .map(senator => {
                        if (senator.state_id === state.id) {
                            return senator.senator_name
                        }
                    })
                    .filter(senator => {
                        return senator
                    })
                state.house_delegates = allDelegates
                    .map(delegate => {
                        if (delegate.state_id === state.id) {
                            return delegate.delegate_name
                        }
                    })
                    .filter(delegate => {
                        return delegate
                    })
            })

            reply.send(allStates[id - 1])
        },
    })
    done()
}
