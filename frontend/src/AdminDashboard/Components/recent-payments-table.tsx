"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, XCircle, MoreHorizontal, Eye, FileText, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
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

// Sample data for recent payments
const payments = [
  {
    id: "PAY-001",
    client: "Acme Corp",
    amount: 9990,
    date: "2023-07-15T10:30:00",
    status: "completed",
    mpesaCode: "QWE12345RT",
    phone: "+254712345678",
  },
  {
    id: "PAY-002",
    client: "TechHub Kenya",
    amount: 5000,
    date: "2023-07-15T09:15:00",
    status: "completed",
    mpesaCode: "RTY78901UI",
    phone: "+254723456789",
  },
  {
    id: "PAY-003",
    client: "Savannah Hotels",
    amount: 24990,
    date: "2023-07-14T16:45:00",
    status: "completed",
    mpesaCode: "UIO45678PL",
    phone: "+254734567890",
  },
  {
    id: "PAY-004",
    client: "Lagos Medical Center",
    amount: 2990,
    date: "2023-07-14T14:20:00",
    status: "failed",
    mpesaCode: "",
    phone: "+254745678901",
  },
  {
    id: "PAY-005",
    client: "EduTech Solutions",
    amount: 8000,
    date: "2023-07-14T11:05:00",
    status: "pending",
    mpesaCode: "PLK89012MN",
    phone: "+254756789012",
  },
]

export function RecentPaymentsTable() {
  const [data, setData] = useState(payments)

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
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Transaction ID</TableHead>
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Client</TableHead>
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Amount</TableHead>
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">M-Pesa Code</TableHead>
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Status</TableHead>
            <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Date</TableHead>
            <TableHead className="text-right text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((payment) => (
            <TableRow key={payment.id} className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
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
                      <Link href={`/admin/payments/${payment.id}/receipt`} className="flex w-full items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Generate Receipt</span>
                      </Link>
                    </DropdownMenuItem>
                    {payment.status === "pending" && (
                      <DropdownMenuItem>
                        <Link href={`/admin/payments/${payment.id}/verify`} className="flex w-full items-center">
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
  )
}
