"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-20 md:py-32 bg-cream overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative min-h-[400px] md:h-[600px]"
                    >
                        <div className="absolute inset-0 bg-accent/5 rounded-sm transform translate-x-4 translate-y-4" />
                        <div className="relative h-full w-full rounded-sm overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop"
                                alt="Chopsticks Spice Malbar Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Badge */}
                        <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-secondary text-cream p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-lg z-10">
                            <span className="text-3xl font-bold font-display">25+</span>
                            <span className="text-xs uppercase tracking-widest text-center">Years of Legacy</span>
                        </div>
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2 space-y-6 md:space-y-8"
                    >
                        <div className="space-y-2">
                            <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-sm">About Us</h3>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-accent">
                                Refined. Authentic. <br /> <span className="text-primary italic">Enduring.</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-700 leading-relaxed font-light text-lg">
                            <p>
                                For over 25 years, <strong>Chopsticks Spice Malbar</strong> has been a distinguished name in Pune's dining landscape, celebrated for its commitment to quality, authenticity, and timeless flavours. Rooted in tradition yet evolving with the city, our restaurant has earned the trust of generations who value refined taste, consistency, and thoughtfully prepared cuisine.
                            </p>

                            <p>
                                Our culinary philosophy brings together the richness of <strong>Kerala's Malabar heritage</strong>, the finesse of Chinese cuisine, the depth of Indian flavours, and the robust character of Tandoori specialities. Each dish is carefully crafted using premium ingredients, balanced spices, and techniques perfected over decades — resulting in flavours that are both memorable and comforting.
                            </p>

                            <div className="border-l-4 border-primary pl-6 py-2 italic text-accent/80 font-display text-xl">
                                "Dining is more than a meal; it is an experience shaped by experience, warmth, and attention to detail."
                            </div>

                            <p>
                                Whether it's an intimate gathering or a family celebration, we invite you to savour cuisine that reflects our legacy.
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 px-8 py-3 bg-accent text-primary text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-secondary hover:text-white transition-colors"
                        >
                            Learn More
                        </motion.button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
