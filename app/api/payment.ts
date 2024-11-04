// pages/api/payment.ts
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { token, paymentData } = req.body;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      paymentData,
      { headers }
    );
    res.status(200).json(response.data);
  } catch (error) {
    // Use type assertion to safely access error properties
    if (axios.isAxiosError(error)) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || {});
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
}
