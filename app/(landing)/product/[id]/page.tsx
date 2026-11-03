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
        <main className="container mx-auto py-40 flex gap-12 px-8">
            <div className="bg-primary-light aspect-square min-w-140 flex justify-center items-center rounded-xl overflow-hidden">
                <Image
                    src={getImageUrl(product.imageUrl)}
                    width={550}
                    height={550}
                    alt={product.name}
                    className="aspect-square object-contain w-full"
                    priority
                />
            </div>
            <div className="w-full py-7">
                <h1 className="font-bold text-4xl mb-6">{product.name}</h1>
                {categoryName ? (
                    <div className="py-2 px-6 bg-primary-light rounded-full text-primary w-fit mb-5 font-medium">
                        {categoryName}
                    </div>
                ) : null}
                <p className="leading-loose mb-8">{product.description}</p>
                <div className="text-primary text-[32px] font-semibold mb-11">
                    {priceFormatter(product.price)}
                </div>
                <ProductActions product={productWithCategory} stock={product.stock} />
            </div>
        </main>
    );
};

export default ProductDetail;
