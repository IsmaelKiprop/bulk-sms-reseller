"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for the chart
const data = [
  { name: "Jan", sent: 4000, delivered: 3940 },
  { name: "Feb", sent: 3000, delivered: 2980 },
  { name: "Mar", sent: 2000, delivered: 1980 },
  { name: "Apr", sent: 2780, delivered: 2760 },
  { name: "May", sent: 1890, delivered: 1870 },
  { name: "Jun", sent: 2390, delivered: 2370 },
  { name: "Jul", sent: 3490, delivered: 3450 },
]

export function MessageVolumeChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <Area type="monotone" dataKey="sent" stroke="#1070b8" fill="#1070b8" fillOpacity={0.3} />
          <Area type="monotone" dataKey="delivered" stroke="#4dade8" fill="#4dade8" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
