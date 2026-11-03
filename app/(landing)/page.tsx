import HeroSection from "./components/home/hero";
import HomeClient from "./components/home/home-client";
import { getAllCategories } from "../services/category.service";
import { getAllProducts } from "../services/product.service";
import { Category, Product } from "../types";

export default async function Home() {
  let categories: Category[] = [];
  let products: Product[] = [];

  try {
    [categories, products] = await Promise.all([
      getAllCategories(),
      getAllProducts(),
    ]);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Render page with empty data instead of crashing
  }

  return (
    <main>
      <HeroSection />
      <HomeClient categories={categories} products={products} />
    </main>
  );
}
