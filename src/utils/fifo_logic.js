export const calculateFIFO = (processes) => {
  // Sort by Arrival Time
  const sorted = [...processes].sort((a, b) => a.at - b.at)
  
  let currentTime = 0
  const results = []
  const gantt = []

  sorted.forEach(p => {
    const startTime = Math.max(currentTime, p.at)
    const completionTime = startTime + p.bt
    const turnaroundTime = completionTime - p.at
    const waitingTime = turnaroundTime - p.bt

    results.push({
      id: p.id,
      at: p.at,
      bt: p.bt,
      ct: completionTime,
      tat: turnaroundTime,
      wt: waitingTime
    })

    gantt.push({
      id: p.id,
      start: startTime,
      end: completionTime
    })

    currentTime = completionTime
  })

  const avgTAT = results.reduce((sum, p) => sum + p.tat, 0) / results.length
  const avgWT = results.reduce((sum, p) => sum + p.wt, 0) / results.length

  return {
    processes: results,
    gantt,
    avgTAT: avgTAT.toFixed(2),
    avgWT: avgWT.toFixed(2)
  }
}
