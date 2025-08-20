import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-sm text-gray-600 dark:text-gray-300">
      <p>&copy; {new Date().getFullYear()} WorkSphere App. All rights reserved.</p>
      <nav className="space-x-4 mt-2">
	<Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        <Link to="/shipping-policy" className="hover:text-blue-400">Shipping Policy</Link>
        <Link to="/terms" className="hover:text-blue-400">Terms & Conditions</Link>
        <Link to="/refunds" className="hover:text-blue-400">Refunds</Link>
      </nav>
    </footer>
  );
}
