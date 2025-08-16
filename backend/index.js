import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Root route just to check backend is alive
app.get("/", (req, res) => {
  res.send("✅ WorkSphere Backend is running!");
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 1000000, // in paise
      currency: "INR",
      receipt: "receipt#1",
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
