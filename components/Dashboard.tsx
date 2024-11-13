// pages/dashboard.js
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  useEffect(() => {
    const checkTransactionStatus = async () => {
      try {
        const response = await fetch("/mpesa/check-transaction/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch subscription status");
        }

        const data = await response.json();
        setSubscriptionStatus(data);
      } catch (error) {
        console.error(error.message);
        setSubscriptionStatus({ active: false });
      }
    };

    checkTransactionStatus();
  }, []);

  if (subscriptionStatus === null) return <p>Loading...</p>;

  return subscriptionStatus.active ? (
    <div>Welcome to your dashboard!</div>
  ) : (
    <p>Your subscription has expired. Please renew.</p>
  );
}
