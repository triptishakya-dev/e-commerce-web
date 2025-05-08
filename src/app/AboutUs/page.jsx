"use client";
import React from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const AboutUs = () => {
  return (
    <motion.section
      className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-white text-black px-6 py-20 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Blurs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-pink-300 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300 opacity-20 rounded-full blur-3xl z-0" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-lg text-neutral-700 mb-8 max-w-3xl mx-auto">
          At <span className="font-semibold text-black">MyWebsite</span>, we believe jewelry is more than an accessory — it's a personal expression of elegance, individuality, and story.
        </p>
        <Separator className="bg-neutral-300 mb-12" />

        <div className="grid md:grid-cols-2 gap-12 text-left text-neutral-800">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-3 text-purple-700">Our Story</h2>
            <p>
              Founded in 2025, our journey began with a passion for handcrafted earrings that blend traditional beauty
              with modern flair. Each piece is curated or crafted to empower self-expression and timeless style.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-3 text-pink-600">Our Mission</h2>
            <p>
              We aim to make exquisite earrings accessible to everyone. Our focus: exceptional quality, ethical sourcing,
              and uplifting local artisans — all while celebrating individuality.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-left max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4 text-gradient">What Sets Us Apart</h2>
          <ul className="list-disc list-inside space-y-3 text-neutral-700">
            <li>Premium handcrafted earrings with attention to detail</li>
            <li>Ethically sourced, sustainable materials</li>
            <li>Exceptional customer experience and support</li>
            <li>Affordable luxury for every personality and occasion</li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
