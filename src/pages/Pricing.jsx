import { apiFetch } from "../utils/api";

export default function Pricing() {
  const handlePayment = async () => {
    try {
      const firmId = sessionStorage.getItem("firm_id");
      if (!firmId) {
        window.location.href = "/#/register";
        return;
      }

      // ✅ Create order
      const order = await apiFetch("/api/payment/order", {
        method: "POST",
        body: JSON.stringify({ firm_id: firmId }),
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "WorkSphere",
        description: "Lifetime Access",
        order_id: order.id,
        handler: async (response) => {
          try {
            // ✅ Verify
            const verifyRes = await apiFetch("/api/payment/verify", {
              method: "POST",
              body: JSON.stringify({
                ...response,
                firm_id: firmId,
              }),
            });

            if (verifyRes.success) {
              alert("✅ Payment verified! You can now download the app.");
            } else {
              alert("❌ Payment verification failed.");
            }
          } catch (err) {
            alert("Error verifying payment.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Error creating payment order.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Lifetime Access — ₹10,000 One-Time</h2>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        💳 Pay ₹10,000 — Lifetime Access
      </button>
    </div>
  );
}