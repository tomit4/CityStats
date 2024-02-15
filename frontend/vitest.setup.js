import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

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
})

afterEach(() => {
    cleanup()
})
