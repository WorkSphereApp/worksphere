// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-sm text-gray-600 dark:text-gray-300">
      <p>&copy; {new Date().getFullYear()} WorkSphere App. All rights reserved.</p>
      <nav className="space-x-4 mt-2">
        <Link to="/contact" className="text-blue-600 underline">Contact</Link>
        <Link to="/shipping-policy" className="text-blue-600 underline">Shipping Policy</Link>
        <Link to="/terms" className="text-blue-600 underline">Terms & Conditions</Link>
        <Link to="/refunds" className="text-blue-600 underline">Refunds</Link>
      </nav>
    </footer>
  );
}