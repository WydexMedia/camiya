'use client'
import React, { useState } from "react";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


   

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Order Submitted for:", product, formData);
        onClose();
    };

    const SendTowtsp = () => {
        // const imageURL = `http://localhost:3000/${product.image}`; 
       const imageURL = 'https://iplanet.one/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1__en-IN.jpg?v=1695427946&width=1445';

        const message = `${imageURL}

        Hi, I'm interested in buying the product:
        Price: ₹${product.price.toLocaleString("en-IN")}
        Category: ${product.category}

        My Details:
        Name: ${formData.name}
        Phone: ${formData.phone}
        Place: ${formData.place}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = "919074916065"; // Replace with your WhatsApp number
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
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
                    <input
                        type="text"
                        name="place"
                        placeholder="Your Place"
                        value={formData.place}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="text-gray-600 hover:text-red-600">
                            Cancel
                        </button>
                        <button type="submit" onClick={SendTowtsp} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BuyNowPopup;
