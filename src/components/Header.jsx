import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-hero">
      <div className="container-fluid py-2">
        <Link className="navbar-brand brand-badge" to="/">
          SJF · FIFO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/input">Input</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/results">Results</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
