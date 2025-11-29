function GanttChart({ gantt, title }) {
  if (!gantt || gantt.length === 0) return null

  const maxTime = Math.max(...gantt.map(g => g.end))
  const colors = ['#ffd200', '#ffb300', '#ff8c00', '#ffa500', '#ffca2c']

  return (
    <div className="card accent mb-3">
      <div className="card-header bg-yellow-gradient">
        <h4 className="h5 mb-0 fw-bold">{title}</h4>
      </div>
      <div className="card-body">
        <div className="d-flex align-items-center mb-2" style={{ minHeight: '80px' }}>
          {gantt.map((g, idx) => {
            const width = ((g.end - g.start) / maxTime) * 100
            return (
              <div
                key={idx}
                className="text-center fw-bold d-flex flex-column justify-content-center"
                style={{
                  width: `${width}%`,
                  height: '60px',
                  backgroundColor: colors[idx % colors.length],
                  border: '2px solid #0b0b0b',
                  borderRadius: '4px',
                  marginRight: idx < gantt.length - 1 ? '4px' : '0',
                  color: '#0b0b0b'
                }}
              >
                <div>P{g.id}</div>
                <div className="small">{g.end - g.start}</div>
              </div>
            )
          })}
        </div>
        <div className="d-flex align-items-center text-dark fw-bold small">
          {gantt.map((g, idx) => {
            const width = ((g.end - g.start) / maxTime) * 100
            return (
              <div
                key={idx}
                style={{
                  width: `${width}%`,
                  marginRight: idx < gantt.length - 1 ? '4px' : '0',
                  textAlign: 'left'
                }}
              >
                {g.start}
              </div>
            )
          })}
          <div style={{ marginLeft: '4px' }}>{gantt[gantt.length - 1].end}</div>
        </div>
      </div>
    </div>
  )
}

export default GanttChart
