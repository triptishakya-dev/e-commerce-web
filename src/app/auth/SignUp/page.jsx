"use client";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const SignUp = () => {
  
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Create Account</h1>
        <p className="text-sm text-neutral-600 text-center mb-6">
          Join us today and discover your perfect pair of earrings!
        </p>

        <form className="space-y-4">
          <Input type="text" placeholder="Full Name" className="bg-gray-100" required />
          <Input type="email" placeholder="Email" className="bg-gray-100" required />
          <Input type="password" placeholder="Password" className="bg-gray-100" required />
          <Input type="password" placeholder="Confirm Password" className="bg-gray-100" required />

          {/* Beautiful Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out hover:from-purple-500 hover:to-pink-500"
          >
            Sign Up
          </motion.button>
        </form>

        <Separator className="my-6" />
        <p className="text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link href={"/auth/SignIn"} className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </motion.section>
  );
};

export default SignUp;
