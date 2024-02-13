import '../css/Footer.css'

export default function Footer() {
    const theme = localStorage.getItem('data-citystats-theme')
    return (
        <>
            <footer>
                <ul data-citystats-theme={theme} className="footer-links-list">
                    <li>
                        <a
                            data-citystats-theme={theme}
                            className="footer-links-list-item footer-icons"
                            id="email-icon"
                            aria-label="email"
                            role="navigation"
                            href="mailto: brianhayes.dev@protonmail.com"
                        />
                        <br />
                        <a
                            data-citystats-theme={theme}
                            className="footer-links-list-item footer-links-text"
                            aria-label="email"
                            role="navigation"
                            href="mailto: brianhayes.dev@protonmail.com"
                        >
                            Email
                        </a>
                    </li>
                    <li>
                        <a
                            data-citystats-theme={theme}
                            className="footer-links-list-item footer-icons"
                            id="git-icon"
                            aria-label="A Link To Creator's Github Profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="link"
                            href="https://github.com/tomit4"
                        />
                        <br />
                        <a
                            data-citystats-theme={theme}
                            className="footer-links-list-item footer-links-text"
                            aria-label="A Link To Creator's Github Profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="link"
                            href="https://github.com/tomit4"
                        >
                            Github
                        </a>
                    </li>
                    <li>
                        <a
                            data-citystats-theme={theme}
                            className="footer-links-list-item footer-icons"
                            id="linkedin-icon"
                            aria-label="A Link To Creator's LinkedIn Profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="link"
                            href="https://linkedin.com/in/brian-hayes-33496067"
                        />
                        <br />
                        <a
                            data-citystats-theme={theme}
                            className="footer-links-list-item footer-links-text"
                            aria-label="A Link To Creator's LinkedIn Profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="link"
                            href="https://linkedin.com/in/brian-hayes-33496067"
                        >
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a
                            data-citystats-theme={theme}
                            className="footer-links-list-item footer-icons"
                            id="blog-icon"
                            aria-label="A Link To The Creator's Website/Blog"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="link"
                            href="https://brianhayes.dev"
                        />
                        <br />
                        <a
                            data-citystats-theme={theme}
                            className="footer-links-list-item footer-links-text"
                            aria-label="A Link To The Creator's Website/Blog"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="link"
                            href="https://brianhayes.dev"
                        >
                            Blog
                        </a>
                    </li>
                    <li>
                        <a
                            data-citystats-theme={theme}
                            className="footer-links-list-item footer-icons"
                            id="mastodon-icon"
                            aria-label="A Link To The Creator's Mastodon Profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="link"
                            href="https://mas.to/@brianhayesdev"
                        />
                        <br />
                        <a
                            data-citystats-theme={theme}
                            className="footer-links-list-item footer-links-text"
                            aria-label="A Link To The Creator's Mastodon Profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="link"
                            href="https://mas.to/@brianhayesdev"
                        >
                            Mastodon
                        </a>
                    </li>
                </ul>
            </footer>
        </>
    )
}
