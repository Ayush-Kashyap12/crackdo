"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Chakra as ChakraProvider } from "./components/Chakra";
import { CurrencyProvider } from "../lib/CurrencyContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider>
        <CurrencyProvider>{children}</CurrencyProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
