import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Layout'
import Footer from './components/Footer'
import Home from './pages/Home'
import DownloadPage from './pages/DownloadPage'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-wa-teal selection:text-white bg-white dark:bg-wa-dark-bg dark:text-white transition-colors duration-500">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
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
