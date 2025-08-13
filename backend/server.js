import express from "express";
import Razorpay from "razorpay";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "R22BbMB6v7E8Om",
  key_secret: "xxxxxxxxxxxxxxxxxxx", // Your Test Key Secret
});

app.post("/api/create-order", async (req, res) => {
  try {
    const options = {
      amount: 1000000, // ₹10,000 in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
