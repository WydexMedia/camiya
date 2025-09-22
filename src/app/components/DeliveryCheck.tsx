'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Truck, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const DeliveryCheck = () => {
  const [pincode, setPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<{
    available: boolean;
    message: string;
  } | null>(null);

  const validatePincode = async (pincode: string) => {
    // Basic pincode validation (6 digits)
    if (!/^\d{6}$/.test(pincode)) {
      return { available: false, message: "Please enter a valid 6-digit pincode" };
    }

    try {
      // Using a free pincode API service
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data && data[0] && data[0].Status === "Success") {
        const postOffices = data[0].PostOffice;
        if (postOffices && postOffices.length > 0) {
          return { 
            available: true, 
            message: `Delivery available to ${postOffices[0].District}, ${postOffices[0].State}` 
          };
        }
      }
      
      return { available: false, message: "Delivery not available to this pincode" };
    } catch (error) {
      console.error("Error checking pincode:", error);
      return { available: false, message: "Unable to verify delivery. Please try again." };
    }
  };

  const handleCheckDelivery = async () => {
    if (!pincode.trim()) {
      toast.error("Please enter a pincode", {
        description: "Enter your 6-digit pincode to check delivery availability.",
        duration: 3000,
        style: { color: "black" },
        className: "text-black",
      });
      return;
    }

    setIsLoading(true);
    setDeliveryStatus(null);

    try {
      const result = await validatePincode(pincode);
      setDeliveryStatus(result);
      
      if (result.available) {
        toast.success("Delivery Available!", {
          description: result.message,
          duration: 4000,
          style: { color: "black" },
          className: "text-black",
        });
      } else {
        toast.error("Delivery Not Available", {
          description: result.message,
          duration: 4000,
          style: { color: "black" },
          className: "text-black",
        });
      }
    } catch (error) {
      toast.error("Error checking delivery", {
        description: "Please try again later.",
        duration: 3000,
        style: { color: "black" },
        className: "text-black",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheckDelivery();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <Truck className="h-8 w-8 text-teal-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Check Delivery Availability
        </h3>
        <p className="text-gray-600 text-sm">
          Enter your pincode to check if we deliver to your location
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">
            Pincode <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-3">
            <Input
              id="pincode"
              type="text"
              placeholder="Enter 6-digit pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onKeyPress={handleKeyPress}
              className="flex-1"
              maxLength={6}
            />
            <Button
              onClick={handleCheckDelivery}
              disabled={isLoading || pincode.length !== 6}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Check"
              )}
            </Button>
          </div>
        </div>

        {deliveryStatus && (
          <div className={`p-4 rounded-xl border-2 ${
            deliveryStatus.available 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center space-x-3">
              {deliveryStatus.available ? (
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              )}
              <div>
                <p className={`font-semibold ${
                  deliveryStatus.available ? 'text-green-800' : 'text-red-800'
                }`}>
                  {deliveryStatus.available ? 'Delivery Available' : 'Delivery Not Available'}
                </p>
                <p className={`text-sm ${
                  deliveryStatus.available ? 'text-green-700' : 'text-red-700'
                }`}>
                  {deliveryStatus.message}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Free delivery on orders above ₹50,000</p>
          <p>• Standard delivery: 3-5 business days</p>
          <p>• Express delivery available for select locations</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCheck;
