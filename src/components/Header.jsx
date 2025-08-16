import React from "react";
import logo from "./assets/logo.png"; // ✅ adjust path if Header.jsx is in a subfolder

export default function Header() {
  return (
    <header className="bg-white shadow fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo + Title */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="WorkSphere Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">WorkSphere</h1>
        </div>
      </div>
    </header>
  );
}
