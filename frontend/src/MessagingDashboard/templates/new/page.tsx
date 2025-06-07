"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Save, X } from "lucide-react"

export default function NewTemplatePage() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleContentChange = (e) => {
    const text = e.target.value
    setContent(text)
    setCharCount(text.length)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000) // Hide toast after 3 seconds
      // In a real app, you would redirect to the templates list
      // navigate("/dashboard/templates")
    }, 1000)
  }

  const insertVariable = (variable) => {
    setContent((prev) => `${prev}{${variable}}`)
    setCharCount((prev) => prev + variable.length + 2) // +2 for the curly braces
  }

  return (
    <div className="space-y-6">
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          <div className="font-bold">Template Created</div>
          <div>Your message template has been created successfully.</div>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Create Template</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Create a new reusable message template for your campaigns.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard/templates"
            className="inline-flex items-center px-4 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !name || !content}
            className={`inline-flex items-center px-4 py-2 rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400 ${(isSubmitting || !name || !content) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Template"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-6">
          <div className="col-span-6 md:col-span-4 border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
              <h3 className="text-xl font-semibold text-primary dark:text-white">Template Details</h3>
              <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                Enter the details for your new message template.
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium text-primary dark:text-white">
                  Template Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., Welcome Message"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="block font-medium text-primary dark:text-white">
                  Category
                </label>
                <select 
                  id="category"
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="onboarding">Onboarding</option>
                  <option value="transactional">Transactional</option>
                  <option value="marketing">Marketing</option>
                  <option value="reminder">Reminder</option>
                  <option value="notification">Notification</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="content" className="block font-medium text-primary dark:text-white">
                    Message Content
                  </label>
                  <span
                    className={`text-xs ${charCount > 160 ? "text-red-500" : "text-light-blue-shade-600 dark:text-dark-blue-shade-300"}`}
                  >
                    {charCount}/160 characters
                  </span>
                </div>
                <textarea
                  id="content"
                  placeholder="Enter your message content here..."
                  value={content}
                  onChange={handleContentChange}
                  className="w-full min-h-[150px] px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
                  required
                ></textarea>
                {charCount > 160 && (
                  <p className="text-xs text-red-500">
                    Your message exceeds the standard SMS length of 160 characters. It may be split into multiple
                    messages.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2 space-y-6">
            <div className="border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                <h3 className="text-xl font-semibold text-primary dark:text-white">Variables</h3>
                <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  Insert dynamic content into your template.
                </p>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  Click on a variable to insert it into your template. Variables will be replaced with actual values
                  when sending messages.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => insertVariable("name")}
                    className="inline-flex items-center justify-center px-3 py-1 text-sm border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {"{name}"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("date")}
                    className="inline-flex items-center justify-center px-3 py-1 text-sm border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {"{date}"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("time")}
                    className="inline-flex items-center justify-center px-3 py-1 text-sm border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {"{time}"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("amount")}
                    className="inline-flex items-center justify-center px-3 py-1 text-sm border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {"{amount}"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("order_id")}
                    className="inline-flex items-center justify-center px-3 py-1 text-sm border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {"{order_id}"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("company")}
                    className="inline-flex items-center justify-center px-3 py-1 text-sm border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {"{company}"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
