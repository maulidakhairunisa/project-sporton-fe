import HeroSection from "./components/home/hero";
import HomeClient from "./components/home/home-client";
import { getAllCategories } from "../services/category.service";
import { getAllProducts } from "../services/product.service";
import { Category, Product } from "../types";

export default async function Home() {
  let categories: Category[] = [];
  let products: Product[] = [];

  try {
    categories = await getAllCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <main>
      <HeroSection />
      <HomeClient categories={categories} products={products} />
    </main>
  );
}