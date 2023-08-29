/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cities', table => {
        table.increments()
        table.integer('state_id')
        table.string('city_name')
        table.string('state_name')
        table.string('coordinates')
        table.string('settled_founded')
        table.string('incorporated')
        table.string('elevation')
        table.string('time_zone')
        table.string('fips_code')
        table.string('url')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cities')
}
