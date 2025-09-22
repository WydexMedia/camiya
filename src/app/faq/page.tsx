'use client'
import React, { useState } from 'react';
import Header from '../components/Header';
import NavCategories from '../components/NavCategories';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "What is the quality of diamonds used in Camiya Diamonds jewelry?",
    answer: "We use only certified diamonds of the highest quality. All our diamonds are GIA (Gemological Institute of America) certified, ensuring authenticity and quality. We offer diamonds ranging from SI1 clarity and above, with excellent cut grades for maximum brilliance."
  },
  {
    id: 2,
    question: "Do you provide certificates of authenticity?",
    answer: "Yes, every piece of diamond jewelry comes with a certificate of authenticity from GIA or IGI (International Gemological Institute). The certificate includes details about the diamond's 4Cs (Cut, Color, Clarity, and Carat weight) and serves as a guarantee of quality."
  },
  {
    id: 3,
    question: "What is your return and exchange policy?",
    answer: "We offer a 30-day return policy for all purchases. Items must be in original condition with tags and certificates. Custom-made pieces are non-returnable. Exchanges are available within 15 days of purchase for items of equal or higher value."
  },
  {
    id: 4,
    question: "Do you offer customization services?",
    answer: "Yes, we provide complete customization services. You can design your own jewelry or modify existing designs. Our expert craftsmen work with you to create unique pieces that match your vision. Custom orders typically take 2-4 weeks to complete."
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, net banking, UPI payments, and EMI options. We also accept cash on delivery for orders above ₹50,000. All transactions are secure and encrypted."
  },
  {
    id: 6,
    question: "How long does delivery take?",
    answer: "Standard delivery takes 3-5 business days within India. Express delivery (1-2 days) is available for major cities. International shipping takes 7-14 business days. Custom-made pieces require additional time as mentioned during order placement."
  },
  {
    id: 7,
    question: "Do you offer jewelry cleaning and maintenance services?",
    answer: "Yes, we provide free cleaning and maintenance services for all our jewelry. You can visit any of our outlets for professional cleaning. We also offer resizing, polishing, and minor repairs at nominal charges. Annual maintenance check-ups are recommended."
  },
  {
    id: 8,
    question: "What is your warranty policy?",
    answer: "We provide a lifetime warranty on craftsmanship and a 1-year warranty on manufacturing defects. The warranty covers issues like loose stones, broken clasps, and manufacturing flaws. Normal wear and tear, damage from accidents, or improper care are not covered."
  },
  {
    id: 9,
    question: "Can I get my jewelry appraised?",
    answer: "Yes, we provide professional jewelry appraisal services. Our certified gemologists can appraise your jewelry for insurance purposes, resale, or personal knowledge. Appraisal fees are nominal and vary based on the complexity of the piece."
  },
  {
    id: 10,
    question: "Do you offer EMI options?",
    answer: "Yes, we offer flexible EMI options through various banks and financial institutions. You can choose from 3, 6, 9, 12, 18, or 24-month EMI plans. Interest rates and eligibility depend on your credit score and the bank's policies."
  },
  {
    id: 11,
    question: "What should I do if I lose my certificate?",
    answer: "If you lose your certificate, contact our customer service immediately. We can provide a duplicate certificate for a nominal fee. However, the duplicate will be marked as such and may not be accepted by all insurance companies or appraisers."
  },
  {
    id: 12,
    question: "How do I care for my diamond jewelry?",
    answer: "Clean your jewelry regularly with mild soap and warm water. Avoid harsh chemicals, perfumes, and lotions. Store pieces separately in soft pouches or boxes. Remove jewelry before swimming, exercising, or doing household chores. Professional cleaning every 6 months is recommended."
  }
];

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavCategories />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our diamond jewelry, services, and policies.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                {openItems.includes(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-teal-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is here to help you with any additional questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:18002578600"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer"
            >
              <span className="mr-2">📞</span>
              Call Us: 1800 257 8600
            </a>
            <a
              href="mailto:camiya@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-colors cursor-pointer"
            >
              <span className="mr-2">✉️</span>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
