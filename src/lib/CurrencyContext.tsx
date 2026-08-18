"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Currency = "USD" | "INR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  usdToInrRate: number;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "INR",
  setCurrency: () => {},
  formatPrice: (price) => `₹${Math.round(price * 83).toLocaleString("en-IN")}`,
  usdToInrRate: 83,
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>("INR"); // Default to INR ₹
  const usdToInrRate = 83;

  const formatPrice = (priceInUSD: number): string => {
    if (currency === "INR") {
      const priceInINR = Math.round(priceInUSD * usdToInrRate);
      return `₹${priceInINR.toLocaleString("en-IN")}`;
    } else {
      return `$${priceInUSD.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatPrice, usdToInrRate }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
