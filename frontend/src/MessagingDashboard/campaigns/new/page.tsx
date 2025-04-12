"use client"

import { useState } from "react"
import Link from "next/link"
import { Send, X, FileText, Users, Calendar, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

export default function NewCampaignPage() {
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [sendingOption, setSendingOption] = useState("now")
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
        title: "Campaign Created",
        description:
          sendingOption === "now"
            ? "Your SMS campaign has been sent successfully."
            : "Your SMS campaign has been scheduled successfully.",
      })
      // In a real app, you would redirect to the campaigns list
      // router.push("/dashboard/campaigns")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">New Campaign</h2>
          <p className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
            Create and send a new SMS campaign to your contacts.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-light-blue-shade-300 dark:border-dark-blue-shade-600" asChild>
            <Link href="/dashboard/campaigns">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !name || !content}
            className="bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : sendingOption === "now" ? "Send Now" : "Schedule Campaign"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-6">
          <Card className="col-span-6 md:col-span-4 border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">Campaign Details</CardTitle>
              <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                Enter the details for your new SMS campaign.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary dark:text-white">
                  Campaign Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., July Promotion"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-primary dark:text-white">Message Source</Label>
                <Tabs defaultValue="compose" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
                    <TabsTrigger
                      value="compose"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                    >
                      Compose New
                    </TabsTrigger>
                    <TabsTrigger
                      value="template"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                    >
                      Use Template
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="compose" className="pt-4">
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
                  </TabsContent>
                  <TabsContent value="template" className="pt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="template" className="text-primary dark:text-white">
                          Select Template
                        </Label>
                        <Select>
                          <SelectTrigger className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700">
                            <SelectValue placeholder="Choose a template" />
                          </SelectTrigger>
                          <SelectContent className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700">
                            <SelectItem value="welcome">Welcome Message</SelectItem>
                            <SelectItem value="payment">Payment Confirmation</SelectItem>
                            <SelectItem value="appointment">Appointment Reminder</SelectItem>
                            <SelectItem value="promotion">Promotional Offer</SelectItem>
                            <SelectItem value="shipping">Order Shipped</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Preview Template
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label className="text-primary dark:text-white">Recipients</Label>
                <Tabs defaultValue="groups" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
                    <TabsTrigger
                      value="groups"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                    >
                      Contact Groups
                    </TabsTrigger>
                    <TabsTrigger
                      value="individual"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-blue-shade-600"
                    >
                      Individual Numbers
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="groups" className="pt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-primary dark:text-white">Select Contact Groups</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-light-blue-shade-600 dark:text-dark-blue-shade-300 hover:text-light-blue-shade-500 dark:hover:text-dark-blue-shade-200"
                          >
                            Select All
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="customers" />
                            <Label
                              htmlFor="customers"
                              className="text-light-blue-shade-700 dark:text-dark-blue-shade-200"
                            >
                              Customers (1,250)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="subscribers" />
                            <Label
                              htmlFor="subscribers"
                              className="text-light-blue-shade-700 dark:text-dark-blue-shade-200"
                            >
                              Newsletter Subscribers (850)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="vip" />
                            <Label htmlFor="vip" className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
                              VIP Clients (120)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="staff" />
                            <Label htmlFor="staff" className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
                              Staff Members (45)
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Manage Groups
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="individual" className="pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="numbers" className="text-primary dark:text-white">
                        Enter Phone Numbers
                      </Label>
                      <Textarea
                        id="numbers"
                        placeholder="Enter phone numbers separated by commas or new lines..."
                        className="min-h-[100px] border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700"
                      />
                      <p className="text-xs text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                        Format: +254XXXXXXXXX (include country code)
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label className="text-primary dark:text-white">Sending Options</Label>
                <RadioGroup defaultValue="now" onValueChange={setSendingOption} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="now"
                      id="now"
                      className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                    />
                    <Label htmlFor="now" className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
                      Send Immediately
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="schedule"
                      id="schedule"
                      className="border-light-blue-shade-300 dark:border-dark-blue-shade-600"
                    />
                    <Label htmlFor="schedule" className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
                      Schedule for Later
                    </Label>
                  </div>
                </RadioGroup>

                {sendingOption === "schedule" && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-primary dark:text-white">
                        Date
                      </Label>
                      <div className="flex">
                        <Input
                          id="date"
                          type="date"
                          className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700"
                          min={new Date().toISOString().split("T")[0]}
                        />
                        <Button type="button" variant="ghost" size="icon" className="ml-2">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-primary dark:text-white">
                        Time
                      </Label>
                      <div className="flex">
                        <Input
                          id="time"
                          type="time"
                          className="border-light-blue-shade-300 dark:border-dark-blue-shade-600 dark:bg-dark-blue-shade-700"
                        />
                        <Button type="button" variant="ghost" size="icon" className="ml-2">
                          <Clock className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="col-span-6 md:col-span-2 space-y-6">
            <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-white">Campaign Summary</CardTitle>
                <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  Review your campaign details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary dark:text-white">Campaign Name</p>
                  <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    {name || "Not specified"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary dark:text-white">Message Preview</p>
                  <div className="rounded-lg border border-light-blue-shade-300 dark:border-dark-blue-shade-600 p-4 bg-light-blue-shade-50 dark:bg-dark-blue-shade-700">
                    <p className="text-sm text-light-blue-shade-700 dark:text-dark-blue-shade-200 whitespace-pre-wrap">
                      {content || "Your message preview will appear here..."}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary dark:text-white">Estimated Recipients</p>
                  <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">0 contacts</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary dark:text-white">Sending Time</p>
                  <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                    {sendingOption === "now" ? "Immediately after submission" : "Scheduled for later"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary dark:text-white">Estimated Cost</p>
                  <p className="text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">0 tokens</p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-light-blue-shade-200 dark:border-dark-blue-shade-700 pt-4">
                <p className="text-xs text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  Messages longer than 160 characters will be split into multiple messages and charged accordingly.
                </p>
              </CardFooter>
            </Card>

            <Card className="border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-white">Tips</CardTitle>
                <CardDescription className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  Best practices for SMS campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Keep messages concise and under 160 characters when possible.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Include a clear call-to-action in your message.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Avoid sending messages during late night or early morning hours.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Always include an opt-out option for marketing messages.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
