"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const products = [
    // Veg Starters
    { id: "vs1", category: "starters-veg", name: "Paneer Tikka", price: 320, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2600", veg: true },
    { id: "vs2", category: "starters-veg", name: "Gobi Manchurian", price: 240, image: "https://images.unsplash.com/photo-1625938146369-adc83226b919?q=80&w=2574", veg: true },
    { id: "vs3", category: "starters-veg", name: "Crispy Corn", price: 220, image: "https://images.unsplash.com/photo-1554502078-ef0fc409efce?q=80&w=2584", veg: true },

    // Non-Veg Starters
    { id: "nvs1", category: "starters-nonveg", name: "Chicken 65", price: 280, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574", veg: false },
    { id: "nvs2", category: "starters-nonveg", name: "Prawns Fry", price: 450, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670", veg: false },

    // Chinese
    { id: "ch1", category: "chinese", name: "Chicken Fried Rice", price: 280, image: "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574", veg: false },
    { id: "ch2", category: "chinese", name: "Hakka Noodles", price: 260, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2584", veg: true },

    // Main Course
    { id: "mc1", category: "main-course", name: "Butter Chicken", price: 380, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670", veg: false },
    { id: "mc2", category: "main-course", name: "Dal Makhani", price: 260, image: "https://images.unsplash.com/photo-1546833998-877b37c2e5b4?q=80&w=2574", veg: true },

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
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-24">
            <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={product.id}
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col"
                    >
                        <div className="relative aspect-square w-full">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            <div className={`absolute top-3 left-3 w-4 h-4 rounded-sm border ${product.veg ? "border-green-600" : "border-red-600"} flex items-center justify-center p-[2px]`}>
                                <div className={`w-full h-full rounded-full ${product.veg ? "bg-green-600" : "bg-red-600"}`} />
                            </div>
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="font-bold text-accent text-lg mb-1 line-clamp-2">{product.name}</h3>
                            <p className="text-gray-500 text-xs mb-4">Authentic preparation with fresh ingredients.</p>

                            <div className="mt-auto flex justify-between items-center">
                                <span className="font-bold text-lg text-accent">₹{product.price}</span>
                                <button
                                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                                    className="px-4 py-2 bg-white text-primary border border-primary font-bold uppercase text-xs rounded-sm hover:bg-primary hover:text-white transition-colors"
                                >
                                    ADD
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
