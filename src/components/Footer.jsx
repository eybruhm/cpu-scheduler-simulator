function Footer() {
  return (
    <footer className="bg-dark text-warning text-center py-4 mt-5">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} CPU Scheduling Simulator Project
        </p>
        <p className="small mb-0">
          Built with React & Vite | SJF vs. FIFO Comparison
        </p>
      </div>
    </footer>
  )
}

export default Footer
