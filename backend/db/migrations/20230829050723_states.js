/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('states', table => {
        table.increments().primary()
        table.string('state_name').notNullable()
        table.string('state_abbreviation', 2).notNullable()
        table.string('date_admitted').notNullable()
        table.string('capital').notNullable()
        table.string('largest_city').notNullable()
        table.string('governor').notNullable()
        table.string('elevation').notNullable()
        table.string('time_zone').notNullable()
        table.string('latitude').notNullable()
        table.string('longitude').notNullable()
        table.string('url').notNullable()
        table.string('flag_url').notNullable()
        table.string('insignia_url').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('states')
}
