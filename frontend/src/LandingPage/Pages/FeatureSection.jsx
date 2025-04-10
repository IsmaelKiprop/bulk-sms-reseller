import { MessageSquare, BarChart3, Users, Clock, Shield, Zap, Smartphone, Globe } from "lucide-react"

export default function FeatureSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white dark:bg-dark-background">
      <div className="mx-auto mb-12 max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary dark:text-white">
            Powerful Features for Your Business
          </h2>
          <p className="mt-4 text-lg text-light-blue-shade-700 dark:text-dark-blue-shade-200">
            Our platform offers everything you need to connect with your customers effectively.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 p-6 bg-white dark:bg-dark-blue-shade-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <MessageSquare className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white">Bulk SMS Campaigns</h3>
            <p className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Send personalized messages to thousands of contacts with just a few clicks.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 p-6 bg-white dark:bg-dark-blue-shade-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <BarChart3 className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white">Advanced Analytics</h3>
            <p className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Track delivery rates, engagement metrics, and campaign performance in real-time.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 p-6 bg-white dark:bg-dark-blue-shade-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <Users className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white">Contact Management</h3>
            <p className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Organize contacts into groups and segments for targeted messaging campaigns.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 p-6 bg-white dark:bg-dark-blue-shade-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <Clock className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white">Message Scheduling</h3>
            <p className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Plan your campaigns in advance and schedule messages to be sent at the perfect time.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 p-6 bg-white dark:bg-dark-blue-shade-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <Shield className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white">Secure Platform</h3>
            <p className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Your data is protected with enterprise-grade security and GDPR-compliant storage.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 p-6 bg-white dark:bg-dark-blue-shade-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <Zap className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white">API Integration</h3>
            <p className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Connect our SMS platform with your existing systems through our robust API.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 p-6 bg-white dark:bg-dark-blue-shade-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <Smartphone className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white">Two-Way Messaging</h3>
            <p className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Receive and respond to customer replies directly through our platform.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 p-6 bg-white dark:bg-dark-blue-shade-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <Globe className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white">M-Pesa Integration</h3>
            <p className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Seamless payment processing with direct M-Pesa integration for subscriptions and token purchases.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 p-6 bg-white dark:bg-dark-blue-shade-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <MessageSquare className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white">Message Templates</h3>
            <p className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Create and save message templates for quick and consistent communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
