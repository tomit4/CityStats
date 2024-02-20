import { it, describe, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Code from '../components/Code'
import { BrowserRouter } from 'react-router-dom'
import { stateUrlParserOpts } from '../utils/url_parser_opts'
import { delay } from '../utils/general_utils'

describe('Code component', () => {
    it('renders states data with field and is interacted with as expected', async () => {
        const user = userEvent.setup()
        const { singleStateWithSingleFieldUrl, stateFields } =
            stateUrlParserOpts
        render(
            <BrowserRouter basename="/">
                <Code
                    entity="State"
                    blur={true}
                    urlParser={singleStateWithSingleFieldUrl}
                    fields={stateFields}
                    subFields={[]}
                    componentId={2}
                />
            </BrowserRouter>,
        )
        // Test URL Input Defaults
        const urlInput = screen.getByTestId('url-input')
        expect(urlInput).toHaveValue(
            'https://citystats.xyz/states/1/government',
        )
        // Test URL Input Interaction
        await user.click(urlInput)
        for (let i = 0; i < 12; i++) await user.keyboard('[Backspace>]')
        expect(urlInput).toHaveValue('https://citystats.xyz/states/')
        await waitFor(async () => {
            await user.keyboard('2/area')
            await delay(500)
        })
        expect(urlInput).toHaveValue('https://citystats.xyz/states/2/area')

        // Test handleBackSpace function
        for (let i = 0; i < 6; i++) await user.keyboard('[Backspace>]')
        expect(urlInput).toHaveValue('https://citystats.xyz/states/')
    })
})
