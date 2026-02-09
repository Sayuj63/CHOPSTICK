"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCircles from "@/components/menu/CategoryCircles";
import MenuGrid from "@/components/menu/MenuGrid";
import CartSidebar from "@/components/CartSidebar";

export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />
            <CartSidebar />

            <div className="pt-[62px] sm:pt-[78px]">
                <CategoryCircles selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            </div>

            <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-6">
                <MenuGrid selectedCategory={selectedCategory} />
            </div>

            <Footer />
        </main>
    );
}
