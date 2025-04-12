import { Download, BarChart3, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueBreakdownChart } from "@/components/admin/revenue-breakdown-chart"
import { RevenueTrendChart } from "@/components/admin/revenue-trend-chart"

// Sample data for revenue
const revenueData = [
  {
    id: "REV-001",
    month: "July 2023",
    subscriptions: 850000,
    tokens: 395000,
    totalRevenue: 1245000,
    expenses: 709500,
    profit: 535500,
    profitMargin: 43,
  },
  {
    id: "REV-002",
    month: "June 2023",
    subscriptions: 780000,
    tokens: 350000,
    totalRevenue: 1130000,
    expenses: 634600,
    profit: 495400,
    profitMargin: 44,
  },
  {
    id: "REV-003",
    month: "May 2023",
    subscriptions: 720000,
    tokens: 320000,
    totalRevenue: 1040000,
    expenses: 573400,
    profit: 466600,
    profitMargin: 45,
  },
  {
    id: "REV-004",
    month: "April 2023",
    subscriptions: 680000,
    tokens: 290000,
    totalRevenue: 970000,
    expenses: 534000,
    profit: 436000,
    profitMargin: 45,
  },
  {
    id: "REV-005",
    month: "March 2023",
    subscriptions: 650000,
    tokens: 270000,
    totalRevenue: 920000,
    expenses: 506000,
    profit: 414000,
    profitMargin: 45,
  },
  {
    id: "REV-006",
    month: "February 2023",
    subscriptions: 620000,
    tokens: 250000,
    totalRevenue: 870000,
    expenses: 478500,
    profit: 391500,
    profitMargin: 45,
  },
]

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Revenue Management</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Track and analyze platform revenue and profitability.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-light-blue-shade-300 dark:border-dark-blue-shade-600">
            <Download className="mr-2 h-4 w-4" />
            Export Financial Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Total Revenue (MTD)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">KSh 1,245,000</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>10.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Subscription Revenue
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">KSh 850,000</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>9.0% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Token Revenue
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">KSh 395,000</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>12.9% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Profit Margin
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">43%</div>
            <div className="flex items-center text-xs text-red-500 dark:text-red-400">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              <span>1% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4 border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader>
            <CardTitle className="text-primary dark:text-white">Revenue Trends</CardTitle>
            <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Monthly revenue breakdown over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="6months">
              <div className="flex items-center justify-between">
                <TabsList className="bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
                  <TabsTrigger
                    value="3months"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                  >
                    3 Months
                  </TabsTrigger>
                  <TabsTrigger
                    value="6months"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                  >
                    6 Months
                  </TabsTrigger>
                  <TabsTrigger
                    value="12months"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                  >
                    12 Months
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="3months" className="pt-4">
                <RevenueTrendChart />
              </TabsContent>
              <TabsContent value="6months" className="pt-4">
                <RevenueTrendChart />
              </TabsContent>
              <TabsContent value="12months" className="pt-4">
                <RevenueTrendChart />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="col-span-7 md:col-span-3 border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader>
            <CardTitle className="text-primary dark:text-white">Revenue Breakdown</CardTitle>
            <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Current month revenue sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueBreakdownChart />
          </CardContent>
        </Card>
      </div>

      <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <CardHeader>
          <CardTitle className="text-primary dark:text-white">Financial Summary</CardTitle>
          <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Monthly revenue, expenses, and profit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Month</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Subscription Revenue
                  </TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Token Revenue
                  </TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Total Revenue
                  </TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Expenses</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Profit</TableHead>
                  <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Profit Margin
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueData.map((data) => (
                  <TableRow key={data.id} className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                    <TableCell className="font-medium text-primary dark:text-white">{data.month}</TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      KSh {data.subscriptions.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      KSh {data.tokens.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      KSh {data.totalRevenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      KSh {data.expenses.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      KSh {data.profit.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {data.profitMargin}%
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
