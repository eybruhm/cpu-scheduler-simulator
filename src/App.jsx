import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import InputPage from './pages/InputPage'
import ResultsPage from './pages/ResultsPage'

function App() {
  console.log('App component rendering...')
  return (
    <BrowserRouter>
      <div className="app-background" />
      <Header />
      <div style={{minHeight: '70vh'}}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
