import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Layout'
import Footer from './components/Footer'
import Home from './pages/Home'
import DownloadPage from './pages/DownloadPage'
import DemoModal from './components/DemoModal'
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

const App = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => setIsDemoModalOpen(false);

  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-wa-teal selection:text-white bg-white dark:bg-wa-dark-bg dark:text-white transition-colors duration-500">
        <RouteTelemetry />
        <Navbar onDemoClick={openDemoModal} />
        <main>
          <Routes>
            <Route path="/" element={<Home onDemoClick={openDemoModal} />} />
            <Route path="/download" element={<DownloadPage />} />
            {/* Redirect /downloads to /download for better UX */}
            <Route path="/downloads" element={<DownloadPage />} />
          </Routes>
        </main>
        <Footer />
        <DemoModal isOpen={isDemoModalOpen} onClose={closeDemoModal} />
      </div>
    </Router>
  )
}

export default App
