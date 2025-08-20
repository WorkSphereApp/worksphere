// src/utils/authUtils.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const EDGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

/**
 * Normalize fetch response
 */
async function fetchJSON(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || `Request failed: ${res.status}`);
    }
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
}

/**
 * Login + firm fetch helper
 * @param {string} email 
 * @param {string} password 
 */
export async function loginAndFetchFirm(email, password) {
  // 1️⃣ Supabase Auth login
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (authError) throw new Error(authError.message);
  const user = authData?.user;
  if (!user) throw new Error("Invalid login response");

  // 2️⃣ Call Edge Function for firm lookup
  const firmData = await fetchJSON(`${EDGE_BASE}/login-firm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ auth_id: user.id }),
  });

  if (!firmData.success) {
    throw new Error(firmData.error || "Firm lookup failed");
  }

  // 3️⃣ Save session
  sessionStorage.setItem("firm_id", firmData.firm_id);
  sessionStorage.setItem("paid", firmData.paid);
  sessionStorage.setItem("auth_email", email);

  return { user, firm: firmData };
}

/**
 * Logout + clear session
 */
export async function logoutFirm() {
  await supabase.auth.signOut();
  sessionStorage.clear();
}

/**
 * Restore current firm session (if exists)
 */
export function getCurrentFirmSession() {
  return {
    firm_id: sessionStorage.getItem("firm_id"),
    paid: sessionStorage.getItem("paid"),
    email: sessionStorage.getItem("auth_email"),
  };
}
