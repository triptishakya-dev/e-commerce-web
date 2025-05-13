"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MoonLoader } from "react-spinners";
import RelatedBlog from "@/Components/RelatedBlog";

const ProductPage = () => {
  const [Product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!params?.id) return;

      try {
        const response = await fetch(`/api/addProduct/${params.id}`);
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
     <div>
       {loading ? (
        <div className="flex flex-col items-center justify-center h-96">
          <MoonLoader size={50} color="#4F46E5" />
          <p className="mt-4 text-sm text-gray-500">Loading product content...</p>
        </div>
      ) : Product ? (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={Product.featuredImg}
            alt={Product.title}
            width={1000}
            height={500}
            className="object-cover w-full h-[300px]"
          />
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 underline underline-offset-4">
              {Product.title}
            </h1>
            <p className="text-gray-700 leading-relaxed text-[17px] whitespace-pre-line">
              {blog.content}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No product found.</p>
      )}
     </div>
     <div>
      <RelatedProduct/>
     </div>
    </div>
  );
};

export default ProductPage;
