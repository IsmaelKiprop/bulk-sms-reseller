import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, MessageSquare, Users, ArrowUpRight, ArrowDownRight, Send, Clock, FileText } from "lucide-react"

// Create placeholder components for charts
const DashboardChart = () => (
  <div className="h-64 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded-md flex items-center justify-center">
    <span>Dashboard Chart Placeholder</span>
  </div>
);

const RecentCampaigns = () => (
  <div className="space-y-4">
    <div className="border-b pb-3 border-light-blue-shade-200 dark:border-dark-blue-shade-700">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">July Promotion</h4>
          <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">Sent: Jul 15, 2023</p>
        </div>
        <div className="text-right">
          <p className="font-medium">1,250 recipients</p>
          <p className="text-sm text-green-500">98.4% delivered</p>
        </div>
      </div>
    </div>
    <div className="border-b pb-3 border-light-blue-shade-200 dark:border-dark-blue-shade-700">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">Customer Survey</h4>
          <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">Sent: Jul 10, 2023</p>
        </div>
        <div className="text-right">
          <p className="font-medium">850 recipients</p>
          <p className="text-sm text-green-500">98.8% delivered</p>
        </div>
      </div>
    </div>
    <div className="border-b pb-3 border-light-blue-shade-200 dark:border-dark-blue-shade-700">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">August Newsletter</h4>
          <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">Scheduled: Aug 1, 2023</p>
        </div>
        <div className="text-right">
          <p className="font-medium">1,500 recipients</p>
          <p className="text-sm text-blue-500">Scheduled</p>
        </div>
      </div>
    </div>
  </div>
);

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
        <Link
          to="/dashboard/campaigns/new"
          className="inline-flex items-center px-4 py-2 rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
        >
            <Send className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Total Messages Sent
            </h3>
            <MessageSquare className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary dark:text-white">24,685</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>12% from last month</span>
            </div>
            <div className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded">
              <div className="h-full w-[65%] bg-light-blue-shade-500 dark:bg-dark-blue-shade-400 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Delivery Rate
            </h3>
            <Send className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary dark:text-white">98.7%</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>1.2% from last month</span>
            </div>
            <div className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded">
              <div className="h-full w-[98.7%] bg-light-blue-shade-500 dark:bg-dark-blue-shade-400 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Active Contacts
            </h3>
            <Users className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary dark:text-white">3,842</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>8.3% from last month</span>
            </div>
            <div className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded">
              <div className="h-full w-[45%] bg-light-blue-shade-500 dark:bg-dark-blue-shade-400 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Tokens Remaining
            </h3>
            <BarChart3 className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary dark:text-white">2,450</div>
            <div className="flex items-center text-xs text-red-500 dark:text-red-400">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              <span>24% from last month</span>
            </div>
            <div className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded">
              <div className="h-full w-[25%] bg-light-blue-shade-500 dark:bg-dark-blue-shade-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-7 md:col-span-4 border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-primary dark:text-white">Message Activity</h3>
            <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Your SMS sending activity over time
            </p>
          </div>
          <div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded-md p-1">
                  <button className="px-3 py-1 rounded-md">Day</button>
                  <button className="px-3 py-1 rounded-md bg-white dark:bg-dark-blue-shade-600">Week</button>
                  <button className="px-3 py-1 rounded-md">Month</button>
                  <button className="px-3 py-1 rounded-md">Year</button>
                </div>
              </div>
              <div className="pt-4">
                <DashboardChart />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-7 md:col-span-3 border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
          <div className="flex flex-row items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-primary dark:text-white">Quick Actions</h3>
              <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                Common tasks you can perform
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <Link
              to="/dashboard/campaigns/new"
              className="flex justify-start items-center px-4 py-2 rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
            >
                <Send className="mr-2 h-4 w-4" />
                Send New Campaign
              </Link>
            <Link
              to="/dashboard/templates/new"
              className="flex justify-start items-center px-4 py-2 rounded-md bg-white text-primary border border-light-blue-shade-300 hover:bg-light-blue-shade-50 dark:bg-dark-blue-shade-700 dark:text-white dark:border-dark-blue-shade-600 dark:hover:bg-dark-blue-shade-600"
            >
                <FileText className="mr-2 h-4 w-4" />
                Create Template
              </Link>
            <Link
              to="/dashboard/contacts/import"
              className="flex justify-start items-center px-4 py-2 rounded-md bg-white text-primary border border-light-blue-shade-300 hover:bg-light-blue-shade-50 dark:bg-dark-blue-shade-700 dark:text-white dark:border-dark-blue-shade-600 dark:hover:bg-dark-blue-shade-600"
            >
                <Users className="mr-2 h-4 w-4" />
                Import Contacts
              </Link>
            <Link
              to="/dashboard/campaigns/schedule"
              className="flex justify-start items-center px-4 py-2 rounded-md bg-white text-primary border border-light-blue-shade-300 hover:bg-light-blue-shade-50 dark:bg-dark-blue-shade-700 dark:text-white dark:border-dark-blue-shade-600 dark:hover:bg-dark-blue-shade-600"
            >
                <Clock className="mr-2 h-4 w-4" />
                Schedule Campaign
              </Link>
          </div>
        </div>
      </div>

      <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 p-4">
        <div className="flex flex-row items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-primary dark:text-white">Recent Campaigns</h3>
            <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Your most recent SMS campaigns
            </p>
          </div>
          <Link
            to="/dashboard/campaigns"
            className="inline-flex items-center px-3 py-1 text-sm border rounded-md border-light-blue-shade-300 dark:border-dark-blue-shade-600"
          >
            View All
          </Link>
        </div>
          <RecentCampaigns />
      </div>
    </div>
  )
}