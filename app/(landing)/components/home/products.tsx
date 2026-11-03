"use client";

import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiX } from "react-icons/fi";
import Button from "../ui/button";
import priceFormatter from "@/app/utils/price-formatter";
import { Category, Product } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getProductCategory } from "@/app/utils/category-helper";
import React from "react";

type TProductsProps = {
  products: Product[];
  categories?: Category[];
  selectedCategory?: Category | null;
  onClearCategory?: () => void;
};

const ProductSection = ({
  products,
  categories = [],
  selectedCategory,
  onClearCategory,
}: TProductsProps) => {
  const { addItem } = useCartStore();
  const handleAddtoCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <section id="products-section" className="container mx-auto mt-20 md:mt-32 mb-28 md:mb-52 scroll-mt-24 px-4 md:px-8">
      <div className="flex flex-col items-center mb-8 md:mb-11 text-center">
        <h2 className="font-bold italic text-3xl md:text-4xl">
          <span className="text-primary">
            {selectedCategory ? selectedCategory.name.toUpperCase() : "OUR"}{" "}
          </span>
          PRODUCTS
        </h2>
        {selectedCategory && (
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-4">
            <span className="text-xs md:text-sm text-gray-500">
              Showing products for{" "}
              <strong className="text-black font-semibold">
                {selectedCategory.name}
              </strong>{" "}
              ({products.length} {products.length === 1 ? "item" : "items"})
            </span>
            <button
              onClick={onClearCategory}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer transition-colors flex items-center gap-1"
            >
              Show All Products
              <FiX size={14} />
            </button>
          </div>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl mx-auto max-w-lg">
          <p className="text-gray-500 text-base md:text-lg mb-4">
            No products found in category &quot;{selectedCategory?.name}&quot;.
          </p>
          <button
            onClick={onClearCategory}
            className="text-primary font-medium hover:underline cursor-pointer"
          >
            View all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...products]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product) => {
              const matchedCat = getProductCategory(product, categories);
              const categoryName = matchedCat?.name || selectedCategory?.name || "";

              return (
                <Link
                  href={`/product/${product._id}`}
                  key={product._id}
                  className="p-1.5 bg-white hover:drop-shadow-xl duration-300 rounded-lg group"
                >
                  <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative overflow-hidden rounded-md">
                    <Image
                      src={getImageUrl(product.imageUrl)}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="aspect-square object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      className="w-10 h-10 p-2! absolute right-3 top-3"
                      onClick={(e) => {
                        handleAddtoCart(e, product);
                      }}
                    >
                      <FiPlus size={24} />
                    </Button>
                  </div>
                  <h3 className="font-medium text-lg mb-1.5 mt-4 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-gray-500 text-sm">
                      {categoryName}
                    </div>
                    <div className="font-medium text-primary">
                      {priceFormatter(product.price)}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </section>
  );
};

export default ProductSection;
