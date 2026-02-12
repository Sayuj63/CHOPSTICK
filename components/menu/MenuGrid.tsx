"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaLeaf } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const categoryImages: Record<string, string> = {
    "chinese": "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2672",
    "kerala": "https://images.unsplash.com/photo-1596797038558-9da39b968efe?q=80&w=2574",
    "indian": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2672",
    "tandoori": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500",
    "starters": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574",
    "main-course": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670",
    "rice-breads": "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670",
    "default": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670"
};

// Function to process menu data into products
function processMenuData(menuData: any): any[] {
    const products: any[] = [];
    let itemIdCounter = 1;

    // New menu structure is an array of categories
    menuData.menu.forEach((categoryData: any) => {
        const categoryName = categoryData.category.toLowerCase();
        const categoryId = categoryData.category.toLowerCase().replace(/\s+/g, '-');
        const cuisineType = categoryData.cuisine.toLowerCase();
        const itemType = categoryData.type.toLowerCase();

        categoryData.items.forEach((item: any) => {
            const categories = ["all", categoryId]; // Add specific category ID

            // Also add grouped categories for backwards compatibility
            // Map cuisines to categories
            if (cuisineType.includes("chinese")) categories.push("chinese");
            if (cuisineType.includes("kerala")) categories.push("kerala");
            if (cuisineType.includes("indian")) categories.push("indian");
            if (cuisineType.includes("chettinad")) categories.push("indian");
            if (cuisineType.includes("tandoor")) categories.push("tandoori");

            // Map sections to types
            if (categoryName.includes("appetizer") || categoryName.includes("starter")) {
                categories.push("starters");
            }

            if (categoryName.includes("main course") || categoryName.includes("curry") ||
                categoryName.includes("curries") || categoryName.includes("dishes") ||
                categoryName.includes("meals") || categoryName.includes("thali")) {
                categories.push("main-course");
            }

            if (categoryName.includes("rice") || categoryName.includes("noodles") ||
                categoryName.includes("bread") || categoryName.includes("paratha") ||
                categoryName.includes("biryani") || categoryName.includes("pulav") ||
                categoryName.includes("chopsuey")) {
                categories.push("rice-breads");
            }

            // Veg check
            const isVeg = itemType.includes("vegetarian") ||
                categoryName.includes("veg") ||
                item.name.toLowerCase().includes("veg") ||
                item.name.toLowerCase().includes("paneer") ||
                item.name.toLowerCase().includes("dal") ||
                item.name.toLowerCase().includes("mushroom") ||
                item.name.toLowerCase().includes("gobi") ||
                item.name.toLowerCase().includes("aloo");

            // Handle pricing - prefer full price, then regular price, then half price
            const displayPrice = item.price || item.full || item.half || 0;

            products.push({
                id: `item_${itemIdCounter++}`,
                name: item.name,
                price: displayPrice,
                priceHalf: item.half,
                priceFull: item.full,
                categories: categories,
                categoryName: categoryData.category, // Store full category name
                veg: isVeg,
                image: categoryImages[categories[1]] || categoryImages["default"]
            });
        });
    });

    return products;
}

// Levenshtein distance algorithm for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix: number[][] = [];

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[len1][len2];
}

// Calculate relevance score for search
function calculateRelevance(itemName: string, searchQuery: string): number {
    const itemLower = itemName.toLowerCase();
    const queryLower = searchQuery.toLowerCase();

    // Exact match gets highest score
    if (itemLower === queryLower) return 1000;

    // Starts with query gets high score
    if (itemLower.startsWith(queryLower)) return 500;

    // Contains query gets medium score
    if (itemLower.includes(queryLower)) return 300;

    // Use Levenshtein distance for fuzzy matching
    const distance = levenshteinDistance(itemLower, queryLower);
    const maxLength = Math.max(itemLower.length, queryLower.length);
    const similarity = 1 - distance / maxLength;

    // Only consider items with similarity > 0.4 (60% different or less)
    if (similarity > 0.4) {
        return similarity * 100;
    }

    // Check if any word in the item name matches
    const itemWords = itemLower.split(/\s+/);
    const queryWords = queryLower.split(/\s+/);

    for (const queryWord of queryWords) {
        for (const itemWord of itemWords) {
            if (itemWord.startsWith(queryWord)) return 200;
            if (itemWord.includes(queryWord)) return 150;

            const wordDistance = levenshteinDistance(itemWord, queryWord);
            const wordSimilarity = 1 - wordDistance / Math.max(itemWord.length, queryWord.length);
            if (wordSimilarity > 0.6) {
                return wordSimilarity * 100;
            }
        }
    }

    return 0;
}

export default function MenuGrid({ selectedCategory, searchQuery = "", onResultsChange }: {
    selectedCategory: string;
    searchQuery?: string;
    onResultsChange?: (count: number) => void;
}) {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch menu data from public folder
        fetch('/Menu.json')
            .then(response => response.json())
            .then(data => {
                const processedProducts = processMenuData(data);
                setProducts(processedProducts);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading menu:', error);
                setLoading(false);
            });
    }, []);

    // Use useMemo for filtered products to fix hooks ordering
    const filteredProducts = useMemo(() => {
        let results: any[] = [];

        // PRIORITY 1: Global Search (searches ALL products regardless of category)
        if (searchQuery.trim()) {
            const productsWithRelevance = products.map((product: any) => ({
                ...product,
                relevance: calculateRelevance(product.name, searchQuery)
            }));

            results = productsWithRelevance
                .filter((p: any) => p.relevance > 0)
                .sort((a: any, b: any) => b.relevance - a.relevance);
        }
        // PRIORITY 2: Category Filtering (only when NO search is active)
        else {
            results = selectedCategory === "all"
                ? products
                : products.filter((p: any) => p.categories.includes(selectedCategory));
        }

        return results;
    }, [products, searchQuery, selectedCategory]);

    // Notify parent component of results count when searching
    useEffect(() => {
        if (searchQuery.trim() && onResultsChange) {
            onResultsChange(filteredProducts.length);
        } else if (onResultsChange) {
            onResultsChange(undefined as any);
        }
    }, [filteredProducts.length, searchQuery, onResultsChange]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-accent text-lg">Loading menu...</p>
            </div>
        );
    }


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
