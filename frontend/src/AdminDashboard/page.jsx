import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Users,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

// Import component files if necessary
import { AdminRevenueChart } from "./Components/AdminRevenueChart";
import { RecentPaymentsTable } from "./Components/RecentPaymentsTable";
import { ClientGrowthChart } from "./Components/ClientGrowthChart";

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
          <Link to="/admin/reports/generate" className="inline-flex items-center px-4 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white">
            Generate Report
          </Link>
          <Link to="/admin/settings" className="inline-flex items-center px-4 py-2 rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400">
            System Settings
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg shadow">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Total Revenue
            </h3>
            <DollarSign className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary dark:text-white">KSh 1,245,890</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>18% from last month</span>
            </div>
            <div className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded">
              <div className="h-full w-[75%] bg-light-blue-shade-500 dark:bg-dark-blue-shade-400 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg shadow">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Active Clients
            </h3>
            <Users className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary dark:text-white">1,024</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>12% from last month</span>
            </div>
            <div className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded">
              <div className="h-full w-[68%] bg-light-blue-shade-500 dark:bg-dark-blue-shade-400 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg shadow">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              SMS Sent (MTD)
            </h3>
            <MessageSquare className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary dark:text-white">3.2M</div>
            <div className="flex items-center text-xs text-green-500 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>24% from last month</span>
            </div>
            <div className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded">
              <div className="h-full w-[85%] bg-light-blue-shade-500 dark:bg-dark-blue-shade-400 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg shadow">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              SMS Provider Cost
            </h3>
            <CreditCard className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary dark:text-white">KSh 480,250</div>
            <div className="flex items-center text-xs text-red-500 dark:text-red-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>15% from last month</span>
            </div>
            <div className="mt-3 h-1 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded">
              <div className="h-full w-[62%] bg-light-blue-shade-500 dark:bg-dark-blue-shade-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-7 md:col-span-4 border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg shadow">
          <div className="p-4 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
            <h3 className="text-lg font-medium text-primary dark:text-white">Revenue Overview</h3>
            <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Monthly revenue and expenses breakdown
            </p>
          </div>
          <div className="p-4">
            <div className="tabs">
              <div className="flex items-center justify-between">
                <div className="flex bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded-md p-1">
                  <button 
                    className="px-3 py-1 rounded-md bg-white dark:bg-dark-blue-shade-600"
                    onClick={() => {}}
                  >
                    Revenue
                  </button>
                  <button 
                    className="px-3 py-1 rounded-md"
                    onClick={() => {}}
                  >
                    Profit Margin
                  </button>
                  <button 
                    className="px-3 py-1 rounded-md"
                    onClick={() => {}}
                  >
                    SMS Costs
                  </button>
                </div>
              </div>
              <div className="pt-4">
                {/* Replace with actual chart or visual component */}
                <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Revenue Chart Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-7 md:col-span-3 border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg shadow">
          <div className="p-4 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
            <h3 className="text-lg font-medium text-primary dark:text-white">Client Growth</h3>
            <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              New client acquisition over time
            </p>
          </div>
          <div className="p-4">
            {/* Replace with actual chart or visual component */}
            <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Client Growth Chart Placeholder</span>
            </div>
          </div>
          <div className="p-4 border-t border-light-blue-shade-200 dark:border-dark-blue-shade-700">
            <Link 
              to="/admin/clients"
              className="flex justify-center items-center w-full px-4 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
            >
              View All Clients
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-7 md:col-span-4 border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg shadow">
          <div className="flex flex-row items-center justify-between p-4 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
            <div>
              <h3 className="text-lg font-medium text-primary dark:text-white">Recent Payments</h3>
              <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                Latest payment transactions on the platform
              </p>
            </div>
            <Link 
              to="/admin/payments"
              className="inline-flex items-center px-3 py-1 rounded-md bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 text-light-blue-shade-600 dark:text-dark-blue-shade-300 hover:bg-light-blue-shade-200 dark:hover:bg-dark-blue-shade-600 text-sm"
            >
              View All
            </Link>
          </div>
          <div className="p-4">
            {/* Replace with actual table component */}
            <table className="w-full">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left">Client</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-3">ABC Company</td>
                  <td className="px-4 py-3">KSh 12,500</td>
                  <td className="px-4 py-3">Jul 12, 2023</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-3">XYZ Ltd</td>
                  <td className="px-4 py-3">KSh 8,200</td>
                  <td className="px-4 py-3">Jul 10, 2023</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-3">123 Group</td>
                  <td className="px-4 py-3">KSh 15,000</td>
                  <td className="px-4 py-3">Jul 8, 2023</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="col-span-7 md:col-span-3 border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg shadow">
          <div className="flex flex-row items-center justify-between p-4 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
            <div>
              <h3 className="text-lg font-medium text-primary dark:text-white">System Alerts</h3>
              <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                Important notifications requiring attention
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-300">Low SMS Credit Alert</h4>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Provider credit balance is below threshold. Please recharge soon to avoid service interruption.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Pending Client Approvals</h4>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    3 new client registrations are waiting for your approval.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <AlertTriangle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-300">System Update Available</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    A new system update is available. Click here to view release notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 