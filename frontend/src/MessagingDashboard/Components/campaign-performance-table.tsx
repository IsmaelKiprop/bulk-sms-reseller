"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Sample data for campaign performance
const campaigns = [
  {
    id: "CAM-001",
    name: "July Promotion",
    date: "2023-07-15",
    recipients: 1250,
    delivered: 1230,
    failed: 20,
    deliveryRate: 98.4,
  },
  {
    id: "CAM-002",
    name: "Customer Survey",
    date: "2023-07-10",
    recipients: 850,
    delivered: 840,
    failed: 10,
    deliveryRate: 98.8,
  },
  {
    id: "CAM-004",
    name: "Payment Reminder",
    date: "2023-07-05",
    recipients: 320,
    delivered: 315,
    failed: 5,
    deliveryRate: 98.4,
  },
  {
    id: "CAM-005",
    name: "Flash Sale",
    date: "2023-07-20",
    recipients: 2100,
    delivered: 2050,
    failed: 50,
    deliveryRate: 97.6,
  },
  {
    id: "CAM-006",
    name: "Service Outage Notice",
    date: "2023-06-28",
    recipients: 3500,
    delivered: 3450,
    failed: 50,
    deliveryRate: 98.6,
  },
]

export function CampaignPerformanceTable() {
  const [data, setData] = useState(campaigns)

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Campaign</TableHead>
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Date</TableHead>
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Recipients</TableHead>
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Delivered</TableHead>
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Failed</TableHead>
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Delivery Rate</TableHead>
            <TableHead className="text-right text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((campaign) => (
            <TableRow key={campaign.id} className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
              <TableCell className="font-medium text-primary dark:text-white">
                <Link href={`/dashboard/campaigns/${campaign.id}`} className="hover:underline">
                  {campaign.name}
                </Link>
              </TableCell>
              <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                {new Date(campaign.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                {campaign.recipients.toLocaleString()}
              </TableCell>
              <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                {campaign.delivered.toLocaleString()}
              </TableCell>
              <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                {campaign.failed.toLocaleString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress
                    value={campaign.deliveryRate}
                    className="h-2 w-16 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700"
                    indicatorClassName="bg-light-blue-shade-500 dark:bg-dark-blue-shade-400"
                  />
                  <span className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    {campaign.deliveryRate}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/campaigns/${campaign.id}`}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>Details</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
