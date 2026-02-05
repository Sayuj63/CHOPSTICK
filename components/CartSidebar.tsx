"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function CartSidebar() {
    const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, toggleCart } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b flex justify-between items-center bg-cream">
                            <h2 className="text-2xl font-display font-bold text-accent">Your Order</h2>
                            <button onClick={toggleCart} className="text-accent hover:text-primary transition-colors">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                        <FaUtensilsIcon />
                                    </div>
                                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                                    <button
                                        onClick={toggleCart}
                                        className="mt-4 px-6 py-2 bg-primary text-accent font-bold rounded-sm"
                                    >
                                        Browse Menu
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-accent line-clamp-2">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            </div>
                                            <p className="text-primary font-bold mt-1">₹{item.price}</p>

                                            <div className="flex items-center gap-3 mt-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-xs"
                                                >
                                                    <FaMinus />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 rounded-full bg-primary text-accent flex items-center justify-center hover:bg-opacity-80 text-xs"
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-cream border-t space-y-4">
                                <div className="flex justify-between text-lg font-bold text-accent">
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <button className="w-full py-4 bg-primary text-accent font-bold uppercase tracking-wider rounded-sm hover:bg-accent hover:text-white transition-colors">
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function FaUtensilsIcon() {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M488 256c0-128.5-103.1-233-231.3-233S24 127.5 24 256c0 118 87 215.3 200.7 230.1V512h18.6v-25.9c113.7-14.8 200.7-112.1 200.7-230.1zM58.6 256c0-109.1 87.7-198.3 197.4-198.3 110.1 0 198.3 89.2 198.3 198.3 0 98-70.6 179.9-163.7 195.3V111h-33.3v340.3C129.2 435.9 58.6 354 58.6 256z"></path></svg>
    )
}
