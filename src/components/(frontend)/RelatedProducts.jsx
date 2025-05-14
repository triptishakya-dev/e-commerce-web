"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch("/api/AddProduct");
        const data = await response.json();
        console.log(data);
        setProducts(data.data || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchRelatedProducts();
  }, []);

  const nextSlide = () => {
    if (currentIndex + 4 < products.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={products.length <= 4 || currentIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={products.length <= 4 || currentIndex + 4 >= products.length}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(currentIndex, currentIndex + 4).map((product) => (
          <Card key={product._id} className="overflow-hidden">
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium truncate">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">${product.discountPrice}</span>
                  {product.price !== product.discountPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => (window.location.href = `/products/${product._id}`)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
