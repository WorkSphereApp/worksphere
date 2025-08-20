// src/pages/FirmLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function FirmLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 1️⃣ Supabase Auth login
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (authError) throw new Error(authError.message);

      const user = authData.user;
      if (!user) throw new Error("Invalid login response");

      // 2️⃣ Call Edge Function to fetch firm info
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/login-firm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ auth_id: user.id }),
        }
      );

      const firmData = await res.json();
      if (!res.ok || !firmData.success) {
        throw new Error(firmData.error || "Firm lookup failed");
      }

      // 3️⃣ Save session data
      sessionStorage.setItem("firm_id", firmData.firm_id);
      sessionStorage.setItem("paid", firmData.paid);

      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMessage("❌ Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Firm Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
          {message}
        </p>
      )}
    </div>
  );
}