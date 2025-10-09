'use client'
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ShoppingBag, Package, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";

type Product = {
    category: string;
    image: string;
    price: number;
};

type Props = {
    product: Product;
    onClose: () => void;
    open?: boolean;
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
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <ShoppingBag className="h-6 w-6 text-teal-600" />
                        Complete Your Purchase
                    </DialogTitle>
                    <DialogDescription>
                        Fill in your details to proceed with the order via WhatsApp
                    </DialogDescription>
                </DialogHeader>

                {/* Product Preview */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-white">
                        <Image
                            src={product.image}
                            alt={product.category}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Package className="h-4 w-4 text-gray-500" />
                            <p className="font-semibold text-gray-900">{product.category}</p>
                        </div>
                        <p className="text-lg font-bold text-teal-600">
                            ₹{product.price.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm">{errors.name}</p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            Phone Number
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="10-digit mobile number"
                            value={formData.phone}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setFormData({ ...formData, phone: value });
                            }}
                            maxLength={10}
                            className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && (
                            <p className="text-red-600 text-sm">{errors.phone}</p>
                        )}
                    </div>

                    {/* Place Field */}
                    <div className="space-y-2">
                        <Label htmlFor="place" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            Location
                        </Label>
                        <Input
                            id="place"
                            name="place"
                            type="text"
                            placeholder="Your city or location"
                            value={formData.place}
                            onChange={handleChange}
                            className={errors.place ? "border-red-500" : ""}
                        />
                        {errors.place && (
                            <p className="text-red-600 text-sm">{errors.place}</p>
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                        >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Send Order via WhatsApp
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BuyNowPopup;