'use client'
import React, { useState } from "react";
import Footer from "./Footer";

type Product = {
    category: string;
    image: string;
    price: number;
};

type Props = {
    product: Product;
    onClose: () => void;
};

const BuyNowPopup: React.FC<Props> = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        place: "",
    });

    // Move the errors state inside the component
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        place: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const SendToWhatsApp = () => {
        const imageURL = `https://camiya.vercel.app/${product.image}`;

        const message = `${imageURL}

Hi, I'm interested in buying the product:
Price: ₹${product.price.toLocaleString("en-IN")}
Category: ${product.category}

My Details:
Name: ${formData.name}
Phone: ${formData.phone}
Place: ${formData.place}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = "919074916065";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors = { name: "", phone: "", place: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required.";
            isValid = false;
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit Indian phone number.";
            isValid = false;
        }

        if (!formData.place.trim()) {
            newErrors.place = "Place is required.";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return;

        // If validation passes, send to WhatsApp
        SendToWhatsApp();
        console.log("Order Submitted for:", product, formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center min-h-screen w-full">
            <div className="flex-grow flex items-center justify-center w-full">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Order for {product.category}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                        
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => {
                                // Allow only digits (0-9)
                                const value = e.target.value.replace(/\D/g, '');
                                setFormData({ ...formData, phone: value });
                            }}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}

                        <input
                            type="text"
                            name="place"
                            placeholder="Your Place"
                            value={formData.place}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                        {errors.place && <p className="text-red-600 text-sm mt-1">{errors.place}</p>}
                        
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={onClose} className="text-gray-600 hover:text-red-600">
                                Cancel
                            </button>
                            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BuyNowPopup;