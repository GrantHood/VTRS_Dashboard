'use client'

import { useEffect, useRef } from 'react'

import mqtt from 'mqtt'

export function useMQTT() {
  const client = useRef<mqtt.MqttClient | null>(null)

  useEffect(() => {
    client.current = mqtt.connect('ws://10.0.0.252:9001')
    return () => { client.current?.end() }
  }, [])

  const publish = (topic: string, message: string) => {
    client.current?.publish(topic, message)
  }

  return { publish }
}
