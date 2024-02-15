import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'

it('App should render and have home splash component in it', () => {
    render(<App />, { wrapper: BrowserRouter })
    expect(screen.getByTestId('home-splash-component')).toBeDefined()
})
