import { it, describe, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Code from '../components/Code'
import { BrowserRouter } from 'react-router-dom'
import { cityUrlParserOpts } from '../utils/url_parser_opts'
import { delay } from '../utils/general_utils'

describe('Code component', () => {
    it('renders cities data with query and is interacted with as expected', async () => {
        const user = userEvent.setup()
        const { singleCityWithQueryUrl } = cityUrlParserOpts
        render(
            <BrowserRouter basename="/">
                <Code
                    entity="City"
                    blur={true}
                    urlParser={singleCityWithQueryUrl}
                    fields={[]}
                    subFields={[]}
                    componentId={4}
                />
            </BrowserRouter>,
        )
        // Test URL Input
        const urlInput = screen.getByTestId('url-input')
        expect(urlInput).toHaveValue(
            'https://citystats.xyz/cities/202/government/city_council/50',
        )
        await user.click(urlInput)
        for (let i = 0; i < 3; i++) await user.keyboard('[Backspace>]')
        expect(urlInput).toHaveValue(
            'https://citystats.xyz/cities/202/government/city_council/',
        )
        await waitFor(async () => {
            await user.keyboard('49')
            await delay(500)
        })
        expect(urlInput).toHaveValue(
            'https://citystats.xyz/cities/202/government/city_council/49',
        )

        // Test handleBackSpace function
        for (let i = 0; i < 3; i++) await user.keyboard('[Backspace>]')
        expect(urlInput).toHaveValue(
            'https://citystats.xyz/cities/202/government/city_council/',
        )
    })
})
