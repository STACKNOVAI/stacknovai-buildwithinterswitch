import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import FindDoctor from './pages/FindDoctor.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [aiResult, setAiResult] = useState(null)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'landing'
      setCurrentPage(hash)
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (page) => {
    setCurrentPage(page)
    window.location.hash = page
  }

  const handleProceedToDoctor = (result) => {
    setAiResult(result)
    setCurrentPage('find-doctor')
    window.location.hash = 'find-doctor'
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login />
      case 'signup':
        return <Signup />
      case 'dashboard':
        return (
          <Home onProceedToDoctor={handleProceedToDoctor} />
        )
      case 'find-doctor':
        return (
          <FindDoctor
            aiResult={aiResult}
            onBack={() => navigate('dashboard')}
            onConsult={(doctor, result) => {
              console.log("Starting consult with:", doctor, result)
              // navigate to consultation page next
            }}
          />
        )
      default:
        return <LandingPage />
    }
  }

  return renderPage()
}

export default App