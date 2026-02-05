"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
    { id: "starters-veg", name: "Veg Starters", image: "https://images.unsplash.com/photo-1625938146369-adc83226b919?q=80&w=2574" },
    { id: "starters-nonveg", name: "Non-Veg Starters", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574" },
    { id: "chinese", name: "Chinese", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=2574" },
    { id: "main-course", name: "Main Course", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670" },
    { id: "tandoori", name: "Tandoori Special", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500" },
    { id: "biryani", name: "Biryani", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2670" },
    { id: "rice-breads", name: "Rice & Breads", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670" },
    { id: "deserts", name: "Desserts", image: "https://images.unsplash.com/photo-1593701478586-2464201b5941?q=80&w=2574" },
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
        <div className="py-6 overflow-x-auto no-scrollbar bg-cream border-b border-accent/5 sticky top-20 z-30">
            <div className="flex justify-center space-x-4 px-4 min-w-full">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                        onClick={() => onSelectCategory(cat.id)}
                    >
                        <div className={`relative w-24 h-24 rounded-full overflow-hidden p-1 transition-all duration-300 ${selectedCategory === cat.id ? "bg-primary scale-105 shadow-lg" : "bg-transparent group-hover:bg-primary/20"
                            }`}>
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wide text-center w-24 leading-tight ${selectedCategory === cat.id ? "text-primary" : "text-gray-600"
                            }`}>
                            {cat.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
