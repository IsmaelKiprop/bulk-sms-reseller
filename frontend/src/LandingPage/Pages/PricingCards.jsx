import { useState } from "react"
import { CheckCircle } from "lucide-react"

// Note: Using regular HTML elements instead of imported components
function PricingCards() {
  const [annual, setAnnual] = useState(false)

  const plans = [
    {
      name: "Basic",
      description: "Perfect for small businesses and startups",
      price: annual ? "2,990" : "299",
      period: annual ? "/year" : "/month",
      features: [
        "1,000 SMS per month",
        "Basic templates",
        "Standard delivery reports",
        "Email support",
        "Contact management",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with regular SMS needs",
      price: annual ? "9,990" : "999",
      period: annual ? "/year" : "/month",
      features: [
        "5,000 SMS per month",
        "Advanced scheduling",
        "Customized templates",
        "Basic API access",
        "Priority support",
        "Advanced analytics",
        "Two-way messaging",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with high-volume requirements",
      price: annual ? "24,990" : "2,499",
      period: annual ? "/year" : "/month",
      features: [
        "Unlimited SMS",
        "Full API access with webhooks",
        "Priority sending",
        "Dedicated account manager",
        "White-labeling options",
        "Custom integration services",
        "Advanced security features",
        "24/7 support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const handleToggleChange = () => {
    setAnnual(!annual)
  }

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white dark:bg-dark-background">
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-light-blue-shade-700 dark:text-dark-blue-shade-200">
            Choose the plan that works best for your business needs
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <label
              htmlFor="billing-toggle"
              className={
                annual ? "text-light-blue-shade-500 dark:text-dark-blue-shade-400" : "text-primary dark:text-white"
              }
            >
              Monthly
            </label>
            {/* Using regular HTML input instead of Switch component */}
            <input 
              type="checkbox" 
              id="billing-toggle" 
              checked={annual} 
              onChange={handleToggleChange}
              className="toggle-checkbox"
            />
            <label
              htmlFor="billing-toggle"
              className={
                !annual ? "text-light-blue-shade-500 dark:text-dark-blue-shade-400" : "text-primary dark:text-white"
              }
            >
              Annual <span className="text-sm text-light-blue-shade-400 dark:text-dark-blue-shade-300">(Save 20%)</span>
            </label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col ${plan.popular ? "border-light-blue-shade-500 dark:border-dark-blue-shade-400 shadow-lg" : "border-light-blue-shade-200 dark:border-dark-blue-shade-700"} relative overflow-hidden bg-white dark:bg-dark-blue-shade-800 border rounded-lg`}
            >
              {plan.popular && (
                <div className="absolute right-0 top-0 bg-light-blue-shade-500 dark:bg-dark-blue-shade-500 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary dark:text-white">{plan.name}</h3>
                <p className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">
                  {plan.description}
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary dark:text-white">KSh {plan.price}</span>
                  <span className="text-light-blue-shade-600 dark:text-dark-blue-shade-300">{plan.period}</span>
                </div>
              </div>
              <div className="p-6 flex-1">
                <ul className="grid gap-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-light-blue-shade-500 dark:text-dark-blue-shade-400" />
                      <span className="text-light-blue-shade-700 dark:text-dark-blue-shade-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6">
                {/* Using regular HTML anchor tag instead of Button component */}
                <a
                  href={plan.name === "Enterprise" ? "/contact" : "/register"}
                  className={`w-full inline-block text-center py-2 px-4 rounded ${
                    plan.popular 
                      ? "bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400" 
                      : "bg-white text-primary border border-light-blue-shade-300 hover:bg-light-blue-shade-50 dark:bg-dark-blue-shade-700 dark:text-white dark:border-dark-blue-shade-600 dark:hover:bg-dark-blue-shade-600"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-light-blue-shade-50 dark:bg-dark-blue-shade-800 p-6 text-center">
          <h3 className="text-xl font-bold text-primary dark:text-white">Need a custom solution?</h3>
          <p className="mt-2 text-light-blue-shade-700 dark:text-dark-blue-shade-200">
            We also offer token-based pricing for businesses with variable SMS needs.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-700 p-4">
              <div className="text-2xl font-bold text-primary dark:text-white">1,000 Tokens</div>
              <div className="text-lg font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                KSh 1,000
              </div>
              <div className="text-sm text-light-blue-shade-500 dark:text-dark-blue-shade-400">KSh 1.00 per SMS</div>
            </div>
            <div className="rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-700 p-4">
              <div className="text-2xl font-bold text-primary dark:text-white">5,000 Tokens</div>
              <div className="text-lg font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                KSh 4,500
              </div>
              <div className="text-sm text-light-blue-shade-500 dark:text-dark-blue-shade-400">KSh 0.90 per SMS</div>
            </div>
            <div className="rounded-lg border border-light-blue-shade-200 dark:border-dark-blue-shade-700 bg-white dark:bg-dark-blue-shade-700 p-4">
              <div className="text-2xl font-bold text-primary dark:text-white">10,000 Tokens</div>
              <div className="text-lg font-medium text-light-blue-shade-600 dark:text-dark-blue-shade-300">
                KSh 8,000
              </div>
              <div className="text-sm text-light-blue-shade-500 dark:text-dark-blue-shade-400">KSh 0.80 per SMS</div>
            </div>
          </div>
          {/* Using regular HTML anchor instead of Button component */}
          <a
            href="/contact"
            className="mt-6 inline-block py-2 px-4 rounded bg-white text-primary border border-light-blue-shade-300 hover:bg-light-blue-shade-50 dark:bg-dark-blue-shade-700 dark:text-white dark:border-dark-blue-shade-600 dark:hover:bg-dark-blue-shade-600"
          >
            Contact Us for Custom Pricing
          </a>
        </div>
      </div>
    </section>
  )
}

export default PricingCards