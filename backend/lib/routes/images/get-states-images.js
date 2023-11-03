module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/images/states/:id/:govBody/:imageId?',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
        schema: {
            description:
                'returns state government images by city id, governing body, and image id',
            params: {
                type: 'object',
                required: ['id', 'govBody'],
                properties: {
                    id: { type: 'string' },
                    govBody: { type: 'string' },
                },
            },
        },
        handler: async (request, reply) => {
            const { knex, stateService } = fastify
            const { id, govBody, imageId } = request.params
            const idOrName = await stateService.grabIdByName(knex, id)
            const folderId =
                Number(idOrName) < 10 ? `0${idOrName}` : `${idOrName}`
            const imgId = Number(imageId) < 10 ? `0${imageId}` : `${imageId}`
            let imgPath
            if (govBody === 'senators') {
                imgPath = `states/senators/${folderId}/${imgId}.jpg`
            } else if (govBody === 'delegates') {
                imgPath = `states/delegates/${folderId}/${imgId}.jpg`
            } else if (govBody === 'governor') {
                imgPath = `states/governors/${folderId}/governor.jpg`
            } else {
                reply.code(500)
                return new Error(
                    `Governing Body: ${govBody} not acceptable format. Please use senators or delegates or governor as appropriate governing body query string.`,
                )
            }
            fastify.log.info(
                `Serving image: ${imgPath}, Compression: ${request.headers['accept-encoding']}`,
            )
            return reply.sendFile(imgPath)
        },
    })
    done()
}
