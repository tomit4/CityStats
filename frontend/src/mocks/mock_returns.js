const mockReturns = {
    singleState: {
        stateUrlStringIdOne: [
            {
                id: 1,
                state_name: 'Alabama',
                state_abbreviation: 'AL',
                date_admitted: '1819-12-14T00:00:00.000Z',
                capital: 'Montgomery',
                largest_city: 'Huntsville',
                elevation: '500 ft',
                time_zone: 'UTC-6(CST)',
                latitude: "30°11' N to 35° N",
                longitude: "84°53' W to 88°28' W",
                url: 'https://www.alabama.gov/',
                flag_url:
                    'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Alabama.svg',
                insignia_url:
                    'https://upload.wikimedia.org/wikipedia/commons/f/f7/Seal_of_Alabama.svg',
                area: {
                    total: '52419 sq mi',
                    land: '50744 sq mi',
                    water: '1675 sq mi',
                },
                population: {
                    total: '5039877',
                    density: '99.1/sq mi',
                    median_household_income: '$52000',
                },
                government: {
                    governor: {
                        governor_name: 'Kay Ivey',
                        img_url:
                            'https://citystats.xyz/images/states/1/governor',
                    },
                    senators: [
                        {
                            senator_name: 'Tommy Tuberville',
                            img_url:
                                'https://www.citystats.xyz/images/states/1/senators/1',
                        },
                        {
                            senator_name: 'Katie Britt',
                            img_url:
                                'https://www.citystats.xyz/images/states/1/senators/2',
                        },
                    ],
                    house_delegates: [
                        {
                            delegate_name: 'Jerry Carl',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/1',
                        },
                        {
                            delegate_name: 'Barry Moore',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/2',
                        },
                        {
                            delegate_name: 'Mike Rogers',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/3',
                        },
                        {
                            delegate_name: 'Robert Aderholt',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/4',
                        },
                        {
                            delegate_name: 'Dale Strong',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/5',
                        },
                        {
                            delegate_name: 'Gary Palmer',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/6',
                        },
                        {
                            delegate_name: 'Terri Sewell',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/7',
                        },
                    ],
                },
            },
        ],
        stateUrlStringIdTwo: [
            {
                id: 2,
                state_name: 'Alaska',
                state_abbreviation: 'AK',
                date_admitted: '1959-01-03T00:00:00.000Z',
                capital: 'Juneau',
                largest_city: 'Anchorage',
                elevation: '1900 ft',
                time_zone: 'UTC-9(AKST)',
                latitude: "51°20'N to 71°50'N",
                longitude: '130°W to 172°E',
                url: 'https://www.alaska.gov/',
                flag_url:
                    'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Alaska.svg',
                insignia_url:
                    'https://upload.wikimedia.org/wikipedia/commons/9/96/State_Seal_of_Alaska.svg',
                area: {
                    total: '663268 sq mi',
                    land: '571951 sq mi',
                    water: '91316 sq mi',
                },
                population: {
                    total: '736081',
                    density: '1.26/sq mi',
                    median_household_income: '$77800',
                },
                government: {
                    governor: {
                        governor_name: 'Mike Dunleavy',
                        img_url:
                            'https://citystats.xyz/images/states/2/governor',
                    },
                    senators: [
                        {
                            senator_name: 'Lisa Murkowski',
                            img_url:
                                'https://www.citystats.xyz/images/states/2/senators/1',
                        },
                        {
                            senator_name: 'Dan Sullivan',
                            img_url:
                                'https://www.citystats.xyz/images/states/2/senators/2',
                        },
                    ],
                    house_delegates: [
                        {
                            delegate_name: 'Mary Peltola',
                            img_url:
                                'https://citystats.xyz/images/states/2/delegates/1',
                        },
                    ],
                },
            },
        ],
    },
    singleStateWithField: {
        stateUrlWithFieldStringIdOne: [
            {
                id: 1,
                state_name: 'Alabama',
                state_abbreviation: 'AL',
                government: {
                    governor: {
                        governor_name: 'Kay Ivey',
                        img_url:
                            'https://citystats.xyz/images/states/1/governor',
                    },
                    senators: [
                        {
                            senator_name: 'Tommy Tuberville',
                            img_url:
                                'https://www.citystats.xyz/images/states/1/senators/1',
                        },
                        {
                            senator_name: 'Katie Britt',
                            img_url:
                                'https://www.citystats.xyz/images/states/1/senators/2',
                        },
                    ],
                    house_delegates: [
                        {
                            delegate_name: 'Jerry Carl',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/1',
                        },
                        {
                            delegate_name: 'Barry Moore',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/2',
                        },
                        {
                            delegate_name: 'Mike Rogers',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/3',
                        },
                        {
                            delegate_name: 'Robert Aderholt',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/4',
                        },
                        {
                            delegate_name: 'Dale Strong',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/5',
                        },
                        {
                            delegate_name: 'Gary Palmer',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/6',
                        },
                        {
                            delegate_name: 'Terri Sewell',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/7',
                        },
                    ],
                },
            },
        ],
        stateUrlWithFieldStringIdTwo: [
            {
                id: 2,
                state_name: 'Alaska',
                state_abbreviation: 'AK',
                area: {
                    total: '663268 sq mi',
                    land: '571951 sq mi',
                    water: '91316 sq mi',
                },
            },
        ],
    },
    singleStateWithSubField: {
        stateUrlWithSubFieldStringIdOne: [
            {
                id: 1,
                state_name: 'Alabama',
                state_abbreviation: 'AL',
                government: {
                    senators: [
                        {
                            senator_name: 'Tommy Tuberville',
                            img_url:
                                'https://www.citystats.xyz/images/states/1/senators/1',
                        },
                        {
                            senator_name: 'Katie Britt',
                            img_url:
                                'https://www.citystats.xyz/images/states/1/senators/2',
                        },
                    ],
                },
            },
        ],
        stateUrlWithSubFieldStringIdTwo: [
            {
                id: 1,
                state_name: 'Alabama',
                state_abbreviation: 'AL',
                government: {
                    house_delegates: [
                        {
                            delegate_name: 'Jerry Carl',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/1',
                        },
                        {
                            delegate_name: 'Barry Moore',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/2',
                        },
                        {
                            delegate_name: 'Mike Rogers',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/3',
                        },
                        {
                            delegate_name: 'Robert Aderholt',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/4',
                        },
                        {
                            delegate_name: 'Dale Strong',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/5',
                        },
                        {
                            delegate_name: 'Gary Palmer',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/6',
                        },
                        {
                            delegate_name: 'Terri Sewell',
                            img_url:
                                'https://citystats.xyz/images/states/1/delegates/7',
                        },
                    ],
                },
            },
        ],
    },
    singleCity: {
        cityUrlStringIdOne: [
            [
                {
                    id: 1,
                    city_name: 'Abilene',
                    state_name: 'Texas',
                    coordinates: '32°27′N 99°45′W',
                    settled_founded: '1881',
                    incorporated: '1881',
                    elevation: '1719 ft',
                    time_zone: 'UTC-6 (CST)',
                    fips_code: '48-01000',
                    url: 'https://www.abilenetx.gov/',
                    counties: ['Taylor', 'Jones'],
                    government: {
                        type: 'Council-Manager',
                        mayor: 'Weldon Hurt',
                        img_url:
                            'https://www.citystats.xyz/images/cities/1/mayor',
                        city_council: [
                            {
                                council_member: 'Shane Price',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/1',
                            },
                            {
                                council_member: 'Lynn Beard',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/2',
                            },
                            {
                                council_member: 'Blaise Regan',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/3',
                            },
                            {
                                council_member: 'Brian Yates',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/4',
                            },
                            {
                                council_member: 'Kyle McAlister',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/5',
                            },
                            {
                                council_member: 'Travis Craver',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/6',
                            },
                        ],
                    },
                    area: {
                        city: '112.09 sq mi',
                        land: '21.40 sq mi',
                        water: '0.53 sq mi',
                    },
                    population: {
                        city: '125182',
                        density: '1157/sq mi',
                        metro: '170219',
                    },
                    zip_codes: ['79601-08', '79697-99'],
                    area_codes: [325],
                    gnis_feature_ids: ['1329173'],
                },
            ],
        ],
        cityUrlStringIdTwo: [
            [
                {
                    id: 2,
                    city_name: 'Akron',
                    state_name: 'Ohio',
                    coordinates: '41°4′23″N 81°31′4″W',
                    settled_founded: '1825',
                    incorporated: '1865',
                    elevation: '1004 ft',
                    time_zone: 'UTC-5(EST)',
                    fips_code: '39-01000',
                    url: 'https://www.akronohio.gov/',
                    counties: ['Summit'],
                    government: {
                        type: 'Mayor-Council',
                        mayor: 'Nancy Holland',
                        img_url:
                            'https://www.citystats.xyz/images/cities/2/mayor',
                        city_council: [
                            {
                                council_member: 'Phil Lombardo',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/1',
                            },
                            {
                                council_member: 'Margo Sommerville',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/2',
                            },
                            {
                                council_member: 'Russel C. Neal, Jr.',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/3',
                            },
                            {
                                council_member: 'Tara Mosley',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/4',
                            },
                            {
                                council_member: 'Brad McKitrick',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/5',
                            },
                            {
                                council_member: 'Donnie Kammer',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/6',
                            },
                            {
                                council_member: 'Shammas Malik',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/7',
                            },
                            {
                                council_member: 'Mike Freeman',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/8',
                            },
                            {
                                council_member: 'Sharon Connor',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/9',
                            },
                            {
                                council_member: 'Jeff Fusco',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/10',
                            },
                            {
                                council_member: 'Linda F. R. Omobien',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/11',
                            },
                            {
                                council_member: 'Ginger Baylor',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/2/city_council/12',
                            },
                        ],
                    },
                    area: {
                        city: '62.27 sq mi',
                        land: '61.93 sq mi',
                        water: '0.34 sq mi',
                    },
                    population: {
                        city: '190469',
                        density: '3075.40/sq mi',
                        metro: '702219',
                    },
                    zip_codes: [
                        '44301-44321',
                        '44325-44326',
                        '44328',
                        '44333-44334',
                        '44372',
                        '44396',
                        '44398',
                    ],
                    area_codes: [234, 330],
                    gnis_feature_ids: ['1064305'],
                },
            ],
        ],
    },
    singleCityWithField: {
        cityUrlWithFieldStringIdOne: [
            [
                {
                    id: 1,
                    city_name: 'Abilene',
                    state_name: 'Texas',
                    government: {
                        type: 'Council-Manager',
                        mayor: 'Weldon Hurt',
                        img_url:
                            'https://www.citystats.xyz/images/cities/1/mayor',
                        city_council: [
                            {
                                council_member: 'Shane Price',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/1',
                            },
                            {
                                council_member: 'Lynn Beard',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/2',
                            },
                            {
                                council_member: 'Blaise Regan',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/3',
                            },
                            {
                                council_member: 'Brian Yates',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/4',
                            },
                            {
                                council_member: 'Kyle McAlister',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/5',
                            },
                            {
                                council_member: 'Travis Craver',
                                img_url:
                                    'https://www.citystats.xyz/images/cities/1/city_council/6',
                            },
                        ],
                    },
                },
            ],
        ],
    },
}

export { mockReturns }
