module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/images/cities/:id/:govBody/:imageId?',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
        handler: async (request, reply) => {
            // TODO: use knex to grab stateId by Name?
            // TODO: grab id by idOrName method
            // (i.e. images/cities/Abilene/city_council/1 etc.)
            const { id, govBody, imageId } = request.params
            let folderId
            let imgPath
            if (Number(id) < 10) {
                folderId = `00${id}`
            } else if (Number(id) < 100) {
                folderId = `0${id}`
            } else {
                folderId = id
            }
            if (govBody === 'mayor') {
                imgPath = `cities/${folderId}/${folderId}_0.jpg`
            } else if (govBody === 'city_council' && imageId !== '0') {
                imgPath = `cities/${folderId}/${folderId}_${imageId}.jpg`
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
