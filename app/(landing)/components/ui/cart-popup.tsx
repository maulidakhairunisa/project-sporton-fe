import Image from "next/image";
import priceFormatter from "../../../utils/price-formatter";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";

const CartPopup = () => {
    const { push } = useRouter();
    const { items, removeItem } = useCartStore();

    const totalPrice = items.reduce((total, item) => total + item.price * item.qty, 0);

    const handleCheckOut = () => {
        push("/checkout");
    };

    return (
        <div className="absolute bg-white right-0 top-12 shadow-xl shadow-black/10 border border-gray-200 w-[calc(100vw-32px)] max-w-sm sm:w-90 z-20 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 font-bold text-center">
                Shopping Cart
            </div>
            {items.length ? (
                items.map((item, index) => (
                    <div className="border-b border-gray-200 p-4 flex gap-3" key={index}>
                        <div className="bg-primary-light aspect-square w-16 flex justify-center items-center rounded">
                            <Image
                                src={getImageUrl(item.imageUrl)}
                                width={63}
                                height={63}
                                alt={item.name}
                                className="aspect-square object-contain"
                            />
                        </div>
                        <div className="self-center">
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="flex gap-3 font-medium text-xs">
                                <div>{item.qty}x</div>
                                <div className="text-primary">{priceFormatter(item.price)}</div>
                            </div>
                        </div>
                        <Button
                            size="small"
                            variant="ghost"
                            className="w-7 h-7 p-0! self-center ml-auto"
                            onClick={() => removeItem(item._id)}
                        >
                            <FiTrash2 />
                        </Button>
                    </div>
                ))
            ) : (
                <div className="text-center opacity-50 py-5">Your Shopping Cart is Empty</div>
            )}
            <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between">
                    <div className="font-semibold text-sm mb-3.5">Total</div>
                    <div className="font-semibold text-primary text-xs">{priceFormatter(totalPrice)}</div>
                </div>
                <Button variant="dark" size="small" className="w-full" onClick={handleCheckOut}>
                    Checkout Now <FiArrowRight />
                </Button>
            </div>
        </div>
    );
};

export default CartPopup;
