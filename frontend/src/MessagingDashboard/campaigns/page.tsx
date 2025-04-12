import React from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreHorizontal,
  BarChart3,
  Copy,
  Trash2,
} from "lucide-react"

// Remove UI component imports
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for campaigns
const campaigns = [
  {
    id: "CAM-001",
    name: "July Promotion",
    date: "2023-07-15",
    recipients: 1250,
    delivered: 1230,
    status: "completed",
  },
  {
    id: "CAM-002",
    name: "Customer Survey",
    date: "2023-07-10",
    recipients: 850,
    delivered: 840,
    status: "completed",
  },
  {
    id: "CAM-003",
    name: "August Newsletter",
    date: "2023-08-01",
    recipients: 1500,
    delivered: 0,
    status: "scheduled",
  },
  {
    id: "CAM-004",
    name: "Payment Reminder",
    date: "2023-07-05",
    recipients: 320,
    delivered: 315,
    status: "completed",
  },
  {
    id: "CAM-005",
    name: "Flash Sale",
    date: "2023-07-20",
    recipients: 2100,
    delivered: 2050,
    status: "completed",
  },
  {
    id: "CAM-006",
    name: "Service Outage Notice",
    date: "2023-06-28",
    recipients: 3500,
    delivered: 3450,
    status: "completed",
  },
  {
    id: "CAM-007",
    name: "Customer Feedback Request",
    date: "2023-06-15",
    recipients: 1800,
    delivered: 1750,
    status: "completed",
  },
  {
    id: "CAM-008",
    name: "September Event Invitation",
    date: "2023-08-15",
    recipients: 500,
    delivered: 0,
    status: "scheduled",
  },
  {
    id: "CAM-009",
    name: "System Upgrade Notification",
    date: "2023-07-01",
    recipients: 4200,
    delivered: 4150,
    status: "completed",
  },
  {
    id: "CAM-010",
    name: "Holiday Greetings",
    date: "2023-08-20",
    recipients: 5000,
    delivered: 0,
    status: "scheduled",
  },
]

export default function CampaignsPage() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </span>
        )
      case "scheduled":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <Clock className="mr-1 h-3 w-3" />
            Scheduled
          </span>
        )
      case "failed":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Failed
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">SMS Campaigns</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Create, manage, and track your SMS campaigns.
          </p>
        </div>
        <Link 
          to="/dashboard/campaigns/new"
          className="inline-flex items-center px-4 py-2 rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Link>
      </div>

      <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <div className="p-4 pb-3">
          <h3 className="text-xl font-bold text-primary dark:text-white">All Campaigns</h3>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            View and manage all your SMS campaigns.
          </p>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="search"
                placeholder="Search campaigns..."
                className="border rounded-md px-3 py-2 w-full border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700"
              />
              <button
                type="submit"
                className="p-2 rounded-md text-light-blue-shade-600 dark:text-dark-blue-shade-300"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </button>
            </div>
            <button className="inline-flex items-center px-3 py-1 text-sm border rounded-md border-light-blue-shade-300 dark:border-dark-blue-shade-600">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
          </div>

          <div className="mt-6 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                  <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">Campaign</th>
                  <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">Date</th>
                  <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">Recipients</th>
                  <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">Status</th>
                  <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Delivery Rate
                  </th>
                  <th className="text-right py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                    <td className="py-3 px-4 font-medium text-primary dark:text-white">
                      <Link to={`/dashboard/campaigns/${campaign.id}`} className="hover:underline">
                        {campaign.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {new Date(campaign.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {campaign.recipients.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(campaign.status)}</td>
                    <td className="py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {campaign.status === "scheduled"
                        ? "—"
                        : `${((campaign.delivered / campaign.recipients) * 100).toFixed(1)}%`}
                    </td>
                    <td className="text-right py-3 px-4">
                      <div className="relative inline-block text-left">
                        <button className="p-2 rounded-md text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </button>
                        {/* Dropdown menu would be implemented with JavaScript in a real app */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
