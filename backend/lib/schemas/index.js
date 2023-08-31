'use strict'
// TODO: Provide proper jsdocs style comments here
module.exports = async fastify => {
    Object.entries(require('./states')).forEach(async entry => {
        await fastify.addSchema({
            $id: entry[0],
            ...entry[1],
        })
    })
}
