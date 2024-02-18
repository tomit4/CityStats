import { it, describe, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Nav from '../components/Nav'
import { BrowserRouter } from 'react-router-dom'

describe('Nav Component', () => {
    it('renders and interacts with as expected', async () => {
        const user = userEvent.setup()
        render(<Nav sidebar={true} showSidebar={vi.fn()} />, {
            wrapper: BrowserRouter,
        })

        vi.mock('../contexts/useThemeUpdate', () => ({
            useThemeUpdate: () => vi.fn(),
        }))

        // Test Toggling Theme
        const toggleThemeBtn = screen.getByTestId('toggle-theme-btn')
        const navToggle = screen.getByTestId('nav-toggle')
        fireEvent.click(toggleThemeBtn)
        expect(navToggle).toHaveAttribute('data-toggled', 'true')

        // Test toggling switch btn using Enter keypress
        const toggleSwitch = screen.getByTestId('toggle-switch')
        await user.click(toggleSwitch)
        await user.keyboard('[Enter>]')

        // Navigate Home
        const homeBtn = screen.getByTestId('home-btn')
        fireEvent.click(homeBtn)
        expect(window.location.pathname).toBe('/')
    })
})
