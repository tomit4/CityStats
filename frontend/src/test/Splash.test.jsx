import { it, describe, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Splash from '../pages/Splash'
import { BrowserRouter } from 'react-router-dom'

describe('Splash Page', () => {
    it('renders and interacts with as expected', () => {
        render(
            <BrowserRouter basename="/">
                <Splash />
            </BrowserRouter>,
        )
        expect(screen.getAllByText(/CityStats API/i)).toBeDefined()
        expect(
            screen.getByText(/Get Statistics On US States And Cities/i),
        ).toBeDefined()
        expect(
            screen.getAllByText(/Click Here To Get Started/i),
        ).not.toHaveLength(0)
        fireEvent.click(screen.getByText(/Click Here To Get Started/i))
        expect(window.location.pathname).toBe('/states')
    })
})
