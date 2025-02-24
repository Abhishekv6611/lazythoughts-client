import { CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { URL } from "../store/url";
import toast from "react-hot-toast";
import axios from "axios";
const tiers = [
  {
    name: "Creator",
    id: "tier-enterprise",
    price: 99,
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited Posts",
      "Advanced analytics",
      "Dedicated support representative",
      "Marketing automations",
      "Custom integrations",
    ],
    featured: true,
  },
];

const PremiumModal = ({ closeModal ,userDetails ,setUpdate}) => {

  const [loading, setLoading] = useState(false);
  const [premium, setPremium] = useState();



  // Function to handle Razorpay payment
  const handlePayment = async (amount) => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/getpremium`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });


      const data = await response.json();

      if (!data || !data.id) {
        toast.error("Payment initiation failed!");
        setLoading(false);
        return;
      }

      const options = {
        key: "rzp_test_6MYlwxhqL3tUmL", 
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Premium Membership",
        description: "Upgrade to premium membership",
        handler: async function (response) {
          const verifyRes = await fetch(`${URL}/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });
        
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            const token=sessionStorage.getItem("token")
            setPremium(true);
            setUpdate(true)
            const result=await axios.put(`${URL}/updatetopremium`,{
              premium:true
            },{
              headers: {
                token:token
            },
          }
        )
        // console.log(result.data)
            toast.success("Payment successful!");
            // console.log(verifyData.success);
            
            closeModal();
          } else {
            toast.error("Payment verification failed!");
          }
        },
        // prefill: {
        //   name: "John Doe",
        //   email: "johndoe@example.com",
        //   contact: "9999999999",
        // },
        theme: {
          color: "#3F4F44",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      setLoading(false);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="relative text-white bg-[#3F4F44] rounded-2xl p-1 max-w-4xl w-full mx-4 overflow-y-auto max-h-[90vh]">
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
                  className="w-6 h-6 "
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>


        <div className="text-center">
          <h2 className="text-base font-semibold">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Choose the right plan for you</p>
          <p className="mt-4 text-lg">Get premium features to enhance your experience.</p>
        </div>

        {/* Pricing Tiers */}
        <div className="mt-8 flex justify-center text-center">
          {tiers.map((tier) => (
            <div key={tier.id} className={`rounded-2xl p-6 shadow-lg ${tier.featured ? "bg-gray-900" : "bg-white text-gray-900"}`}>
              <h3 className={`text-lg font-bold ${tier.featured ? "text-[#A27B5C]" : "text-[#3F4F44]"}`}>{tier.name}</h3>
              <p className="mt-4">
                <span className="text-4xl font-bold text-center">${tier.price}</span>
                <span className="text-gray-500">/month</span>
              </p>
              <p className="mt-4 text-gray-500">{tier.description}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-x-3">
                    <CheckIcon className="h-5 w-5 flex-none text-[#A27B5C]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handlePayment(tier.price)}
                className="mt-6 w-full bg-[#A27B5C] text-white py-2 rounded-md text-sm font-semibold shadow-sm hover:bg-[#82634a] transition-all"
                disabled={loading}
              >
                {userDetails&&userDetails.premium ? "Already Premium" :"Upgrade to Premium"}
                {loading && "Processing..." }
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
