// src/utils/authUtils.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Login and fetch firm info
 * @param {string} email 
 * @param {string} password 
 */
export async function loginAndFetchFirm(email, password) {
  // 1️⃣ Login with Supabase Auth
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (authError) throw new Error(authError.message);
  const user = authData.user;
  if (!user) throw new Error("Invalid login response");

  // 2️⃣ Call Edge Function
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

  // 3️⃣ Save session
  sessionStorage.setItem("firm_id", firmData.firm_id);
  sessionStorage.setItem("paid", firmData.paid);

  return { user, firm: firmData };
}