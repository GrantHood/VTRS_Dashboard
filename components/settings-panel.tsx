"use client"

import { useState } from "react"
import { Settings, Bell, Wifi, Shield, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingToggle {
  id: string
  label: string
  description: string
  icon: React.ElementType
  defaultEnabled: boolean
}

const settings: SettingToggle[] = [
  {
    id: "notifications",
    label: "Push Notifications",
    description: "Receive alerts for event triggers",
    icon: Bell,
    defaultEnabled: true,
  },
  {
    id: "auto-connect",
    label: "Auto Connect",
    description: "Automatically connect to smart devices",
    icon: Wifi,
    defaultEnabled: true,
  },
  {
    id: "security",
    label: "Enhanced Security",
    description: "Require confirmation for sensitive events",
    icon: Shield,
    defaultEnabled: false,
  },
  {
    id: "sounds",
    label: "Sound Effects",
    description: "Play sounds on event activation",
    icon: Volume2,
    defaultEnabled: true,
  },
]

export function SettingsPanel() {
  const [enabledSettings, setEnabledSettings] = useState<Set<string>>(
    new Set(settings.filter((s) => s.defaultEnabled).map((s) => s.id))
  )

  const toggleSetting = (id: string) => {
    setEnabledSettings((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-chart-4/10 flex items-center justify-center">
          <Settings className="w-5 h-5 text-chart-4" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">Customize your smart home experience</p>
        </div>
      </div>

      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
        <div className="divide-y divide-border/50">
          {settings.map((setting) => {
            const Icon = setting.icon
            const isEnabled = enabledSettings.has(setting.id)

            return (
              <div
                key={setting.id}
                className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                <button
                  onClick={() => toggleSetting(setting.id)}
                  className={cn(
                    "relative w-12 h-7 rounded-full transition-colors duration-200",
                    isEnabled ? "bg-primary" : "bg-secondary"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-5 h-5 rounded-full bg-foreground transition-transform duration-200",
                      isEnabled ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
