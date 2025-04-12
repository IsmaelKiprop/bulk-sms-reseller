import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../Utils/ThemeProvider";
import { 
  FiMenu, 
  FiMoon, 
  FiSun, 
  FiBell, 
  FiUser,
  FiHome,
  FiDollarSign,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiCreditCard,
  FiFileText,
  FiHelpCircle,
  FiLogOut
} from 'react-icons/fi';

function AdminDashboardLayout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`flex h-screen bg-gray-100 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white dark:bg-gray-800 shadow-md`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
          <div className="flex items-center">
            <span className={`${sidebarOpen ? 'block' : 'hidden'} text-xl font-bold dark:text-white`}>Admin Panel</span>
          </div>
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiMenu size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-md ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 shadow-sm">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <FiSun size={20} className="text-gray-400" />
              ) : (
                <FiMoon size={20} className="text-gray-500" />
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Notifications">
              <FiBell size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
            <div className="relative">
              <button className="flex items-center text-gray-500 dark:text-gray-400">
                <FiUser size={20} className="mr-1" />
                <span className="text-sm">Super Admin</span>
              </button>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Logout">
              <FiLogOut size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Sidebar navigation items
const navItems = [
  { name: 'Dashboard', path: '/admin', icon: <FiHome size={20} /> },
  { name: 'Clients', path: '/admin/clients', icon: <FiUsers size={20} /> },
  { name: 'Campaigns', path: '/admin/campaigns', icon: <FiBarChart2 size={20} /> },
  { name: 'Contacts', path: '/admin/contacts', icon: <FiUsers size={20} /> },
  { name: 'Templates', path: '/admin/templates', icon: <FiFileText size={20} /> },
  { name: 'Settings', path: '/admin/settings', icon: <FiSettings size={20} /> },
];

export default AdminDashboardLayout; 