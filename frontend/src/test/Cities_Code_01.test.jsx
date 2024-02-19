import { it, describe, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Code from '../components/Code'
import { BrowserRouter } from 'react-router-dom'
import { cityUrlParserOpts } from '../utils/url_parser_opts'
import { delay } from '../utils/general_utils'

describe('Code component', () => {
    it('renders cities data and is interacted with as expected', async () => {
        const user = userEvent.setup()
        const { singleCityUrl } = cityUrlParserOpts
        render(
            <BrowserRouter basename="/">
                <Code
                    entity="City"
                    blur={true}
                    urlParser={singleCityUrl}
                    fields={[]}
                    subFields={[]}
                    componentId={1}
                />
            </BrowserRouter>,
        )
        // All Tabs Render
        expect(screen.getByLabelText(/JSON/i)).toBeDefined()
        expect(screen.getByLabelText(/curl/i)).toBeDefined()
        expect(screen.getByLabelText(/python/i)).toBeDefined()
        expect(screen.getByLabelText(/node/i)).toBeDefined()

        // Test URL Input
        const urlInput = screen.getByTestId('url-input')
        await user.click(urlInput)
        await user.keyboard('[Backspace>]')
        expect(urlInput).toHaveValue('https://citystats.xyz/cities/')
        await waitFor(async () => {
            await user.keyboard('2')
            await delay(500)
        })
        expect(urlInput).toHaveValue('https://citystats.xyz/cities/2')

        // Test handleBackSpace function
        await user.keyboard('[Backspace>]')
        await user.keyboard('[Backspace>]')
        await user.keyboard('[Backspace>]')
        expect(urlInput).toHaveValue('https://citystats.xyz/cities/')

        // Wait for error message to be displayed
        await waitFor(async () => await delay(500))

        // Reset URL Input
        await waitFor(async () => {
            await user.keyboard('1')
            await delay(500)
        })

        // Test Tab Rendering
        const jsonTab = screen.getByTestId('json-tab')
        await user.click(jsonTab)
        await user.keyboard('[Tab>]')
        await user.keyboard('[Enter>]')
        await waitFor(async () => await delay(500))
        await user.keyboard('[Tab>]')
        await user.keyboard('[Enter>]')
        await waitFor(async () => await delay(500))
        await user.keyboard('[Tab>]')
        await user.keyboard('[Enter>]')
        await waitFor(async () => await delay(500))
        await user.keyboard('[ArrowRight>]')
        await user.keyboard('[ArrowLeft>]')
        await user.keyboard('[ArrowUp>]')
        await user.keyboard('[ArrowDown>]')
    })
})
