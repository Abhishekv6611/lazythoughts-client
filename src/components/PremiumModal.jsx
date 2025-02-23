import { CheckIcon } from "@heroicons/react/20/solid";


const tiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    href: "#",
    priceMonthly: "$29",
    description: "The perfect plan if you're just getting started with our product.",
    features: ["250 Post", "Minimum marketing automations", "Advanced analytics", "24-hour support response time"],
    featured: false,
  },
  {
    name: "Creator",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$99",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited Post",
      "Advanced analytics",
      "Dedicated support representative",
      "Marketing automations",
      "Custom integrations",
    ],
    featured: true,
  },
];



const PremiumModal = ({closeModal}) => {

   
    
   
    

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
      }
  return (
    <>
     
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <div className="relative text-white  bg-[#3F4F44] rounded-2xl p-8 max-w-4xl w-full mx-4 overflow-y-auto max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-[#A27B5C] hover:text-[#c0916b]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="text-center">
                <h2 className="text-base font-semibold ">Pricing</h2>
                <p className="mt-2 text-4xl font-bold tracking-tight  sm:text-5xl">
                  Choose the right plan for you
                </p>
                <p className="mt-4 text-lg ">
                  Choose an affordable plan that’s packed with the best features for engaging your audience, creating
                  customer loyalty, and driving sales.
                </p>
              </div>

              {/* Pricing Tiers */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={classNames(
                      tier.featured ? "bg-gray-900 text-white" : "bg-white text-gray-900",
                      "rounded-2xl p-6 shadow-lg"
                    )}
                  >
                    <h3 className={classNames(tier.featured ? "text-[#A27B5C]" : "text-[#A27B5C]", "text-lg font-bold")}>
                      {tier.name}
                    </h3>
                    <p className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-4xl font-bold">{tier.priceMonthly}</span>
                      <span className="text-gray-500">/month</span>
                    </p>
                    <p className="mt-4 text-gray-500">{tier.description}</p>
                    <ul className="mt-6 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-x-3">
                          <CheckIcon
                            className={classNames(
                              tier.featured ? "text-[#A27B5C]" : "text-[#3F4F44]",
                              "h-5 w-5 flex-none"
                            )}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={tier.href}
                      className={classNames(
                        tier.featured
                          ? "bg-[#A27B5C] text-white hover:bg-[#82634a]"
                          : "bg-white text-[#A27B5C] ring-1 ring-indigo-200 hover:ring-[#A27B5C]",
                        "mt-8 block w-full rounded-md px-4 py-2 text-center text-sm font-semibold shadow-sm transition-all"
                      )}
                    >
                      Get started today
                    </a>
                  </div>
                ))}
                </div>
                </div>
                </div>
   
    </>
  )
}

export default PremiumModal
