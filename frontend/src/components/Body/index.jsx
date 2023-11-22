import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import States from '../../pages/States'
import Cities from '../../pages/Cities'

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
                            <Route path="/states" element={<States />} />
                        </Routes>
                        <Routes>
                            <Route path="/cities" element={<Cities />} />
                        </Routes>
                        {/* TODO: Conditionally Render About Page instead of dummy text here */}
                        <p>
                            General Body Info Here, Placeholder. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                        <p>
                            General Body Info Here, Placeholder. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
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
