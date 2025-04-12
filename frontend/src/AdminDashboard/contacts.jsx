import React, { useState } from "react";
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiUsers, FiUserPlus, FiDownload, FiUpload, FiUserCheck, FiMessageCircle } from "react-icons/fi";

function ContactsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  // Toggle contact selection
  const toggleContactSelection = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  // Select all contacts
  const selectAllContacts = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  // Calculate filtered contacts based on search and tab
  const filteredContacts = dummyContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         contact.phone.includes(searchTerm) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "groups") {
      return matchesSearch && selectedGroup && contact.groups.includes(selectedGroup);
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contact Management</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            <FiUpload className="h-4 w-4" />
            <span>Import</span>
          </button>
          <button className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
            <FiUserPlus className="h-4 w-4" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mr-4">
            <FiUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Contacts</p>
            <p className="text-xl font-semibold">{dummyContacts.length.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 mr-4">
            <FiUserCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Groups</p>
            <p className="text-xl font-semibold">{dummyGroups.length}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mr-4">
            <FiMessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Messages Sent</p>
            <p className="text-xl font-semibold">152,480</p>
          </div>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="border-b border-gray-200 dark:border-gray-700 -mb-px flex space-x-8">
          <button
            onClick={() => {
              setSelectedTab("all");
              setSelectedGroup(null);
            }}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "all"
                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
            }`}
          >
            All Contacts
          </button>
          <button
            onClick={() => {
              setSelectedTab("groups");
              if (!selectedGroup && dummyGroups.length > 0) {
                setSelectedGroup(dummyGroups[0].id);
              }
            }}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "groups"
                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Groups
          </button>
        </div>

        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Groups dropdown if groups tab selected */}
      {selectedTab === "groups" && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              className="form-select block w-64 py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedGroup || ""}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {dummyGroups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name} ({group.contactCount})
                </option>
              ))}
            </select>
            
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <FiEdit2 className="h-5 w-5" />
            </button>
            
            <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
              <FiTrash2 className="h-5 w-5" />
            </button>
          </div>
          
          <button 
            className="flex items-center gap-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={() => setShowCreateGroupModal(true)}
          >
            <FiPlus className="h-5 w-5" /> Create Group
          </button>
        </div>
      )}

      {/* Contacts Table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                          onChange={selectAllContacts}
                        />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Groups
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Last Messaged
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => toggleContactSelection(contact.id)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {contact.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {contact.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {contact.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {contact.groups.map(groupId => {
                            const group = dummyGroups.find(g => g.id === groupId);
                            return group ? (
                              <span key={groupId} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                                {group.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {contact.lastMessaged}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                          <FiEdit2 className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedContacts.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg shadow flex justify-between items-center">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <strong>{selectedContacts.length}</strong> contacts selected
          </div>
          <div className="flex gap-3">
            <button className="text-sm bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-3 py-1 rounded border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-gray-700">
              Add to Group
            </button>
            <button className="text-sm bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-3 py-1 rounded border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-gray-700">
              Send Message
            </button>
            <button className="text-sm bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 px-3 py-1 rounded border border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-gray-700">
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-lg shadow">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
              <span className="font-medium">{filteredContacts.length}</span> results
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

      {/* Upload Modal - Shown when isUploadModalOpen is true */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Import Contacts</h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Drag and drop a CSV or Excel file, or click to select a file
              </p>
              <input 
                type="file" 
                className="hidden" 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
              />
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Select File
              </button>
            </div>
            <div className="flex items-center mt-4 space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <FiDownload className="h-4 w-4" />
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Download sample template</a>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Create Contact Group</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter group name"
                />
              </div>
              
              <div>
                <label htmlFor="groupDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description (optional)
                </label>
                <textarea
                  id="groupDescription"
                  rows="3"
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter group description"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-5 flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateGroupModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Dummy contact groups for demonstration
const dummyGroups = [
  { id: "group1", name: "Customers", contactCount: 1250, description: "Active customers" },
  { id: "group2", name: "Leads", contactCount: 450, description: "Potential customers" },
  { id: "group3", name: "Subscribers", contactCount: 3200, description: "Newsletter subscribers" },
  { id: "group4", name: "VIP", contactCount: 86, description: "Premium customers" },
  { id: "group5", name: "Events", contactCount: 520, description: "Event attendees" }
];

// Dummy contacts data for demonstration
const dummyContacts = [
  {
    id: "contact1",
    name: "John Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    groups: ["group1", "group4"],
    lastMessaged: "Jul 15, 2023"
  },
  {
    id: "contact2",
    name: "Jane Smith",
    phone: "+2345678901",
    email: "jane.smith@example.com",
    groups: ["group2"],
    lastMessaged: "Aug 02, 2023"
  },
  {
    id: "contact3",
    name: "Michael Johnson",
    phone: "+3456789012",
    email: "michael.j@example.com",
    groups: ["group1", "group5"],
    lastMessaged: "Jun 28, 2023"
  },
  {
    id: "contact4",
    name: "Emily Williams",
    phone: "+4567890123",
    email: "emily.w@example.com",
    groups: ["group3"],
    lastMessaged: "Jul 30, 2023"
  },
  {
    id: "contact5",
    name: "David Brown",
    phone: "+5678901234",
    email: "david.b@example.com",
    groups: ["group1", "group3"],
    lastMessaged: "Aug 05, 2023"
  },
  {
    id: "contact6",
    name: "Sarah Miller",
    phone: "+6789012345",
    email: "sarah.m@example.com",
    groups: ["group4"],
    lastMessaged: "Jul 20, 2023"
  },
  {
    id: "contact7",
    name: "James Wilson",
    phone: "+7890123456",
    email: "james.w@example.com",
    groups: ["group2", "group5"],
    lastMessaged: "Aug 01, 2023"
  },
  {
    id: "contact8",
    name: "Linda Taylor",
    phone: "+8901234567",
    email: "linda.t@example.com",
    groups: ["group1"],
    lastMessaged: "Jul 10, 2023"
  },
  {
    id: "contact9",
    name: "Robert Anderson",
    phone: "+9012345678",
    email: "robert.a@example.com",
    groups: ["group3", "group5"],
    lastMessaged: "Jul 25, 2023"
  },
  {
    id: "contact10",
    name: "Patricia Thomas",
    phone: "+0123456789",
    email: "patricia.t@example.com",
    groups: ["group1", "group4"],
    lastMessaged: "Aug 03, 2023"
  }
];

export default ContactsManagement; 