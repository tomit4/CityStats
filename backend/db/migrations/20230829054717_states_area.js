/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('states_area', table => {
        table.increments('state_id').primary()
        table.string('total').notNullable()
        table.string('land').notNullable()
        table.string('water').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('states_area')
}
