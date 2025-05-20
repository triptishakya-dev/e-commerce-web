"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = () => {
      try {
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("✅ Cart Data from localStorage:", cartData);
        setCart(cartData);
      } catch (e) {
        console.error("❌ Failed to parse cart data:", e);
        setCart([]);
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cart.length === 0) {
        console.log("ℹ️ Cart is empty. Skipping product fetch.");
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      console.log("📦 Fetching product details for cart:", cart);

      try {
        const fetched = await Promise.all(
          cart.map(async (item, key) => {
            console.log(`🔎 Fetching product with ID: ${item.id}`);
            const res = await axios.get(`/api/AddProduct/${item.id}`);
            const fullProduct = { ...res.data, quantity: item.quantity };
            console.log("✅ Fetched product data:", fullProduct);
            return fullProduct;
          })
        );
        setProducts(fetched);
        console.log("📦 All fetched products:", fetched);
      } catch (err) {
        console.error("❌ Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [cart]);

  const calculateTotal = () => {
    const total = products.reduce((total, item) => {
      return total + item.data.discountPrice * item.quantity;
    }, 0);
    console.log("💰 Calculated Grand Total:", total);
    return total;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Your Cart</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-6">
            {products.map((product, index) => (
              <div
                key={product._id || index}
                className="flex gap-5 border rounded-xl p-4 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={product.data.image}
                  alt={product.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.data.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Material: {product.data.material}
                  </p>
                  <p className="text-sm text-gray-500">
                    Color: {product.data.colour}
                  </p>
                  <div className="mt-2">
                    <span className="text-gray-400 line-through mr-2">
                      ₹{product.data.discountPrice}
                    </span>
                     <span className="text-black mr-2">
                      ₹{product.data.price}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">
                    Quantity:{" "}
                    <span className="font-medium">{product.quantity}</span>
                  </p>
                 
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-sm text-lg font-semibold text-right text-gray-800">
            Grand Total: ₹{calculateTotal()}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
