"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchBarProps {
    onSearchChange: (query: string) => void;
    searchQuery: string;
}

export default function SearchBar({ onSearchChange, searchQuery }: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        onSearchChange("");
    };

    return (
        <div className="py-4 px-4 sm:px-6 lg:px-8 bg-white border-b border-accent/5 sticky top-[62px] sm:top-[78px] z-30 shadow-sm">
            <div className="container mx-auto max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative transition-all duration-300 ${isFocused ? "scale-[1.02]" : "scale-100"
                        }`}
                >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <FaSearch className="text-lg" />
                    </div>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search for dishes... (e.g., chicken, biryani, paneer)"
                        className={`w-full pl-12 pr-12 py-3 sm:py-4 text-sm sm:text-base rounded-lg border-2 transition-all duration-300 outline-none ${isFocused
                                ? "border-primary shadow-lg shadow-primary/10"
                                : "border-gray-200 hover:border-gray-300"
                            } bg-white text-accent placeholder:text-gray-400`}
                    />

                    <AnimatePresence>
                        {searchQuery && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleClear}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition-colors"
                                aria-label="Clear search"
                            >
                                <FaTimes className="text-lg" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>

                {searchQuery && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs sm:text-sm text-gray-500 mt-2 text-center"
                    >
                        Searching for "{searchQuery}"...
                    </motion.p>
                )}
            </div>
        </div>
    );
}
