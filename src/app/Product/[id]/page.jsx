"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoonLoader } from "react-spinners";
import { useParams } from "next/navigation";
import RelatedProducts from "@/components/(frontend)/RelatedProducts";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/AddProduct/${params.id}`);
        const data = await response.json();
        setProduct(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-black px-4 sm:px-10 py-10 sm:py-16">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-96">
          <MoonLoader size={50} color="#4F46E5" />
          <p className="mt-4 text-sm text-gray-500">Loading product...</p>
        </div>
      ) : product ? (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 bg-white shadow-md rounded-xl p-6">
          {/* Left Side - Details */}
          <div className="md:w-1/2 flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl font-semibold text-rose-600 mb-4">
                ₹{product.price}{" "}
                {product.discountPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₹{product.discountPrice}
                  </span>
                )}
              </p>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p><strong>Material:</strong> {product.material}</p>
                <p><strong>Color:</strong> {product.colour}</p>
              </div>
            </div>

            <button className="mt-6 bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition">
              Order Now
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-md border"
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No product found.</p>
      )}
      <RelatedProducts/>
    </div>
    
  );
};

export default ProductPage;
