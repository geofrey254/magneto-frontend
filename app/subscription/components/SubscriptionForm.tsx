"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/Providers";

interface Plan {
  id: number;
  name: string;
  price: number;
}

export default function SubscriptionForm() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const { isAuthenticated, checkAuthentication } = useAuth();
  const [planId, setPlanId] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthentication(); // Ensure authentication is checked when the component mounts
  }, [checkAuthentication]);

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
        if (data.length > 0) {
          setPlanId(data[0].id); // Set the first plan as default
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);
  if (loading) return <p>Loading plans...</p>;
  if (error) return <p>{error}</p>;

  const handleSubscription = async () => {
    if (!isAuthenticated) {
      setMessage("You must be logged in to subscribe.");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/mpesa/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          plan_id: planId,
          phone_number: phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const data = await response.json();
      setMessage(data.message || "Payment initiated. Awaiting confirmation.");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      style={styles.container}
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        handleSubscription();
      }}
    >
      <h2>Subscribe to a Plan</h2>

      <label htmlFor="plan" style={styles.label}>
        Choose Plan:
      </label>
      <select
        id="plan"
        value={planId || ""}
        onChange={(e) => setPlanId(Number(e.target.value) || null)}
        style={styles.select}
      >
        {plans.map((plan) => (
          <option
            key={plan.id}
            value={plan.id}
          >{`${plan.name} - Kes ${plan.price}`}</option>
        ))}
      </select>

      <label htmlFor="phone" style={styles.label}>
        Phone Number:
      </label>
      <input
        type="text"
        id="phone"
        placeholder="Enter 10-digit phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={styles.input}
        required // Ensures the input is required
      />

      <button
        type="submit"
        disabled={isLoading}
        style={styles.button(isLoading)}
      >
        {isLoading ? "Processing..." : "Subscribe"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "1em",
            color: message.includes("Failed") ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "1em",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  label: { display: "block", marginBottom: "0.5em", fontWeight: "bold" },
  select: {
    width: "100%",
    padding: "0.5em",
    marginBottom: "1em",
    borderRadius: "4px",
  },
  input: {
    width: "100%",
    padding: "0.5em",
    marginBottom: "1em",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: (isLoading) => ({
    width: "100%",
    padding: "0.75em",
    backgroundColor: isLoading ? "#ccc" : "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: isLoading ? "not-allowed" : "pointer",
  }),
};
