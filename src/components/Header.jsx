import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger icons
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

const sections = [
  "intro", "register", "dashboard", "staff", "attendance",
  "tasks", "reminders", "pricing", "download", "faq"
];

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const firmId = sessionStorage.getItem("firm_id");
    setIsLoggedIn(!!firmId);
  }, []);

  const handleLogout = () => {
  sessionStorage.removeItem("firm_id");
  sessionStorage.removeItem("logoutMarker");
  toast.success("✅ Logged out successfully");
  navigate("/login");
};

  return (
    <header id="main-header" className="bg-white shadow fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="WorkSphere Logo" className="h-12 w-12" />
          <h1 className="text-xl font-bold">WorkSphere</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {sections.map((link) => (
            <HashLink
              key={link}
              smooth
              to={`/#${link}`}
              className="cursor-pointer hover:text-blue-600 font-bold transition-colors"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </HashLink>
          ))}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
              >
                Firm Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"
              >
                Register Firm
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg flex flex-col space-y-4 p-4">
          {sections.map((link) => (
            <HashLink
              key={link}
              smooth
              to={`/#${link}`}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer hover:text-black-600 font-bold transition-colors"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </HashLink>
          ))}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
              >
                Firm Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"
              >
                Register Firm
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}