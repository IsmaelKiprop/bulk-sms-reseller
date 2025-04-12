import Link from "next/link"
import { BarChart3, MessageSquare, Users, ArrowUpRight, ArrowDownRight, Send, Clock, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns"
import { DashboardChart } from "@/components/dashboard/dashboard-chart"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Dashboard</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Welcome back! Here's an overview of your SMS campaigns.
          </p>
        </div>
        <Button
          className="bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
          asChild
        >
          <Link href="/dashboard/campaigns/new">
            <Send className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Total Messages Sent
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">24,685</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>12% from last month</span>
            </div>
            <Progress
              value={65}
              className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700"
              indicatorClassName="bg-light-blue-shade-500 dark:bg-dark-blue-shade-400"
            />
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Delivery Rate
            </CardTitle>
            <Send className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">98.7%</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>1.2% from last month</span>
            </div>
            <Progress
              value={98.7}
              className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700"
              indicatorClassName="bg-light-blue-shade-500 dark:bg-dark-blue-shade-400"
            />
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Active Contacts
            </CardTitle>
            <Users className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">3,842</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>8.3% from last month</span>
            </div>
            <Progress
              value={45}
              className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700"
              indicatorClassName="bg-light-blue-shade-500 dark:bg-dark-blue-shade-400"
            />
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Tokens Remaining
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">2,450</div>
            <div className="flex items-center text-xs text-red-500 dark:text-red-400">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              <span>24% from last month</span>
            </div>
            <Progress
              value={25}
              className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700"
              indicatorClassName="bg-light-blue-shade-500 dark:bg-dark-blue-shade-400"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4 border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader>
            <CardTitle className="text-primary dark:text-white">Message Activity</CardTitle>
            <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Your SMS sending activity over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week">
              <div className="flex items-center justify-between">
                <TabsList className="bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
                  <TabsTrigger
                    value="day"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                  >
                    Day
                  </TabsTrigger>
                  <TabsTrigger
                    value="week"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                  >
                    Week
                  </TabsTrigger>
                  <TabsTrigger
                    value="month"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                  >
                    Month
                  </TabsTrigger>
                  <TabsTrigger
                    value="year"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                  >
                    Year
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="day" className="pt-4">
                <DashboardChart />
              </TabsContent>
              <TabsContent value="week" className="pt-4">
                <DashboardChart />
              </TabsContent>
              <TabsContent value="month" className="pt-4">
                <DashboardChart />
              </TabsContent>
              <TabsContent value="year" className="pt-4">
                <DashboardChart />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="col-span-7 md:col-span-3 border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-primary dark:text-white">Quick Actions</CardTitle>
              <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                Common tasks you can perform
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              className="justify-start bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
              asChild
            >
              <Link href="/dashboard/campaigns/new">
                <Send className="mr-2 h-4 w-4" />
                Send New Campaign
              </Link>
            </Button>
            <Button
              className="justify-start bg-white text-primary border-light-blue-shade-300 hover:bg-light-blue-shade-50 dark:bg-dark-blue-shade-700 dark:text-white dark:border-dark-blue-shade-600 dark:hover:bg-dark-blue-shade-600"
              asChild
            >
              <Link href="/dashboard/templates/new">
                <FileText className="mr-2 h-4 w-4" />
                Create Template
              </Link>
            </Button>
            <Button
              className="justify-start bg-white text-primary border-light-blue-shade-300 hover:bg-light-blue-shade-50 dark:bg-dark-blue-shade-700 dark:text-white dark:border-dark-blue-shade-600 dark:hover:bg-dark-blue-shade-600"
              asChild
            >
              <Link href="/dashboard/contacts/import">
                <Users className="mr-2 h-4 w-4" />
                Import Contacts
              </Link>
            </Button>
            <Button
              className="justify-start bg-white text-primary border-light-blue-shade-300 hover:bg-light-blue-shade-50 dark:bg-dark-blue-shade-700 dark:text-white dark:border-dark-blue-shade-600 dark:hover:bg-dark-blue-shade-600"
              asChild
            >
              <Link href="/dashboard/campaigns/schedule">
                <Clock className="mr-2 h-4 w-4" />
                Schedule Campaign
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-primary dark:text-white">Recent Campaigns</CardTitle>
            <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Your most recent SMS campaigns
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
            asChild
          >
            <Link href="/dashboard/campaigns">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <RecentCampaigns />
        </CardContent>
      </Card>
    </div>
  )
}
