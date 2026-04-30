"use client"

import { ScrollText, AlertCircle, CheckCircle, Info } from "lucide-react"

const logs = [
  { id: 1, type: "success", message: "Event 1 triggered successfully", time: "2 min ago" },
  { id: 2, type: "info", message: "System health check completed", time: "5 min ago" },
  { id: 3, type: "success", message: "Event 3 triggered successfully", time: "12 min ago" },
  { id: 4, type: "warning", message: "Event 2 response delayed", time: "15 min ago" },
  { id: 5, type: "info", message: "Connection established", time: "20 min ago" },
  { id: 6, type: "success", message: "Settings updated", time: "25 min ago" },
  { id: 7, type: "info", message: "System initialized", time: "30 min ago" },
]

const getLogIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-primary" />
    case "warning":
      return <AlertCircle className="w-4 h-4 text-chart-3" />
    default:
      return <Info className="w-4 h-4 text-muted-foreground" />
  }
}

export function LogsPanel() {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ScrollText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">System Logs</h2>
          <p className="text-sm text-muted-foreground">Real-time activity feed</p>
        </div>
      </div>

      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
        <div className="divide-y divide-border/50">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-4 hover:bg-secondary/30 transition-colors"
            >
              <div className="mt-0.5">{getLogIcon(log.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{log.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
