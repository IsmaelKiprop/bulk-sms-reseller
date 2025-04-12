"use client"

import { useState } from "react"
import Link from "next/link"
import { Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function NewTemplatePage() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      toast({
        title: "Template Created",
        description: "Your message template has been created successfully.",
      })
      // In a real app, you would redirect to the templates list
      // router.push("/dashboard/templates")
    }, 1000)
  }

  const insertVariable = (variable) => {
    setContent((prev) => `${prev}{${variable}}`)
    setCharCount((prev) => prev + variable.length + 2) // +2 for the curly braces
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Create Template</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Create a new reusable message template for your campaigns.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-light-blue-shade-300 dark:border-dark-blue-shade-600" asChild>
            <Link href="/dashboard/templates">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !name || !content}
            className="bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Template"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-6">
          <Card className="col-span-6 md:col-span-4 border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">Template Details</CardTitle>
              <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                Enter the details for your new message template.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary dark:text-white">
                  Template Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Welcome Message"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-primary dark:text-white">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700">
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="transactional">Transactional</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content" className="text-primary dark:text-white">
                    Message Content
                  </Label>
                  <span
                    className={`text-xs ${charCount > 160 ? "text-red-500" : "text-light-blue-shade-600 dark:text-dark-blue-shade-300"}`}
                  >
                    {charCount}/160 characters
                  </span>
                </div>
                <Textarea
                  id="content"
                  placeholder="Enter your message content here..."
                  value={content}
                  onChange={handleContentChange}
                  className="min-h-[150px] border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700"
                  required
                />
                {charCount > 160 && (
                  <p className="text-xs text-red-500">
                    Your message exceeds the standard SMS length of 160 characters. It may be split into multiple
                    messages.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="col-span-6 md:col-span-2 space-y-6">
            <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-white">Variables</CardTitle>
                <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  Insert dynamic content into your template.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  Click on a variable to insert it into your template. Variables will be replaced with actual values
                  when sending messages.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable("name")}
                    className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                  >
                    {"{name}"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable("date")}
                    className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                  >
                    {"{date}"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable("time")}
                    className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                  >
                    {"{time}"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable("amount")}
                    className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                  >
                    {"{amount}"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable("order_id")}
                    className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                  >
                    {"{order_id}"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable("tracking_link")}
                    className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                  >
                    {"{tracking_link}"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-white">Preview</CardTitle>
                <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  See how your message will look.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-light-blue-shade-300 dark:border-dark-blue-shade-600 p-4 bg-light-blue-shade-50 dark:bg-dark-blue-shade-700">
                  <p className="text-sm text-light-blue-shade-700 dark:text-dark-blue-shade-200 whitespace-pre-wrap">
                    {content || "Your message preview will appear here..."}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  Variables will be replaced with actual data when sending.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
