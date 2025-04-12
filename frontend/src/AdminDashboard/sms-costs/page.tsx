import { Download, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SMSCostChart } from "@/components/admin/sms-cost-chart"

// Sample data for SMS costs
const smsCosts = [
  {
    id: "COST-001",
    provider: "Safaricom",
    month: "July 2023",
    messagesSent: 1250000,
    costPerMessage: 0.35,
    totalCost: 437500,
    averageDeliveryTime: "2.5s",
  },
  {
    id: "COST-002",
    provider: "Airtel",
    month: "July 2023",
    messagesSent: 850000,
    costPerMessage: 0.32,
    totalCost: 272000,
    averageDeliveryTime: "2.8s",
  },
  {
    id: "COST-003",
    provider: "Safaricom",
    month: "June 2023",
    messagesSent: 1100000,
    costPerMessage: 0.35,
    totalCost: 385000,
    averageDeliveryTime: "2.6s",
  },
  {
    id: "COST-004",
    provider: "Airtel",
    month: "June 2023",
    messagesSent: 780000,
    costPerMessage: 0.32,
    totalCost: 249600,
    averageDeliveryTime: "2.9s",
  },
  {
    id: "COST-005",
    provider: "Safaricom",
    month: "May 2023",
    messagesSent: 980000,
    costPerMessage: 0.35,
    totalCost: 343000,
    averageDeliveryTime: "2.7s",
  },
  {
    id: "COST-006",
    provider: "Airtel",
    month: "May 2023",
    messagesSent: 720000,
    costPerMessage: 0.32,
    totalCost: 230400,
    averageDeliveryTime: "3.0s",
  },
]

export default function SMSCostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">SMS Provider Costs</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Monitor and analyze costs from SMS providers.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-light-blue-shade-300 dark:border-dark-blue-shade-600">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Total SMS Cost (MTD)
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">KSh 709,500</div>
            <div className="flex items-center text-xs text-red-500 dark:text-red-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Messages Sent (MTD)
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">2,100,000</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>15% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Avg. Cost Per Message
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">KSh 0.34</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              <span>0.01 from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Avg. Delivery Time
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary dark:text-white">2.6s</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              <span>0.1s from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <CardHeader>
          <CardTitle className="text-primary dark:text-white">Cost Analysis</CardTitle>
          <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Monthly SMS costs by provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <div className="flex items-center justify-between">
              <TabsList className="bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
                <TabsTrigger
                  value="chart"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                >
                  Chart View
                </TabsTrigger>
                <TabsTrigger
                  value="table"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                >
                  Table View
                </TabsTrigger>
              </TabsList>
              <Select defaultValue="6months">
                <SelectTrigger className="w-[180px] border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700">
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="12months">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <TabsContent value="chart" className="pt-4">
              <SMSCostChart />
            </TabsContent>
            <TabsContent value="table" className="pt-4">
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Provider
                      </TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Month</TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Messages Sent
                      </TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Cost Per Message
                      </TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Total Cost
                      </TableHead>
                      <TableHead className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Avg. Delivery Time
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {smsCosts.map((cost) => (
                      <TableRow key={cost.id} className="border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                        <TableCell className="font-medium text-primary dark:text-white">{cost.provider}</TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {cost.month}
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {cost.messagesSent.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          KSh {cost.costPerMessage.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          KSh {cost.totalCost.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          {cost.averageDeliveryTime}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
