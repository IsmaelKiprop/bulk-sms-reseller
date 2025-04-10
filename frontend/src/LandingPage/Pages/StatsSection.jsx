import { MessageSquare, Users, Clock, Zap } from "lucide-react"

export default function StatsSection() {
  return (
    <section className="border-y bg-white py-12 md:py-16 dark:bg-dark-background dark:border-dark-blue-shade-700">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <MessageSquare className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <div className="text-3xl font-bold text-primary dark:text-white">10M+</div>
            <div className="text-sm text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Messages Delivered Monthly
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <Users className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <div className="text-3xl font-bold text-primary dark:text-white">1,000+</div>
            <div className="text-sm text-light-blue-shade-700 dark:text-dark-blue-shade-200">Active Businesses</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <Clock className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <div className="text-3xl font-bold text-primary dark:text-white">99.9%</div>
            <div className="text-sm text-light-blue-shade-700 dark:text-dark-blue-shade-200">Uptime Reliability</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue-shade-100 dark:bg-dark-blue-shade-700">
              <Zap className="h-6 w-6 text-light-blue-shade-600 dark:text-dark-blue-shade-200" />
            </div>
            <div className="text-3xl font-bold text-primary dark:text-white">3s</div>
            <div className="text-sm text-light-blue-shade-700 dark:text-dark-blue-shade-200">Average Delivery Time</div>
          </div>
        </div>
      </div>
    </section>
  )
}
