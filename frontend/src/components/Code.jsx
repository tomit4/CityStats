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
    const { entity, fields, subFields, componentId } = props
    const { string, regex, canDelUpTo, minLength } = props.urlParser
    const tabId1 = `${componentId}__tabbed_1`
    const tabId2 = `${componentId}__tabbed_2`
    const tabId3 = `${componentId}__tabbed_3`
    const tabId4 = `${componentId}__tabbed_4`
    const [lang, setLang] = useState('language-json')
    const [url, setUrl] = useState(string)
    const [errMsg, setErrMsg] = useState('')
    const { hostname, pathname } = new URL(url)
    const { bashCode, pythonCode, javascriptCode } = codeSnippets
    const prismPre = useRef(null)
    const prismCode = useRef(null)
    const inputRef = useRef(null)
    const tabs = useRef({})
    const [chosenTab, setChosenTab] = useState(tabId1)
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
                if (errMsg.length) throw new Error(errMsg)
                const cachedData = localStorage.getItem(`${entity}-${url}`)
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData)
                    setReturnCode(JSON.stringify(parsedData, null, '\t'))
                } else {
                    const response = await fetch(url)
                    if (!response.ok)
                        throw new Error(`${entity} data not found!`)
                    const data = await response.json()
                    const dataToReturn = data.length > 1 ? data : data[0]
                    localStorage.setItem(
                        `${entity}-${url}`,
                        JSON.stringify(dataToReturn),
                    )
                    setReturnCode(JSON.stringify(dataToReturn, null, '\t'))
                }
            } catch (err) {
                console.error('ERROR fetching data :=>', err)
                setReturnCode(JSON.stringify({ error: err.message }))
            }
        }
        getEntity()
    }, [
        errMsg,
        entity,
        url,
        hostname,
        pathname,
        lang,
        bashCode,
        pythonCode,
        javascriptCode,
    ])

    const _isValidUrl = (urlPattern, inputUrl, minLength) => {
        return inputUrl.length >= minLength && urlPattern.test(inputUrl)
    }

    const handleChange = debounce(() => {
        setErrMsg('')
        const newUrl = inputRef.current.value
        const lastField = newUrl.split('/')[newUrl.split('/').length - 1]
        if (fields.length && !fields.includes(lastField))
            setErrMsg('Field is not part of API')
        if (subFields.length && !subFields.includes(lastField))
            setErrMsg('Queried subfield is not part of API')
        if (!_isValidUrl(regex, newUrl, minLength))
            setErrMsg('Url is not valid!')
        setUrl(newUrl)
    }, 500)

    const handleBackSpace = e => {
        const { selectionStart } = e.target
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
    const handleEnterKeyPress = (e, tabId) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleTabs(tabId)
        }
    }
    return (
        <>
            <form onSubmit={e => e.preventDefault()}>
                <label className="form-label" htmlFor="url-input">
                    Enter URL:
                    <br />
                    <input
                        type="text"
                        id="url-input"
                        className="url-input"
                        defaultValue={url}
                        ref={inputRef}
                        onChange={handleChange}
                        onKeyDown={handleBackSpace}
                        aria-label="Enter URL"
                    />
                </label>
            </form>
            <div className="code-block-set">
                <div className="tabbed-set">
                    <input
                        className="stv-radio-tab"
                        id={tabId1}
                        ref={saveTabRef(tabId1)}
                        onClick={() => toggleTabs(tabId1)}
                        onKeyDown={e => handleEnterKeyPress(e, tabId1)}
                        data-focused="true"
                        type="radio"
                        defaultChecked
                        tabIndex="0"
                    />
                    <label className="tabbed-set-label" htmlFor={tabId1}>
                        JSON
                    </label>
                    <input
                        className="stv-radio-tab"
                        id={tabId2}
                        ref={saveTabRef(tabId2)}
                        onClick={() => toggleTabs(tabId2)}
                        onKeyDown={e => handleEnterKeyPress(e, tabId2)}
                        data-focused="false"
                        type="radio"
                        tabIndex="0"
                    />
                    <label className="tabbed-set-label" htmlFor={tabId2}>
                        curl
                    </label>
                    <input
                        className="stv-radio-tab"
                        id={tabId3}
                        ref={saveTabRef(tabId3)}
                        onClick={() => toggleTabs(tabId3)}
                        onKeyDown={e => handleEnterKeyPress(e, tabId3)}
                        data-focused="false"
                        type="radio"
                        tabIndex="0"
                    />
                    <label className="tabbed-set-label" htmlFor={tabId3}>
                        python
                    </label>
                    <input
                        className="stv-radio-tab"
                        id={tabId4}
                        ref={saveTabRef(tabId4)}
                        onClick={() => toggleTabs(tabId4)}
                        onKeyDown={e => handleEnterKeyPress(e, tabId4)}
                        data-focused="false"
                        type="radio"
                        tabIndex="0"
                    />
                    <label className="tabbed-set-label" htmlFor={tabId4}>
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
    entity: PropTypes.string,
    blur: PropTypes.bool,
    urlParser: PropTypes.object,
    fields: PropTypes.array,
    subFields: PropTypes.array,
    componentId: PropTypes.number,
}

export default Code
