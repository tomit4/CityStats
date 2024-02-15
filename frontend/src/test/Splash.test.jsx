import { it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Splash from '../pages/Splash'
import { BrowserRouter } from 'react-router-dom'

it('Splash Page should render and interact with as expected', () => {
    render(
        <BrowserRouter basename="/">
            <Splash />
        </BrowserRouter>,
    )
    expect(screen.getAllByText(/CityStats API/i)).toBeDefined()
    expect(
        screen.getByText(/Get Statistics On US States And Cities/i),
    ).toBeDefined()
    expect(screen.getAllByText(/Click Here To Get Started/i)).not.toHaveLength(
        0,
    )
    fireEvent.click(screen.getByText(/Click Here To Get Started/i))
    expect(window.location.pathname).toBe('/states')
})
