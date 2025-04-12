import Link from "next/link"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  MessageSquare,
  CreditCard,
  Ban,
  CheckCircle,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for clients
const clients = [
  {
    id: "CLT-001",
    name: "Acme Corp",
    email: "info@acmecorp.com",
    phone: "+254712345678",
    plan: "Professional",
    status: "active",
    joinDate: "2023-01-15",
    lastActive: "2023-07-15",
    messagesThisMonth: 4250,
  },
  {
    id: "CLT-002",
    name: "TechHub Kenya",
    email: "contact@techhub.co.ke",
    phone: "+254723456789",
    plan: "Basic",
    status: "active",
    joinDate: "2023-02-20",
    lastActive: "2023-07-14",
    messagesThisMonth: 950,
  },
  {
    id: "CLT-003",
    name: "Savannah Hotels",
    email: "reservations@savannahhotels.com",
    phone: "+254734567890",
    plan: "Enterprise",
    status: "active",
    joinDate: "2022-11-05",
    lastActive: "2023-07-15",
    messagesThisMonth: 12500,
  },
  {
    id: "CLT-004",
    name: "Lagos Medical Center",
    email: "info@lagosmedical.com",
    phone: "+254745678901",
    plan: "Basic",
    status: "inactive",
    joinDate: "2023-03-10",
    lastActive: "2023-06-30",
    messagesThisMonth: 0,
  },
  {
    id: "CLT-005",
    name: "EduTech Solutions",
    email: "support@edutech.co.ke",
    phone: "+254756789012",
    plan: "Professional",
    status: "active",
    joinDate: "2022-09-15",
    lastActive: "2023-07-13",
    messagesThisMonth: 3800,
  },
  {
    id: "CLT-006",
    name: "Nairobi Retail Group",
    email: "sales@nairobiretail.com",
    phone: "+254767890123",
    plan: "Professional",
    status: "active",
    joinDate: "2022-12-01",
    lastActive: "2023-07-15",
    messagesThisMonth: 5200,
  },
  {
    id: "CLT-007",
    name: "Mombasa Tours",
    email: "bookings@mombasatours.co.ke",
    phone: "+254778901234",
    plan: "Basic",
    status: "active",
    joinDate: "2023-04-20",
    lastActive: "2023-07-12",
    messagesThisMonth: 750,
  },
  {
    id: "CLT-008",
    name: "Kilimanjaro Adventures",
    email: "info@kilimanjaroadventures.com",
    phone: "+254789012345",
    plan: "Enterprise",
    status: "active",
    joinDate: "2022-08-10",
    lastActive: "2023-07-14",
    messagesThisMonth: 9800,
  },
  {
    id: "CLT-009",
    name: "Dar es Salaam Logistics",
    email: "operations@darlogistics.co.tz",
    phone: "+254790123456",
    plan: "Professional",
    status: "suspended",
    joinDate: "2022-10-15",
    lastActive: "2023-06-25",
    messagesThisMonth: 0,
  },
  {
    id: "CLT-010",
    name: "Kampala Services",
    email: "info@kampalaservices.co.ug",
    phone: "+254701234567",
    plan: "Basic",
    status: "active",
    joinDate: "2023-05-05",
    lastActive: "2023-07-10",
    messagesThisMonth: 620,
  },
]

export default function ClientsPage() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
            Inactive
          </Badge>
        )
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100">
            Suspended
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
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Client Management</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            View and manage all clients using the platform.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-light-blue-shade-300 dark:border-dark-blue-shade-600">
            <Download className="mr-2 h-4 w-4" />
            Export Clients
          </Button>
        </div>
      </div>

      <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary dark:text-white">All Clients</CardTitle>
          <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Manage your client accounts and subscriptions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search clients..."
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
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700">
                  <SelectValue placeholder="Filter by plan" />
                </SelectTrigger>
                <SelectContent className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700">
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
              >
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          <div className="mt-6 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Client</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Contact</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Plan</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Status</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Messages (MTD)
                  </TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Join Date</TableHead>
                  <TableHead className="text-right text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                    <TableCell className="font-medium text-primary dark:text-white">
                      <Link href={`/admin/clients/${client.id}`} className="hover:underline">
                        {client.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      <div>{client.email}</div>
                      <div>{client.phone}</div>
                    </TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {client.plan}
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {client.messagesThisMonth.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {new Date(client.joinDate).toLocaleDateString()}
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
                            <Link href={`/admin/clients/${client.id}`} className="flex w-full items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/admin/clients/${client.id}/messages`} className="flex w-full items-center">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>Message History</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/admin/clients/${client.id}/payments`} className="flex w-full items-center">
                              <CreditCard className="mr-2 h-4 w-4" />
                              <span>Payment History</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-light-blue-shade-200 dark:bg-dark-blue-shade-700" />
                          {client.status === "active" ? (
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Ban className="mr-2 h-4 w-4" />
                              <span>Suspend Account</span>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600 dark:text-green-400">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Activate Account</span>
                            </DropdownMenuItem>
                          )}
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
