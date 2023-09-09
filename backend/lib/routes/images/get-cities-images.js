'use strict'

// TODO: copy for /images/states route as well
module.exports = async (fastify, options, done) => {
    await fastify.route({
        method: 'GET',
        url: '/images/cities/:id/:govBody/:imageId?',

        // url: '/images/cities/:id/:body/:imageId?',
        // body can be mayor, city_council, or img (image of city)

        // QUESTION: needs schema?
        handler: async (request, reply) => {
            // TODO: Possibly put logic into service files
            // TODO: refactor for custom error message??
            // TODO: use knex to grab stateId by Name?
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
            }
            return reply.sendFile(imgPath)
        },
    })
    done()
}
