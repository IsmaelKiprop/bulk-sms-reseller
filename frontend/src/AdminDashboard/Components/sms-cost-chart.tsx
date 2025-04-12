"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data for the chart
const data = [
  {
    name: "Jan",
    safaricom: 320000,
    airtel: 240000,
  },
  {
    name: "Feb",
    safaricom: 350000,
    airtel: 260000,
  },
  {
    name: "Mar",
    safaricom: 370000,
    airtel: 280000,
  },
  {
    name: "Apr",
    safaricom: 390000,
    airtel: 290000,
  },
  {
    name: "May",
    safaricom: 343000,
    airtel: 230400,
  },
  {
    name: "Jun",
    safaricom: 385000,
    airtel: 249600,
  },
  {
    name: "Jul",
    safaricom: 437500,
    airtel: 272000,
  },
]

export function SMSCostChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => `KSh ${value.toLocaleString()}`}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <Legend />
        <Bar dataKey="safaricom" name="Safaricom" fill="#1070b8" />
        <Bar dataKey="airtel" name="Airtel" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  )
}
