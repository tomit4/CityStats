module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/images/cities/:id/:govBody/:imageId?',
        decompress: {
            forceRequestEncoding: 'gzip',
        },
        handler: async (request, reply) => {
            const { knex, cityService } = fastify
            const { id, govBody, imageId } = request.params
            const idOrName = await cityService.grabCityIdByName(knex, id)
            let folderId
            let imgPath
            if (Number(idOrName) < 10) {
                folderId = `00${idOrName}`
            } else if (Number(idOrName) < 100) {
                folderId = `0${idOrName}`
            } else {
                folderId = `${idOrName}`
            }
            if (govBody === 'mayor') {
                imgPath = `cities/${folderId}/${folderId}_0.jpg`
            } else if (govBody === 'city_council' && imageId !== '0') {
                imgPath = `cities/${folderId}/${folderId}_${imageId}.jpg`
            } else {
                reply.code(500)
                return new Error(
                    `Governing Body: ${govBody} not acceptable format. Please use mayor or city_council as appropriate governing body query string.`,
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
