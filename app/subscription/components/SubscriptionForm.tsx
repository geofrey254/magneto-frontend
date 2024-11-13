// components/SubscriptionForm.js
"use client";
import { useState } from "react";

export default function SubscriptionForm() {
  const [planId, setPlanId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscription = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH}/mpesa/submit/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan_id: planId,
            phone_number: phoneNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const data = await response.json();
      setMessage(data.message || "Payment initiated. Awaiting confirmation.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <select onChange={(e) => setPlanId(e.target.value)}>
        <option value="daily">Daily - $1</option>
        <option value="monthly">Monthly - $10</option>
        <option value="yearly">Yearly - $100</option>
      </select>
      <input
        type="text"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSubscription}>Subscribe</button>
      {message && <p>{message}</p>}
    </div>
  );
}
