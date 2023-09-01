'use strict'

module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/states/:id',
        schema: {
            description: 'returns a single state entity by id',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string' },
                },
            },
            response: {
                200: { $ref: 'singleState#' },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params
            if (!id) throw Error('No id passed within URL string')
            // TODO: change so app checks if string is in array of all state names,
            // if it is in the array, grabSingleStateByStateName(knex, id)
            // else error 'Passed URL string is not a USA state name'
            if (isNaN(Number(id)))
                throw Error('Id passed into URL string is not a Number')
            const { knex, stateService } = fastify
            reply.send(await stateService.grabSingleStateById(knex, id))
        },
    })
    done()
}
