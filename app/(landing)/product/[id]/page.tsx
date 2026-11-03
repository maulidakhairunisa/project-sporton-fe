import Image from "next/image";
import ProductActions from "../../components/product-detail/product-actions";
import priceFormatter from "@/app/utils/price-formatter";
import { getProductDetail } from "@/app/services/product.service";
import { getAllCategories } from "@/app/services/category.service";
import { getImageUrl } from "@/app/lib/api";
import { getProductCategory } from "@/app/utils/category-helper";

export type TPageProps = {
    params: Promise<{ id: string }>;
};

const ProductDetail = async ({ params }: TPageProps) => {
    const { id } = await params;

    let product;
    let categories = [];
    try {
        [product, categories] = await Promise.all([
            getProductDetail(id),
            getAllCategories().catch(() => []),
        ]);
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return (
            <main className="container mx-auto py-40 flex justify-center items-center px-8">
                <div className="text-center">
                    <h1 className="font-bold text-2xl mb-4">Produk tidak ditemukan</h1>
                    <p className="text-gray-500">Gagal memuat data produk. Silakan coba lagi nanti.</p>
                </div>
            </main>
        );
    }

    const resolvedCategory = getProductCategory(product, categories);
    const categoryName = resolvedCategory?.name || "";

    // Ensure product passed to actions has a valid category object
    const productWithCategory = {
        ...product,
        category: resolvedCategory || {
            _id: "",
            name: "",
            description: "",
            imageUrl: "",
            createdAt: "",
            updatedAt: "",
        },
    };

    return (
        <main className="container mx-auto pt-24 md:pt-36 pb-20 flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 md:px-8">
            <div className="bg-primary-light aspect-square w-full lg:max-w-[480px] xl:max-w-[550px] flex justify-center items-center rounded-xl overflow-hidden mx-auto">
                <Image
                    src={getImageUrl(product.imageUrl)}
                    width={550}
                    height={550}
                    alt={product.name}
                    className="aspect-square object-contain w-full p-4 md:p-8"
                    priority
                />
            </div>
            <div className="w-full py-2 lg:py-7">
                <h1 className="font-bold text-2xl md:text-4xl mb-4 md:mb-6">{product.name}</h1>
                {categoryName ? (
                    <div className="py-1.5 md:py-2 px-4 md:px-6 bg-primary-light rounded-full text-primary w-fit mb-4 md:mb-5 font-medium text-xs md:text-sm">
                        {categoryName}
                    </div>
                ) : null}
                <p className="leading-relaxed md:leading-loose text-sm md:text-base text-gray-700 mb-6 md:mb-8">{product.description}</p>
                <div className="text-primary text-2xl md:text-[32px] font-semibold mb-8 md:mb-11">
                    {priceFormatter(product.price)}
                </div>
                <ProductActions product={productWithCategory} stock={product.stock} />
            </div>
        </main>
    );
};

export default ProductDetail;
