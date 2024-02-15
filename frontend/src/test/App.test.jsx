import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'

it('should have "citystats" in document', () => {
    render(<App />, { wrapper: BrowserRouter })
    // console.log('screen :=>', screen)
    const message = screen.queryByT
    console.log('message :=>', message)
    expect(message).toBeTruthy()
})
