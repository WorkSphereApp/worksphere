import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // service role for signed URLs
);

// ✅ Verify Razorpay payment
app.post("/api/payment/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, firm_id } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Save to Supabase
      const { error: insertErr } = await supabase
        .from("firm_payments")
        .insert([
          {
            firm_id,
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            signature: razorpay_signature,
            amount: 1000000,
          },
        ]);

      if (insertErr) throw insertErr;

      // Mark firm as paid
      await supabase
        .from("firms")
        .update({ paid: true })
        .eq("id", firm_id);

      return res.json({ success: true, message: "Payment verified & firm marked paid" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/get-apk-url", async (req, res) => {
  try {
    const firm_id = req.query.firm_id; // you’ll pass this from frontend

    const { data: firm } = await supabase
      .from("firms")
      .select("paid")
      .eq("id", firm_id)
      .single();

    if (!firm?.paid) {
      return res.status(403).json({ error: "Access denied. Please complete payment." });
    }

    const { data, error } = await supabase.storage
      .from("downloads")
      .createSignedUrl("WorkSphere.apk", 600);

    if (error) throw error;

    res.json({ url: data.signedUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Razorpay client
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Health check
app.get("/", (req, res) => {
  res.send("✅ WorkSphere Backend running!");
});

// ✅ Payment order creation
app.post("/api/payment/order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Secure PWA access route
app.get("/api/get-pwa-access", async (req, res) => {
  try {
    // Here you can check firm_id from database to ensure only paid users access PWA
    res.json({ url: "https://worksphereapp.onrender.com/" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));