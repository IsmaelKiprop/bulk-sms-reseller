import Link from "next/link"
import { Plus, Search, Filter, Upload, Download, MoreHorizontal, Pencil, Trash2, MessageSquare } from "lucide-react"

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

// Sample data for contacts
const contacts = [
  {
    id: "CON-001",
    name: "John Doe",
    phone: "+254712345678",
    group: "Customers",
    lastMessageDate: "2023-07-15",
  },
  {
    id: "CON-002",
    name: "Jane Smith",
    phone: "+254723456789",
    group: "VIP Clients",
    lastMessageDate: "2023-07-10",
  },
  {
    id: "CON-003",
    name: "Michael Johnson",
    phone: "+254734567890",
    group: "Subscribers",
    lastMessageDate: "2023-08-01",
  },
  {
    id: "CON-004",
    name: "Sarah Williams",
    phone: "+254745678901",
    group: "Customers",
    lastMessageDate: "2023-07-05",
  },
  {
    id: "CON-005",
    name: "David Brown",
    phone: "+254756789012",
    group: "Staff",
    lastMessageDate: "2023-07-20",
  },
  {
    id: "CON-006",
    name: "Emily Davis",
    phone: "+254767890123",
    group: "Customers",
    lastMessageDate: "2023-06-28",
  },
  {
    id: "CON-007",
    name: "Robert Wilson",
    phone: "+254778901234",
    group: "Subscribers",
    lastMessageDate: "2023-06-15",
  },
  {
    id: "CON-008",
    name: "Jennifer Taylor",
    phone: "+254789012345",
    group: "VIP Clients",
    lastMessageDate: "2023-08-15",
  },
  {
    id: "CON-009",
    name: "Thomas Anderson",
    phone: "+254790123456",
    group: "Customers",
    lastMessageDate: "2023-07-01",
  },
  {
    id: "CON-010",
    name: "Lisa Martinez",
    phone: "+254701234567",
    group: "Staff",
    lastMessageDate: "2023-08-20",
  },
]

// Sample data for groups
const groups = [
  {
    id: "GRP-001",
    name: "Customers",
    count: 1250,
    description: "All active customers",
  },
  {
    id: "GRP-002",
    name: "Subscribers",
    count: 850,
    description: "Newsletter subscribers",
  },
  {
    id: "GRP-003",
    name: "VIP Clients",
    count: 120,
    description: "Premium customers",
  },
  {
    id: "GRP-004",
    name: "Staff",
    count: 45,
    description: "Internal team members",
  },
]

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Contacts</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Manage your contacts and contact groups.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-light-blue-shade-300 dark:border-dark-blue-shade-600" asChild>
            <Link href="/dashboard/contacts/import">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Link>
          </Button>
          <Button variant="outline" className="border-light-blue-shade-300 dark:border-dark-blue-shade-600">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            className="bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
            asChild
          >
            <Link href="/dashboard/contacts/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <CardHeader className="pb-3">
          <Tabs defaultValue="contacts" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
                <TabsTrigger
                  value="contacts"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                >
                  Contacts
                </TabsTrigger>
                <TabsTrigger
                  value="groups"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                >
                  Groups
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                  asChild
                >
                  <Link href="/dashboard/contacts/groups/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Group
                  </Link>
                </Button>
              </div>
            </div>

            <TabsContent value="contacts" className="pt-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search contacts..."
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
                <Button
                  variant="outline"
                  size="sm"
                  className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <div className="mt-6 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Name</TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Phone Number
                      </TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Group</TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Last Message
                      </TableHead>
                      <TableHead className="text-right text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow
                        key={contact.id}
                        className="border-light-blue-shade-200 dark:border-dark-blue-shade-700"
                      >
                        <TableCell className="font-medium text-primary dark:text-white">
                          <Link href={`/dashboard/contacts/${contact.id}`} className="hover:underline">
                            {contact.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {contact.phone}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-light-blue-shade-300 text-light-blue-shade-600 dark:border-dark-blue-shade-600 dark:text-dark-blue-shade-300"
                          >
                            {contact.group}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {new Date(contact.lastMessageDate).toLocaleDateString()}
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
                                  href={`/dashboard/contacts/edit/${contact.id}`}
                                  className="flex w-full items-center"
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  <span>Edit</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link
                                  href={`/dashboard/campaigns/new?contact=${contact.id}`}
                                  className="flex w-full items-center"
                                >
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  <span>Send Message</span>
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
            </TabsContent>

            <TabsContent value="groups" className="pt-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search groups..."
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
              </div>

              <div className="mt-6 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Group Name
                      </TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Contacts
                      </TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Description
                      </TableHead>
                      <TableHead className="text-right text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groups.map((group) => (
                      <TableRow key={group.id} className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                        <TableCell className="font-medium text-primary dark:text-white">
                          <Link href={`/dashboard/contacts/groups/${group.id}`} className="hover:underline">
                            {group.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {group.count.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {group.description}
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
                                  href={`/dashboard/contacts/groups/edit/${group.id}`}
                                  className="flex w-full items-center"
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  <span>Edit</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link
                                  href={`/dashboard/campaigns/new?group=${group.id}`}
                                  className="flex w-full items-center"
                                >
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  <span>Send Message</span>
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
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  )
}
