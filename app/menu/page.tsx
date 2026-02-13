"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCircles from "@/components/menu/CategoryCircles";
import MenuGrid from "@/components/menu/MenuGrid";

import SearchBar from "@/components/menu/SearchBar";

export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [resultsCount, setResultsCount] = useState<number | undefined>(undefined);

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />


            <div className="pt-32 sm:pt-36 md:pt-40">
                <SearchBar onSearchChange={setSearchQuery} searchQuery={searchQuery} resultsCount={resultsCount} />
                <CategoryCircles selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            </div>

            <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-6">
                <MenuGrid selectedCategory={selectedCategory} searchQuery={searchQuery} onResultsChange={setResultsCount} />
            </div>

            <Footer />
        </main>
    );
}
