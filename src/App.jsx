import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
	<main className="pt-20">
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;