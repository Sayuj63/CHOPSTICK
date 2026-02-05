"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
    const [count, setCount] = useState(from);
    const nodeRef = useRef(null);
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView) {
            let start = from;
            const end = to;
            const range = end - start;
            const increment = end > start ? 1 : -1;
            const stepTime = Math.abs(Math.floor((duration * 1000) / range));

            let timer = setInterval(() => {
                start += increment;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, Math.max(stepTime, 10)); // Cap speed

            return () => clearInterval(timer);
        }
    }, [inView, from, to, duration]);

    return <span ref={nodeRef}>{count}</span>;
}

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-accent/90" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-cream">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto space-y-6"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <h2 className="text-secondary font-medium tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
                            Est. 1999
                        </h2>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-6">
                            25 Years of <br className="hidden md:block" />
                            <span className="text-primary">Culinary Excellence</span>
                        </h1>
                    </motion.div>

                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        A timeless journey through the rich heritage of Malabar, Chinese, and Tandoori flavours.
                        Experience dining that is refined, authentic, and enduring.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/menu"
                            className="px-8 py-4 bg-primary text-accent text-lg font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-black/30"
                        >
                            Order Online
                        </Link>
                        <Link
                            href="#contact"
                            className="px-8 py-4 bg-transparent border-2 border-primary text-primary text-lg font-bold uppercase tracking-wider rounded-sm hover:bg-primary hover:text-accent transition-all duration-300"
                        >
                            Book A Table
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 md:mt-24 pt-8 border-t border-white/10"
                    >
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-display text-primary font-bold">
                                <Counter from={0} to={25} />+
                            </span>
                            <span className="text-sm uppercase tracking-widest mt-2 text-gray-300">Years of Service</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-display text-primary font-bold">
                                <Counter from={0} to={100} duration={3} />K+
                            </span>
                            <span className="text-sm uppercase tracking-widest mt-2 text-gray-300">Happy Customers</span>
                        </div>
                        <div className="hidden md:flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-display text-primary font-bold">
                                <Counter from={0} to={500} duration={2.5} />+
                            </span>
                            <span className="text-sm uppercase tracking-widest mt-2 text-gray-300">Unique Dishes</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
            >
                <span className="text-xs uppercase tracking-widest">Scroll Down</span>
            </motion.div>
        </section>
    );
}
