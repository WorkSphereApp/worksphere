const CheckoutButton = () => {
  const createOrder = async () => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 10 })
    });

    const order = await res.json();
    console.log(order);
  };

  return <button onClick={createOrder}>Pay Now</button>;
};

export default CheckoutButton;
