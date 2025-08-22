import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
	  <ToastContainer position="top-right" autoClose={3000} />
	<main className="mt-[var(--header-height)]">
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;