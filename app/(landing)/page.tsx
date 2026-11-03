import HeroSection from "./components/home/hero";
import HomeClient from "./components/home/home-client";
import { getAllCategories } from "../services/category.service";
import { getAllProducts } from "../services/product.service";

export default async function Home() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <main>
      <HeroSection />
      <HomeClient categories={categories} products={products} />
    </main>
  );
}
