"use client"

import { useState } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { DashboardHeader } from "@/components/dashboard-header"
import { EventButtons } from "@/components/event-buttons"
import { LogsPanel } from "@/components/logs-panel"
import { HistoryPanel } from "@/components/history-panel"
import { SettingsPanel } from "@/components/settings-panel"

export type View = "dashboard" | "logs" | "history" | "settings"

export default function SmartHomeDashboard() {
  const [currentView, setCurrentView] = useState<View>("dashboard")

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <DashboardHeader currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-1 flex items-center justify-center p-6">
          {currentView === "dashboard" && <EventButtons />}
          {currentView === "logs" && <LogsPanel />}
          {currentView === "history" && <HistoryPanel />}
          {currentView === "settings" && <SettingsPanel />}
        </main>
      </div>
    </div>
  )
}
