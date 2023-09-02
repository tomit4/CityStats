'use strict'
const schemas = require('./states')

module.exports = fastify => {
    for (const key in schemas) {
        const newSchema = Object.assign({}, schemas[key], {
            $id: key,
        })
        fastify.addSchema(newSchema)
    }
}
