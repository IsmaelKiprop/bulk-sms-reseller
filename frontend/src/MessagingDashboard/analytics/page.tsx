import React from 'react';
import { BarChart3, LineChart, PieChart, Calendar, Download, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Create placeholder components for the charts
const DeliveryRateChart = () => (
  <div className="h-64 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded-md flex items-center justify-center">
    <span>Delivery Rate Chart Placeholder</span>
  </div>
);

const MessageVolumeChart = () => (
  <div className="h-64 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded-md flex items-center justify-center">
    <span>Message Volume Chart Placeholder</span>
  </div>
);

const CampaignPerformanceTable = () => (
  <div className="h-64 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded-md p-4">
    <div className="text-center mb-4">Campaign Performance Table Placeholder</div>
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left p-2">Campaign</th>
          <th className="text-left p-2">Sent</th>
          <th className="text-left p-2">Delivered</th>
          <th className="text-left p-2">Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="p-2">July Promotion</td>
          <td className="p-2">1,250</td>
          <td className="p-2">1,230</td>
          <td className="p-2">98.4%</td>
        </tr>
        <tr className="border-b">
          <td className="p-2">Customer Survey</td>
          <td className="p-2">850</td>
          <td className="p-2">840</td>
          <td className="p-2">98.8%</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Analytics</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Track and analyze your SMS campaign performance.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <label htmlFor="time-period" className="sr-only">Select time period</label>
            <select
              id="time-period"
              className="w-[180px] py-2 px-3 border rounded-md border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 appearance-none"
              defaultValue="30days"
              aria-label="Select time period"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="year">Last year</option>
              <option value="custom">Custom range</option>
            </select>
          </div>
          <button className="flex items-center px-4 py-2 border rounded-md border-light-blue-shade-300 dark:border-dark-blue-shade-600">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Total Messages Sent
            </h3>
            <BarChart3 className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary dark:text-white">24,685</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>12% from last period</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Average Delivery Rate
            </h3>
            <LineChart className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary dark:text-white">98.7%</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>1.2% from last period</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Campaigns Sent
            </h3>
            <PieChart className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary dark:text-white">18</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>5 more than last period</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Average Cost per Message
            </h3>
            <Calendar className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary dark:text-white">KSh 0.95</div>
            <div className="flex items-center text-xs text-red-500 dark:text-red-400">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              <span>0.05 less than last period</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-7 md:col-span-4 border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-primary dark:text-white">Message Volume</h3>
            <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Number of messages sent over time
            </p>
          </div>
          <div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded-md p-1">
                  <button 
                    className="px-3 py-1 rounded-md bg-white dark:bg-dark-blue-shade-600"
                  >
                    Daily
                  </button>
                  <button 
                    className="px-3 py-1 rounded-md"
                  >
                    Weekly
                  </button>
                  <button 
                    className="px-3 py-1 rounded-md"
                  >
                    Monthly
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <MessageVolumeChart />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-7 md:col-span-3 border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-primary dark:text-white">Delivery Rate</h3>
            <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Message delivery success rate
            </p>
          </div>
          <div>
            <DeliveryRateChart />
          </div>
        </div>
      </div>

      <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-primary dark:text-white">Campaign Performance</h3>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Detailed performance metrics for your recent campaigns
          </p>
        </div>
        <div>
          <CampaignPerformanceTable />
        </div>
      </div>
    </div>
  )
}
