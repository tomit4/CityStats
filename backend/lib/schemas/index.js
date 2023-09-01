'use strict'
const schemas = require('./states')
// TODO: Provide proper jsdocs style comments here
module.exports = async fastify => {
    for (const key in schemas) {
        const newSchema = Object.assign({}, schemas[key], {
            $id: key,
        })
        fastify.addSchema(newSchema)
    }
}
