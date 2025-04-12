"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Home,
  MessageSquare,
  Users,
  Settings,
  FileText,
  Send,
  CreditCard,
  HelpCircle,
  LogOut,
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

export default function DashboardLayout({ children }) {
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
              <MessageSquare className="h-6 w-6 text-light-blue-shade-500 dark:text-dark-blue-shade-300" />
              <span className="text-xl font-bold text-primary dark:text-white">Go Digital</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                      <Link href="/dashboard">
                        <Home className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/campaigns")}>
                      <Link href="/dashboard/campaigns">
                        <Send className="h-5 w-5" />
                        <span>Campaigns</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/templates")}>
                      <Link href="/dashboard/templates">
                        <FileText className="h-5 w-5" />
                        <span>Templates</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/contacts")}>
                      <Link href="/dashboard/contacts">
                        <Users className="h-5 w-5" />
                        <span>Contacts</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/analytics")}>
                      <Link href="/dashboard/analytics">
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
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/billing")}>
                      <Link href="/dashboard/billing">
                        <CreditCard className="h-5 w-5" />
                        <span>Billing</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
                      <Link href="/dashboard/settings">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/help")}>
                      <Link href="/dashboard/help">
                        <HelpCircle className="h-5 w-5" />
                        <span>Help & Support</span>
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
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-light-blue-shade-500 text-white dark:bg-dark-blue-shade-500">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium text-primary dark:text-white">John Doe</span>
                    <span className="text-xs text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      john@example.com
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
              <Button
                variant="outline"
                size="sm"
                className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Tokens: 2,450</span>
              </Button>
              <Button
                size="sm"
                className="bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
              >
                Buy Tokens
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
