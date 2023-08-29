/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('states', table => {
        table.increments()
        table.string('state_name')
        table.string('state_abbreviation', 2)
        table.string('date_admitted')
        table.string('capital')
        table.string('largest_city')
        table.string('govenor')
        table.string('elevation')
        table.string('time_zone')
        table.string('latitude')
        table.string('longitude')
        table.string('url')
        table.string('flag_url')
        table.string('insignia_url')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('states')
}
