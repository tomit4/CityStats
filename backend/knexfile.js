// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'better-sqlite3',
        connection: {
            filename: './db/city_stats.db',
        },
        useNullAsDefault: true,
        migrations: {
            directory: './db/migrations',
        },
        seeds: {
            directory: './db/seeds',
        },
    },
    // staging: {},
    // production: {},
}
