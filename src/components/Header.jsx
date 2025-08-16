import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">WorkSphere</h1>
        <nav>
          <a href="#features" className="px-4">Features</a>
          <a href="#pricing" className="px-4">Pricing</a>
          <a href="#contact" className="px-4">Contact</a>
        </nav>
      </div>
    </header>
  );
}