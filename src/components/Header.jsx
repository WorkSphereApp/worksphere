import React from "react";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/logo.png";

const sections = [
  "intro", "register", "dashboard", "staff", "attendance", 
  "tasks", "reminders", "pricing", "download", "faq"
];

export default function Header() {
  return (
    <header className="bg-white shadow fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="WorkSphere Logo" className="h-12 w-12" />
          <h1 className="text-xl font-bold">WorkSphere</h1>
        </div>

        <nav className="space-x-6 text-sm font-medium">
          {sections.map((link) => (
            <HashLink
  key={link}
  smooth
  to={`/#${link}`}   // ✅ Correct: matches id="intro", id="register", etc.
  className="cursor-pointer hover:text-blue-600 transition-colors"
>
  {link.charAt(0).toUpperCase() + link.slice(1)}
</HashLink>

          ))}
        </nav>
      </div>
    </header>
  );
}