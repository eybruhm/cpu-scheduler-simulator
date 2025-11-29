export const calculateSJF = (processes) => {
  let currentTime = 0
  const readyQueue = []
  const uncompletedProcesses = [...processes].sort((a, b) => a.at - b.at)
  const completedProcesses = []
  const gantt = []

  while (uncompletedProcesses.length > 0 || readyQueue.length > 0) {
    // Move arrived processes to ready queue
    while (uncompletedProcesses.length > 0 && uncompletedProcesses[0].at <= currentTime) {
      readyQueue.push(uncompletedProcesses.shift())
    }

    if (readyQueue.length > 0) {
      // Sort by shortest burst time
      readyQueue.sort((a, b) => a.bt - b.bt)
      const selected = readyQueue.shift()

      const startTime = currentTime
      const completionTime = startTime + selected.bt
      const turnaroundTime = completionTime - selected.at
      const waitingTime = turnaroundTime - selected.bt

      completedProcesses.push({
        id: selected.id,
        at: selected.at,
        bt: selected.bt,
        ct: completionTime,
        tat: turnaroundTime,
        wt: waitingTime
      })

      gantt.push({
        id: selected.id,
        start: startTime,
        end: completionTime
      })

      currentTime = completionTime
    } else if (uncompletedProcesses.length > 0) {
      // Advance time to next arrival
      currentTime = uncompletedProcesses[0].at
    }
  }

  const avgTAT = completedProcesses.reduce((sum, p) => sum + p.tat, 0) / completedProcesses.length
  const avgWT = completedProcesses.reduce((sum, p) => sum + p.wt, 0) / completedProcesses.length

  return {
    processes: completedProcesses,
    gantt,
    avgTAT: avgTAT.toFixed(2),
    avgWT: avgWT.toFixed(2)
  }
}
