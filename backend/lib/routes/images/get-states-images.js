// TODO: copy for /images/states route as well
module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/images/states/:id/:govBody/:imageId?',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
        handler: async (request, reply) => {
            // TODO: Possibly put logic into service files
            // TODO: refactor for custom error message??
            // TODO: use knex to grab stateId by Name?
            // TODO: grab id by idOrName method
            // (i.e. images/states/Alabama/senators/1 etc.)
            const { id, govBody, imageId } = request.params
            const folderId = Number(id) < 10 ? `0${id}` : `${id}`
            const imgId = Number(imageId) < 10 ? `0${imageId}` : `${imageId}`
            console.log('imgId :=>', imgId)
            const imgPath =
                govBody === 'senators'
                    ? `states/senators/${folderId}/${imgId}.jpg`
                    : `states/delegates/${folderId}/${imgId}.jpg`
            console.log('imgPath :=>', imgPath)
            fastify.log.info(
                `Serving image: ${imgPath}, Compression: ${request.headers['accept-encoding']}`,
            )
            return reply.sendFile(imgPath)
        },
    })
    done()
}
