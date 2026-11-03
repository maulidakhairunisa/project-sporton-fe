import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-dark-alternate text-white">
            <div className="container mx-auto flex justify-between pt-14 pb-24 px-8">
                <div className="w-105">
                    <Image
                        src="/images/footer.png"
                        alt="SportOn footer"
                        width={187}
                        height={44}
                    />
                    <p className="mt-8">
                        Engineered for endurance and designed for speed. Experience gear that moves as fast as you do.
                    </p>
                </div>
                <div className="w-105 grid grid-cols-2">
                    <div className="flex gap-7 flex-col">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link href="/#category-section" className="hover:text-primary transition-colors">Categories</Link>
                        <Link href="/#products-section" className="hover:text-primary transition-colors">Explore Products</Link>
                        <Link href="/#hero-section" className="hover:text-primary transition-colors">About Us</Link>
                    </div>
                    <div className="flex gap-7 flex-col">
                        <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Facebook</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Tiktok</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Youtube</Link>
                    </div>
                </div>
            </div>
            <div className="border-t border-t-white/15 px-8">
                <div className="container mx-auto py-6 flex justify-between">
                    <div>SportsOn © 2025 All Rights Reserved.</div>
                    <div className="w-105 grid grid-cols-2">
                        <div className="flex gap-7 flex-col">
                            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        </div>
                        <div className="flex gap-7 flex-col">
                            <Link href="#" className="hover:text-primary transition-colors">Terms Condition</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
