"use client";

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiDollarSign, FiFilter, FiRefreshCw } from "react-icons/fi";
import { useCurrency, Currency } from "../../lib/CurrencyContext";

interface PriceFilterProps {
  onPriceChange: (minUSD: number, maxUSD: number) => void;
}

export default function PriceFilter({ onPriceChange }: PriceFilterProps) {
  const { currency, setCurrency, formatPrice, usdToInrRate } = useCurrency();

  // Price range in USD base units
  const minUSDLimit = 1.2; // ~$1 USD or ~₹100 INR
  const maxUSDLimit = 3500; // ~$3500 USD or ~₹2,90,000 INR

  const [priceRangeUSD, setPriceRangeUSD] = useState<[number, number]>([minUSDLimit, maxUSDLimit]);

  const handleSliderChange = (val: [number, number]) => {
    setPriceRangeUSD(val);
    onPriceChange(val[0], val[1]);
  };

  const handleCurrencyToggle = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  // Convert for display
  const displayMin = formatPrice(priceRangeUSD[0]);
  const displayMax = formatPrice(priceRangeUSD[1]);

  return (
    <Box
      bg="rgba(12, 16, 25, 0.85)"
      backdropFilter="blur(14px)"
      p={4}
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.800"
      boxShadow="lg"
      w="full"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
        justify="space-between"
        gap={4}
      >
        {/* Left: Solo Filter Title & Currency Switcher */}
        <HStack spacing={4} wrap="wrap">
          <HStack spacing={2}>
            <Icon as={FiFilter} boxSize={5} color="#00f2fe" />
            <Text fontWeight="800" fontSize="16px" color="white">
              Price & Currency Filter:
            </Text>
          </HStack>

          {/* Unified Currency Toggle Pill (₹ INR / $ USD) */}
          <HStack bg="black" p={1} borderRadius="full" border="1px solid" borderColor="gray.700">
            <Button
              size="xs"
              h="28px"
              px={3}
              rounded="full"
              fontSize="13px"
              fontWeight="800"
              colorScheme={currency === "INR" ? "green" : "gray"}
              bg={currency === "INR" ? "green.500" : "transparent"}
              color={currency === "INR" ? "black" : "gray.300"}
              onClick={() => handleCurrencyToggle("INR")}
            >
              ₹ Rupee (INR)
            </Button>

            <Button
              size="xs"
              h="28px"
              px={3}
              rounded="full"
              fontSize="13px"
              fontWeight="800"
              colorScheme={currency === "USD" ? "blue" : "gray"}
              bg={currency === "USD" ? "blue.500" : "transparent"}
              color={currency === "USD" ? "white" : "gray.300"}
              onClick={() => handleCurrencyToggle("USD")}
            >
              $ Dollar (USD)
            </Button>
          </HStack>
        </HStack>

        {/* Middle: Live Range Slider */}
        <Box flex="1" maxW={{ base: "full", md: "380px" }} px={2}>
          <Flex justify="space-between" fontSize="14px" fontWeight="800" color="#00f2fe" mb={1.5}>
            <Text>Min: {displayMin}</Text>
            <Text>Max: {displayMax}</Text>
          </Flex>

          <RangeSlider
            aria-label={["min-price", "max-price"]}
            min={minUSDLimit}
            max={maxUSDLimit}
            step={10}
            value={priceRangeUSD}
            onChange={handleSliderChange}
          >
            <RangeSliderTrack bg="gray.800" h="6px" borderRadius="full">
              <RangeSliderFilledTrack bgGradient="linear(to-r, #00f2fe, #b224ef)" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} boxSize={5} bg="#00f2fe" boxShadow="0 0 10px #00f2fe" />
            <RangeSliderThumb index={1} boxSize={5} bg="#b224ef" boxShadow="0 0 10px #b224ef" />
          </RangeSlider>
        </Box>

        {/* Right: Min Threshold Indicator */}
        <Badge
          colorScheme="blue"
          variant="subtle"
          bg="rgba(0, 242, 254, 0.1)"
          color="#00f2fe"
          border="1px solid"
          borderColor="rgba(0, 242, 254, 0.3)"
          px={3}
          py={1.5}
          borderRadius="xl"
          fontSize="13px"
          fontWeight="700"
          textAlign="center"
        >
          Min Limit: {currency === "INR" ? "₹100 INR" : "$1.20 USD"}
        </Badge>
      </Flex>
    </Box>
  );
}
