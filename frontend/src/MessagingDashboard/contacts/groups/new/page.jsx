import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import axios from 'axios';
import NODE_BASE_URL from '../../../../Utils/BaseUrl';

const NewGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      // Prepare the data in the format expected by the API
      const groupData = {
        ...formData,
        // Add default count for new groups
        count: 0
      };

      await axios.post(`${NODE_BASE_URL}/phonebooks`, groupData);
      
      // Success - redirect back to contacts page with groups tab active
      navigate('/dashboard/contacts', { state: { activeTab: 'groups' } });
    } catch (err) {
      console.error('Error creating group:', err);
      setError(err.response?.data?.message || 'Failed to create group. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Create Contact Group</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Create a new group to organize your contacts.
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
            disabled={loading || !formData.name}
            className={`inline-flex items-center px-4 py-2 rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400 ${(loading || !formData.name) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Group"}
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
          <h3 className="text-xl font-semibold text-primary dark:text-white">Group Information</h3>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Enter the details for your new contact group.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium text-primary dark:text-white">
              Group Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., VIP Customers"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium text-primary dark:text-white">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Brief description of this group"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewGroup; 