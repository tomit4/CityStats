import { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
// import './css/prism_solarized_light/prism.css'
import './css/prism_okaidia/prism.css'
import { debounce } from 'lodash'

const Cities = props => {
    const [json, setJSON] = useState([])
    const [url, setUrl] = useState('https://citystats.xyz/cities/1')
    const prismPre = useRef(null)
    const prismCode = useRef(null)
    const inputRef = useRef(null)
    const tabs = useRef({})
    const [chosenTab, setChosenTab] = useState('__tabbed_2_1')

    useEffect(() => {
        Prism.highlightAll()
    })

    useEffect(() => {
        prismPre.current.setAttribute('data-visible', props.blur)
        prismCode.current.setAttribute('data-visible', props.blur)
        for (const key of Object.keys(tabs.current)) {
            if (tabs.current[key].getAttribute('data-focused') === 'true') {
                tabs.current[key].setAttribute('data-visible', props.blur)
            } else {
                tabs.current[key].setAttribute('data-no-border', props.blur)
            }
        }
    }, [props])

    useEffect(() => {
        const getEntity = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) throw new Error('City data not found!')
                const data = await response.json()
                setJSON(data)
            } catch (err) {
                console.error('ERROR fetching data :=>', err)
                setJSON([{ err_msg: err.message }])
            }
        }
        getEntity()
    }, [url])

    // Refactor to have two arguments for
    // length comparison (other urls can be passed)
    // Allow to take names as well as id
    const isValidUrl = inputUrl => {
        return (
            inputUrl.length >= 24 &&
            /^https:\/\/citystats\.xyz\/cities\/\d{1,3}$/.test(inputUrl)
        )
    }

    const handleChange = debounce(() => {
        const newUrl = inputRef.current.value
        if (isValidUrl(newUrl)) {
            setUrl(newUrl)
        }
    }, 500)

    const handleBackSpace = e => {
        const selectionStart = e.target.selectionStart
        const lastSlashIndex = e.target.value.lastIndexOf('/')
        if (e.keyCode === 8 && selectionStart <= lastSlashIndex + 1)
            e.preventDefault()
    }

    const saveToggleRef = id => elementRef => {
        tabs.current[id] = elementRef
    }

    const toggleTabs = id => {
        setChosenTab(id)
        for (const value of Object.values(tabs.current)) {
            if (value.id !== id) {
                tabs.current[value.id].setAttribute('data-focused', 'false')
            } else {
                tabs.current[id].setAttribute('data-focused', 'true')
            }
        }
    }

    return (
        <>
            <div>Cities</div>
            <form onSubmit={e => e.preventDefault()}>
                <label>
                    Enter URL:
                    <br />
                    <input
                        type="text"
                        defaultValue={url}
                        ref={inputRef}
                        onChange={handleChange}
                        onKeyDown={handleBackSpace}
                    />
                </label>
            </form>
            <div className="tabbed-set">
                <input
                    className="stv-radio-tab"
                    id="__tabbed_2_1"
                    ref={saveToggleRef('__tabbed_2_1')}
                    onClick={() => toggleTabs('__tabbed_2_1')}
                    data-focused="true"
                    defaultChecked
                    type="radio"
                />
                <label className="tabbed-set-label" htmlFor="__tabbed_2_1">
                    JSON
                </label>
                <input
                    className="stv-radio-tab"
                    id="__tabbed_2_2"
                    ref={saveToggleRef('__tabbed_2_2')}
                    onClick={() => toggleTabs('__tabbed_2_2')}
                    data-focused="false"
                    type="radio"
                />
                <label className="tabbed-set-label" htmlFor="__tabbed_2_2">
                    curl
                </label>
                <input
                    className="stv-radio-tab"
                    id="__tabbed_2_3"
                    ref={saveToggleRef('__tabbed_2_3')}
                    onClick={() => toggleTabs('__tabbed_2_3')}
                    data-focused="false"
                    type="radio"
                />
                <label className="tabbed-set-label" htmlFor="__tabbed_2_3">
                    python
                </label>
                <input
                    className="stv-radio-tab"
                    id="__tabbed_2_4"
                    type="radio"
                    ref={saveToggleRef('__tabbed_2_4')}
                    onClick={() => toggleTabs('__tabbed_2_4')}
                    data-focused="false"
                />
                <label className="tabbed-set-label" htmlFor="__tabbed_2_4">
                    node
                </label>
            </div>
            <pre ref={prismPre} className="prism-pre" data-visible="false">
                {/* Put the conditional here, tie it to useState/useEffect */}
                {/* TODO: change this to use && syntax for multiple conditions */}
                {chosenTab === '__tabbed_2_1' ? (
                    <code
                        ref={prismCode}
                        data-visible="false"
                        className="language-json prism-code"
                        key={JSON.stringify(json)}
                    >
                        <div>
                            {json.map(jso => (
                                <div key={jso.id}>
                                    {JSON.stringify(jso, null, '\t')}
                                </div>
                            ))}
                        </div>
                    </code>
                ) : (
                    <code
                        ref={prismCode}
                        data-visible="false"
                        className="language-json prism-code"
                        key={JSON.stringify(json)}
                    >
                        <div>
                            <div>{JSON.stringify({ msg: 'hello' })}</div>
                        </div>
                    </code>
                )}
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

Cities.propTypes = {
    blur: PropTypes.bool,
}

export default Cities
