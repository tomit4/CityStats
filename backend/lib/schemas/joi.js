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
    array: () => {
        return { type: 'array' }
    },
    bool: () => {
        return { type: 'boolean' }
    },
}
