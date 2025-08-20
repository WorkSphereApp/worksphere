import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Refunds from "./pages/Refunds";
import ShippingPolicy from "./pages/ShippingPolicy";
import Terms from "./pages/Terms";
import AppRegistration from "./pages/AppRegistration";
import FirmLogin from "./pages/FirmLogin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/refunds"
        element={
          <Layout>
            <Refunds />
          </Layout>
        }
      />
      <Route
        path="/shipping-policy"
        element={
          <Layout>
            <ShippingPolicy />
          </Layout>
        }
      />
      <Route
        path="/terms"
        element={
          <Layout>
            <Terms />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <AppRegistration />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <FirmLogin />
          </Layout>
        }
      />
    </Routes>
  );
}