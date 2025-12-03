import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateSJF } from '../utils/sjf_logic'
import { calculateFCFS } from '../utils/fcfs_logic'

function InputPage() {
  const navigate = useNavigate()

  const [processes, setProcesses] = useState(() => {
    const saved = localStorage.getItem('inputProcesses')
    return saved ? JSON.parse(saved) : [{ id: 1, at: 0, bt: 5 }]
  })
  const [alert, setAlert] = useState(null)

  // Save to localStorage whenever processes change
  useEffect(() => {
    localStorage.setItem('inputProcesses', JSON.stringify(processes))
  }, [processes])

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

  const handleChange = (e, id, field) => {
    const value = e.target.value
    setProcesses(prev => prev.map(p => (
      p.id === id ? { ...p, [field]: value === '' ? '' : Number(value) } : p
    )))
  }

  const addProcess = () => {
    const nextId = processes.length ? Math.max(...processes.map(p => p.id)) + 1 : 1
    setProcesses(prev => [...prev, { id: nextId, at: 0, bt: 1 }])
  }

  const deleteProcess = (id) => {
    setProcesses(prev => prev.filter(p => p.id !== id))
  }

  const validate = () => {
    if (processes.length === 0) {
      return 'Please add at least one process.'
    }
    
    for (const p of processes) {
      // Check for empty fields
      if (p.at === '' || p.bt === '') {
        return `Process P${p.id}: All fields are required.`
      }
      
      // Check if values are numbers
      if (isNaN(p.at) || isNaN(p.bt)) {
        return `Process P${p.id}: Values must be valid numbers.`
      }
      
      // Check for negative values
      if (p.at < 0 || p.bt < 0) {
        return `Process P${p.id}: Values cannot be negative.`
      }
      
      // Check for burst time = 0
      if (p.bt === 0 || p.bt === '0') {
        return `Process P${p.id}: Burst Time must be greater than 0.`
      }
      
      // Check for reasonable limits (prevent huge numbers that could break rendering)
      if (p.at > 10000 || p.bt > 10000) {
        return `Process P${p.id}: Values must be less than 10000.`
      }
    }
    
    return null
  }

  const runSimulation = () => {
    const err = validate()
    if (err) {
      setAlert(err)
      return
    }
    // Persist processes for Results page
    localStorage.setItem('processes', JSON.stringify(processes))
    // Clear input cache after successful run
    localStorage.removeItem('inputProcesses')
    // Quick sanity call (logs only) to confirm imports
    calculateSJF(processes)
    calculateFCFS(processes)
    navigate('/results')
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-lg-10 text-center" data-anim>
          <div className="hero-card p-4 rounded shadow-lg anim-fade-scale text-shadow">
            <h1 className="display-4 fw-bold mb-2">Define Scheduling Processes</h1>
            <p className="lead mb-0">Add, edit, and validate AT/BT</p>
          </div>
        </div>
      </div>

      {alert && (
        <div className="row justify-content-center" data-anim>
          <div className="col-lg-10">
            <div className="alert alert-danger anim-fade-up" role="alert">
              {alert}
            </div>
          </div>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-lg-10" data-anim>
          <div className="card accent anim-fade-up">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-dark table-striped align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Process ID</th>
                      <th scope="col">Arrival Time (AT)</th>
                      <th scope="col">Burst Time (BT)</th>
                      <th scope="col" className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processes.map(p => (
                      <tr key={p.id}>
                        <td><span className="badge bg-yellow-gradient text-dark fw-bold">P{p.id}</span></td>
                        <td style={{maxWidth: 160}}>
                          <input
                            type="number"
                            className="form-control"
                            value={p.at}
                            min={0}
                            onChange={(e) => handleChange(e, p.id, 'at')}
                          />
                        </td>
                        <td style={{maxWidth: 160}}>
                          <input
                            type="number"
                            className="form-control"
                            value={p.bt}
                            min={0}
                            onChange={(e) => handleChange(e, p.id, 'bt')}
                          />
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteProcess(p.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-cta fw-bold" onClick={addProcess}>+ Add Process</button>
                <button className="btn btn-warning fw-bold" onClick={runSimulation}>Run Simulation →</button>
                <button 
                  className="btn btn-outline-danger fw-bold" 
                  onClick={() => {
                    if (confirm('Clear all processes?')) {
                      setProcesses([{ id: 1, at: 0, bt: 5 }])
                      setAlert(null)
                      localStorage.removeItem('inputProcesses')
                    }
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputPage
