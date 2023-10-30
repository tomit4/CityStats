module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/images/states/:id/:govBody/:imageId?',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
        handler: async (request, reply) => {
            // TODO: use knex to grab stateId by Name?
            // TODO: grab id by idOrName method
            // (i.e. images/states/Alabama/senators/1 etc.)
            const { id, govBody, imageId } = request.params
            const folderId = Number(id) < 10 ? `0${id}` : `${id}`
            const imgId = Number(imageId) < 10 ? `0${imageId}` : `${imageId}`
            let imgPath
            if (govBody === 'senators') {
                imgPath = `states/senators/${folderId}/${imgId}.jpg`
            } else if (govBody === 'delegates') {
                imgPath = `states/delegates/${folderId}/${imgId}.jpg`
            } else {
                reply.code(500)
                return new Error(
                    `Governing Body: ${govBody} not acceptable format. Please use senators or delegates as appropriate governing body query string.`,
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
