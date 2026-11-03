import { Category, Product } from "../types";

/**
 * Resolves the category of a product safely, even when MongoDB references are broken/null
 * (e.g. when categories were re-created with new IDs while products still held old/null references).
 */
export function getProductCategory(
  product: Product | null | undefined,
  categories: Category[]
): Category | null {
  if (!product) return null;

  // 1. Direct populated object with valid name
  if (
    product.category &&
    typeof product.category === "object" &&
    product.category._id &&
    product.category.name
  ) {
    const found = categories.find(
      (c) =>
        c._id === product.category._id ||
        c.name.toLowerCase() === product.category.name.toLowerCase()
    );
    if (found) return found;
    return product.category;
  }

  // 2. ID matching (if product.category is an ID string or categoryId is present)
  const rawId =
    typeof product.category === "string"
      ? product.category
      : (product as any)?.categoryId;
  if (rawId) {
    const found = categories.find((c) => c._id === rawId);
    if (found) return found;
  }

  // 3. Name matching (if product.category is already a name string)
  if (typeof product.category === "string" && product.category) {
    const catStr = product.category as unknown as string;
    const found = categories.find(
      (c) => c.name.toLowerCase() === catStr.toLowerCase()
    );
    if (found) return found;
  }

  // 4. Smart keyword matching based on product name & description
  const text = `${product.name || ""} ${product.description || ""}`.toLowerCase();

  // Tennis
  if (text.includes("tennis") || text.includes("racket")) {
    const cat = categories.find((c) => c.name.toLowerCase().includes("tennis"));
    if (cat) return cat;
  }

  // Football / Soccer (handles "footbal" typo and "football")
  if (
    text.includes("footbal") ||
    text.includes("soccer") ||
    text.includes("cleat")
  ) {
    const cat = categories.find(
      (c) =>
        c.name.toLowerCase().includes("footbal") ||
        c.name.toLowerCase().includes("soccer")
    );
    if (cat) return cat;
  }

  // Basketball
  if (text.includes("basket")) {
    const cat = categories.find((c) => c.name.toLowerCase().includes("basket"));
    if (cat) return cat;
  }

  // Swimming
  if (text.includes("swim") || text.includes("pool")) {
    const cat = categories.find((c) => c.name.toLowerCase().includes("swim"));
    if (cat) return cat;
  }

  // Badminton
  if (
    text.includes("badminton") ||
    text.includes("shuttlecock") ||
    text.includes("shirt")
  ) {
    const cat = categories.find((c) => c.name.toLowerCase().includes("badminton"));
    if (cat) return cat;
  }

  // Running
  if (
    text.includes("run") ||
    text.includes("shoe") ||
    text.includes("speed") ||
    text.includes("fast")
  ) {
    const cat = categories.find((c) => c.name.toLowerCase().includes("run"));
    if (cat) return cat;
  }

  // Check if any category name is present in product text
  for (const cat of categories) {
    if (text.includes(cat.name.toLowerCase())) {
      return cat;
    }
  }

  return categories[0] || null;
}
