"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Run `yarn add lucide-react` or `npm install lucide-react`

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/AboutUs" },
    { name: "Services", path: "/Services" },
    { name: "Contact", path: "/ContactUs" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          MyBrand
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="auth/signIn"
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            SignIn
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-indigo-600">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-md">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="block text-gray-600 hover:text-indigo-600 transition"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/SignIn"
            className="block bg-indigo-600 text-white text-center py-2 rounded-full hover:bg-indigo-700 transition"
            onClick={() => setOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
