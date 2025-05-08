"use client";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ContactUs = () => {
  return (
    <motion.section
      className="bg-gradient-to-br from-pink-50 via-white to-purple-50 text-black px-6 py-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Contact Us
        </h1>
        <p className="text-neutral-600 text-lg mb-6">
          Have a question, suggestion, or just want to say hello? We’d love to hear from you.
        </p>
        <Separator className="bg-neutral-300 mb-10" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.form
          className="space-y-6 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-neutral-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              placeholder="Your Name"
              className="bg-white rounded-xl shadow-sm border-gray-300 focus:ring-pink-500"
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              className="bg-white rounded-xl shadow-sm border-gray-300 focus:ring-pink-500"
              required
            />
          </div>
          <Input
            type="text"
            placeholder="Subject"
            className="bg-white rounded-xl shadow-sm border-gray-300 focus:ring-pink-500"
            required
          />
          <Textarea
            placeholder="Your Message"
            className="bg-white rounded-xl h-32 resize-none shadow-sm border-gray-300 focus:ring-pink-500"
            required
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full md:w-auto px-10 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
            >
              Send Message
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default ContactUs;
