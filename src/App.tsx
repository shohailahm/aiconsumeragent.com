import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Layout'
import Footer from './components/Footer'
import Home from './pages/Home'
import DownloadPage from './pages/DownloadPage'
import FaqPage from './pages/FaqPage'
import { trackPageView } from './utils/analytics'
import { syncZarazContext } from './utils/zaraz'

const RouteTelemetry = () => {
  const location = useLocation()
  const lastTrackedKey = useRef('')

  useEffect(() => {
    const routeLabel =
      location.pathname === '/'
        ? 'home'
        : location.pathname.startsWith('/download')
          ? 'download'
          : location.pathname.replace(/^\//, '') || 'home'

    const trackingKey = `${location.pathname}${location.search}`
    if (lastTrackedKey.current === trackingKey) {
      return
    }

    lastTrackedKey.current = trackingKey
    syncZarazContext()
    trackPageView(routeLabel, {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    })
  }, [location.pathname, location.search])

  return null
}

const ScrollManager = () => {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const hashId = decodeURIComponent(location.hash.slice(1))
    const scrollToHash = () => {
      const target = document.getElementById(hashId)
      if (!target) {
        return false
      }
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return true
    }

    if (scrollToHash()) {
      return
    }

    // When navigating between routes, the target section can appear after paint.
    const rafId = requestAnimationFrame(() => {
      if (!scrollToHash()) {
        window.setTimeout(scrollToHash, 120)
      }
    })

    return () => cancelAnimationFrame(rafId)
  }, [location.pathname, location.hash])

  return null
}

const App = () => {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-wa-teal selection:text-white bg-white dark:bg-wa-dark-bg dark:text-white transition-colors duration-500">
        <RouteTelemetry />
        <ScrollManager />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/qa" element={<FaqPage />} />
            <Route path="/questions" element={<FaqPage />} />
            <Route path="/download" element={<DownloadPage />} />
            {/* Redirect /downloads to /download for better UX */}
            <Route path="/downloads" element={<DownloadPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
