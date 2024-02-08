import { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import { codeSnippets } from '../utils/code_snippets'
import { debounce } from 'lodash'

const Code = props => {
    const [lang, setLang] = useState('language-json')
    const [url, setUrl] = useState(props.url.string)
    const { hostname, pathname } = new URL(url)
    const { bashCode, pythonCode, javascriptCode } = codeSnippets
    const prismPre = useRef(null)
    const prismCode = useRef(null)
    const inputRef = useRef(null)
    const tabs = useRef({})
    const [chosenTab, setChosenTab] = useState('__tabbed_2_1')
    const [returnCode, setReturnCode] = useState('')

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
        if (lang !== 'language-json') {
            if (lang === 'language-bash') return setReturnCode(bashCode(url))
            if (lang === 'language-python')
                return setReturnCode(pythonCode(url))
            if (lang === 'language-javascript')
                return setReturnCode(javascriptCode(hostname, pathname))
        }
        const getEntity = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) throw new Error('City data not found!')
                const data = await response.json()
                const dataToReturn = data.length > 1 ? data : data[0]
                setReturnCode(JSON.stringify(dataToReturn, null, '\t'))
            } catch (err) {
                console.error('ERROR fetching data :=>', err)
                setReturnCode(JSON.stringify({ error: err.message }))
            }
        }
        getEntity()
    }, [url, hostname, pathname, lang, bashCode, pythonCode, javascriptCode])

    const _isValidUrl = (
        urlPattern,
        inputUrl,
        minLength,
        fieldsToSearch = [],
    ) => {
        if (fieldsToSearch.length) {
            for (const field of fieldsToSearch) {
                if (!props.fields.includes(field)) return false
            }
        }
        return inputUrl.length >= minLength && urlPattern.test(inputUrl)
    }

    const handleChange = debounce(() => {
        const newUrl = inputRef.current.value
        const { regex, minLength } = props.url
        if (_isValidUrl(regex, newUrl, minLength)) setUrl(newUrl)
    }, 500)

    const handleBackSpace = e => {
        const selectionStart = e.target.selectionStart
        const { canDelUpTo } = props.url
        if (e.keyCode === 8 && selectionStart <= canDelUpTo) e.preventDefault()
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
            if (value.id !== id)
                tabs.current[value.id].setAttribute('data-focused', 'false')
            else tabs.current[id].setAttribute('data-focused', 'true')
        }
    }

    return (
        <>
            <form onSubmit={e => e.preventDefault()}>
                <label className="form-label">
                    Enter URL:
                    <br />
                    <input
                        type="text"
                        className="url-input"
                        defaultValue={url}
                        ref={inputRef}
                        onChange={handleChange}
                        onKeyDown={handleBackSpace}
                    />
                </label>
            </form>
            <div className="code-block-set">
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
            </div>
        </>
    )
}

Code.propTypes = {
    blur: PropTypes.bool,
    url: PropTypes.object,
    fields: PropTypes.array,
}

export default Code
