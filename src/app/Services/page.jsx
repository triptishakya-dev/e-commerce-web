"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaShippingFast, FaStar, FaLock, FaGift } from "react-icons/fa";

const services = [
  {
    title: "Fast Shipping",
    icon: <FaShippingFast className="text-4xl text-pink-500 drop-shadow-md" />,
    description: "We deliver your favorite earrings to your doorstep quickly and safely.",
  },
  {
    title: "Premium Quality",
    icon: <FaStar className="text-4xl text-yellow-400 drop-shadow-md" />,
    description: "Handpicked, high-quality materials crafted with love and care.",
  },
  {
    title: "Secure Payments",
    icon: <FaLock className="text-4xl text-green-500 drop-shadow-md" />,
    description: "Enjoy safe and encrypted checkout for a worry-free shopping experience.",
  },
  {
    title: "Gift Wrapping",
    icon: <FaGift className="text-4xl text-purple-500 drop-shadow-md" />,
    description: "Make it special! Gift wrap available for all orders.",
  },
];

const Services = () => {
  return (
    <motion.section
      className="bg-gradient-to-br from-pink-50 via-white to-purple-50 text-black px-6 py-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Our Services
        </h1>
        <p className="text-lg text-neutral-600 mb-12">
          We go beyond just selling earrings — we offer a complete, joyful experience.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-3xl bg-white/60 backdrop-blur-md hover:scale-105 transition transform duration-300 shadow-md hover:shadow-xl border border-neutral-200">
                <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">{service.title}</h3>
                  <p className="text-sm text-neutral-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
