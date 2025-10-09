'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Truck, CheckCircle, XCircle, Loader2, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";

interface DeliveryCheckDialogProps {
  compact?: boolean;
}

const DeliveryCheckDialog = ({ compact = false }: DeliveryCheckDialogProps) => {
  const [pincode, setPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<{
    available: boolean;
    primaryMessage: string;
    secondaryMessage: string;
    location?: string;
  } | null>(null);

  const validatePincode = async (pincode: string) => {
    if (!/^\d{6}$/.test(pincode)) {
      setDeliveryStatus({ 
        available: false, 
        primaryMessage: "Invalid Pincode", 
        secondaryMessage: "Please enter a valid 6-digit pincode" 
      });
      toast.error("Invalid Pincode", {
        description: "Please enter a valid 6-digit pincode",
        duration: 3000,
        style: { color: "black" },
        className: "text-black",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data && data[0] && data[0].Status === "Success") {
        const postOffices = data[0].PostOffice;
        if (postOffices && postOffices.length > 0) {
          setDeliveryStatus({
            available: true,
            primaryMessage: "Delivery Available!",
            secondaryMessage: `Available to ${postOffices[0].District}`,
            location: `${postOffices[0].District}, ${postOffices[0].State}`
          });
          toast.success("Delivery Available!", {
            description: `Available to ${postOffices[0].District}, ${postOffices[0].State}`,
            duration: 3000,
            style: { color: "black" },
            className: "text-black",
          });
        }
      } else {
        setDeliveryStatus({
          available: false,
          primaryMessage: "Delivery Not Available",
          secondaryMessage: "No service at this pincode",
        });
        toast.error("Delivery Not Available", {
          description: "No service found for this pincode.",
          duration: 3000,
          style: { color: "black" },
          className: "text-black",
        });
      }
    } catch (error) {
      setDeliveryStatus({
        available: false,
        primaryMessage: "Error",
        secondaryMessage: "Could not check delivery status",
      });
      toast.error("Error", {
        description: "Could not check delivery status. Please try again.",
        duration: 3000,
        style: { color: "black" },
        className: "text-black",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported", {
        description: "Your browser doesn't support location services.",
        duration: 3000,
        style: { color: "black" },
        className: "text-black",
      });
      return;
    }

    setIsGettingLocation(true);
    setDeliveryStatus(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use Nominatim API to get location details
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data && data.address) {
            const { postcode, city, town, village, county, state } = data.address;
            const pincode = postcode;
            const location = city || town || village || county || state;
            
            if (pincode) {
              setPincode(pincode);
              await validatePincode(pincode);
              
              toast.success("Location Found!", {
                description: `Detected: ${data.display_name}`,
                duration: 4000,
                style: { color: "black" },
                className: "text-black",
              });
            } else {
              toast.error("Pincode not found", {
                description: "Could not determine pincode for your location.",
                duration: 3000,
                style: { color: "black" },
                className: "text-black",
              });
            }
          } else {
            toast.error("Location not found", {
              description: "Could not determine your location details.",
              duration: 3000,
              style: { color: "black" },
              className: "text-black",
            });
          }
        } catch (error) {
          toast.error("Error getting location", {
            description: "Failed to fetch location details.",
            duration: 3000,
            style: { color: "black" },
            className: "text-black",
          });
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        let errorMessage = "Unable to get your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        toast.error("Location Error", {
          description: errorMessage,
          duration: 4000,
          style: { color: "black" },
          className: "text-black",
        });
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleCheckDelivery = async () => {
    if (!pincode.trim()) {
      toast.error("Please enter a pincode", {
        description: "Enter your 6-digit pincode to check delivery.",
        duration: 3000,
        style: { color: "black" },
        className: "text-black",
      });
      return;
    }

    setDeliveryStatus(null);
    await validatePincode(pincode);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`bg-teal-600 hover:bg-teal-700 text-white ${compact ? 'px-3 py-2.5 w-full inline-flex items-center justify-center gap-1.5' : 'px-4 py-2'} rounded-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-xl`}>
          <Truck className="h-4 w-4" />
          {compact ? <span className="font-semibold text-xs">Check</span> : <span>Check Delivery</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-teal-600" />
            <span>Check Delivery Availability</span>
          </DialogTitle>
          <DialogDescription>
            Enter your pincode or use your current location to check if we deliver to your area.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Location Button */}
          <div className="flex justify-center">
            <Button
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              variant="outline"
              className="w-full"
            >
              {isGettingLocation ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4 mr-2" />
              )}
              {isGettingLocation ? "Getting Location..." : "Use Current Location"}
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          
          {/* Manual Pincode Input */}
          <div className="space-y-2">
            <Label htmlFor="pincode" className="text-sm font-medium">
              Enter Pincode <span className="text-red-500">*</span>
            </Label>
            <div className="flex space-x-2">
              <Input
                id="pincode"
                type="text"
                placeholder="Enter 6-digit pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="flex-1"
                maxLength={6}
              />
              <Button
                onClick={handleCheckDelivery}
                disabled={isLoading || pincode.length !== 6}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Check"
                )}
              </Button>
            </div>
          </div>
          
          {/* Delivery Status */}
          {deliveryStatus && (
            <div className={`p-4 rounded-lg border-2 ${
              deliveryStatus.available 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`rounded-full p-1 flex items-center justify-center ${
                  deliveryStatus.available ? "bg-green-600" : "bg-red-600"
                }`}>
                  {deliveryStatus.available ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <XCircle className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${
                    deliveryStatus.available ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {deliveryStatus.primaryMessage}
                  </p>
                  <p className={`text-sm ${
                    deliveryStatus.available ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {deliveryStatus.secondaryMessage}
                  </p>
                  {deliveryStatus.location && (
                    <div className="flex items-center space-x-1 mt-2">
                      <MapPin className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">{deliveryStatus.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Additional Info */}
          <div className="text-xs text-gray-500 space-y-1 pt-2 border-t">
            <p>• Free delivery on orders above ₹50,000</p>
            <p>• Standard delivery: 3-5 business days</p>
            <p>• Express delivery available for select locations</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryCheckDialog;
