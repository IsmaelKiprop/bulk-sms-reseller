import Link from "next/link"
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for payments
const payments = [
  {
    id: "PAY-001",
    client: "Acme Corp",
    amount: 9990,
    date: "2023-07-15T10:30:00",
    status: "completed",
    mpesaCode: "QWE12345RT",
    phone: "+254712345678",
    plan: "Professional",
  },
  {
    id: "PAY-002",
    client: "TechHub Kenya",
    amount: 5000,
    date: "2023-07-15T09:15:00",
    status: "completed",
    mpesaCode: "RTY78901UI",
    phone: "+254723456789",
    plan: "Tokens",
  },
  {
    id: "PAY-003",
    client: "Savannah Hotels",
    amount: 24990,
    date: "2023-07-14T16:45:00",
    status: "completed",
    mpesaCode: "UIO45678PL",
    phone: "+254734567890",
    plan: "Enterprise",
  },
  {
    id: "PAY-004",
    client: "Lagos Medical Center",
    amount: 2990,
    date: "2023-07-14T14:20:00",
    status: "failed",
    mpesaCode: "",
    phone: "+254745678901",
    plan: "Basic",
  },
  {
    id: "PAY-005",
    client: "EduTech Solutions",
    amount: 8000,
    date: "2023-07-14T11:05:00",
    status: "pending",
    mpesaCode: "PLK89012MN",
    phone: "+254756789012",
    plan: "Tokens",
  },
  {
    id: "PAY-006",
    client: "Nairobi Retail Group",
    amount: 9990,
    date: "2023-07-13T15:30:00",
    status: "completed",
    mpesaCode: "MNB67890OP",
    phone: "+254767890123",
    plan: "Professional",
  },
  {
    id: "PAY-007",
    client: "Mombasa Tours",
    amount: 2990,
    date: "2023-07-13T13:45:00",
    status: "completed",
    mpesaCode: "OPL12345QW",
    phone: "+254778901234",
    plan: "Basic",
  },
  {
    id: "PAY-008",
    client: "Kilimanjaro Adventures",
    amount: 24990,
    date: "2023-07-12T09:20:00",
    status: "completed",
    mpesaCode: "QWE09876RT",
    phone: "+254789012345",
    plan: "Enterprise",
  },
  {
    id: "PAY-009",
    client: "Dar es Salaam Logistics",
    amount: 9990,
    date: "2023-07-11T16:10:00",
    status: "completed",
    mpesaCode: "RTY65432UI",
    phone: "+254790123456",
    plan: "Professional",
  },
  {
    id: "PAY-010",
    client: "Kampala Services",
    amount: 4500,
    date: "2023-07-10T11:25:00",
    status: "failed",
    mpesaCode: "",
    phone: "+254701234567",
    plan: "Tokens",
  },
]

export default function PaymentsPage() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100">
            <XCircle className="mr-1 h-3 w-3" />
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
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Payment Management</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Monitor and manage all M-Pesa payments on the platform.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-light-blue-shade-300 dark:border-dark-blue-shade-600">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <CardHeader className="pb-3">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                >
                  All Payments
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="failed"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                >
                  Failed
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Search payments..."
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
                    <SelectItem value="tokens">Tokens</SelectItem>
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

            <TabsContent value="all" className="pt-4">
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Transaction ID
                      </TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Client</TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Amount</TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Plan</TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        M-Pesa Code
                      </TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Status</TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Date</TableHead>
                      <TableHead className="text-right text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow
                        key={payment.id}
                        className="border-light-blue-shade-200 dark:border-dark-blue-shade-700"
                      >
                        <TableCell className="font-medium text-primary dark:text-white">
                          <Link href={`/admin/payments/${payment.id}`} className="hover:underline">
                            {payment.id}
                          </Link>
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {payment.client}
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          KSh {payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {payment.plan}
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {payment.mpesaCode || "—"}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {new Date(payment.date).toLocaleString()}
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
                                <Link href={`/admin/payments/${payment.id}`} className="flex w-full items-center">
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link
                                  href={`/admin/payments/${payment.id}/receipt`}
                                  className="flex w-full items-center"
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Generate Receipt</span>
                                </Link>
                              </DropdownMenuItem>
                              {payment.status === "pending" && (
                                <DropdownMenuItem>
                                  <Link
                                    href={`/admin/payments/${payment.id}/verify`}
                                    className="flex w-full items-center"
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    <span>Verify Payment</span>
                                  </Link>
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
            </TabsContent>
            <TabsContent value="completed" className="pt-4">
              <div className="overflow-auto">
                <Table>{/* Same table structure as above, but filtered for completed payments */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="pending" className="pt-4">
              <div className="overflow-auto">
                <Table>{/* Same table structure as above, but filtered for pending payments */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="failed" className="pt-4">
              <div className="overflow-auto">
                <Table>{/* Same table structure as above, but filtered for failed payments */}</Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  )
}
