/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('states_population', table => {
        table.increments('state_id').primary()
        table.string('total').notNullable()
        table.string('density').notNullable()
        table.string('median_household_income').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('states_population')
}
