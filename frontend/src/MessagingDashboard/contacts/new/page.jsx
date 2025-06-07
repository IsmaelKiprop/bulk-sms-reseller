import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import axios from 'axios';
import BASE_URL from '../../../Utils/BaseUrl';

const NewContact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    group: ''
  });
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch groups for dropdown
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/groups`);
        // Ensure groups is an array - handle different API response structures
        if (Array.isArray(response.data)) {
          setGroups(response.data);
        } else if (response.data && typeof response.data === 'object') {
          // Check if response.data has a data property that's an array
          if (Array.isArray(response.data.data)) {
            setGroups(response.data.data);
          } else {
            // Fallback to default groups
            console.warn('API response format unexpected, using default groups');
            setGroups(defaultGroups);
          }
        } else {
          // Fallback to default groups
          console.warn('API response is not in expected format, using default groups');
          setGroups(defaultGroups);
        }
      } catch (err) {
        console.error('Error fetching groups:', err);
        // Fallback to sample groups in case API is not available
        setGroups(defaultGroups);
      }
    };

    fetchGroups();
  }, []);

  // Default groups to use as fallback
  const defaultGroups = [
    { id: "GRP-001", name: "Customers" },
    { id: "GRP-002", name: "Subscribers" },
    { id: "GRP-003", name: "VIP Clients" },
    { id: "GRP-004", name: "Staff" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Format phone number if needed (remove spaces, add country code, etc.)
      const formattedPhone = formData.phone.startsWith('+') 
        ? formData.phone 
        : `+${formData.phone}`;

      const contactData = {
        ...formData,
        phone: formattedPhone
      };

      await axios.post(`${BASE_URL}/contacts`, contactData);
      
      // Success - redirect back to contacts page
      navigate('/dashboard/contacts');
    } catch (err) {
      console.error('Error creating contact:', err);
      setError(err.response?.data?.message || 'Failed to create contact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Add New Contact</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Create a new contact in your database.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard/contacts"
            className="inline-flex items-center px-4 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading || !formData.name || !formData.phone}
            className={`inline-flex items-center px-4 py-2 rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400 ${(loading || !formData.name || !formData.phone) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Contact"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
          <h3 className="text-xl font-semibold text-primary dark:text-white">Contact Information</h3>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Enter the details for your new contact.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium text-primary dark:text-white">
              Contact Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="block font-medium text-primary dark:text-white">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+254712345678"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
              required
            />
            <p className="text-xs text-light-blue-shade-600 dark:text-dark-blue-shade-300">
              Include country code, e.g. +254 for Kenya
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="group" className="block font-medium text-primary dark:text-white">
              Group
            </label>
            <select
              id="group"
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
            >
              <option value="">No Group</option>
              {Array.isArray(groups) && groups.map(group => (
                <option key={group.id} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewContact; 