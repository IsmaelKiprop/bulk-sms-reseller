"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data for the chart
const data = [
  { name: "Mon", sent: 420, delivered: 410 },
  { name: "Tue", sent: 350, delivered: 345 },
  { name: "Wed", sent: 580, delivered: 570 },
  { name: "Thu", sent: 250, delivered: 245 },
  { name: "Fri", sent: 800, delivered: 790 },
  { name: "Sat", sent: 120, delivered: 118 },
  { name: "Sun", sent: 90, delivered: 88 },
]

export function DashboardChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <Bar dataKey="sent" fill="#1070b8" radius={[4, 4, 0, 0]} name="Sent" />
        <Bar dataKey="delivered" fill="#4dade8" radius={[4, 4, 0, 0]} name="Delivered" />
      </BarChart>
    </ResponsiveContainer>
  )
}
