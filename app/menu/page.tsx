"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCircles from "@/components/menu/CategoryCircles";
import MenuGrid from "@/components/menu/MenuGrid";
import CartSidebar from "@/components/CartSidebar";
import { FaSearch } from "react-icons/fa";

export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />
            <CartSidebar />

            {/* Header */}
            <div className="pt-32 pb-10 px-4 bg-accent text-cream text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/pattern.png')", backgroundSize: "cover" }}></div>
                <h1 className="text-4xl md:text-5xl font-display font-bold relative z-10">Order Online</h1>
                <p className="mt-2 text-gray-300 font-light relative z-10">Freshly prepared, delivered to your table.</p>

                {/* Search Bar Placeholder */}
                <div className="mt-6 max-w-md mx-auto relative z-10">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for dishes..."
                            className="w-full py-3 pl-12 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 transition-all backdrop-blur-sm"
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            <CategoryCircles selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

            <div className="container mx-auto px-4 py-8">
                <MenuGrid selectedCategory={selectedCategory} />
            </div>

            <Footer />
        </main>
    );
}
