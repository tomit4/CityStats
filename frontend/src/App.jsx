import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './pages/NotFound'
import './styles.css'

export default function App() {
    return (
        <>
            {/* 
            TODO: Address this warning form the console, it comes no matter 
            what route you're using, meaning you're using react-router wrong:

            You rendered descendant <Routes> (or called `useRoutes()`) at "/" 
            (under <Route path="/">) but the parent route path has no trailing "*". 
            This means if you navigate deeper, the parent won't match anymore and 
            therefore the child routes will never render.
            Please change the parent <Route path="/"> to <Route path="*">.
            */}
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="/states" element={<Home />} />
                    <Route path="/cities" element={<Home />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}
