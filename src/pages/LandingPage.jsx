import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

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

  const handleStartSimulation = () => navigate('/input')

  return (
    <div className="container py-5">
      {/* Hero */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-lg-10 text-center" data-anim>
          <div className="hero-card p-5 rounded shadow-lg anim-fade-scale text-shadow">
            <h1 className="display-3 fw-bold mb-2">CPU Scheduling Simulator</h1>
            <h2 className="h2 fw-bold mb-0">SJF vs. FIFO</h2>
          </div>
        </div>
      </div>

      {/* Academic Details + Group Details side by side */}
      <div className="row justify-content-center g-4">
        {/* Academic Details */}
        <div className="col-12 col-lg-6" data-anim>
          <div className="card accent equal-card anim-fade-up h-100">
            <div className="card-header bg-yellow-gradient">
              <h3 className="h4 mb-0 fw-bold">Course Information</h3>
            </div>
            <div className="card-body">
              <p className="mb-2"><strong>Course Title:</strong> Algorithms and Complexity</p>
              <p className="mb-2"><strong>Course Code:</strong> AL101</p>
              <p className="mb-2"><strong>Professor:</strong> Mr. Melchor Erise</p>
              <p className="mb-2"><strong>Week 17:</strong> Presentation of the created software used for CPU Scheduling Algorithm</p>
            </div>
          </div>
        </div>

        {/* Group Details */}
        <div className="col-12 col-lg-6" data-anim>
          <div className="card accent equal-card anim-fade-up h-100">
            <div className="card-header bg-yellow-gradient">
              <h3 className="h4 mb-0 fw-bold">Group Information</h3>
            </div>
            <div className="card-body">
              <p className="mb-2"><strong>Leader:</strong> Caguioa, Nicole</p>
              <p className="mb-2"><strong>Members:</strong></p>
              <ul className="ms-3 mb-0">
                <li>Bolito, Jashley Denzel</li>
                <li>Borras, Lance Harvey</li>
                <li>Guiñarez, Whn</li>
                <li>Jusayan, Christel Joyce</li>
                <li>Lingcopines, Rodel Jr.</li>
                <li>Mora, Abram Luke</li>
                <li>Villero, Achilles</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="row justify-content-center mt-4">
        <div className="col-lg-8 text-center" data-anim>
          <div className="card accent anim-fade-up">
            <div className="card-body">
              <h3 className="h5 mb-3 fw-bold">Canva Presentation</h3>
              <div
                className="d-inline-block mb-4"
                style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '16px',
                  border: '4px solid #0b0b0b',
                  background: 'linear-gradient(135deg, #fffbe6, #ffe58f)',
                  overflow: 'hidden'
                }}
              >
                {/* QR image placeholder: replace `src` when ready */}
                <img src={null} alt="QR Code" style={{width:'100%', height:'100%', objectFit:'cover', display: 'none'}} />
                <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <span className="text-muted">QR Code Here</span>
                </div>
              </div>
              <div>
                <button className="btn btn-cta btn-lg px-5 py-3 fw-bold" onClick={handleStartSimulation}>
                  Start Simulation →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
