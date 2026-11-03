import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-dark-alternate text-white">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between pt-12 md:pt-14 pb-16 md:pb-24 px-4 md:px-8 gap-10 lg:gap-0">
                <div className="w-full lg:w-105">
                    <Image
                        src="/images/footer.png"
                        alt="SportOn footer"
                        width={187}
                        height={44}
                        className="h-9 w-auto"
                    />
                    <p className="mt-6 md:mt-8 text-sm md:text-base text-gray-300 max-w-md">
                        Engineered for endurance and designed for speed. Experience gear that moves as fast as you do.
                    </p>
                </div>
                <div className="w-full lg:w-105 grid grid-cols-2 gap-8">
                    <div className="flex gap-4 md:gap-7 flex-col text-sm md:text-base">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link href="/#category-section" className="hover:text-primary transition-colors">Categories</Link>
                        <Link href="/#products-section" className="hover:text-primary transition-colors">Explore Products</Link>
                        <Link href="/#hero-section" className="hover:text-primary transition-colors">About Us</Link>
                    </div>
                    <div className="flex gap-4 md:gap-7 flex-col text-sm md:text-base">
                        <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Facebook</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Tiktok</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Youtube</Link>
                    </div>
                </div>
            </div>
            <div className="border-t border-t-white/15 px-4 md:px-8">
                <div className="container mx-auto py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-400">
                    <div>SportsOn © 2025 All Rights Reserved.</div>
                    <div className="flex gap-6 sm:gap-10">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms Condition</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
