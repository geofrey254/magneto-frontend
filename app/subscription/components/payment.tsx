// components/payment.tsx
"use client";
import React, { useEffect, useState } from "react";
import SubscriptionForm from "./SubscriptionForm";

function Payment() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/subscription_plan"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subscription plans.");
        }
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  if (loading) return <p>Loading plans...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-lg text-center">
      <h1 className="text-2xl font-bold mb-2">Subscription Plans</h1>
      <p className="text-gray-700 mb-4">
        Choose a plan that suits you best. Enter your phone number below to
        subscribe.
      </p>
      <ul className="text-gray-600 mb-4">
        {plans.map((plan) => (
          <li key={plan.id}>
            {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)} - Kes{" "}
            {plan.price}
          </li>
        ))}
      </ul>
      <SubscriptionForm plans={plans} />
    </div>
  );
}

export default Payment;
