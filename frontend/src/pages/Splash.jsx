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
                    , CityStats provides it&#39;s user with a simple API
                    interface with which to interface using their programming
                    language of choice.
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
                    Using CityStats assumes it&#39;s users have a basic
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
        </>
    )
}
