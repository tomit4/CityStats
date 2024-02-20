import { it, describe, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Code from '../components/Code'
import { BrowserRouter } from 'react-router-dom'
import { cityUrlParserOpts } from '../utils/url_parser_opts'
import { delay } from '../utils/general_utils'

describe('Code component', () => {
    it('renders cities data with sub-field and is interacted with as expected', async () => {
        const user = userEvent.setup()
        const { singleCityWithSubFieldUrl, citySubFields } = cityUrlParserOpts
        render(
            <BrowserRouter basename="/">
                <Code
                    entity="City"
                    blur={true}
                    urlParser={singleCityWithSubFieldUrl}
                    fields={[]}
                    subFields={citySubFields}
                    componentId={3}
                />
            </BrowserRouter>,
        )
        // Test URL Input
        const urlInput = screen.getByTestId('url-input')
        expect(urlInput).toHaveValue(
            'https://citystats.xyz/cities/1/government/city_council',
        )
        await user.click(urlInput)
        for (let i = 0; i < 13; i++) await user.keyboard('[Backspace>]')
        expect(urlInput).toHaveValue(
            'https://citystats.xyz/cities/1/government/',
        )
        await waitFor(async () => {
            await user.keyboard('mayor')
            await delay(500)
        })
        expect(urlInput).toHaveValue(
            'https://citystats.xyz/cities/1/government/mayor',
        )

        // Test handleBackSpace function
        for (let i = 0; i < 6; i++) await user.keyboard('[Backspace>]')
        expect(urlInput).toHaveValue(
            'https://citystats.xyz/cities/1/government/',
        )
    })
})
