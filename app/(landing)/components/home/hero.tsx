import { FiFastForward } from "react-icons/fi";
import Button from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section id="hero-section" className="container mx-auto min-h-screen pt-24 md:pt-0 flex items-center relative overflow-hidden px-4 md:px-8">
            <div className="relative w-full flex flex-col-reverse lg:flex-row items-center justify-between py-12 md:py-20">
                {/* Background decorative basketball image */}
                <Image
                    src="/images/img-basketball-transparent.png"
                    width={463}
                    height={646}
                    alt="image sporton"
                    className="grayscale absolute -left-10 -top-10 md:left-4 md:-top-13 w-60 md:w-auto h-auto opacity-40 md:opacity-100 pointer-events-none -z-10"
                />

                {/* Text Content */}
                <div className="relative z-10 w-full lg:max-w-[55%] text-center lg:text-left mt-8 lg:mt-0">
                    <div className="text-primary italic font-semibold text-sm md:text-base mb-2">
                        Friday Sale, 50%
                    </div>
                    <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-[80px] xl:text-[85px] italic bg-gradient-to-b leading-tight from-black to-[#979797D1] bg-clip-text text-transparent">
                        WEAR YOUR<br className="hidden sm:inline" /> TOP-QUALITY<br className="hidden sm:inline" /> SPORTSWEAR
                    </h1>
                    <p className="w-full lg:w-4/5 mt-4 md:mt-8 text-sm md:text-base text-gray-600 leading-relaxed md:leading-loose mx-auto lg:mx-0">
                        Engineered for endurance and designed for speed. Experience gear that moves as fast as you do. Premium fabrics. Unmatched comfort. Limitless motion.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8 md:mt-12 justify-center lg:justify-start">
                        <Link href="/#products-section">
                            <Button>Explore More <FiFastForward /></Button>
                        </Link>
                        <Button variant="ghost">Watch Video {" "}
                            <Image
                                src="/images/icon-play-video.svg"
                                alt="icon play video"
                                width={29}
                                height={29}
                            />
                        </Button>
                    </div>
                </div>

                {/* Hero Athlete Image */}
                <div className="relative z-10 w-full sm:w-2/3 lg:w-auto flex justify-center">
                    <Image
                        src="/images/img-hero.png"
                        width={650}
                        height={680}
                        alt="image sporton hero"
                        className="w-[280px] sm:w-[400px] lg:w-[540px] xl:w-[650px] h-auto object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Background ornament */}
            <Image
                src="/images/img-ornament-hero.svg"
                width={413}
                height={413}
                alt="image sporton ornament"
                className="hidden xl:block absolute -right-[200px] top-1/2 -translate-y-1/2 w-auto h-auto pointer-events-none -z-10"
            />
        </section>
    );
};

export default HeroSection;
