import { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
// import './css/prism_solarized_light/prism.css'
import './css/prism_okaidia/prism.css'
import { debounce } from 'lodash'

const Cities = props => {
    const [lang, setLang] = useState('language-json')
    const [url, setUrl] = useState('https://citystats.xyz/cities/1')
    const { hostname, pathname } = new URL(url)
    const prismPre = useRef(null)
    const prismCode = useRef(null)
    const inputRef = useRef(null)
    const tabs = useRef({})
    const [chosenTab, setChosenTab] = useState('__tabbed_2_1')
    const [returnCode, setReturnCode] = useState('')
    const bashCode = `#!/usr/bin/env bash\n\ncurl "${url}" \\\n\t-H "Accept: application/json" | jq`
    const pythonCode = `import requests\nimport json\n\nurl = ${url}\nheaders = {"Accept": "application/json}\n\nresponse = requests.get(url, headers=headers)\n\nif response.status_code == 200:\n    data = response.json()\n    formatted_data = json.dumps(data, indent=4)\n    print(formatted_data)\nelse:\n    print("Failed to fetch data:", response.status_code)`
    const javascriptCode = `const https = require("https");\nconst util = require("util");\n\nconst options = {\n  hostname: "${hostname}",\n  path: "${pathname}",\n  method: "GET",\n  headers: {\n    Accept: "application/json",\n  },\n};\n\nconst req = https.request(options, (res) => {\n  let data = "";\n\n  res.on("data", (chunk) => {\n    data += chunk;\n  });\n\n  res.on("end"), () => {\n    try {\n      const jsonData = JSON.parse(data);\n      console.log(util.insepct(jsonData, { colors: true, depth: null}));\n    } catch (error) {\n      console.error("Error parsing JSON:", error.message);\n    }\n  });\n});\n\nreq.on("error", (error) => {\n  console.error("Error fetching data:", error.message);\n});\n\nreq.end();`

    useEffect(() => {
        Prism.highlightAll()
        Prism.languages.bash = Prism.languages.extend('clike', {})
        Prism.languages.python = Prism.languages.extend('clike', {})
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
        if (lang !== 'language-json') {
            if (lang === 'language-bash') {
                return setReturnCode(bashCode)
            }
            if (lang === 'language-python') {
                return setReturnCode(pythonCode)
            }
            if (lang === 'language-javascript') {
                return setReturnCode(javascriptCode)
            }
        }
        if (lang.length || lang === 'language-json') {
            if (lang === 'language-json') {
                const getEntity = async () => {
                    try {
                        const response = await fetch(url)
                        if (!response.ok)
                            throw new Error('City data not found!')
                        const data = await response.json()
                        setReturnCode(JSON.stringify(data[0], null, '\t'))
                    } catch (err) {
                        console.error('ERROR fetching data :=>', err)
                        setReturnCode('uh oh...')
                    }
                }
                getEntity()
            }
        }
    }, [url, lang, pythonCode, bashCode, javascriptCode])

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

    const saveTabRef = id => elementRef => {
        tabs.current[id] = elementRef
    }

    const _setPrismLang = tabId => {
        switch (tabId) {
            case 2:
                setLang('language-bash')
                break
            case 3:
                setLang('language-python')
                break
            case 4:
                setLang('language-javascript')
                break
            default:
                setLang('language-json')
        }
    }

    const toggleTabs = id => {
        const tabId = Number(id.split('').pop())
        _setPrismLang(tabId)
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
                    ref={saveTabRef('__tabbed_2_1')}
                    onClick={() => toggleTabs('__tabbed_2_1')}
                    data-focused="true"
                    type="radio"
                    defaultChecked
                />
                <label className="tabbed-set-label" htmlFor="__tabbed_2_1">
                    JSON
                </label>
                <input
                    className="stv-radio-tab"
                    id="__tabbed_2_2"
                    ref={saveTabRef('__tabbed_2_2')}
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
                    ref={saveTabRef('__tabbed_2_3')}
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
                    ref={saveTabRef('__tabbed_2_4')}
                    onClick={() => toggleTabs('__tabbed_2_4')}
                    data-focused="false"
                />
                <label className="tabbed-set-label" htmlFor="__tabbed_2_4">
                    node
                </label>
            </div>
            <pre ref={prismPre} className="prism-pre" data-visible="false">
                <code
                    ref={prismCode}
                    data-visible="false"
                    className={`${lang} prism-code`}
                    key={returnCode}
                >
                    <div>{returnCode}</div>
                </code>
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
