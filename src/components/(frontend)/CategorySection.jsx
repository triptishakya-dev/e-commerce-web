"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaCircle, FaStar, FaHeart, FaGem, FaLeaf } from "react-icons/fa";
import axios from "axios";

const CategorySection = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("/api/AddCategory");
        console.log(response);
        setCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {category.map((category, index) => (
            <Card
              key={index}
              className="flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-all duration-300 rounded-2xl"
            >
              <CardContent className="flex flex-col items-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-contain rounded-full border p-1"
                />
                <span className="mt-2 font-medium">{category.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
