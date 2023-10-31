module.exports = {
    string: () => {
        return { type: 'string' }
    },
    number: () => {
        return { type: 'number' }
    },
    object: args => {
        return { type: 'object', properties: { ...args } }
    },
    array: (nullable = false) => {
        return { type: 'array', nullable: nullable }
    },
    bool: () => {
        return { type: 'boolean' }
    },
}
