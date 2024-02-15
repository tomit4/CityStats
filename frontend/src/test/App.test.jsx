import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'

describe('App Component', () => {
    it('renders and has home splash component in it', () => {
        render(<App />, { wrapper: BrowserRouter })
        expect(screen.getByTestId('home-splash-component')).toBeDefined()
    })
})
