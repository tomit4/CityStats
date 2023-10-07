'use strict'
const SingleCityServiceDetails = require('./single-city-services-with-details')

/** Intermediary Class for Single City Object
 * @constructor
 * returns { SingleCityService }
 * */
class SingleCityService extends SingleCityServiceDetails {
    constructor() {
        super()
        this._nativeFields = [
            'id',
            'city_name',
            'state_name',
            'coordinates',
            'settled_founded',
            'incorporated',
            'elevation',
            'time_zone',
            'fips_code',
            'url',
        ]
        // TODO: To be put in SingleCityServiceDetails class
        this.relatedFields = [
            'counties',
            'government',
            'area',
            'population',
            'zip_codes',
            'area_codes',
            'gnis_feature_ids',
        ]
        this.fields = [...this._nativeFields, ...this.relatedFields]
    }
    async _grabAllCityNames(knex) {
        try {
            const allCityNames = await knex.select('city_name').from('cities')
            if (!allCityNames)
                throw Error('Failure to retrieve all City Names from DB')
            return allCityNames.map(city => city.city_name)
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabCityIdsByName(knex, name) {
        try {
            const citiesByName = await knex('cities')
                .select('id')
                .where('city_name', name)
            if (!citiesByName) throw Error(`No City Id Found By Name: ${name}`)
            return citiesByName
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabCityById(knex, id) {
        try {
            const city = await knex
                .select(...this._cityTableFields)
                .from('cities')
                .where('id', id)
                .first()
            if (!city) throw Error(`No City Found For Id: ${id}`)
            return city
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async grabCityIdByName(knex, idOrName) {
        try {
            if (isNaN(Number(idOrName))) {
                const allCityNames = await this._grabAllCityNames(knex)
                if (allCityNames.includes(idOrName)) {
                    return await this._grabCityIdsByName(knex, idOrName)
                } else throw Error(`No City Found by Name: ${idOrName}`)
            } else return idOrName
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabCountiesById(knex, id) {
        try {
            const counties = await knex('cities_counties').where('city_id', id)
            if (!counties) throw Error(`No Counties Data Found Id: ${id}`)
            return counties.map(county => {
                return county.county_name
            })
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabGovCouncilMembersById(knex, id) {
        try {
            const councilMembers = await knex
                .select('council_member')
                .from('cities_government_council')
                .where('city_id', id)
            if (!councilMembers)
                throw Error(
                    `No Cities Government Council Members Found For Id: ${id}`,
                )
            return councilMembers.map(member => {
                return member.council_member
            })
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabBaseGovInfoById(knex, id) {
        try {
            const councilMembers = await this._grabGovCouncilMembersById(
                knex,
                id,
            )
            const gov = await knex
                .select('type', 'mayor')
                .from('cities_government')
                .where('id', id)
                .first()
            if (!gov)
                throw Error(`No Cities Government Data Found For Id: ${id}`)
            gov.city_council = councilMembers
            return gov
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAreaById(knex, id) {
        try {
            const area = await knex
                .select('city', 'land', 'water')
                .from('cities_area')
                .where('city_id', id)
                .first()
            if (!area) throw Error(`No Cities Area Data Found For Id: ${id}`)
            return area
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabPopulationById(knex, id) {
        try {
            const population = await knex
                .select('city', 'density', 'metro')
                .from('cities_population')
                .where('city_id', id)
                .first()
            if (!population)
                throw Error(`No Cities Population Data Found For Id: ${id}`)
            return population
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabZipCodesById(knex, id) {
        try {
            const zips = await knex
                .select('zip_code')
                .from('cities_zip_codes')
                .where('city_id', id)
            if (!zips)
                throw Error(`No Cities Zip Codes Data Found For Id: ${id}`)
            return zips.map(zip => {
                return zip.zip_code
            })
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabAreaCodesById(knex, id) {
        try {
            const areaCodes = await knex
                .select('area_code')
                .from('cities_area_codes')
                .where('city_id', id)
            if (!areaCodes)
                throw Error(`No Cities Area Codes Data Found For Id: ${id}`)
            return areaCodes.map(code => {
                return code.area_code
            })
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabGnisIdsById(knex, id) {
        try {
            const gnisIds = await knex
                .select('gnis_feature_id')
                .from('cities_gnis_feature_ids')
                .where('city_id', id)
            if (!gnisIds)
                throw Error(
                    `No Cities Gnis Feature Ids Data Found For Id: ${id}`,
                )
            return gnisIds.map(id => {
                return id.gnis_feature_id
            })
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabNativeFieldData(knex, id, field) {
        try {
            const nativeFieldData = await knex
                .where('id', id)
                .select('id', 'city_name', 'state_name')
                .select(field)
                .from('cities')
                .first()
            if (!nativeFieldData)
                throw Error(
                    `No data retrieved for field: ${field} at id: ${id}`,
                )
            return nativeFieldData
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabMinCityInfo(knex, id) {
        try {
            const city = await knex
                .where('id', id)
                .select('id', 'city_name', 'state_name')
                .from('cities')
                .first()
            if (!city) throw Error(`No city info retrieved for id: ${id}`)
            return city
        } catch (err) {
            console.error('ERROR :=>', err)
        }
    }
    async _grabRelatedFieldData(knex, id, field) {
        const city = await this._grabMinCityInfo(knex, id)
        let returnVal
        switch (field) {
            case 'counties':
                returnVal = await this._grabCountiesById(knex, id)
                returnVal = { counties: returnVal }
                break
            case 'government':
                returnVal = await this._grabBaseGovInfoById(knex, id)
                returnVal = { government: returnVal }
                break
            case 'area':
                returnVal = await this._grabAreaById(knex, id)
                returnVal = { area: returnVal }
                break
            case 'population':
                returnVal = await this._grabPopulationById(knex, id)
                returnVal = { population: returnVal }
                break
            case 'zip_codes':
                returnVal = await this._grabZipCodesById(knex, id)
                returnVal = { zip_codes: returnVal }
                break
            case 'area_codes':
                returnVal = await this._grabAreaCodesById(knex, id)
                returnVal = { area_codes: returnVal }
                break
            case 'gnis_feature_ids':
                returnVal = await this._grabGnisIdsById(knex, id)
                returnVal = { gnis_feature_ids: returnVal }
                break
            default:
                throw Error(
                    `Unable to find city info for id: ${id} on field: ${field}`,
                )
        }
        return { ...city, ...returnVal }
    }
    async _grabCityDetails(knex, id) {
        const singleCity = await this._grabCityById(knex, id)
        singleCity.counties = await this._grabCountiesById(knex, id)
        singleCity.government = await this._grabBaseGovInfoById(knex, id)
        singleCity.area = await this._grabAreaById(knex, id)
        singleCity.population = await this._grabPopulationById(knex, id)
        singleCity.zip_codes = await this._grabZipCodesById(knex, id)
        singleCity.area_codes = await this._grabAreaCodesById(knex, id)
        singleCity.gnis_feature_ids = await this._grabGnisIdsById(knex, id)
        return singleCity
    }
    /**
     * Aggregates single or multiple cities data
     * @params { promise } knex
     * returns { object } singleCity
     * */
    async grabCitiesById(knex, idOrName) {
        const ids = await this.grabCityIdByName(knex, idOrName)
        const cityIds =
            typeof ids === 'object' ? ids.map(cityId => cityId.id) : []
        if (!cityIds.length) {
            return await this._grabCityDetails(knex, ids)
        } else {
            try {
                const multipleCities = []
                for (const cityId of cityIds) {
                    multipleCities.push(
                        await this._grabCityDetails(knex, cityId),
                    )
                }
                return multipleCities
            } catch (err) {
                throw Error(`No Cities Found By Name: ${idOrName}`)
            }
        }
    }
    /**
     * TODO: break out this function into two based off
     * of return value of grabCityIdByName like above
     * Aggregates min city info with single query field
     * @params { promise } knex
     * @params { string } id
     * @params { string } field
     * returns { object }
     * */
    async grabRelDataById(knex, idOrName, field) {
        const ids = await this.grabCityIdByName(knex, idOrName)
        const cityIds =
            typeof ids === 'object' ? ids.map(cityId => cityId.id) : []
        if (!cityIds.length) {
            if (this._nativeFields.includes(field))
                return await this._grabNativeFieldData(knex, ids, field)
            else return await this._grabRelatedFieldData(knex, ids, field)
        } else {
            const multipleCities = []
            if (this._nativeFields.includes(field)) {
                for (const cityId of cityIds) {
                    multipleCities.push(
                        await this._grabNativeFieldData(knex, cityId, field),
                    )
                }
            } else {
                for (const cityId of cityIds) {
                    multipleCities.push(
                        await this._grabRelatedFieldData(knex, cityId, field),
                    )
                }
            }
            return multipleCities
        }
    }
}

module.exports = SingleCityService
