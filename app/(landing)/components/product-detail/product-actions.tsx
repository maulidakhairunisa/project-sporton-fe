"use client";

import { FiArrowRight, FiChevronDown, FiChevronUp, FiShoppingBag } from "react-icons/fi";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { Product } from "@/app/types";

type TProductActionsProps = {
    product: Product;
    stock: number;
};

const ProductActions = ({ product, stock }: TProductActionsProps) => {
    const { addItem } = useCartStore();
    const { push } = useRouter();
    const [qty, setQty] = useState(1);

    const handleAddToCart = () => {
        addItem(product, qty);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="border border-gray-400 inline-flex w-fit rounded-md overflow-hidden self-start">
                <div className="w-12 h-11 text-lg font-medium border-r border-gray-400 flex justify-center items-center">
                    <span>{qty}</span>
                </div>
                <div className="flex flex-col w-8">
                    <button
                        type="button"
                        className="border-b border-gray-400 cursor-pointer h-5.5 flex items-center justify-center hover:bg-gray-100"
                        onClick={() => setQty(qty < stock ? qty + 1 : qty)}
                    >
                        <FiChevronUp size={16} />
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer h-5.5 flex items-center justify-center hover:bg-gray-100"
                        onClick={() => setQty(qty > 1 ? qty - 1 : qty)}
                    >
                        <FiChevronDown size={16} />
                    </button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button className="w-full sm:flex-1 justify-center py-3" onClick={handleAddToCart}>
                    <FiShoppingBag size={20} />
                    Add to Cart
                </Button>
                <Button variant="dark" className="w-full sm:flex-1 justify-center py-3" onClick={() => push("/checkout")}>
                    Checkout Now
                    <FiArrowRight size={16} />
                </Button>
            </div>
        </div>
    );
};

export default ProductActions;
