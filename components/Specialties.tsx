"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const specialties = [
    {
        name: "Malabar Biryani",
        price: "₹380",
        description: "Aromatic kaima rice cooked with tender meat and authentic Malabar spices.",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2670&auto=format&fit=crop"
    },
    {
        name: "Schezwan Fried Rice",
        price: "₹290",
        description: "Wok-tossed basmati rice with spicy schezwan sauce and fresh vegetables.",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574&auto=format&fit=crop"
    },
    {
        name: "Tandoori Platter",
        price: "₹550",
        description: "An assortment of chicken tikka, kebabs, and tandoori prawns grilled to perfection.",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500&auto=format&fit=crop"
    },
    {
        name: "Kerala Fish Curry",
        price: "₹420",
        description: "Fresh fish simmered in a tangy coconut milk gravy with kokum and curry leaves.",
        image: "https://images.unsplash.com/photo-1626777552726-4a653719028d?q=80&w=2600&auto=format&fit=crop"
    }
];

export default function Specialties() {
    return (
        <section id="specialties" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-sm mb-3">Our Signature Dishes</h3>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-accent mb-6">Chef's Recommendations</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {specialties.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group bg-cream rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-primary text-accent font-bold py-1 px-3 rounded-sm shadow-md">
                                    {item.price}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-display font-bold text-accent mb-2 group-hover:text-secondary transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-gray-600 font-light text-sm line-clamp-3">
                                    {item.description}
                                </p>
                                <button className="mt-4 text-xs font-bold uppercase tracking-wider text-secondary border-b border-transparent group-hover:border-secondary transition-colors">
                                    Order Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/menu" className="px-10 py-4 border-2 border-accent text-accent font-bold uppercase tracking-wider hover:bg-accent hover:text-cream transition-colors duration-300 rounded-sm inline-block">
                        View Full Menu
                    </Link>
                </div>
            </div>
        </section>
    );
}
