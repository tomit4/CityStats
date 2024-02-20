import { it, describe, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Code from '../components/Code'
import { BrowserRouter } from 'react-router-dom'
import { cityUrlParserOpts } from '../utils/url_parser_opts'
import { delay } from '../utils/general_utils'

describe('Code component', () => {
    it('renders cities data with field and is interacted with as expected', async () => {
        const user = userEvent.setup()
        const { singleCityWithSingleFieldUrl, cityFields } = cityUrlParserOpts
        render(
            <BrowserRouter basename="/">
                <Code
                    entity="City"
                    blur={true}
                    urlParser={singleCityWithSingleFieldUrl}
                    fields={cityFields}
                    subFields={[]}
                    componentId={2}
                />
            </BrowserRouter>,
        )
        // Test URL Input
        const urlInput = screen.getByTestId('url-input')
        expect(urlInput).toHaveValue(
            'https://citystats.xyz/cities/1/government',
        )
        await user.click(urlInput)
        for (let i = 0; i < 12; i++) await user.keyboard('[Backspace>]')
        expect(urlInput).toHaveValue('https://citystats.xyz/cities/')
        await waitFor(async () => {
            await user.keyboard('2/area')
            await delay(500)
        })
        expect(urlInput).toHaveValue('https://citystats.xyz/cities/2/area')

        // Test handleBackSpace function
        for (let i = 0; i < 6; i++) await user.keyboard('[Backspace>]')
        expect(urlInput).toHaveValue('https://citystats.xyz/cities/')
    })
})
