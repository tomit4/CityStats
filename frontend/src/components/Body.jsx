import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Splash from '../pages/Splash.jsx'
import States from '../pages/States.jsx'
import Cities from '../pages/Cities.jsx'
import NotFound from '../pages/NotFound.jsx'

const Body = props => {
    const content = useRef(null)
    const h1 = useRef(null)
    const h2 = useRef(null)

    useEffect(() => {
        content.current.setAttribute('data-visible', props.blur)
        h1.current.setAttribute('data-visible', props.blur)
        h2.current.setAttribute('data-visible', props.blur)
    }, [props])

    const closeSideBar = () => {
        if (props.blur === props.sidebar) return
        props.blurIt()
        props.showSidebar()
    }
    return (
        <>
            <div
                onClick={closeSideBar}
                onKeyUp={closeSideBar}
                className="content"
                ref={content}
                data-visible="false"
            >
                <main>
                    <article>
                        <h1 ref={h1}>citystats.info</h1>
                        <h2 ref={h2}>
                            The API For USA State And City Statistics
                        </h2>
                        <Routes>
                            <Route
                                path="/states"
                                element={<States blur={props.blur} />}
                            />
                            <Route
                                path="/cities"
                                element={<Cities blur={props.blur} />}
                            />
                            <Route path="/" element={<Splash />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </article>
                </main>
            </div>
        </>
    )
}

Body.propTypes = {
    blur: PropTypes.bool,
    sidebar: PropTypes.bool,
    showSidebar: PropTypes.func,
    blurIt: PropTypes.func,
}

export default Body
