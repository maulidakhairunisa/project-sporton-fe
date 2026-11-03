import { getImageUrl } from "@/app/lib/api";
import { Category } from "@/app/types";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

type TCategoriesProps = {
  categories: Category[];
  selectedCategoryId?: string | null;
  onSelectCategory?: (category: Category) => void;
  onClearCategory?: () => void;
};

const CategoriesSection = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onClearCategory,
}: TCategoriesProps) => {
  return (
    <section id="category-section" className="container mx-auto pb-16 md:pb-20 scroll-mt-24 px-4 md:px-8">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h2 className="font-bold text-xl md:text-2xl">Browse By Categories</h2>
        <button
          onClick={onClearCategory}
          className="flex items-center gap-1.5 md:gap-2 text-primary font-medium text-sm md:text-base cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span>See All Categories</span>
          <FiArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
        {[...categories]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => {
            const isSelected = selectedCategoryId === category._id;
            return (
              <button
                type="button"
                onClick={() => onSelectCategory?.(category)}
                className={`rounded-lg w-full aspect-square flex justify-center items-center cursor-pointer transition-all duration-300 text-left p-4 ${
                  isSelected
                    ? "bg-white ring-2 ring-primary shadow-lg scale-105 border border-primary/20"
                    : "bg-gradient-to-r from-[#F1F1F1] to-[#F7F7F7] hover:shadow-lg hover:scale-105 hover:-translate-y-1"
                }`}
                key={category._id}
              >
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={getImageUrl(category.imageUrl)}
                    width={86}
                    height={86}
                    alt={category.name}
                    className="mb-[10px] w-auto h-[86px] object-contain"
                  />
                  <div className="text-primary font-medium text-xl text-center">
                    {category.name}
                  </div>
                </div>
              </button>
            );
          })}
      </div>
    </section>
  );
};

export default CategoriesSection;
