"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoonLoader } from "react-spinners";
import { useParams } from "next/navigation";
import RelatedProducts from "@/components/(frontend)/RelatedProducts";
import Link from "next/link";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // ✅ Quantity state
  const params = useParams();

  const handlecart = () => {
    const cartData = {
      id: params.id,
      quantity: quantity,
    };

    // Retrieve the existing cart from localStorage
    let existingCart = localStorage.getItem("cart");
    console.log(existingCart)

    try {
      // Parse the cart if it exists and is valid JSON, otherwise initialize an empty array
      existingCart = existingCart ? JSON.parse(existingCart) : [];
      
    } catch (e) {
      // If parsing fails, initialize as an empty array
      existingCart = [];
    }

    // Ensure existingCart is an array
    if (!Array.isArray(existingCart)) {
      existingCart = [];
    }

    // Check if the product is already in the cart
    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === params.id
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity
      existingCart[existingProductIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      existingCart.push(cartData);
    }

    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

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

  // ✅ Quantity handlers
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

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
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-xl font-semibold text-rose-600 mb-4">
                ₹{product.price}{" "}
                {product.discountPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₹{product.discountPrice}
                  </span>
                )}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <strong>Material:</strong> {product.material}
                </p>
                <p>
                  <strong>Color:</strong> {product.colour}
                </p>
              </div>

              {/* ✅ Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={handleDecrease}
                  className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="font-medium text-lg">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handlecart}
              className="mt-6 bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition"
            >
              Add to cart
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
      <RelatedProducts />
    </div>
  );
};

export default ProductPage;
