"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const ratings = [
  {
    name: "Ayesha",
    stars: 5,
    feedback: "Beautiful earrings, high quality and fast delivery!",
  },
  {
    name: "Sneha",
    stars: 4,
    feedback: "Loved the designs! Slightly smaller than expected.",
  },
  {
    name: "Priya",
    stars: 5,
    feedback: "Absolutely stunning! Will order again.",
  },
];

const RatingSection = () => {
  return (
    <section className="py-12 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Customer Reviews</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {ratings.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-4 shadow-md rounded-2xl bg-white h-full">
                <CardContent>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xl ${
                          i < review.stars ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="italic text-gray-700 mb-3">"{review.feedback}"</p>
                  <p className="text-sm font-semibold text-gray-600">— {review.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RatingSection;
