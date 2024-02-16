const mockReturns = {
    singleState: {
        urlStringIdOne: [
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
        urlStringIdTwo: [
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
        urlWithFieldStringIdOne: [
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
    },
}

export { mockReturns }
