/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_government_council').del()
    await knex('cities_government_council').insert([
        { city_id: 1, council_member: 'Shane Price' },
        { city_id: 1, council_member: 'Lynn Beard' },
        { city_id: 1, council_member: 'Donna Albus' },
        { city_id: 1, council_member: 'Weldon W. Hurt' },
        { city_id: 1, council_member: 'Kyle McAlister' },
        { city_id: 1, council_member: 'Travis Craver' },
    ])
}
