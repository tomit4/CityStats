import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeEach, vi } from 'vitest'

import { server } from './src/mocks/node'
import { stateUrlParserOpts } from './src/utils/url_parser_opts'

beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => {
            return {
                matches: true,
            }
        }),
    })
    Object.defineProperty(document, 'documentElement', {
        value: {
            scrollTo: vi.fn(),
            setAttribute: vi.fn(),
        },
    })
    vi.mock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom')
        return {
            ...actual,
            useRoutes: vi.fn(),
        }
    })
    vi.mock('localStorage', () => {
        return { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn() }
    })
    server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
    cleanup()
    vi.resetModules()
    vi.restoreAllMocks()
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})
