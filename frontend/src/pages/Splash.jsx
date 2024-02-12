import { Link } from 'react-router-dom'
import '../css/Splash.css'

export default function Splash() {
    const theme = localStorage.getItem('data-citystats-theme')
    return (
        <>
            <section data-citystats-theme={theme} className="home-hero">
                <div data-citystats-theme={theme} className="container">
                    <h1 data-citystats-theme={theme} className="title">
                        CityStats API
                    </h1>
                    <span data-citystats-theme={theme} className="subtitle">
                        Get Statistics On US States And Cities
                    </span>
                    <Link
                        data-citystats-theme={theme}
                        className="link"
                        to="/states"
                    >
                        Click Here To Get Started
                    </Link>
                </div>
            </section>
            <section>
                <h2 className="splash-h2">What Is CityStats?</h2>
                <p className="splash-p">
                    CityStats is a minimal API for accessing data on all 50 US
                    States and the top 330 most populous US Cities. Publicly
                    available to all, CityStats aims to provide up to date data
                    and statistics in a programmatically-accessible format that
                    can be utilized and integrated into educational and research
                    projects.
                </p>
                <p className="splash-p">
                    Aggregating and integrating data from multiple local
                    government websites as well as publicly available resources
                    like{' '}
                    <a
                        className="inline-link"
                        data-citystats-theme={theme}
                        aria-label="A Link To Wikipedia"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="link"
                        href="https://wikipedia.org"
                    >
                        Wikipedia
                    </a>
                    , CityStats provides it&#39;s user with a simple API with
                    which to interface using their programming language of
                    choice.
                </p>
            </section>
            <section>
                <h2 className="splash-h2">About CityStats</h2>
                <p className="splash-p">
                    CityStats was created by the web developer,{' '}
                    <a
                        className="inline-link"
                        data-citystats-theme={theme}
                        aria-label="A Link To brianhayes.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="link"
                        href="https://brianhayes.dev"
                    >
                        Brian Hayes
                    </a>
                    , who created CityStats out of a desire for a simple
                    interface to access aggregated data about both State and
                    Local governments.
                </p>
                <p className="splash-p">
                    CityStats is a Free and Open Source Project. If you wish to
                    contribute, report a bug, contribute to, or fork the
                    project, you can find it&#39;s source code over on{' '}
                    <a
                        className="inline-link"
                        data-citystats-theme={theme}
                        aria-label="A Link to CityStats Github Repository"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="link"
                        href="https://github.com/tomit4/city_stats_v2"
                    >
                        Github
                    </a>
                    .
                </p>
                <p className="splash-p">
                    Under the hood, CityStats is written primarily in
                    JavaScript, but Python is utilized as well to aggregate data
                    from publicly available sources. Specifically, CityStats
                    utilizes the{' '}
                    <a
                        className="inline-link"
                        data-citystats-theme={theme}
                        aria-label="A Link to the Fastify Website"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="link"
                        href="https://fastify.dev"
                    >
                        Fastify
                    </a>{' '}
                    framework, the{' '}
                    <a
                        className="inline-link"
                        data-citystats-theme={theme}
                        aria-label="A Link to the React Website"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="link"
                        href="https://react.dev"
                    >
                        React
                    </a>{' '}
                    library, and Python&#39;s{' '}
                    <a
                        className="inline-link"
                        data-citystats-theme={theme}
                        aria-label="A Link to the Python Beaitful Soup Documentation"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="link"
                        href="https://beautiful-soup-4.readthedocs.io/en/latest/"
                    >
                        Beautiful Soup
                    </a>{' '}
                    library.
                </p>
            </section>
            <section>
                <h2 className="splash-h2">How Do I Use CityStats?</h2>
                <p className="splash-p">
                    The developers of CityStats assume its users to have a basic
                    understanding of programming concepts when it comes to data
                    fetching. That said, CityStats is a very minimal API and is
                    relatively easy to get started. The best place to start is
                    by reading{' '}
                    <Link
                        data-citystats-theme={theme}
                        className="inline-link"
                        to="/states"
                    >
                        The Docs
                    </Link>
                    .
                </p>
            </section>
            <section>
                <h1 data-citystats-theme={theme} className="disclaimer-h1">
                    Disclaimer
                </h1>
                <aside>
                    <p data-citystats-theme={theme}>
                        The information provided by the CityStats API is for
                        informational purposes only. While we strive to ensure
                        the accuracy and reliability of the data, we make no
                        representations or warranties of any kind, express or
                        implied, about the completeness, accuracy, reliability,
                        suitability, or availability with respect to the API or
                        the information contained therein. Any reliance you
                        place on such information is therefore strictly at your
                        own risk. In no event will we be liable for any loss or
                        damage including without limitation, indirect or
                        consequential loss or damage, or any loss or damage
                        whatsoever arising from loss of data or profits arising
                        out of, or in connection with, the use of this API. By
                        using the CityStats API, you acknowledge and agree that
                        the data provided may contain inaccuracies or errors,
                        and you are solely responsible for any actions you take
                        based on the information obtained through the API. We
                        disclaim any responsibility for the accuracy or
                        reliability of the data and shall not be held liable for
                        any damages resulting from the use of or inability to
                        use the API. Furthermore, please note that the CityStats
                        API is provided on an "as is" and "as available" basis,
                        without any warranties of any kind, either express or
                        implied, including but not limited to the implied
                        warranties of merchantability, fitness for a particular
                        purpose, or non-infringement. We reserve the right to
                        modify, suspend, or discontinue the API at any time
                        without prior notice. Your use of the API constitutes
                        acceptance of these terms and conditions. This API is
                        licensed under the{' '}
                        <a
                            className="inline-link"
                            data-citystats-theme={theme}
                            aria-label="A Link to The Linux Foundation's page on the BSD-3-Clause-Clear License"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="link"
                            href="https://spdx.org/licenses/BSD-3-Clause-Clear.html"
                        >
                            BSD-3-Clause-Clear license
                        </a>{' '}
                        .
                    </p>
                </aside>
            </section>
        </>
    )
}
