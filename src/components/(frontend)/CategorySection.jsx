import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaCircle, FaStar, FaHeart, FaGem, FaLeaf } from "react-icons/fa";

const  categories= [
  { name: "Studs", icon: <FaStar className="text-pink-500 text-3xl" /> },
  { name: "Hoops", icon: <FaCircle className="text-yellow-400 text-3xl" /> },
  { name: "Jhumkas", icon: <FaHeart className="text-red-500 text-3xl" /> },
  { name: "Chandbalis", icon: <FaGem className="text-purple-600 text-3xl" /> },
  { name: "Ear Cuffs", icon: <FaLeaf className="text-green-500 text-3xl" /> },
];

const CategorySection = () => {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-all duration-300 rounded-2xl"
            >
              <CardContent className="flex flex-col items-center">
                {category.icon}
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
