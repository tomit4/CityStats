import { http, HttpResponse } from 'msw'
import { mockReturns } from './mock_returns'
const singleStateUrlString = import.meta.env.VITE_SINGLE_STATE_URL
const singleStateUrlStringTwo = import.meta.env.VITE_SINGLE_STATE_URL_2
const singleStateWithSingleFieldUrlString = import.meta.env
    .VITE_SINGLE_STATE_FIELD

const { singleState, singleStateWithField } = mockReturns
const { urlStringIdOne, urlStringIdTwo } = singleState
const { urlWithFieldStringIdOne } = singleStateWithField

export const handlers = [
    // SingleState id#1
    http.get(singleStateUrlString, async () => {
        return HttpResponse.json(urlStringIdOne)
    }),
    // SingleState id#2
    http.get(singleStateUrlStringTwo, async () => {
        return HttpResponse.json(urlStringIdTwo)
    }),
    // SingleStateWithSingleField
    http.get(singleStateWithSingleFieldUrlString, async () => {
        return HttpResponse.json(urlWithFieldStringIdOne)
    }),
]
