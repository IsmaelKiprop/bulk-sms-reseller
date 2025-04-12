import React, { useState } from "react";
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiCopy, FiFileText, FiStar, FiMessageSquare, FiInfo, FiChevronDown, FiChevronUp, FiCheckCircle } from "react-icons/fi";

function TemplateManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [expandedTemplate, setExpandedTemplate] = useState(null);

  // Toggle template expansion to show full content
  const toggleTemplateExpansion = (templateId) => {
    if (expandedTemplate === templateId) {
      setExpandedTemplate(null);
    } else {
      setExpandedTemplate(templateId);
    }
  };

  // Show preview modal
  const showPreview = (template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  // Dummy template data for demonstration
  const dummyTemplates = [
    {
      id: "template1",
      name: "Welcome Message",
      category: "Onboarding",
      content: "Hello {name}, welcome to our service! We're excited to have you on board. If you have any questions, feel free to contact us at our support number.",
      isFavorite: true,
      usageCount: 256,
      createdAt: "Jun 12, 2023"
    },
    {
      id: "template2",
      name: "Appointment Reminder",
      category: "Reminders",
      content: "Hi {name}, this is a reminder that you have an appointment scheduled on {date}. Please arrive 10 minutes early. Reply YES to confirm or call us to reschedule.",
      isFavorite: true,
      usageCount: 189,
      createdAt: "Jun 18, 2023"
    },
    {
      id: "template3",
      name: "Order Confirmation",
      category: "Transactional",
      content: "Dear {name}, your order #12345 has been confirmed and is being processed. You will receive a shipment notification once it's on the way. Thank you for shopping with us!",
      isFavorite: false,
      usageCount: 143,
      createdAt: "Jul 05, 2023"
    },
    {
      id: "template4",
      name: "Payment Receipt",
      category: "Transactional",
      content: "Hello {name}, we've received your payment of {amount} for invoice #INV-678. Thank you for your business! A detailed receipt has been sent to your email.",
      isFavorite: false,
      usageCount: 98,
      createdAt: "Jul 10, 2023"
    },
    {
      id: "template5",
      name: "Event Invitation",
      category: "Marketing",
      content: "You're invited! Join us for our annual customer appreciation event on {date} at The Grand Hall. Enjoy food, drinks, and exclusive offers. RSVP by replying YES to this message.",
      isFavorite: false,
      usageCount: 78,
      createdAt: "Jul 15, 2023"
    },
    {
      id: "template6",
      name: "Follow-up",
      category: "Sales",
      content: "Hi {name}, I wanted to follow up on our conversation about our premium services. Do you have any questions I can answer? I'm available at your convenience.",
      isFavorite: false,
      usageCount: 56,
      createdAt: "Jul 22, 2023"
    },
    {
      id: "template7",
      name: "Feedback Request",
      category: "Customer Service",
      content: "Hello {name}, thank you for using our service! We value your opinion. Could you take a moment to rate your experience? Reply with a number from 1-5, with 5 being excellent.",
      isFavorite: true,
      usageCount: 120,
      createdAt: "Jul 28, 2023"
    },
    {
      id: "template8",
      name: "Discount Offer",
      category: "Marketing",
      content: "Special offer for you, {name}! Use code SAVE20 to get 20% off your next purchase. Valid until {date}. Shop now at our website or in-store.",
      isFavorite: false,
      usageCount: 87,
      createdAt: "Aug 03, 2023"
    },
    {
      id: "template9",
      name: "Account Verification",
      category: "Security",
      content: "Your verification code is 123456. Use this code to complete your account setup. This code will expire in 10 minutes. Please do not share this code with anyone.",
      isFavorite: false,
      usageCount: 201,
      createdAt: "Aug 08, 2023"
    }
  ];

  // Filter templates based on search and category
  const filteredTemplates = dummyTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === "all") return matchesSearch;
    if (selectedCategory === "favorites") return matchesSearch && template.isFavorite;
    return matchesSearch && template.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Message Templates</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            <FiFileText className="h-4 w-4" />
            <span>New Category</span>
          </button>
          <button 
            onClick={() => setShowTemplateModal(true)}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
          >
            <FiPlus className="h-4 w-4" />
            <span>New Template</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mr-4">
            <FiFileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Templates</p>
            <p className="text-xl font-semibold">{dummyTemplates.length}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 mr-4">
            <FiMessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
            <p className="text-xl font-semibold">{[...new Set(dummyTemplates.map(t => t.category))].length}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-yellow-100 dark:bg-yellow-900 p-3 mr-4">
            <FiStar className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Favorites</p>
            <p className="text-xl font-semibold">{dummyTemplates.filter(t => t.isFavorite).length}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mr-4">
            <FiCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Most Used</p>
            <p className="text-xl font-semibold">{dummyTemplates.reduce((max, t) => Math.max(max, t.usageCount), 0)}</p>
          </div>
        </div>
      </div>

      {/* Category Tabs and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`py-2 px-4 rounded-md text-sm font-medium ${
              selectedCategory === "all"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            All Templates
          </button>
          <button
            onClick={() => setSelectedCategory("favorites")}
            className={`py-2 px-4 rounded-md text-sm font-medium ${
              selectedCategory === "favorites"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center gap-1">
              <FiStar className="h-4 w-4" />
              <span>Favorites</span>
            </div>
          </button>
          {[...new Set(dummyTemplates.map(t => t.category))].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`py-2 px-4 rounded-md text-sm font-medium ${
                selectedCategory === category
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
              <h3 className="font-medium text-gray-800 dark:text-white">{template.name}</h3>
              <div className="flex items-center space-x-2">
                {template.isFavorite && (
                  <FiStar className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {template.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <p className={`text-sm text-gray-600 dark:text-gray-300 ${
                expandedTemplate === template.id ? "" : "line-clamp-3"
              }`}>
                {template.content}
              </p>
              
              {template.content.length > 120 && (
                <button 
                  onClick={() => toggleTemplateExpansion(template.id)}
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center"
                >
                  {expandedTemplate === template.id ? (
                    <>
                      <FiChevronUp className="h-4 w-4 mr-1" /> Show less
                    </>
                  ) : (
                    <>
                      <FiChevronDown className="h-4 w-4 mr-1" /> Show more
                    </>
                  )}
                </button>
              )}
              
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                <FiInfo className="h-4 w-4 mr-1" />
                <span>Used {template.usageCount} times</span>
                <span className="mx-2">•</span>
                <span>Created {template.createdAt}</span>
              </div>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-between">
              <div className="flex space-x-3">
                <button 
                  onClick={() => showPreview(template)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Preview
                </button>
                <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                  Use
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                  <FiCopy className="h-4 w-4" />
                </button>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                  <FiEdit2 className="h-4 w-4" />
                </button>
                <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Create New Template</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Template Name
                </label>
                <input
                  type="text"
                  id="templateName"
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter template name"
                />
              </div>
              
              <div>
                <label htmlFor="templateCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  id="templateCategory"
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {[...new Set(dummyTemplates.map(t => t.category))].map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="templateContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Template Content
                </label>
                <textarea
                  id="templateContent"
                  rows="8"
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter your template content here"
                ></textarea>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Variables</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {"{name}"}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {"{phone}"}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {"{company}"}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {"{date}"}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {"{amount}"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-5 flex justify-end gap-3">
              <button 
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Create New Category</h3>
            
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter category name"
              />
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Existing Categories</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[...new Set(dummyTemplates.map(t => t.category))].map(category => (
                  <div key={category} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-5 flex justify-end gap-3">
              <button 
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && previewTemplate && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Template Preview</h3>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {previewTemplate.name.charAt(0)}
                </div>
                <div className="ml-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Your Organization</div>
                  <div className="text-sm font-medium text-gray-800 dark:text-white">+1234567890</div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mt-2 text-gray-800 dark:text-white text-sm">
                {previewTemplate.content.replace(/{name}/g, "John Doe")
                                        .replace(/{phone}/g, "+1234567890")
                                        .replace(/{company}/g, "ACME Corp")
                                        .replace(/{date}/g, "August 15, 2023")
                                        .replace(/{amount}/g, "$250.00")}
              </div>
              
              <div className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
                Today, 4:30 PM
              </div>
            </div>
            
            <div className="mt-5 flex justify-end gap-3">
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateManagement; 