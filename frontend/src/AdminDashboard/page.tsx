import Link from "next/link"
import {
  BarChart3,
  Users,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminRevenueChart } from "@/components/admin/admin-revenue-chart"
import { RecentPaymentsTable } from "@/components/admin/recent-payments-table"
import { ClientGrowthChart } from "@/components/admin/client-growth-chart"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Admin Dashboard</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Welcome back! Here's an overview of your platform's performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-light-blue-shade-300 dark:border-dark-blue-shade-600" asChild>
            <Link href="/admin/reports/generate">Generate Report</Link>
          </Button>
          <Button
            className="bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
            asChild
          >
            <Link href="/admin/settings">System Settings</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">KSh 1,245,890</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>18% from last month</span>
            </div>
            <Progress
              value={75}
              className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700"
              indicatorClassName="bg-light-blue-shade-500 dark:bg-dark-blue-shade-400"
            />
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Active Clients
            </CardTitle>
            <Users className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">1,024</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>12% from last month</span>
            </div>
            <Progress
              value={68}
              className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700"
              indicatorClassName="bg-light-blue-shade-500 dark:bg-dark-blue-shade-400"
            />
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              SMS Sent (MTD)
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">3.2M</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>24% from last month</span>
            </div>
            <Progress
              value={85}
              className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700"
              indicatorClassName="bg-light-blue-shade-500 dark:bg-dark-blue-shade-400"
            />
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              SMS Provider Cost
            </CardTitle>
            <CreditCard className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">KSh 480,250</div>
            <div className="flex items-center text-xs text-red-500 dark:text-red-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>15% from last month</span>
            </div>
            <Progress
              value={62}
              className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700"
              indicatorClassName="bg-light-blue-shade-500 dark:bg-dark-blue-shade-400"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4 border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader>
            <CardTitle className="text-primary dark:text-white">Revenue Overview</CardTitle>
            <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Monthly revenue and expenses breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue">
              <div className="flex items-center justify-between">
                <TabsList className="bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
                  <TabsTrigger
                    value="revenue"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                  >
                    Revenue
                  </TabsTrigger>
                  <TabsTrigger
                    value="profit"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                  >
                    Profit Margin
                  </TabsTrigger>
                  <TabsTrigger
                    value="costs"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                  >
                    SMS Costs
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="revenue" className="pt-4">
                <AdminRevenueChart />
              </TabsContent>
              <TabsContent value="profit" className="pt-4">
                <AdminRevenueChart />
              </TabsContent>
              <TabsContent value="costs" className="pt-4">
                <AdminRevenueChart />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="col-span-7 md:col-span-3 border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader>
            <CardTitle className="text-primary dark:text-white">Client Growth</CardTitle>
            <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              New client acquisition over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClientGrowthChart />
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full border-light-blue-shade-300 dark:border-dark-blue-shade-600"
              asChild
            >
              <Link href="/admin/clients">
                View All Clients
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4 border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-primary dark:text-white">Recent Payments</CardTitle>
              <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                Latest M-Pesa transactions
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
              asChild
            >
              <Link href="/admin/payments">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <RecentPaymentsTable />
          </CardContent>
        </Card>
        <Card className="col-span-7 md:col-span-3 border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader>
            <CardTitle className="text-primary dark:text-white">System Alerts</CardTitle>
            <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Recent system notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/50">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-500">SMS Provider API Latency</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Increased latency detected with primary SMS provider. Monitoring situation.
                  </p>
                  <p className="mt-1 text-xs text-amber-600 dark:text-amber-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/50">
                <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-500" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-500">Monthly Revenue Target Achieved</h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Congratulations! Monthly revenue target of KSh 1.2M has been achieved.
                  </p>
                  <p className="mt-1 text-xs text-green-600 dark:text-green-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/50">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-500">New Enterprise Client</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Safaricom PLC has signed up for the Enterprise plan. Requires account setup.
                  </p>
                  <p className="mt-1 text-xs text-blue-600 dark:text-blue-500">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full border-light-blue-shade-300 dark:border-dark-blue-shade-600"
              asChild
            >
              <Link href="/admin/alerts">
                View All Alerts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
