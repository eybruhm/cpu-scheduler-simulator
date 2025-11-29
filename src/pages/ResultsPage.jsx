import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateSJF } from '../utils/sjf_logic'
import { calculateFIFO } from '../utils/fifo_logic'
import MetricsTable from '../components/MetricsTable'
import GanttChart from '../components/GanttChart'

function ResultsPage() {
  const navigate = useNavigate()
  const [sjfResults, setSjfResults] = useState(null)
  const [fifoResults, setFifoResults] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('revealed')
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-anim]')?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    console.log('ResultsPage useEffect running...')
    const data = localStorage.getItem('processes')
    console.log('Retrieved data from localStorage:', data)
    
    if (!data) {
      console.log('No data found, NOT redirecting to allow viewing')
      return
    }
    
    try {
      const processes = JSON.parse(data)
      console.log('Parsed processes:', processes)
      
      if (!processes || processes.length === 0) {
        console.log('Empty processes array')
        return
      }
      
      const sjf = calculateSJF(processes)
      const fifo = calculateFIFO(processes)
      
      console.log('SJF results:', sjf)
      console.log('FIFO results:', fifo)
      
      setSjfResults(sjf)
      setFifoResults(fifo)
    } catch (error) {
      console.error('Error loading results:', error)
    }
  }, [navigate])

  if (!sjfResults || !fifoResults) {
    return (
      <div className="container py-5" style={{minHeight: '80vh'}}>
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-lg-10 text-center">
            <div className="hero-card p-4 rounded shadow-lg" style={{backgroundColor: '#fff8d6', border: '3px solid #0b0b0b'}}>
              <h1 className="display-4 fw-bold mb-0" style={{color: '#0b0b0b'}}>Results</h1>
              <p className="lead mb-0" style={{color: '#0b0b0b'}}>No data available</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="card" style={{backgroundColor: '#fff8d6', border: '3px solid #0b0b0b'}}>
              <div className="card-body p-5">
                <h2 className="mb-3" style={{color: '#0b0b0b'}}>No simulation data found</h2>
                <p className="mb-4" style={{color: '#0b0b0b'}}>Please run a simulation first by entering process data.</p>
                <button 
                  className="btn btn-lg px-5 py-3 fw-bold"
                  style={{
                    background: 'linear-gradient(135deg, #ffd200, #ff8c00)',
                    color: '#0b0b0b',
                    border: '2px solid #0b0b0b'
                  }}
                  onClick={() => navigate('/input')}
                >
                  Go to Input Page →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const sjfWinner = parseFloat(sjfResults.avgWT) <= parseFloat(fifoResults.avgWT)
  
  console.log('Rendering results with sjfWinner:', sjfWinner)

  return (
    <div className="container py-5" style={{opacity: 1, visibility: 'visible'}}>
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-lg-10 text-center">
          <div className="hero-card p-4 rounded shadow-lg" style={{backgroundColor: '#fff8d6', border: '3px solid #0b0b0b'}}>
            <h1 className="display-4 fw-bold mb-0" style={{color: '#0b0b0b'}}>Results</h1>
            <p className="lead mb-0" style={{color: '#0b0b0b'}}>SJF vs. FIFO Comparison</p>
          </div>
        </div>
      </div>

      {/* SJF and FIFO side by side */}
      <div className="row g-4 mb-4" style={{opacity: 1, visibility: 'visible'}}>
        <div className="col-lg-6">
          <h3 className="h4 fw-bold mb-3 text-dark">SJF (Shortest Job First)</h3>
          <GanttChart gantt={sjfResults.gantt} title="SJF Gantt Chart" />
          <MetricsTable processes={sjfResults.processes} title="SJF Metrics" />
        </div>
        <div className="col-lg-6">
          <h3 className="h4 fw-bold mb-3 text-dark">FIFO (First-In-First-Out)</h3>
          <GanttChart gantt={fifoResults.gantt} title="FIFO Gantt Chart" />
          <MetricsTable processes={fifoResults.processes} title="FIFO Metrics" />
        </div>
      </div>

      {/* Comparison Table */}
      <div className="row justify-content-center" style={{opacity: 1, visibility: 'visible'}}>
        <div className="col-lg-10">
          <div className="card" style={{backgroundColor: '#fff8d6', border: '3px solid #0b0b0b'}}>
            <div className="card-header bg-yellow-gradient">
              <h3 className="h4 mb-0 fw-bold">Algorithm Comparison</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-dark table-striped table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Algorithm</th>
                      <th>Average Waiting Time (WT)</th>
                      <th>Average Turnaround Time (TAT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: sjfWinner ? '#ffd20044' : 'transparent' }}>
                      <td className="fw-bold">SJF</td>
                      <td className={sjfWinner ? 'fw-bold text-warning' : ''}>{sjfResults.avgWT}</td>
                      <td>{sjfResults.avgTAT}</td>
                    </tr>
                    <tr style={{ backgroundColor: !sjfWinner ? '#ffd20044' : 'transparent' }}>
                      <td className="fw-bold">FIFO</td>
                      <td className={!sjfWinner ? 'fw-bold text-warning' : ''}>{fifoResults.avgWT}</td>
                      <td>{fifoResults.avgTAT}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert alert-dark mt-3 mb-0">
                <strong>Conclusion:</strong> {sjfWinner ? 'SJF' : 'FIFO'} algorithm achieved lower average waiting time, 
                demonstrating more efficient CPU resource management. This optimization contributes to better system 
                performance and energy efficiency, aligning with SDG 9: Industry, Innovation, and Infrastructure.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-lg-10 text-center">
          <button className="btn btn-cta btn-lg px-5 py-3 fw-bold" onClick={() => navigate('/input')}>
            ← Run Another Simulation
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
