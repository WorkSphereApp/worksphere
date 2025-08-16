const createOrder = async () => {
  const res = await fetch("https://your-backend.onrender.com/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 500 }),
  });
  return res.json();
};

const handlePayment = async () => {
  const order = await createOrder();

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // public key from Render env
    amount: order.amount,
    currency: order.currency,
    name: "WorkSphere",
    order_id: order.id,
    handler: function (response) {
      alert(`Payment successful: ${response.razorpay_payment_id}`);
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};