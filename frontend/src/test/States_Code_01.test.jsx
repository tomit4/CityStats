import { it, describe, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Code from '../components/Code'
import States from '../pages/States'
import { BrowserRouter } from 'react-router-dom'
import { stateUrlParserOpts } from '../utils/url_parser_opts.js'

describe('States >> Code >> First', () => {
    it('renders and interact with as expected', () => {
        /* TODO: fix this and render as different test,
         * possibly need to mock utils, see vitest.setup.js */
        render(<States blur={true} />)
        /* TODO: Keep this as proper component test, does pass currently
        const { singleStateUrl } = stateUrlParserOpts
        render(
            <BrowserRouter basename="/">
                <Code
                    entity="State"
                    blur={true}
                    urlParser={singleStateUrl}
                    fields={[]}
                    subFields={[]}
                    componentId={1}
                />
            </BrowserRouter>,
        )
        */
    })
})
