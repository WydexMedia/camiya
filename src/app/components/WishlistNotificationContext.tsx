'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

interface NotificationContextType {
  message: string;
  show: boolean;
  notify: (msg: string) => void;
}

const WishlistNotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const WishlistNotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const notify = (msg: string) => {
    setMessage(msg);
    setShow(true);
    setTimeout(() => setShow(false), 5000); // 5 seconds
  };

  return (
    <WishlistNotificationContext.Provider value={{ message, show, notify }}>
      {children}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
        }`}
        style={{ minWidth: 220 }}
      >
        {show && (
          <div className="bg-teal-900 text-white px-6 py-3 rounded shadow-lg text-sm font-semibold">
            {message}
          </div>
        )}
      </div>
    </WishlistNotificationContext.Provider>
  );
};

export const useWishlistNotification = () => {
  const ctx = useContext(WishlistNotificationContext);
  if (!ctx) throw new Error("useWishlistNotification must be used within a WishlistNotificationProvider");
  return ctx;
};