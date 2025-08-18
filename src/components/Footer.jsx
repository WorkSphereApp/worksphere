// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-sm text-gray-600 dark:text-gray-300">
      <p>&copy; {new Date().getFullYear()} WorkSphere App. All rights reserved.</p>
      <nav className="space-x-4 mt-2">
        <a
          href="https://worksphereweb.onrender.com/#/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          Contact
        </a>
        <a
          href="https://worksphereweb.onrender.com/#/shipping-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          Shipping Policy
        </a>
        <a
          href="https://worksphereweb.onrender.com/#/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          Terms & Conditions
        </a>
        <a
          href="https://worksphereweb.onrender.com/#/refunds"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          Refunds
        </a>
      </nav>
    </footer>
  );
}
