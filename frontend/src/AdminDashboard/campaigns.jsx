import React, { useState } from "react";
import { FiSearch, FiFilter, FiEye, FiBarChart2, FiPieChart, FiClock, FiUsers, FiMessageSquare, FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";

function CampaignsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("active");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SMS Campaigns</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
          Create New Campaign
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mr-4">
            <FiMessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Campaigns</p>
            <p className="text-xl font-semibold">{dummyStats.totalCampaigns}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mr-4">
            <FiCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Delivered</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-xl font-semibold">{dummyStats.totalDelivered.toLocaleString()}</p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {dummyStats.deliveryRate}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-red-100 dark:bg-red-900 p-3 mr-4">
            <FiXCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Failed</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-xl font-semibold">{dummyStats.totalFailed.toLocaleString()}</p>
              <p className="text-sm text-red-600 dark:text-red-400">
                {dummyStats.failureRate}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 mr-4">
            <FiUsers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Recipients</p>
            <p className="text-xl font-semibold">{dummyStats.totalRecipients.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab("active")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "active"
                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Active Campaigns
          </button>
          <button
            onClick={() => setSelectedTab("scheduled")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "scheduled"
                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setSelectedTab("completed")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "completed"
                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setSelectedTab("draft")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "draft"
                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Drafts
          </button>
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FiFilter className="h-5 w-5 text-gray-400" />
            <select
              className="form-select block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="in_progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="h-5 w-5 text-gray-400" />
            <select
              className="form-select block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Campaign
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Recipients
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Sent/Delivered
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Performance
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {dummyCampaigns
              .filter(campaign => {
                if (selectedTab === "active" && campaign.status === "in_progress") return true;
                if (selectedTab === "scheduled" && campaign.status === "scheduled") return true;
                if (selectedTab === "completed" && campaign.status === "completed") return true;
                if (selectedTab === "draft" && campaign.status === "draft") return true;
                return selectedTab === "all";
              })
              .filter(campaign => {
                if (statusFilter === "all") return true;
                return campaign.status === statusFilter;
              })
              .map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {campaign.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {campaign.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${campaign.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                        campaign.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : 
                        campaign.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' : 
                        campaign.status === 'draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                        'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                      {campaign.status === 'in_progress' ? 'In Progress' : 
                       campaign.status === 'scheduled' ? 'Scheduled' :
                       campaign.status === 'completed' ? 'Completed' :
                       campaign.status === 'draft' ? 'Draft' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {campaign.recipients.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {campaign.sent.toLocaleString()} / {campaign.delivered.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {campaign.status !== "draft" && campaign.status !== "scheduled" ? 
                        `${Math.round((campaign.delivered / campaign.sent) * 100)}% delivered` : 
                        "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {campaign.status === "scheduled" ? (
                      <>
                        <div>Scheduled for:</div>
                        <div className="font-medium text-gray-900 dark:text-white">{campaign.date}</div>
                      </>
                    ) : campaign.status === "draft" ? (
                      <span>-</span>
                    ) : (
                      <>
                        <div>Sent on:</div>
                        <div className="font-medium text-gray-900 dark:text-white">{campaign.date}</div>
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.status === "completed" || campaign.status === "in_progress" ? (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.round((campaign.delivered / campaign.sent) * 100)}%` }}></div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
                      <FiEye className="h-5 w-5" />
                    </button>
                    {campaign.status === "completed" && (
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        <FiBarChart2 className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-lg shadow">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
              <span className="font-medium">{dummyCampaigns.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-blue-900 text-sm font-medium text-blue-600 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                2
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dummy statistics for demonstration
const dummyStats = {
  totalCampaigns: 24,
  totalDelivered: 142580,
  deliveryRate: 98.2,
  totalFailed: 2620,
  failureRate: 1.8,
  totalRecipients: 86450
};

// Dummy campaigns data for demonstration
const dummyCampaigns = [
  {
    id: "CAM-001",
    name: "July Promotion",
    status: "completed",
    recipients: 15000,
    sent: 14985,
    delivered: 14750,
    date: "Jul 15, 2023",
  },
  {
    id: "CAM-002",
    name: "August Newsletter",
    status: "in_progress",
    recipients: 18500,
    sent: 10450,
    delivered: 10320,
    date: "Aug 05, 2023",
  },
  {
    id: "CAM-003",
    name: "Flash Sale",
    status: "scheduled",
    recipients: 22000,
    sent: 0,
    delivered: 0,
    date: "Aug 25, 2023",
  },
  {
    id: "CAM-004",
    name: "New Product Launch",
    status: "draft",
    recipients: 25000,
    sent: 0,
    delivered: 0,
    date: "",
  },
  {
    id: "CAM-005",
    name: "Customer Feedback",
    status: "completed",
    recipients: 5950,
    sent: 5950,
    delivered: 5830,
    date: "Jul 28, 2023",
  },
  {
    id: "CAM-006",
    name: "Service Announcement",
    status: "failed",
    recipients: 11200,
    sent: 8500,
    delivered: 6200,
    date: "Jul 10, 2023",
  },
  {
    id: "CAM-007",
    name: "Holiday Special",
    status: "scheduled",
    recipients: 35000,
    sent: 0,
    delivered: 0,
    date: "Dec 01, 2023",
  },
  {
    id: "CAM-008",
    name: "Renewal Reminder",
    status: "draft",
    recipients: 4200,
    sent: 0,
    delivered: 0,
    date: "",
  },
  {
    id: "CAM-009",
    name: "App Update",
    status: "completed",
    recipients: 28500,
    sent: 28500,
    delivered: 28150,
    date: "Jun 22, 2023",
  },
  {
    id: "CAM-010",
    name: "Black Friday Preview",
    status: "draft",
    recipients: 45000,
    sent: 0,
    delivered: 0,
    date: "",
  }
];

export default CampaignsManagement; 