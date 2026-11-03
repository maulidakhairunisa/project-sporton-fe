"use client";

import { useEffect, useState } from "react";
import { Category, Product } from "@/app/types";
import { getProductCategory } from "@/app/utils/category-helper";
import CategoriesSection from "./categories";
import ProductSection from "./products";

type THomeClientProps = {
  categories: Category[];
  products: Product[];
};

const HomeClient = ({ categories, products }: THomeClientProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Reset category filter when custom event is fired (e.g. from navbar Home or Explore Products click)
  useEffect(() => {
    const handleReset = () => {
      setSelectedCategoryId(null);
    };

    window.addEventListener("resetCategoryFilter", handleReset);
    return () => window.removeEventListener("resetCategoryFilter", handleReset);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategoryId(category._id);
    scrollTo("products-section");
  };

  const handleClearCategory = () => {
    setSelectedCategoryId(null);
    scrollTo("category-section");
  };

  const selectedCategory =
    categories.find((c) => c._id === selectedCategoryId) || null;

  const filteredProducts = selectedCategoryId
    ? products.filter((p) => {
        const prodCat = getProductCategory(p, categories);
        return (
          prodCat?._id === selectedCategoryId ||
          (selectedCategory &&
            prodCat?.name.toLowerCase() === selectedCategory.name.toLowerCase())
        );
      })
    : products;

  return (
    <>
      <CategoriesSection
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={handleSelectCategory}
        onClearCategory={handleClearCategory}
      />
      <ProductSection
        products={filteredProducts}
        categories={categories}
        selectedCategory={selectedCategory}
        onClearCategory={handleClearCategory}
      />
    </>
  );
};

export default HomeClient;
