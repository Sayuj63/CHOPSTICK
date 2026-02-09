"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
    { id: "all", name: "All Dishes", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670" },
    { id: "starters-veg", name: "Veg Starters", image: "https://images.unsplash.com/photo-1541014741259-df529411b96a?q=80&w=2574" },
    { id: "starters-nonveg", name: "Non-Veg", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2670" },
    { id: "chinese", name: "Chinese", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2672" },
    { id: "main-course", name: "Main Course", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670" },
    { id: "tandoori", name: "Tandoori", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500" },
    { id: "biryani", name: "Biryani", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2670" },
    { id: "rice-breads", name: "Breads", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670" },
    { id: "deserts", name: "Desserts", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2574" },
    { id: "beverages", name: "Beverages", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=2574" }
];

export default function CategoryCircles({
    selectedCategory,
    onSelectCategory
}: {
    selectedCategory: string;
    onSelectCategory: (id: string) => void;
}) {
    return (
        <div className="py-2 sm:py-6 overflow-x-auto no-scrollbar bg-white border-b border-accent/5 sticky top-32 sm:top-36 md:top-40 z-30 shadow-sm">
            <div className="flex justify-start lg:justify-center items-start space-x-4 sm:space-x-8 px-4 sm:px-10 min-w-max mx-auto">
                {categories.map((cat) => (
                    <motion.div
                        key={cat.id}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                        onClick={() => onSelectCategory(cat.id)}
                    >
                        <div className={`relative w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-0.5 transition-all duration-500 ${selectedCategory === cat.id ? "bg-primary shadow-lg shadow-primary/20 scale-105" : "bg-gray-100 group-hover:bg-primary/20"
                            }`}>
                            <div className="relative w-full h-full rounded-full overflow-hidden border border-white">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    sizes="(max-width: 768px) 44px, 80px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <span className={`text-[9px] sm:text-xs font-bold uppercase tracking-widest text-center w-16 sm:w-24 leading-tight transition-colors duration-300 ${selectedCategory === cat.id ? "text-primary" : "text-gray-500 group-hover:text-accent"
                            }`}>
                            {cat.name}
                        </span>
                        {selectedCategory === cat.id && (
                            <motion.div
                                layoutId="categoryUnderline"
                                className="w-6 h-0.5 bg-primary rounded-full"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
