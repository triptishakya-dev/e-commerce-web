"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/AddProduct");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Calculate discount percentage
  const calculateDiscount = (price, discountPrice) => {
    const originalPrice = parseFloat(price);
    const discounted = parseFloat(discountPrice);
    if (originalPrice > discounted && originalPrice > 0) {
      const percentage = Math.round(((originalPrice - discounted) / originalPrice) * 100);
      return percentage;
    }
    return 0;
  };

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="overflow-hidden h-full border border-gray-200 rounded-lg">
                <div className="relative p-4 flex justify-center bg-gray-100">
                  <Skeleton className="h-56 w-56" />
                </div>
                <CardContent className="p-5">
                  <Skeleton className="h-4 w-2/3 mb-2" />
                  <Skeleton className="h-6 w-1/2 mb-3" />
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-md" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const discountPercentage = calculateDiscount(product.price, product.discountPrice);
              
              return (
                <Card 
                  key={index} 
                  className="overflow-hidden h-full border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <Link href={`/Product/${product._id}`}>
                  
                  
                  <div className="relative p-6 bg-gray-50 flex items-center justify-center">
                    {discountPercentage > 0 && (
                      <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 px-2 py-1 text-xs font-bold">
                        {discountPercentage}% OFF
                      </Badge>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-56 w-auto object-contain mix-blend-multiply"
                    />
                  </div>
                  
                  <CardContent className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-lg text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="text-sm text-gray-500 mb-1">
                          {product.material && <span>{product.material}</span>}
                          {product.material && product.colour && <span> • </span>}
                          {product.colour && <span>{product.colour}</span>}
                        </div>
                      </div>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Add to favorites"
                      >
                        <FaHeart className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-xl text-gray-900">
                          ${product.discountPrice}
                        </span>
                        {discountPercentage > 0 && (
                          <span className="text-gray-500 text-sm line-through">
                            ${product.price}
                          </span>
                        )}
                      </div>
                      
                      <button className="w-full py-2 bg-black hover:bg-gray-800 text-white rounded-md font-medium transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;