import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

describe('Footer Component', () => {
    it('renders as expected with all footer links', () => {
        render(<Footer />)

        expect(screen.getAllByLabelText('email')).toBeDefined()
        expect(
            screen.getAllByLabelText("A Link To Creator's Github Profile"),
        ).toBeDefined()
        expect(
            screen.getAllByLabelText("A Link To Creator's LinkedIn Profile"),
        ).toBeDefined()
        expect(
            screen.getAllByLabelText("A Link To The Creator's Website/Blog"),
        ).toBeDefined()
        expect(
            screen.getAllByLabelText(
                "A Link To The Creator's Mastodon Profile",
            ),
        ).toBeDefined()
    })
})
