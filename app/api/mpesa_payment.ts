// pages/api/mpesa-payment.js
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { phone_number, plan_id, amount } = req.body;

    // Validate input data
    if (!phone_number || !plan_id || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Logic to process payment with M-Pesa goes here
    // ...

    // Return success response
    return res.status(200).json({ status: "Payment processed successfully" });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
