"use client";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiSearch, FiShoppingBag, FiX } from "react-icons/fi";
import CartPopup from "../ui/cart-popup";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { usePathname } from "next/navigation";

const Header = () => {
    const { items } = useCartStore();
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection("");
            return;
        }

        const handleScroll = () => {
            const categoryEl = document.getElementById("category-section");
            const productsEl = document.getElementById("products-section");

            const scrollY = window.scrollY;
            const categoryTop = categoryEl ? categoryEl.offsetTop - 120 : 400;
            const productsTop = productsEl ? productsEl.offsetTop - 120 : 900;

            if (scrollY >= productsTop) {
                setActiveSection("product");
            } else if (scrollY >= categoryTop) {
                setActiveSection("category");
            } else {
                setActiveSection("home");
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

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

    const activeClass = "relative after:content-[''] after:block after:bg-primary after:rounded-full after:h-[3px] after:w-1/2 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1 font-semibold text-black cursor-pointer";
    const inactiveClass = "text-gray-700 hover:text-primary transition-colors cursor-pointer";

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="fixed w-full z-30 backdrop-blur-xl bg-white/80 shadow-xs">
            <div className="flex justify-between items-center container mx-auto py-3.5 px-4 md:px-8">
                <Link
                    href="/"
                    onClick={() => {
                        setActiveSection("home");
                        window.dispatchEvent(new CustomEvent("resetCategoryFilter"));
                    }}
                    className="cursor-pointer"
                >
                    <Image
                        src="/images/logo.svg"
                        alt="SportOn Logo"
                        width={115}
                        height={28}
                        className="w-auto h-6 md:h-[26px]"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-12 lg:gap-24 font-medium text-sm lg:text-base">
                    <Link
                        href="/"
                        onClick={() => {
                            setActiveSection("home");
                            window.dispatchEvent(new CustomEvent("resetCategoryFilter"));
                            if (pathname === "/") {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                        className={activeSection === "home" ? activeClass : inactiveClass}
                    >
                        Home
                    </Link>
                    <Link
                        href="/#category-section"
                        onClick={(e) => {
                            setActiveSection("category");
                            if (pathname === "/") {
                                e.preventDefault();
                                scrollTo("category-section");
                            }
                        }}
                        className={activeSection === "category" ? activeClass : inactiveClass}
                    >
                        Category
                    </Link>
                    <Link
                        href="/#products-section"
                        onClick={(e) => {
                            setActiveSection("product");
                            window.dispatchEvent(new CustomEvent("resetCategoryFilter"));
                            if (pathname === "/") {
                                e.preventDefault();
                                scrollTo("products-section");
                            }
                        }}
                        className={activeSection === "product" ? activeClass : inactiveClass}
                    >
                        Explore Products
                    </Link>
                </nav>

                {/* Action Icons & Mobile Toggle */}
                <div className="relative flex gap-4 md:gap-7 items-center">
                    <FiSearch size={20} className="cursor-pointer hover:text-primary transition-colors hidden sm:block" />
                    
                    <button 
                        className="cursor-pointer relative p-1" 
                        onClick={() => setIsCartPopupOpen(!isCartPopupOpen)}
                        aria-label="Shopping Cart"
                    >
                        <FiShoppingBag size={22} />
                        {items.length ? (
                            <div className="bg-primary rounded-full w-4.5 h-4.5 absolute -top-1 -right-1 text-[11px] font-semibold text-white flex items-center justify-center">
                                {items.length}
                            </div>
                        ) : null}
                    </button>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden p-1 text-gray-700 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>

                    {isCartPopupOpen && <CartPopup />}
                </div>
            </div>

            {/* Mobile Navigation Drawer / Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white/95 px-6 py-4 flex flex-col gap-4 font-medium shadow-md">
                    <Link
                        href="/"
                        onClick={() => {
                            setActiveSection("home");
                            closeMobileMenu();
                            window.dispatchEvent(new CustomEvent("resetCategoryFilter"));
                            if (pathname === "/") {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                        className={`py-2 ${activeSection === "home" ? "text-primary font-bold" : "text-gray-700"}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/#category-section"
                        onClick={(e) => {
                            setActiveSection("category");
                            closeMobileMenu();
                            if (pathname === "/") {
                                e.preventDefault();
                                scrollTo("category-section");
                            }
                        }}
                        className={`py-2 ${activeSection === "category" ? "text-primary font-bold" : "text-gray-700"}`}
                    >
                        Category
                    </Link>
                    <Link
                        href="/#products-section"
                        onClick={(e) => {
                            setActiveSection("product");
                            closeMobileMenu();
                            window.dispatchEvent(new CustomEvent("resetCategoryFilter"));
                            if (pathname === "/") {
                                e.preventDefault();
                                scrollTo("products-section");
                            }
                        }}
                        className={`py-2 ${activeSection === "product" ? "text-primary font-bold" : "text-gray-700"}`}
                    >
                        Explore Products
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
