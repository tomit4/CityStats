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
        { city_id: 2, council_member: 'Nancy Holland' },
        { city_id: 2, council_member: 'Phil Lombardo' },
        { city_id: 2, council_member: 'Margo Sommerville' },
        { city_id: 2, council_member: 'Russel C. Neal, Jr.' },
        { city_id: 2, council_member: 'Tara Mosley' },
        { city_id: 2, council_member: 'Brad McKitrick' },
        { city_id: 2, council_member: 'Donnie Kammer' },
        { city_id: 2, council_member: 'Shammas Malik' },
        { city_id: 2, council_member: 'Mike Freeman' },
        { city_id: 2, council_member: 'Sharon Connor' },
        { city_id: 2, council_member: 'Jeff Fusco' },
        { city_id: 2, council_member: 'Linda F.R. Omobien' },
        { city_id: 2, council_member: 'Ginger Baylor' },
    ])
}
