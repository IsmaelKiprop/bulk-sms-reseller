import Link from "next/link"
import { Plus, Search, Filter, MoreHorizontal, Copy, Pencil, Trash2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data for templates
const templates = [
  {
    id: "TPL-001",
    name: "Welcome Message",
    category: "Onboarding",
    lastUsed: "2023-07-15",
    content: "Hello {name}, welcome to our service! We're excited to have you on board.",
  },
  {
    id: "TPL-002",
    name: "Payment Confirmation",
    category: "Transactional",
    lastUsed: "2023-07-10",
    content: "Dear {name}, your payment of KSh {amount} has been received. Thank you!",
  },
  {
    id: "TPL-003",
    name: "Appointment Reminder",
    category: "Reminder",
    lastUsed: "2023-08-01",
    content: "Reminder: You have an appointment scheduled for {date} at {time}. Reply YES to confirm.",
  },
  {
    id: "TPL-004",
    name: "Promotional Offer",
    category: "Marketing",
    lastUsed: "2023-07-05",
    content: "Special offer for you! Get {discount}% off on all products until {expiry_date}. Shop now!",
  },
  {
    id: "TPL-005",
    name: "Order Shipped",
    category: "Transactional",
    lastUsed: "2023-07-20",
    content: "Your order #{order_id} has been shipped and will arrive in {days} days. Track: {tracking_link}",
  },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Message Templates</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Create and manage reusable message templates for your campaigns.
          </p>
        </div>
        <Button
          className="bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
          asChild
        >
          <Link href="/dashboard/templates/new">
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Link>
        </Button>
      </div>

      <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary dark:text-white">Templates</CardTitle>
          <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Manage your message templates for quick campaign creation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search templates..."
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
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Name</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Category</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Last Used</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Content Preview
                  </TableHead>
                  <TableHead className="text-right text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id} className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                    <TableCell className="font-medium text-primary dark:text-white">
                      <Link href={`/dashboard/templates/${template.id}`} className="hover:underline">
                        {template.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-light-blue-shade-300 text-light-blue-shade-600 dark:border-dark-blue-shade-600 dark:text-dark-blue-shade-300"
                      >
                        {template.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {new Date(template.lastUsed).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {template.content}
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
                            <Link
                              href={`/dashboard/templates/edit/${template.id}`}
                              className="flex w-full items-center"
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/templates/duplicate/${template.id}`}
                              className="flex w-full items-center"
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Duplicate</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/campaigns/new?template=${template.id}`}
                              className="flex w-full items-center"
                            >
                              <Send className="mr-2 h-4 w-4" />
                              <span>Use in Campaign</span>
                            </Link>
                          </DropdownMenuItem>
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
