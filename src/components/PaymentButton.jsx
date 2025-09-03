import React from "react";

export default function PaymentButton() {
  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const order = await res.json();

      if (!order.id) {
        console.error("Order creation failed:", order);
        return;
      }

      const options = {
        key: "your_key_id_here", // same as backend key_id
        amount: order.amount,
        currency: order.currency,
        name: "WorkSphere",
        description: "Lifetime Access",
        order_id: order.id,
        handler: function (response) {
          console.log("Payment success:", response);
          alert("Payment successful!");
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2">
      Pay ₹5,000
    </button>
  );
}