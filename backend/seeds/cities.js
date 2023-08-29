/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities').del()
    await knex('cities').insert([
        {
            state_id: 42,
            city_name: 'Abilene',
            state_name: 'Texas',
            coordinates: '32°27′N 99°45′W',
            settled_founded: '1881',
            incorporated: '1881',
            elevation: '1719 ft',
            time_zone: 'UTC-6 (CST)',
            fips_code: '48-01000',
            url: 'https://www.abilenetx.gov/',
        },
    ])
}
