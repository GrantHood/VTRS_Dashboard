"use client"

import { Clock, Zap } from "lucide-react"

const history = [
  { id: 1, event: "Event 1", date: "Today", time: "2:34 PM", status: "completed" },
  { id: 2, event: "Event 3", date: "Today", time: "1:15 PM", status: "completed" },
  { id: 3, event: "Event 2", date: "Today", time: "11:45 AM", status: "delayed" },
  { id: 4, event: "Event 5", date: "Yesterday", time: "9:30 PM", status: "completed" },
  { id: 5, event: "Event 1", date: "Yesterday", time: "6:20 PM", status: "completed" },
  { id: 6, event: "Event 4", date: "Yesterday", time: "3:10 PM", status: "completed" },
  { id: 7, event: "Event 2", date: "Apr 27", time: "8:00 AM", status: "completed" },
]

export function HistoryPanel() {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <Clock className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Event History</h2>
          <p className="text-sm text-muted-foreground">Past event activations</p>
        </div>
      </div>

      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
        <div className="divide-y divide-border/50">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{item.event}</p>
                <p className="text-xs text-muted-foreground">
                  {item.date} at {item.time}
                </p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  item.status === "completed"
                    ? "bg-primary/10 text-primary"
                    : "bg-chart-3/10 text-chart-3"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
