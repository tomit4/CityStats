import { http, HttpResponse } from 'msw'

import { mockReturns } from './mock_returns'

// Url Strings
// State
const singleStateUrlString = import.meta.env.VITE_SINGLE_STATE_URL
const singleStateUrlStringTwo = import.meta.env.VITE_SINGLE_STATE_URL_2
const singleStateWithSingleFieldUrlString = import.meta.env
    .VITE_SINGLE_STATE_FIELD
const singleStateWithSingleFieldUrlStringTwo = import.meta.env
    .VITE_SINGLE_STATE_FIELD_2
const singleStateSubFieldUrl = import.meta.env.VITE_SINGLE_STATE_SUBFIELD
const singleStateSubFieldUrlTwo = import.meta.env.VITE_SINGLE_STATE_SUBFIELD_2
const singleStateWithQueryUrlString = import.meta.env.VITE_SINGLE_STATE_QUERY
const singleStateWithQueryUrlStringTwo = import.meta.env
    .VITE_SINGLE_STATE_QUERY_2

// City
const singleCityUrlString = import.meta.env.VITE_SINGLE_CITY_URL
const singleCityUrlStringTwo = import.meta.env.VITE_SINGLE_CITY_URL_2
const singleCityWithSingleFieldUrlString = import.meta.env
    .VITE_SINGLE_CITY_FIELD
const singleCityWithSingleFieldUrlStringTwo = import.meta.env
    .VITE_SINGLE_CITY_FIELD_2
const singleCitySubFieldUrl = import.meta.env.VITE_SINGLE_CITY_SUBFIELD
const singleCitySubFieldUrlTwo = import.meta.env.VITE_SINGLE_CITY_SUBFIELD_2
const singleCityWithQueryUrlString = import.meta.env.VITE_SINGLE_CITY_QUERY
const singleCityWithQueryUrlStringTwo = import.meta.env.VITE_SINGLE_CITY_QUERY_2

// Mocked Data
// State
const {
    singleState,
    singleStateWithField,
    singleStateWithSubField,
    singleStateWithQuery,
    singleCity,
    singleCityWithField,
    singleCityWithSubField,
    singleCityWithQuery,
} = mockReturns
const { stateUrlStringIdOne, stateUrlStringIdTwo } = singleState
const { stateUrlWithFieldStringIdOne, stateUrlWithFieldStringIdTwo } =
    singleStateWithField
const { stateUrlWithSubFieldStringIdOne, stateUrlWithSubFieldStringIdTwo } =
    singleStateWithSubField
const { stateUrlWithQueryStringIdOne, stateUrlWithQueryStringIdTwo } =
    singleStateWithQuery

// City
const { cityUrlStringIdOne, cityUrlStringIdTwo } = singleCity
const { cityUrlWithFieldStringIdOne, cityUrlWithFieldStringIdTwo } =
    singleCityWithField
const { cityUrlWithSubFieldStringIdOne, cityUrlWithSubFieldStringIdTwo } =
    singleCityWithSubField
const { cityUrlWithQueryStringIdOne, cityUrlWithQueryStringIdTwo } =
    singleCityWithQuery

export const handlers = [
    // SingleState id#1
    http.get(singleStateUrlString, async () => {
        return HttpResponse.json(stateUrlStringIdOne)
    }),
    // SingleState id#2
    http.get(singleStateUrlStringTwo, async () => {
        return HttpResponse.json(stateUrlStringIdTwo)
    }),
    // SingleStateWithSingleField id#1
    http.get(singleStateWithSingleFieldUrlString, async () => {
        return HttpResponse.json(stateUrlWithFieldStringIdOne)
    }),
    // SingleStateWithSingleField id#2
    http.get(singleStateWithSingleFieldUrlStringTwo, async () => {
        return HttpResponse.json(stateUrlWithFieldStringIdTwo)
    }),
    // SingleStateWithSubField id#1
    http.get(singleStateSubFieldUrl, async () => {
        return HttpResponse.json(stateUrlWithSubFieldStringIdOne)
    }),
    // SingleStateWithSubfield id#2
    http.get(singleStateSubFieldUrlTwo, async () => {
        return HttpResponse.json(stateUrlWithSubFieldStringIdTwo)
    }),
    // SingleStateWithQuery id#1
    http.get(singleStateWithQueryUrlString, async () => {
        return HttpResponse.json(stateUrlWithQueryStringIdOne)
    }),
    // SingleStateWithQuery id#2
    http.get(singleStateWithQueryUrlStringTwo, async () => {
        return HttpResponse.json(stateUrlWithQueryStringIdTwo)
    }),
    // SingleCity id#1
    http.get(singleCityUrlString, async () => {
        return HttpResponse.json(cityUrlStringIdOne)
    }),
    // SingleCity id#2
    http.get(singleCityUrlStringTwo, async () => {
        return HttpResponse.json(cityUrlStringIdTwo)
    }),
    // SingleCityWithSingleField id#1
    http.get(singleCityWithSingleFieldUrlString, async () => {
        return HttpResponse.json(cityUrlWithFieldStringIdOne)
    }),
    // SingleCityWithSingleField id#1
    http.get(singleCityWithSingleFieldUrlStringTwo, async () => {
        return HttpResponse.json(cityUrlWithFieldStringIdTwo)
    }),
    // SingleCityWithSubField id#1
    http.get(singleCitySubFieldUrl, async () => {
        return HttpResponse.json(cityUrlWithSubFieldStringIdOne)
    }),
    // SingleCityWithSubfield id#2
    http.get(singleCitySubFieldUrlTwo, async () => {
        return HttpResponse.json(cityUrlWithSubFieldStringIdTwo)
    }),
    // SingleCityWithQuery id#2
    http.get(singleCityWithQueryUrlString, async () => {
        return HttpResponse.json(cityUrlWithQueryStringIdOne)
    }),
    // SingleCityWithQuery id#2
    http.get(singleCityWithQueryUrlStringTwo, async () => {
        return HttpResponse.json(cityUrlWithQueryStringIdTwo)
    }),
]
