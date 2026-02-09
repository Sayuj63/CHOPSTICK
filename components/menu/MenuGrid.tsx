"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaLeaf } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const products = [
    // Veg Starters
    { id: "vs1", category: "starters-veg", name: "Paneer Tikka", price: 320, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2600", veg: true },
    { id: "vs2", category: "starters-veg", name: "Gobi Manchurian", price: 240, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670", veg: true },
    { id: "vs3", category: "starters-veg", name: "Crispy Corn", price: 220, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2670", veg: true },

    // Non-Veg Starters
    { id: "nvs1", category: "starters-nonveg", name: "Chicken 65", price: 280, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574", veg: false },
    { id: "nvs2", category: "starters-nonveg", name: "Prawns Fry", price: 450, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670", veg: false },

    // Chinese
    { id: "ch1", category: "chinese", name: "Chicken Fried Rice", price: 280, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2672", veg: false },
    { id: "ch2", category: "chinese", name: "Hakka Noodles", price: 260, image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=2600", veg: true },

    // Main Course
    { id: "mc1", category: "main-course", name: "Butter Chicken", price: 380, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670", veg: false },
    { id: "mc2", category: "main-course", name: "Dal Makhani", price: 260, image: "https://images.unsplash.com/photo-1546833998-877b37c2e5b4?q=80&w=2670", veg: true },

    // Tandoori
    { id: "td1", category: "tandoori", name: "Tandoori Chicken", price: 450, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500", veg: false },

    // Biryani
    { id: "br1", category: "biryani", name: "Malabar Chicken Biryani", price: 320, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2670", veg: false },
    { id: "br2", category: "biryani", name: "Veg Biryani", price: 260, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2670", veg: true },
];

export default function MenuGrid({ selectedCategory }: { selectedCategory: string }) {
    const { addToCart } = useCart();

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 md:gap-8 pb-24">
            <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={product.id}
                        className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-1 left-1 sm:top-3 sm:left-3 flex gap-1">
                                <div className={`w-3 h-3 sm:w-5 sm:h-5 rounded-sm bg-white/90 backdrop-blur-sm border flex items-center justify-center p-[2px] shadow-sm ${product.veg ? "border-green-600" : "border-red-600"}`}>
                                    <div className={`w-full h-full rounded-full ${product.veg ? "bg-green-600" : "bg-red-600"}`} />
                                </div>
                            </div>
                        </div>

                        <div className="p-2 sm:p-5 flex flex-col flex-1">
                            <div className="mb-2 sm:mb-4">
                                <h3 className="font-bold text-accent text-[11px] sm:text-base md:text-lg mb-0.5 group-hover:text-secondary transition-colors line-clamp-1">{product.name}</h3>
                                <p className="hidden sm:block text-gray-400 text-[10px] sm:text-xs font-light leading-relaxed line-clamp-2">Authentic preparation with fresh ingredients.</p>
                            </div>

                            <div className="mt-auto flex justify-between items-center sm:pt-4 sm:border-t sm:border-gray-50">
                                <span className="font-extrabold text-[12px] sm:text-lg md:text-xl text-accent">₹{product.price}</span>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                                    className="p-1 sm:px-4 sm:py-2 bg-primary/10 text-primary border border-primary/20 font-bold uppercase text-[9px] sm:text-xs rounded-full sm:rounded-sm hover:bg-primary hover:text-accent hover:border-primary transition-all duration-300 flex items-center justify-center"
                                >
                                    <span className="sm:hidden flex items-center justify-center w-5 h-5"><FaPlus size={10} /></span>
                                    <span className="hidden sm:inline flex items-center gap-1"><FaPlus size={8} /> ADD</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
