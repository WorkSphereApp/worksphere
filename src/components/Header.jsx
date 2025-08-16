import React from "react";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="bg-white shadow fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-1">
        {/* Logo + Title */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="WorkSphere Logo" className="h-16 w-16" />
          <h1 className="text-2xl font-bold">WorkSphere</h1>
        </div>
      </div>
    </header>
  );
}