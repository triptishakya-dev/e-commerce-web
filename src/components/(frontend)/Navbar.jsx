"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/AboutUs" },
    { name: "Services", path: "/Services" },
    { name: "Contact", path: "/ContactUs" },
  ];

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("/api/cookies");
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setIsAuthenticated(false);
      setUserData(null);
    }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/users/logout", { method: "POST" });
    setIsAuthenticated(false);
    setUserData(null);
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser, pathname]);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
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

          {/* Cart Icon */}
          <Link
            href="/Product/cart"
            className="relative text-gray-600 hover:text-indigo-600"
          >
            <AiOutlineShoppingCart size={24} />
          </Link>

          {!isAuthenticated ? (
            <Link
              href="/auth/signIn"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative group">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
                My Account
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-lg hidden group-hover:block z-50">
                <Link
                  href="/wishlist"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Wishlist
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <Link
                  href="/addresses"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Saved Addresses
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
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
            href="/Product/cart"
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
            onClick={() => setOpen(false)}
          >
            <AiOutlineShoppingCart size={20} />
            <span>Cart</span>
          </Link>

          {!isAuthenticated ? (
            <Link
              href="/auth/signIn"
              className="block bg-indigo-600 text-white text-center py-2 rounded-full hover:bg-indigo-700 transition"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                href="/wishlist"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                href="/orders"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                My Orders
              </Link>
              <Link
                href="/addresses"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Saved Addresses
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
