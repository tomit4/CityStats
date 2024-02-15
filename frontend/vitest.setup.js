import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeEach, vi } from 'vitest'
import { server } from './src/mocks/node'

beforeEach(() => {
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
        return {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
        }
    })
    /* TODO: See if something like this resolves our 
    * issue with testing the States page
    vi.mock(
        './src/utils/utils',
        vi.fn(() => {
            return {
                delay: vi.fn(),
                grabStoredCookie: vi.fn(() => {
                    return process.env.VITE_TEST_HASH
                }),
            }
        }),
    )
    */
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
