'use client'
import React, { useState } from "react";
import Header from "../components/Header";
import NavCategories from "../components/NavCategories";
import Footer from "../components/Footer";
import DeliveryCheck from "../components/DeliveryCheck";
import { Clock, Car, Gem, MapPin, Phone, Mail, Star, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check required fields
    const requiredFields = [
      { name: 'firstName', label: 'First Name' },
      { name: 'phone', label: 'Phone Number' },
      { name: 'message', label: 'Message' }
    ];

    const missingFields = requiredFields.filter(field => !formData[field.name as keyof typeof formData].trim());

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => field.label).join(', ');
      toast.error(`Please fill in the required fields: ${fieldNames}`, {
        description: "All required fields must be completed before submitting.",
        duration: 5000,
        style: {
          color: "black",
        },
        className: "text-black",
      });
      return;
    }

    // If all required fields are filled, show success message
    toast.success("Message sent successfully!", {
      description: "Thank you for contacting us. We'll get back to you soon.",
      duration: 4000,
      style: {
        color: "black",
      },
      className: "text-black",
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Header />
      <NavCategories />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-8 w-8 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            We're here to help you find the perfect piece of jewelry. Reach out to us anytime!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Location Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Store</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Metappil tower, bypass junction, near flyover, near Q tech online exam center, Ramanattukara, Kozhikode, Kerala 673633
              </p>
              <div className="flex items-center text-teal-600 font-semibold">
                <Star className="h-4 w-4 mr-1" />
                <span>Premium Location</span>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Call Us</h3>
              <a href="tel:18002578600" className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors duration-300 block mb-6">
                98953 31916
              </a>
              <div className="flex items-center text-teal-600 font-semibold">
                <Star className="h-4 w-4 mr-1" />
                <span>Toll Free Support</span>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Us</h3>
              <a href="mailto:camiya@gmail.com" className="text-xl font-semibold text-teal-600 hover:text-teal-700 transition-colors duration-300 block mb-6 break-all">
                camiya@gmail.com
              </a>
              <div className="flex items-center text-teal-600 font-semibold">
                <Star className="h-4 w-4 mr-1" />
                <span>24/7 Response</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <Send className="h-8 w-8 text-teal-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  Have a question or need assistance? We'd love to hear from you.
                </p>
              </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name 
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full"
                  value={formData.phone}
                  onChange={handleInputChange}
                  
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  className="w-full"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help you..."
                  className="w-full min-h-[120px] resize-none"
                  value={formData.message}
                  onChange={handleInputChange}
                  
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
            </div>
            
            {/* Delivery Check Component */}
            <DeliveryCheck />
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Find Us on the Map</h2>
              <p className="text-teal-100">Visit our beautiful showroom in Kozhikode</p>
            </div>
            <div className="p-6">
              <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.1627595070286!2d75.8712757753432!3d11.175582251703732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65147ac6431d5%3A0xace8889a0f98bc94!2sCAMIYA%20DIAMONDS!5e0!3m2!1sen!2sin!4v1758549169334!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Camiya Diamonds Location"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <Gem className="h-8 w-8 text-teal-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Why Choose Camiya Diamonds?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service and helping you find the perfect jewelry piece for every occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Hours</h3>
              <div className="space-y-1 text-gray-600">
                <p className="font-semibold">Monday - Saturday</p>
                <p className="text-base">9:00 AM - 8:00 PM</p>
                <p className="font-semibold mt-3">Sunday</p>
                <p className="text-base">10:00 AM - 6:00 PM</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Car className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Convenient Access</h3>
              <div className="space-y-1 text-gray-600">
                <p className="font-semibold">Free Parking</p>
                <p className="text-base">Available for all customers</p>
                <p className="font-semibold mt-3">Accessibility</p>
                <p className="text-base">Wheelchair accessible entrance</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Gem className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Services</h3>
              <div className="space-y-1 text-gray-600">
                <p className="font-semibold">Consultation</p>
                <p className="text-base">Personalized jewelry advice</p>
                <p className="font-semibold mt-3">Custom Design</p>
                <p className="text-base">Bespoke pieces & repairs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Find Your Perfect Piece?
            </h3>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Contact us today for a personalized consultation. Our experts are here to help you choose the perfect jewelry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:18002578600" 
                className="bg-white text-teal-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-teal-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Call Now: 98953 31916
              </a>
              <a 
                href="mailto:camiya@gmail.com" 
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-teal-600 transition-colors duration-300"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 