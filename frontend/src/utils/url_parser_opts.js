const stateUrlParserOpts = {
    singleStateUrl: {
        string: import.meta.env.VITE_SINGLE_STATE_URL,
        regex: new RegExp(import.meta.env.VITE_SINGLE_STATE_REGEX),
        canDelUpTo: 29,
        minLength: 24,
    },
    // TODO:  Pass vite environment variables for rest of these
    singleStateWithSingleFieldUrl: {
        string: 'https://citystats.xyz/states/1/government',
        regex: /^https:\/\/citystats\.xyz\/states\/(?:\d{1,2}|[\w]+)\/[\w]+$/,
        canDelUpTo: 29,
        minLength: 34,
    },
    singleStateWithSubFieldUrl: {
        string: 'https://citystats.xyz/states/1/government/senators',
        regex: /^https:\/\/citystats\.xyz\/states\/(?:\d{1,2}|[\w]+)\/[\w]+\/[\w]+$/,
        canDelUpTo: 42,
        minLength: 46,
    },
    singleStateWithQueryUrl: {
        string: 'https://citystats.xyz/states/1/government/house_delegates/1',
        regex: /^https:\/\/citystats\.xyz\/states\/(?:\d{1,2}|[\w]+)\/[\w]+\/[\w]+\/\d{1,2}$/,
        canDelUpTo: 58,
        minLength: 59,
    },
    stateFields: [
        'state_name',
        'state_abbreviation',
        'date_admitted',
        'capital',
        'largest_city',
        'elevation',
        'time_zone',
        'latitude',
        'longitude',
        'url',
        'flag_url',
        'insignia_url',
        'area',
        'population',
        'government',
    ],
    stateSubFields: ['governor', 'senators', 'house_delegates'],
}

const cityUrlParserOpts = {
    singleCityUrl: {
        string: 'https://citystats.xyz/cities/1',
        regex: /^https:\/\/citystats\.xyz\/cities\/(?:\d{1,3}|[\w]+)$/,
        canDelUpTo: 29,
        minLength: 24,
    },
    singleCityWithSingleFieldUrl: {
        string: 'https://citystats.xyz/cities/1/government',
        regex: /^https:\/\/citystats\.xyz\/cities\/(?:\d{1,3}|[\w]+)\/[\w]+$/,
        canDelUpTo: 29,
        minLength: 34,
    },
    singleCityWithSubFieldUrl: {
        string: 'https://citystats.xyz/cities/1/government/city_council',
        regex: /^https:\/\/citystats\.xyz\/cities\/(?:\d{1,3}|[\w]+)\/[\w]+\/[\w]+$/,
        canDelUpTo: 42,
        minLength: 46,
    },
    singleCityWithQueryUrl: {
        string: 'https://citystats.xyz/cities/202/government/city_council/50',
        regex: /^https:\/\/citystats\.xyz\/cities\/(?:\d{1,3}|[\w]+)\/[\w]+\/[\w]+\/\d{1,2}$/,
        canDelUpTo: 57,
        minLength: 58,
    },
    cityFields: [
        'city_name',
        'state_name',
        'coordinates',
        'settled_founded',
        'incorporated',
        'elevation',
        'time_zone',
        'fips_code',
        'url',
        'counties',
        'government',
        'area',
        'population',
        'zip_codes',
        'area_codes',
        'gnis_feature_ids',
    ],
    citySubFields: ['type', 'mayor', 'city_council'],
}

export { stateUrlParserOpts, cityUrlParserOpts }
