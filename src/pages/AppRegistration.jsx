// src/pages/AppRegistration.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAndFetchFirm } from "../utils/authUtils";
import { scroller } from "react-scroll";

export default function AppRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firmName: "",
    email: "",
    password: "",
    founderName: "",
    phone: "",
    serviceId: "",
    templateId: "",
    publicKey: "",
    skipEmailJS: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // 1️⃣ Register firm via Edge Function
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/register-firm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_EDGE_AUTH}`,
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            firmName: form.firmName,
            founderData: {
              name: form.founderName,
              phone: form.phone,
              email: form.email,
              designation: "Founder",
              department: "Administration",
            },
            emailjsConfig: form.skipEmailJS
              ? undefined
              : {
                  service_id: form.serviceId,
                  template_id: form.templateId,
                  public_key: form.publicKey,
                },
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      // 2️⃣ Auto-login + fetch firm (reuses util)
      await loginAndFetchFirm(form.email, form.password);

     setMessage("✅ Firm created & logged in! Redirecting...");
setTimeout(() => {
  // Smooth scroll to Pricing section inside Home.jsx
  scroller.scrollTo("pricing", {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
    offset: -70
  });
}, 2500);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Register Your Firm
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="firmName" placeholder="Firm Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password (min 8 chars)" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="founderName" placeholder="Founder Name" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border rounded" />

        {/* EmailJS settings */}
        <hr className="my-4" />
        <h3 className="text-md font-semibold text-gray-700 dark:text-white">📧 EmailJS Settings (Optional)</h3>
        <label className="block text-sm text-gray-600">
          <input type="checkbox" name="skipEmailJS" checked={form.skipEmailJS} onChange={handleChange} className="mr-2" />
          Skip EmailJS setup (use default config)
        </label>
        <input name="serviceId" placeholder="EmailJS Service ID" onChange={handleChange} disabled={form.skipEmailJS} className="w-full p-2 border rounded" />
        <input name="templateId" placeholder="EmailJS Template ID" onChange={handleChange} disabled={form.skipEmailJS} className="w-full p-2 border rounded" />
        <input name="publicKey" placeholder="EmailJS Public Key" onChange={handleChange} disabled={form.skipEmailJS} className="w-full p-2 border rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
          {loading ? "Registering..." : "Create Account"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">{message}</p>}
    </div>
  );
}