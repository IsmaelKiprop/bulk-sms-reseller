"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for the chart
const data = [
  {
    name: "Jan",
    clients: 650,
  },
  {
    name: "Feb",
    clients: 730,
  },
  {
    name: "Mar",
    clients: 810,
  },
  {
    name: "Apr",
    clients: 870,
  },
  {
    name: "May",
    clients: 920,
  },
  {
    name: "Jun",
    clients: 980,
  },
  {
    name: "Jul",
    clients: 1024,
  },
]

export function ClientGrowthChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => `${value} clients`}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <Line type="monotone" dataKey="clients" stroke="#1070b8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
