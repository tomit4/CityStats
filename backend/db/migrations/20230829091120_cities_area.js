/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cities_area', table => {
        table.increments('city_id').primary()
        table.string('city').notNullable()
        table.string('land').notNullable()
        table.string('water')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cities_area')
}
