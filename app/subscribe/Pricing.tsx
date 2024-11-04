// components/Pricing.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Subscription, SubscriptionResponse } from "../subscribe/types";

function Pricing() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/subscriptions");
        const data: SubscriptionResponse = await response.json();
        setSubscriptions(data.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  const initiatePayment = async (subscription) => {
    try {
      // Step 2: Fetch token
      const tokenResponse = await fetch("http://localhost:3000/api/token");
      const tokenData = await tokenResponse.json();
      const token = tokenData.token;

      // Step 3: Create payment data
      const paymentData = {
        // Adjust this according to the M-Pesa API requirements
        businessShortCode: process.env.NEXT_PUBLIC_MPESA_SHORTCODE, // Your M-Pesa short code
        // Replace these placeholders with actual values
        phoneNumber: "2547XXXXXXXX", // User's phone number in format 2547XXXXXXX
        amount: subscription.price, // Amount to be charged
        callbackUrl: "https://yourcallbackurl.com/callback", // Replace with your actual callback URL
        // Add other necessary parameters as required by the M-Pesa API
      };

      // Step 4: Call the payment API
      const paymentResponse = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, paymentData }),
      });

      const paymentResult = await paymentResponse.json();
      console.log("Payment Result:", paymentResult);

      // Handle payment result (e.g., show success message, redirect, etc.)
    } catch (error) {
      console.error("Payment initiation error:", error);
    }
  };

  return (
    <section className="w-full bg-[#350203]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md md:text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-[#f8d6b6] dark:text-[#350203]">
            Affordable Learning Solutions for Every Student
          </h2>
          <p className="mb-5 font-medium text-[#f8d6b6] sm:text-xl dark:text-gray-400">
            At Magneto, we provide high school students with access to quality
            learning materials at an affordable cost, so you can excel in your
            studies no matter where you are.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="flex flex-col p-6 mx-auto max-w-lg text-center text-[#350203] bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-[#350203]"
            >
              <h3 className="mb-4 text-2xl font-semibold">
                {subscription.title}
              </h3>
              <p className="font-medium text-[#350203d4] sm:text-sm dark:text-gray-400">
                {subscription.description}
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                  Kes {subscription.price}
                </span>
                <span className="text-[#350203d4] dark:text-gray-400">
                  /{subscription.interval}
                </span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {subscription.features.split("\n").map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => initiatePayment(subscription)}
                className="text-[#350203] bg-[#f8d6b6] hover:bg-[#f7b374] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
