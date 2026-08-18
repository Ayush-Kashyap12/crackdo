"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Chakra as ChakraProvider } from "./components/Chakra";
import { CurrencyProvider } from "../lib/CurrencyContext";
import { SearchProvider } from "../lib/SearchContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider>
        <CurrencyProvider>
          <SearchProvider>{children}</SearchProvider>
        </CurrencyProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
