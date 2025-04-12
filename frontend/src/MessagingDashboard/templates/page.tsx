import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MoreHorizontal, Copy, Pencil, Trash2, Send } from "lucide-react"

// Sample data for templates
const templates = [
  {
    id: "TPL-001",
    name: "Welcome Message",
    category: "Onboarding",
    lastUsed: "2023-07-15",
    content: "Hello {name}, welcome to our service! We're excited to have you on board.",
  },
  {
    id: "TPL-002",
    name: "Payment Confirmation",
    category: "Transactional",
    lastUsed: "2023-07-10",
    content: "Dear {name}, your payment of KSh {amount} has been received. Thank you!",
  },
  {
    id: "TPL-003",
    name: "Appointment Reminder",
    category: "Reminder",
    lastUsed: "2023-08-01",
    content: "Reminder: You have an appointment scheduled for {date} at {time}. Reply YES to confirm.",
  },
  {
    id: "TPL-004",
    name: "Promotional Offer",
    category: "Marketing",
    lastUsed: "2023-07-05",
    content: "Special offer for you! Get {discount}% off on all products until {expiry_date}. Shop now!",
  },
  {
    id: "TPL-005",
    name: "Order Shipped",
    category: "Transactional",
    lastUsed: "2023-07-20",
    content: "Your order #{order_id} has been shipped and will arrive in {days} days. Track: {tracking_link}",
  },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Message Templates</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Create and manage reusable message templates for your campaigns.
          </p>
        </div>
        <Link
          to="/dashboard/templates/new"
          className="inline-flex items-center px-4 py-2 rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Link>
      </div>

      <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <div className="p-4 pb-3">
          <h3 className="text-xl font-bold text-primary dark:text-white">Templates</h3>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Manage your message templates for quick campaign creation.
          </p>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="search"
                placeholder="Search templates..."
                className="border rounded-md px-3 py-2 w-full border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700"
              />
              <button
                type="submit"
                className="p-2 rounded-md text-light-blue-shade-600 dark:text-dark-blue-shade-300"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </button>
            </div>
            <button className="inline-flex items-center px-3 py-1 text-sm border rounded-md border-light-blue-shade-300 dark:border-dark-blue-shade-600">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
          </div>

          <div className="mt-6 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                  <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">Name</th>
                  <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">Category</th>
                  <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">Last Used</th>
                  <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Content Preview
                  </th>
                  <th className="text-right py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.id} className="border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                    <td className="py-3 px-4 font-medium text-primary dark:text-white">
                      <Link to={`/dashboard/templates/${template.id}`} className="hover:underline">
                        {template.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center px-2 py-1 rounded-full border border-light-blue-shade-300 text-light-blue-shade-600 dark:border-dark-blue-shade-600 dark:text-dark-blue-shade-300"
                      >
                        {template.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {new Date(template.lastUsed).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                      {template.content}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="relative inline-block text-left">
                        <button className="p-2 rounded-md text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </button>
                        <div className="hidden absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-dark-blue-shade-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">Actions</div>
                            <div className="border-t border-gray-100 dark:border-gray-600"></div>
                            <Link
                              to={`/dashboard/templates/edit/${template.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                            <Link
                              to={`/dashboard/templates/duplicate/${template.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Duplicate</span>
                            </Link>
                            <Link
                              to={`/dashboard/campaigns/new?template=${template.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              <Send className="mr-2 h-4 w-4" />
                              <span>Use in Campaign</span>
                            </Link>
                            <div className="border-t border-gray-100 dark:border-gray-600"></div>
                            <Link
                              to={`/dashboard/templates/delete/${template.id}`}
                              className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 