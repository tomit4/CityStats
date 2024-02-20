import { http, HttpResponse } from 'msw'

import { mockReturns } from './mock_returns'

const singleStateUrlString = import.meta.env.VITE_SINGLE_STATE_URL
const singleStateUrlStringTwo = import.meta.env.VITE_SINGLE_STATE_URL_2
const singleStateWithSingleFieldUrlString = import.meta.env
    .VITE_SINGLE_STATE_FIELD
const singleStateWithSingleFieldUrlStringTwo = import.meta.env
    .VITE_SINGLE_STATE_FIELD_2
const singleCityUrlString = import.meta.env.VITE_SINGLE_CITY_URL
const singleCityUrlStringTwo = import.meta.env.VITE_SINGLE_CITY_URL_2
const singleCityWithSingleFieldUrlString = import.meta.env
    .VITE_SINGLE_CITY_FIELD

const { singleState, singleStateWithField, singleCity, singleCityWithField } =
    mockReturns
const { stateUrlStringIdOne, stateUrlStringIdTwo } = singleState
const { cityUrlStringIdOne, cityUrlStringIdTwo } = singleCity
const { stateUrlWithFieldStringIdOne, stateUrlWithFieldStringIdTwo } =
    singleStateWithField
const { cityUrlWithFieldStringIdOne } = singleCityWithField

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
    // SingleCity id#1
    http.get(singleCityUrlString, async () => {
        return HttpResponse.json(cityUrlStringIdOne)
    }),
    // SingleCity id#2
    http.get(singleCityUrlStringTwo, async () => {
        return HttpResponse.json(cityUrlStringIdTwo)
    }),
    // SingleCityWithSingleField
    http.get(singleCityWithSingleFieldUrlString, async () => {
        return HttpResponse.json(cityUrlWithFieldStringIdOne)
    }),
]
