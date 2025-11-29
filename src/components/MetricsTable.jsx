function MetricsTable({ processes, title }) {
  return (
    <div className="card accent mb-3">
      <div className="card-header bg-yellow-gradient">
        <h4 className="h5 mb-0 fw-bold">{title}</h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Process</th>
                <th>AT</th>
                <th>BT</th>
                <th>CT</th>
                <th>TAT</th>
                <th>WT</th>
              </tr>
            </thead>
            <tbody>
              {processes.map(p => (
                <tr key={p.id}>
                  <td><span className="badge bg-yellow-gradient text-dark fw-bold">P{p.id}</span></td>
                  <td>{p.at}</td>
                  <td>{p.bt}</td>
                  <td>{p.ct}</td>
                  <td>{p.tat}</td>
                  <td>{p.wt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MetricsTable
