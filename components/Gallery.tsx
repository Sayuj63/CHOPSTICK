"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const galleryImages = [
    { id: 1, category: "Food", src: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670" },
    { id: 2, category: "Ambience", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670" },
    { id: 3, category: "Food", src: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2670" },
    { id: 4, category: "Events", src: "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?q=80&w=2670" },
    { id: 5, category: "Food", src: "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574" },
    { id: 6, category: "Ambience", src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574" },
    { id: 7, category: "Food", src: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500" },
    { id: 8, category: "Food", src: "https://images.unsplash.com/photo-1626777552726-4a653719028d?q=80&w=2600" },
    { id: 9, category: "Ambience", src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670" },
    { id: 10, category: "Events", src: "https://images.unsplash.com/photo-1519225469958-305e68780cf9?q=80&w=2670" },
    { id: 11, category: "Food", src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2670" },
    { id: 12, category: "Ambience", src: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2670" }
];

export default function Gallery() {
    const [filter, setFilter] = useState("All");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const filteredImages = filter === "All"
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    return (
        <section id="gallery" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-sm mb-3">Gallery</h3>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-accent mb-6">Moments & Memories</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Filter Buttons */}
                <div className="flex justify-center space-x-4 mb-12">
                    {["All", "Food", "Ambience", "Events"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-1 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors duration-300 ${filter === cat ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-accent"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                        {filteredImages.map((image) => (
                            <motion.div
                                layout
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group"
                                onClick={() => setSelectedImage(image.src)}
                            >
                                <Image
                                    src={image.src}
                                    alt={`Gallery image ${image.id}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-bold uppercase tracking-widest text-xs border border-white px-4 py-2">View</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white text-3xl hover:text-primary transition-colors z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FaTimes />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full max-w-5xl h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Selected"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
