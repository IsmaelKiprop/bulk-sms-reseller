"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data for the chart
const data = [
  {
    name: "Jan",
    revenue: 85000,
    costs: 35000,
    profit: 50000,
  },
  {
    name: "Feb",
    revenue: 92000,
    costs: 38000,
    profit: 54000,
  },
  {
    name: "Mar",
    revenue: 104000,
    costs: 42000,
    profit: 62000,
  },
  {
    name: "Apr",
    revenue: 98000,
    costs: 40000,
    profit: 58000,
  },
  {
    name: "May",
    revenue: 110000,
    costs: 45000,
    profit: 65000,
  },
  {
    name: "Jun",
    revenue: 125000,
    costs: 50000,
    profit: 75000,
  },
  {
    name: "Jul",
    revenue: 145000,
    costs: 58000,
    profit: 87000,
  },
]

export function AdminRevenueChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
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
        <Bar dataKey="revenue" name="Revenue" fill="#1070b8" />
        <Bar dataKey="costs" name="SMS Costs" fill="#ef4444" />
        <Bar dataKey="profit" name="Profit" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  )
}
