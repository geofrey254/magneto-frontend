// hooks/useConfirmPayment.js
import { useState } from "react";

export default function useConfirmPayment() {
  const [confirmationStatus, setConfirmationStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const confirmPayment = async (transactionId) => {
    setLoading(true);
    try {
      const response = await fetch("/mpesa/confirm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction_id: transactionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm payment");
      }

      const data = await response.json();
      setConfirmationStatus(data);
    } catch (error) {
      console.error(error.message);
      setConfirmationStatus({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return { confirmPayment, confirmationStatus, loading };
}
