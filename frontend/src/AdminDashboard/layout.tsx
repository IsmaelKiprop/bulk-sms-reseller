"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Home,
  Users,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  Shield,
  DollarSign,
  MessageSquare,
  Bell,
  User,
  Database,
  Activity,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function AdminLayout({ children }) {
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r border-light-blue-shade-200 dark:border-dark-blue-shade-700">
          <SidebarHeader className="border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700 py-4">
            <div className="flex items-center gap-2 px-4">
              <Shield className="h-6 w-6 text-light-blue-shade-500 dark:text-dark-blue-shade-300" />
              <span className="text-xl font-bold text-primary dark:text-white">Admin Portal</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin")}>
                      <Link href="/admin">
                        <Home className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/payments")}>
                      <Link href="/admin/payments">
                        <CreditCard className="h-5 w-5" />
                        <span>Payments</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/clients")}>
                      <Link href="/admin/clients">
                        <Users className="h-5 w-5" />
                        <span>Clients</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/revenue")}>
                      <Link href="/admin/revenue">
                        <DollarSign className="h-5 w-5" />
                        <span>Revenue</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/sms-costs")}>
                      <Link href="/admin/sms-costs">
                        <MessageSquare className="h-5 w-5" />
                        <span>SMS Costs</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/analytics")}>
                      <Link href="/admin/analytics">
                        <BarChart3 className="h-5 w-5" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/settings")}>
                      <Link href="/admin/settings">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/logs")}>
                      <Link href="/admin/logs">
                        <Activity className="h-5 w-5" />
                        <span>System Logs</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/api")}>
                      <Link href="/admin/api">
                        <Database className="h-5 w-5" />
                        <span>API Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-light-blue-shade-200 dark:border-dark-blue-shade-700 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback className="bg-light-blue-shade-500 text-white dark:bg-dark-blue-shade-500">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium text-primary dark:text-white">Admin User</span>
                    <span className="text-xs text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      admin@godigitalafrica.com
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-background px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="ml-auto flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-light-blue-shade-500 text-white dark:bg-dark-blue-shade-500">
                      3
                    </Badge>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-auto">
                    <DropdownMenuItem className="flex flex-col items-start p-3">
                      <div className="font-medium">New Client Registration</div>
                      <div className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Acme Corp just registered for a Professional plan
                      </div>
                      <div className="mt-1 text-xs text-light-blue-shade-500 dark:text-dark-blue-shade-400">
                        10 minutes ago
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start p-3">
                      <div className="font-medium">Payment Alert</div>
                      <div className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        KSh 5,000 payment received from TechHub Kenya
                      </div>
                      <div className="mt-1 text-xs text-light-blue-shade-500 dark:text-dark-blue-shade-400">
                        1 hour ago
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start p-3">
                      <div className="font-medium">System Alert</div>
                      <div className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        SMS provider API reported increased latency
                      </div>
                      <div className="mt-1 text-xs text-light-blue-shade-500 dark:text-dark-blue-shade-400">
                        2 hours ago
                      </div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-light-blue-shade-500 dark:text-dark-blue-shade-400">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="sm"
                className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                asChild
              >
                <Link href="/">View Site</Link>
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 bg-light-blue-shade-50 dark:bg-dark-blue-shade-900">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
