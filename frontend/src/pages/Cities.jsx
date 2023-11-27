import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import './css/prism_solarized_light/prism.css'
// import './css/prism_okaidia/prism.css'

export default function Cities() {
    useEffect(() => {
        Prism.highlightAll()
    })

    /* TODO: Create a component specifically for code snippets
     * You'll need three "tabs" that will display the instructions
     * in code on how to grab the backend API in:
     * bash/curl, javascript, and python.
     * Lastly, you'll need a "try it out" button that actually queries
     * the API and displays it in another code block
     * (which renders dynamically, otherwise is invisible?). */

    // TODO: Once you actually fetch in data,
    // you'll have to do some interesting things
    // to get JSON to format properly
    const json = '{\n\t"result":true, \n\t"count":42, \n\t"love": [0, 1, 2],\n}'
    const data = JSON.stringify(json)
    return (
        <>
            <div>Cities</div>
            <pre>
                <code className="language-json">{JSON.parse(data)}</code>
            </pre>
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
            <p id="test">Scroll To Hear Cities</p>
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
        </>
    )
}
