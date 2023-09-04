/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cities_population', table => {
        table.increments('city_id').primary()
        table.string('city').notNullable()
        table.string('density').notNullable()
        table.string('metro')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cities_population')
}
