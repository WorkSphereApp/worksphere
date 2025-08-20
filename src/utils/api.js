// src/utils/api.js
const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};
