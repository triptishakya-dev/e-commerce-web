"use client"
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaGem } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="bg-gray-200 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-2 text-pink-500 mb-3">
            <FaGem className="text-xl" />
            <span className="uppercase text-sm font-medium tracking-wider">Elegant Collection</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
            Discover Your Sparkle
          </h1>
          <p className="mt-4 text-lg text-black  max-w-xl">
            Handcrafted earrings that redefine elegance. Explore our exclusive new arrivals and timeless classics.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button className="bg-pink-500 text-white hover:bg-pink-600">Shop Now</Button>
            <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-neutral-800">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="https://images.unsplash.com/photo-1615854430736-c9fae5a95083?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Earrings Display"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
