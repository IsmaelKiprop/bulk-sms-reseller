"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for the chart
const data = [
  {
    name: "Feb",
    subscriptions: 620000,
    tokens: 250000,
    total: 870000,
  },
  {
    name: "Mar",
    subscriptions: 650000,
    tokens: 270000,
    total: 920000,
  },
  {
    name: "Apr",
    subscriptions: 680000,
    tokens: 290000,
    total: 970000,
  },
  {
    name: "May",
    subscriptions: 720000,
    tokens: 320000,
    total: 1040000,
  },
  {
    name: "Jun",
    subscriptions: 780000,
    tokens: 350000,
    total: 1130000,
  },
  {
    name: "Jul",
    subscriptions: 850000,
    tokens: 395000,
    total: 1245000,
  },
]

export function RevenueTrendChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
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
        <Area type="monotone" dataKey="total" name="Total Revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        <Area
          type="monotone"
          dataKey="subscriptions"
          name="Subscription Revenue"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.3}
        />
        <Area type="monotone" dataKey="tokens" name="Token Revenue" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
