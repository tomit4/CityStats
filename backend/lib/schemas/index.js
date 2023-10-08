const statesSchemas = require('./states-schemas')
const citiesSchemas = require('./cities-schemas')
const schemas = { ...statesSchemas, ...citiesSchemas }
module.exports = fastify => {
    for (const key in schemas) {
        const newSchema = Object.assign({}, schemas[key], {
            $id: key,
        })
        fastify.addSchema(newSchema)
    }
}
