import { FiFastForward } from "react-icons/fi";
import Button from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section id="hero-section" className="container mx-auto h-screen flex">
            <div className="relative self-center ">
                <Image
                    src="/images/img-basketball-transparent.png"
                    width={463}
                    height={646}
                    alt="image sporton"
                    className="grayscale absolute left-4 -top-13 w-auto h-auto"
                />

                <div className="relative ml-30 w-full">
                    <div className="text-primary italic"> Friday Sale, 50%</div>
                    <h1 className="font-extrabold text-[85px] italic bg-gradient-to-b leading-tight from-black to-[#979797D1] bg-clip-text text-transparent">
                        WEAR YOUR<br />TOP-QUALITY<br />SPORTSWEAR
                    </h1>
                    <p className="w-1/2 mt-10 leading-loose">
                        Engineered for endurance and designed for speed. Experience gear that moves as fast as you do. Premium fabrics. Unmatched comfort. Limitless motion.
                    </p>
                    <div className="flex gap-5 mt-14">
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
                <Image
                    src="/images/img-hero.png"
                    width={650}
                    height={680}
                    alt="image sporton hero"
                    className="absolute -right-5 top-1/2 -translate-y-1/2 -translate-x-8 w-auto h-auto"
                    priority
                />
            </div>
            <Image
                src="/images/img-ornament-hero.svg"
                width={413}
                height={413}
                alt="image sporton ornament"
                className="absolute -right-[200px] top-1/2 -translate-y-1/2 w-auto h-auto"
            />
        </section>
    );
};

export default HeroSection;
