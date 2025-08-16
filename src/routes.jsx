import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Contact from "./pages/Contact";
import ShippingPolicy from "./pages/ShippingPolicy";
import Terms from "./pages/Terms";
import Refunds from "./pages/Refunds";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refunds" element={<Refunds />} />
      </Routes>
    </Router>
  );
}
