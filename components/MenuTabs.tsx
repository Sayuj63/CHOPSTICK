"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    "Starters",
    "Main Course",
    "Chinese",
    "Tandoori",
    "Biryani",
    "Desserts",
    "Beverages"
];

const menuItems = {
    Starters: [
        { name: "Chicken 65", price: "₹280", desc: "Spicy, deep-fried chicken marinated in ginger, lemon, and red chilies.", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574" },
        { name: "Prawns Fry", price: "₹450", desc: "Crispy fried prawns tossed in curry leaves and coconut oil.", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670" },
        { name: "Gobi Manchurian", price: "₹240", desc: "Cauliflower florets tossed in a spicy, tangy Manchurian sauce.", image: "https://images.unsplash.com/photo-1625938146369-adc83226b919?q=80&w=2574" },
        { name: "Paneer Tikka", price: "₹320", desc: "Cottage cheese cubes marinated in yogurt and spices, grilled in tandoor.", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2600" },
        { name: "Fish Finger", price: "₹380", desc: "Crispy breaded fish fingers served with tartar sauce.", image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=2576" },
        { name: "Spring Rolls", price: "₹220", desc: "Crispy rolls filled with stir-fried vegetables.", image: "https://images.unsplash.com/photo-1548505295-d2495b45c479?q=80&w=2670" }
    ],
    "Main Course": [
        { name: "Butter Chicken", price: "₹380", desc: "Chicken cooked in a rich tomato and butter gravy.", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670" },
        { name: "Paneer Butter Masala", price: "₹340", desc: "Cottage cheese cubes cooked in a creamy tomato gravy.", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2574" },
        { name: "Mutton Rogan Josh", price: "₹480", desc: "A Kashmiri delicacy of tender mutton cooked with aromatic spices.", image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=2670" },
        { name: "Dal Makhani", price: "₹260", desc: "Black lentils simmered overnight with butter and cream.", image: "https://images.unsplash.com/photo-1546833998-877b37c2e5b4?q=80&w=2574" },
        { name: "Kadai Vegetable", price: "₹280", desc: "Mixed vegetables cooked in a spicy tomato-based gravy.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2600" },
        { name: "Chicken Chettinad", price: "₹390", desc: "A fiery chicken curry from the Chettinad region of Tamil Nadu.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2600" }
    ],
    Chinese: [
        { name: "Chicken Fried Rice", price: "₹280", desc: "Stir-fried rice with chicken, eggs, and vegetables.", image: "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574" },
        { name: "Hakka Noodles", price: "₹260", desc: "Wok-tossed noodles with vegetables and soy sauce.", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2584" },
        { name: "Chilli Chicken", price: "₹320", desc: "Chicken chunks tossed in spicy chilli sauce with bell peppers.", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=2574" },
        { name: "Manchow Soup", price: "₹180", desc: "Spicy brown soup with minced vegetables and fried noodles.", image: "https://images.unsplash.com/photo-1547592166-23acbe346499?q=80&w=2670" },
        { name: "Schezwan Noodles", price: "₹290", desc: "Spicy wok-tossed noodles in Schezwan sauce.", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=2574" },
        { name: "Dragon Chicken", price: "₹340", desc: "Crispy chicken strips tossed in a sweet and spicy sauce.", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2670" }
    ],
    Tandoori: [
        { name: "Tandoori Chicken", price: "₹450", desc: "Whole chicken marinated in yogurt and spices, roasted in tandoor.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500" },
        { name: "Chicken Tikka", price: "₹360", desc: "Boneless chicken chunks marinated in spices and yogurt.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500" },
        { name: "Seekh Kebab", price: "₹380", desc: "Minced meat skewers grilled in tandoor.", image: "https://images.unsplash.com/photo-1546833999-b9f5816029bd?q=80&w=2574" },
        { name: "Tangdi Kebab", price: "₹350", desc: "Chicken drumsticks marinated and grilled.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500" }
    ],
    Biryani: [
        { name: "Malabar Chicken Biryani", price: "₹320", desc: "Classic Malabar biryani with jeerakasala rice.", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2670" },
        { name: "Mutton Biryani", price: "₹420", desc: "Slow-cooked mutton biryani with aromatic spices.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2670" },
        { name: "Hyderabadi Biryani", price: "₹340", desc: "Spicy and aromatic basmati rice biryani.", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2574" },
        { name: "Veg Biryani", price: "₹260", desc: "Assorted vegetables cooked with biryani rice.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2670" }
    ],
    Desserts: [
        { name: "Gulab Jamun", price: "₹120", desc: "Deep-fried milk solids soaked in sugar syrup.", image: "https://images.unsplash.com/photo-1593701478586-2464201b5941?q=80&w=2574" },
        { name: "Rasmalai", price: "₹140", desc: "Cottage cheese dumplings in sweetened milk.", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?q=80&w=2574" },
        { name: "Brownie with Ice Cream", price: "₹180", desc: "Warm walnut brownie served with vanilla ice cream.", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=2670" }
    ],
    Beverages: [
        { name: "Lassi", price: "₹100", desc: "Sweet or salted yogurt drink.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=2574" },
        { name: "Fresh Lime Soda", price: "₹80", desc: "Refreshing lime soda.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=2574" },
        { name: "Cold Coffee", price: "₹140", desc: "Chilled coffee with milk and ice.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2669" }
    ]
};

export default function MenuTabs() {
    const [activeTab, setActiveTab] = useState("Starters");

    return (
        <section id="menu" className="py-20 md:py-32 bg-cream">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-sm mb-3">Our Menu</h3>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-accent mb-6">Explore Our Flavors</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Tab Navigation */}
                <div className="sticky top-20 z-40 bg-cream/95 backdrop-blur-sm py-4 mb-12 border-b border-accent/10">
                    <div className="flex overflow-x-auto space-x-2 md:space-x-4 pb-2 md:justify-center no-scrollbar">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === category
                                        ? "bg-primary text-accent shadow-md md:scale-110"
                                        : "bg-transparent text-accent/60 hover:text-accent hover:bg-accent/5"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Items Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12"
                    >
                        {menuItems[activeTab as keyof typeof menuItems].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row gap-6 p-4 rounded-sm hover:bg-white hover:shadow-lg transition-all duration-300 group ring-1 ring-transparent hover:ring-accent/5"
                            >
                                <div className="relative w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-sm">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex-grow flex flex-col justify-center">
                                    <div className="flex justify-between items-baseline border-b border-dashed border-accent/20 pb-2 mb-2">
                                        <h4 className="text-xl font-display font-bold text-accent group-hover:text-secondary transition-colors">{item.name}</h4>
                                        <span className="text-lg font-bold text-primary">{item.price}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm font-light leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <div className="text-center mt-12">
                    <p className="text-sm text-gray-500 italic">* Prices are subject to change. Taxes as applicable.</p>
                </div>
            </div>
        </section>
    );
}
