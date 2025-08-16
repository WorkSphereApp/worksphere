// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-sm text-gray-600 dark:text-gray-300">
      <p>&copy; {new Date().getFullYear()} WorkSphere App. All rights reserved.</p>
      <nav className="space-x-4 mt-2">
        <a href="/contact" className="text-blue-600 underline">Contact</a>
        <a href="/shipping-policy" className="text-blue-600 underline">Shipping Policy</a>
        <a href="/terms" className="text-blue-600 underline">Terms & Conditions</a>
        <a href="/refunds" className="text-blue-600 underline">Refunds</a>
      </nav>
    </footer>
  );
}