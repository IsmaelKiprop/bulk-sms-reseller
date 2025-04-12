import Link from "next/link"
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

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100">
            <Clock className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
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
        <Button
          className="bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
          asChild
        >
          <Link href="/dashboard/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary dark:text-white">All Campaigns</CardTitle>
          <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            View and manage all your SMS campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="text-light-blue-shade-600 dark:text-dark-blue-shade-300"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
            <Button variant="outline" size="sm" className="border-light-blue-shade-300 dark:border-dark-blue-shade-600">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="mt-6 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Campaign</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Date</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Recipients</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Status</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Delivery Rate
                  </TableHead>
                  <TableHead className="text-right text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
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
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {campaign.status === "scheduled"
                        ? "—"
                        : `${((campaign.delivered / campaign.recipients) * 100).toFixed(1)}%`}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-light-blue-shade-200 dark:border-dark-blue-shade-700"
                        >
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-light-blue-shade-200 dark:bg-dark-blue-shade-700" />
                          <DropdownMenuItem>
                            <Link href={`/dashboard/campaigns/${campaign.id}`} className="flex w-full items-center">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              <span>View Analytics</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/campaigns/duplicate/${campaign.id}`}
                              className="flex w-full items-center"
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Duplicate</span>
                            </Link>
                          </DropdownMenuItem>
                          {campaign.status === "scheduled" && (
                            <DropdownMenuItem>
                              <Link
                                href={`/dashboard/campaigns/edit/${campaign.id}`}
                                className="flex w-full items-center"
                              >
                                <Send className="mr-2 h-4 w-4" />
                                <span>Send Now</span>
                              </Link>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator className="bg-light-blue-shade-200 dark:bg-dark-blue-shade-700" />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
