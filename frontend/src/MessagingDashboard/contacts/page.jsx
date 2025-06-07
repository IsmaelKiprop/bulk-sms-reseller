import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, Search, Filter, Upload, Download, MoreHorizontal, Pencil, Trash2, MessageSquare } from "lucide-react";

// Sample data for contacts
const contacts = [
  {
    id: "CON-001",
    name: "John Doe",
    phone: "+254712345678",
    group: "Customers",
    lastMessageDate: "2023-07-15",
  },
  {
    id: "CON-002",
    name: "Jane Smith",
    phone: "+254723456789",
    group: "VIP Clients",
    lastMessageDate: "2023-07-10",
  },
  {
    id: "CON-003",
    name: "Michael Johnson",
    phone: "+254734567890",
    group: "Subscribers",
    lastMessageDate: "2023-08-01",
  },
  {
    id: "CON-004",
    name: "Sarah Williams",
    phone: "+254745678901",
    group: "Customers",
    lastMessageDate: "2023-07-05",
  },
  {
    id: "CON-005",
    name: "David Brown",
    phone: "+254756789012",
    group: "Staff",
    lastMessageDate: "2023-07-20",
  },
  {
    id: "CON-006",
    name: "Emily Davis",
    phone: "+254767890123",
    group: "Customers",
    lastMessageDate: "2023-06-28",
  },
  {
    id: "CON-007",
    name: "Robert Wilson",
    phone: "+254778901234",
    group: "Subscribers",
    lastMessageDate: "2023-06-15",
  },
  {
    id: "CON-008",
    name: "Jennifer Taylor",
    phone: "+254789012345",
    group: "VIP Clients",
    lastMessageDate: "2023-08-15",
  },
  {
    id: "CON-009",
    name: "Thomas Anderson",
    phone: "+254790123456",
    group: "Customers",
    lastMessageDate: "2023-07-01",
  },
  {
    id: "CON-010",
    name: "Lisa Martinez",
    phone: "+254701234567",
    group: "Staff",
    lastMessageDate: "2023-08-20",
  },
];

// Sample data for groups
const groups = [
  {
    id: "GRP-001",
    name: "Customers",
    count: 1250,
    description: "All active customers",
  },
  {
    id: "GRP-002",
    name: "Subscribers",
    count: 850,
    description: "Newsletter subscribers",
  },
  {
    id: "GRP-003",
    name: "VIP Clients",
    count: 120,
    description: "Premium customers",
  },
  {
    id: "GRP-004",
    name: "Staff",
    count: 45,
    description: "Internal team members",
  },
];

const Contacts = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('contacts');

  // Set active tab based on navigation state (when returning from group creation)
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Contacts</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Manage your contacts and contact groups.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="border rounded-md px-3 py-2 border-light-blue-shade-300 dark:border-dark-blue-shade-600 inline-flex items-center">
            <Link to="/dashboard/contacts/import" className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Link>
          </button>
          <button className="border rounded-md px-3 py-2 border-light-blue-shade-300 dark:border-dark-blue-shade-600 inline-flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button className="bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400 rounded-md px-3 py-2 inline-flex items-center">
            <Link to="/dashboard/contacts/new" className="flex items-center text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Link>
          </button>
        </div>
      </div>

      <div className="border rounded-lg border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
        <div className="p-4 pb-3">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 inline-flex rounded-md">
                <button
                  className={`px-3 py-2 rounded-md ${activeTab === 'contacts' ? 'bg-white dark:bg-dark-blue-shade-600' : ''}`}
                  onClick={() => setActiveTab('contacts')}
                >
                  Contacts
                </button>
                <button
                  className={`px-3 py-2 rounded-md ${activeTab === 'groups' ? 'bg-white dark:bg-dark-blue-shade-600' : ''}`}
                  onClick={() => setActiveTab('groups')}
                >
                  Groups
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="border rounded-md px-3 py-1 text-sm border-light-blue-shade-300 dark:border-dark-blue-shade-600 inline-flex items-center"
                >
                  <Link to="/dashboard/contacts/groups/new" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    New Group
                  </Link>
                </button>
              </div>
            </div>

            {activeTab === 'contacts' && (
              <div className="pt-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <input
                      type="search"
                      placeholder="Search contacts..."
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
                  <button
                    className="border rounded-md px-3 py-1 text-sm border-light-blue-shade-300 dark:border-dark-blue-shade-600 inline-flex items-center"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </button>
                </div>

                <div className="mt-6 overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                        <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">Name</th>
                        <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          Phone Number
                        </th>
                        <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">Group</th>
                        <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          Last Message
                        </th>
                        <th className="text-right py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr
                          key={contact.id}
                          className="border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700"
                        >
                          <td className="py-3 px-4 font-medium text-primary dark:text-white">
                            <Link to={`/dashboard/contacts/${contact.id}`} className="hover:underline">
                              {contact.name}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                            {contact.phone}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className="inline-flex items-center px-2 py-1 rounded-full border border-light-blue-shade-300 text-light-blue-shade-600 dark:border-dark-blue-shade-600 dark:text-dark-blue-shade-300"
                            >
                              {contact.group}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                            {new Date(contact.lastMessageDate).toLocaleDateString()}
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
                                    to={`/dashboard/contacts/edit/${contact.id}`}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                  </Link>
                                  <Link
                                    to={`/dashboard/campaigns/new?contact=${contact.id}`}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Send Message</span>
                                  </Link>
                                  <div className="border-t border-gray-100 dark:border-gray-600"></div>
                                  <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </button>
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
            )}

            {activeTab === 'groups' && (
              <div className="pt-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <input
                      type="search"
                      placeholder="Search groups..."
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
                </div>

                <div className="mt-6 overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                        <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          Group Name
                        </th>
                        <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          Contacts
                        </th>
                        <th className="text-left py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          Description
                        </th>
                        <th className="text-right py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups.map((group) => (
                        <tr key={group.id} className="border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                          <td className="py-3 px-4 font-medium text-primary dark:text-white">
                            <Link to={`/dashboard/contacts/groups/${group.id}`} className="hover:underline">
                              {group.name}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                            {group.count.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                            {group.description}
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
                                    to={`/dashboard/contacts/groups/edit/${group.id}`}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                  </Link>
                                  <Link
                                    to={`/dashboard/campaigns/new?group=${group.id}`}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Send Message</span>
                                  </Link>
                                  <div className="border-t border-gray-100 dark:border-gray-600"></div>
                                  <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </button>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts; 