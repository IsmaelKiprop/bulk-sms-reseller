"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Send, X, FileText, Users, Calendar, Clock } from "lucide-react"

export default function NewCampaignPage() {
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [sendingOption, setSendingOption] = useState("now")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("compose")
  const [recipientsTab, setRecipientsTab] = useState("groups")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

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
      setToastMessage(
        sendingOption === "now"
          ? "Your SMS campaign has been sent successfully."
          : "Your SMS campaign has been scheduled successfully."
      )
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000) // Hide toast after 3 seconds
      // In a real app, you would redirect to the campaigns list
      // navigate("/dashboard/campaigns")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          <div className="font-bold">Campaign Created</div>
          <div>{toastMessage}</div>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">New Campaign</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Create and send a new SMS campaign to your contacts.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard/campaigns"
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
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : sendingOption === "now" ? "Send Now" : "Schedule Campaign"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-6">
          <div className="col-span-6 md:col-span-4 border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
              <h3 className="text-xl font-semibold text-primary dark:text-white">Campaign Details</h3>
              <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                Enter the details for your new SMS campaign.
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium text-primary dark:text-white">
                  Campaign Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., July Promotion"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-primary dark:text-white">Message Source</label>
                <div className="w-full">
                  <div className="grid w-full grid-cols-2 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded-md p-1">
                    <button 
                      type="button"
                      onClick={() => setActiveTab("compose")}
                      className={`py-2 px-4 rounded-md ${activeTab === "compose" ? "bg-white dark:bg-dark-blue-shade-600" : ""}`}
                    >
                      Compose New
                    </button>
                    <button 
                      type="button"
                      onClick={() => setActiveTab("template")}
                      className={`py-2 px-4 rounded-md ${activeTab === "template" ? "bg-white dark:bg-dark-blue-shade-600" : ""}`}
                    >
                      Use Template
                    </button>
                  </div>
                  
                  {activeTab === "compose" && (
                    <div className="pt-4 space-y-2">
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
                  )}
                  
                  {activeTab === "template" && (
                    <div className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="template" className="block font-medium text-primary dark:text-white">
                          Select Template
                        </label>
                        <select
                          id="template"
                          className="w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
                        >
                          <option value="" disabled selected>Choose a template</option>
                          <option value="welcome">Welcome Message</option>
                          <option value="payment">Payment Confirmation</option>
                          <option value="appointment">Appointment Reminder</option>
                          <option value="promotion">Promotional Offer</option>
                          <option value="shipping">Order Shipped</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Preview Template
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-primary dark:text-white">Recipients</label>
                <div className="w-full">
                  <div className="grid w-full grid-cols-2 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700 rounded-md p-1">
                    <button 
                      type="button"
                      onClick={() => setRecipientsTab("groups")}
                      className={`py-2 px-4 rounded-md ${recipientsTab === "groups" ? "bg-white dark:bg-dark-blue-shade-600" : ""}`}
                    >
                      Contact Groups
                    </button>
                    <button 
                      type="button"
                      onClick={() => setRecipientsTab("individual")}
                      className={`py-2 px-4 rounded-md ${recipientsTab === "individual" ? "bg-white dark:bg-dark-blue-shade-600" : ""}`}
                    >
                      Individual Numbers
                    </button>
                  </div>
                  
                  {recipientsTab === "groups" && (
                    <div className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="group" className="block font-medium text-primary dark:text-white">
                          Select Groups
                        </label>
                        <select
                          id="group"
                          className="w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
                          multiple
                        >
                          <option value="customers">Customers (1,250)</option>
                          <option value="subscribers">Subscribers (850)</option>
                          <option value="vip">VIP Clients (120)</option>
                          <option value="staff">Staff (45)</option>
                        </select>
                        <p className="text-xs text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          Hold Ctrl (or Cmd) to select multiple groups
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {recipientsTab === "individual" && (
                    <div className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="numbers" className="block font-medium text-primary dark:text-white">
                          Phone Numbers
                        </label>
                        <textarea
                          id="numbers"
                          placeholder="Enter phone numbers, one per line or separated by commas..."
                          className="w-full min-h-[100px] px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
                        ></textarea>
                        <p className="text-xs text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                          Enter numbers in international format (e.g., +254712345678)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-primary dark:text-white">Sending Options</label>
                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-3">
                    <input
                      id="send-now"
                      type="radio"
                      name="sendingOption"
                      value="now"
                      checked={sendingOption === "now"}
                      onChange={() => setSendingOption("now")}
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor="send-now" className="font-medium text-primary dark:text-white">
                        Send Immediately
                      </label>
                      <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Your message will be sent as soon as you submit the form.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <input
                      id="send-later"
                      type="radio"
                      name="sendingOption"
                      value="schedule"
                      checked={sendingOption === "schedule"}
                      onChange={() => setSendingOption("schedule")}
                      className="mt-1"
                    />
                    <div className="space-y-2">
                      <label htmlFor="send-later" className="font-medium text-primary dark:text-white">
                        Schedule for Later
                      </label>
                      <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Choose a date and time to send your message.
                      </p>
                      
                      {sendingOption === "schedule" && (
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div>
                            <label htmlFor="date" className="block text-sm font-medium text-primary dark:text-white">
                              Date
                            </label>
                            <input
                              id="date"
                              type="date"
                              className="mt-1 w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
                            />
                          </div>
                          <div>
                            <label htmlFor="time" className="block text-sm font-medium text-primary dark:text-white">
                              Time
                            </label>
                            <input
                              id="time"
                              type="time"
                              className="mt-1 w-full px-3 py-2 border border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700 rounded-md"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2 space-y-6">
            <div className="border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                <h3 className="text-xl font-semibold text-primary dark:text-white">Summary</h3>
                <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  Campaign overview and estimated cost.
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Recipients</span>
                    <span className="font-medium text-primary dark:text-white">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Message Length</span>
                    <span className="font-medium text-primary dark:text-white">{charCount} characters</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">SMS Count</span>
                    <span className="font-medium text-primary dark:text-white">
                      {Math.ceil(charCount / 160) || 1} per recipient
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">Sending Time</span>
                    <span className="font-medium text-primary dark:text-white">
                      {sendingOption === "now" ? "Immediately" : "Scheduled"}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                  <div className="flex justify-between font-bold">
                    <span className="text-primary dark:text-white">Estimated Cost</span>
                    <span className="text-primary dark:text-white">KSh 0.00</span>
                  </div>
                  <p className="text-xs text-light-blue-shade-600 dark:text-dark-blue-shade-300 mt-1">
                    Based on your current SMS pricing plan.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-light-blue-shade-200 dark:border-dark-blue-shade-700">
                <h3 className="text-xl font-semibold text-primary dark:text-white">Advanced Options</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  <input
                    id="track-clicks"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="track-clicks" className="ml-2 block text-sm text-primary dark:text-white">
                    Track clicks on links
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="personalize"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="personalize" className="ml-2 block text-sm text-primary dark:text-white">
                    Personalize messages
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="prevent-duplicates"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="prevent-duplicates" className="ml-2 block text-sm text-primary dark:text-white">
                    Prevent duplicate messages
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
