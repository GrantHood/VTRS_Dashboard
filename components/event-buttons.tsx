"use client"

import { useEffect, useRef, useState } from "react"

import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import mqtt from "mqtt"

const events = [
  { id: 1, label: "911 Alert", topic: "emergency", color: "from-primary to-primary/60" },
  { id: 2, label: "Test", topic: "test", color: "from-accent to-accent/60" },
  { id: 3, label: "Emergency (Doorbell)", topic: "em_doorbell", color: "from-chart-3 to-chart-3/60" },
  { id: 4, label: "Intercom", topic: "intercom", color: "from-chart-4 to-chart-4/60" },
  { id: 5, label: "Event 5", topic: "event5", color: "from-chart-5 to-chart-5/60" },
]

export function EventButtons() {
  const [activeEvent, setActiveEvent] = useState<number | null>(null)
  const [triggeredEvents, setTriggeredEvents] = useState<Set<number>>(new Set())
  const [connected, setConnected] = useState(false)
  const client = useRef<mqtt.MqttClient | null>(null)

  useEffect(() => {
    // Connect directly to Mosquitto via WebSocket
    client.current = mqtt.connect("ws://10.0.0.252:9001") // replace with your Pi's IP

    client.current.on("connect", () => {
      console.log("MQTT connected")
      setConnected(true)
    })

    client.current.on("error", (err) => {
      console.error("MQTT error:", err)
      setConnected(false)
    })

    return () => {
      client.current?.end()
    }
  }, [])

  const handleEventTrigger = (eventId: number, topic: string) => {
    setActiveEvent(eventId)
    setTriggeredEvents((prev) => new Set([...prev, eventId]))

    // Publish to MQTT
    client.current?.publish("system/events", topic)
    console.log(`Published: system/events → ${topic}`)

    setTimeout(() => {
      setActiveEvent(null)
    }, 500)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Event Triggers</h2>
        <p className="text-muted-foreground text-sm">Activate smart home events with a single tap</p>
      </div>

      {/* Connection status indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className={cn(
          "inline-flex h-2 w-2 rounded-full",
          connected ? "bg-green-500" : "bg-red-500"
        )}/>
        <span>{connected ? "Connected to Pi" : "Disconnected"}</span>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
        {events.map((event) => {
          const isActive = activeEvent === event.id
          const wasTriggered = triggeredEvents.has(event.id)

          return (
            <button
              key={event.id}
              onClick={() => handleEventTrigger(event.id, event.topic)}
              disabled={!connected}
              className={cn(
                "group relative flex flex-col items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-2xl",
                "bg-card/80 backdrop-blur-sm border border-border/50",
                "transition-all duration-300 ease-out",
                "hover:scale-105 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
                isActive && "scale-95 border-primary shadow-xl shadow-primary/20",
                !connected && "opacity-50 cursor-not-allowed"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
                  `bg-gradient-to-br ${event.color}`,
                  "group-hover:opacity-10",
                  isActive && "opacity-20"
                )}
              />
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
                  "bg-gradient-to-br",
                  event.color,
                  "transition-transform duration-300",
                  isActive && "scale-110"
                )}
              >
                <Zap
                  className={cn(
                    "w-6 h-6 text-foreground transition-all duration-200",
                    isActive && "animate-pulse"
                  )}
                />
              </div>
              <span className="font-medium text-foreground">{event.label}</span>
              {wasTriggered && (
                <span className="absolute top-3 right-3 flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              )}
              {isActive && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-30",
                      event.color,
                      "animate-ping"
                    )}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Events triggered this session:</span>
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
          {triggeredEvents.size}
        </span>
      </div>
    </div>
  )
}