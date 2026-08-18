"use client";

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useCurrency, Currency } from "../../lib/CurrencyContext";

interface PriceFilterProps {
  onPriceChange: (minUSD: number, maxUSD: number) => void;
}

export default function PriceFilter({ onPriceChange }: PriceFilterProps) {
  const { currency, setCurrency, formatPrice } = useCurrency();
  const cardBg = useColorModeValue("white", "rgba(12, 16, 25, 0.85)");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  const minUSDLimit = 1.2;
  const maxUSDLimit = 3500;

  const [priceRangeUSD, setPriceRangeUSD] = useState<[number, number]>([minUSDLimit, maxUSDLimit]);

  const handleSliderChange = (val: [number, number]) => {
    setPriceRangeUSD(val);
    onPriceChange(val[0], val[1]);
  };

  const handleCurrencyToggle = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  const displayMin = formatPrice(priceRangeUSD[0]);
  const displayMax = formatPrice(priceRangeUSD[1]);

  return (
    <Box
      bg={cardBg}
      backdropFilter="blur(14px)"
      p={{ base: 3.5, sm: 4 }}
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderColor}
      boxShadow={useColorModeValue("sm", "lg")}
      w="full"
      maxW="100%"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
        justify="space-between"
        gap={4}
      >
        {/* Left: Solo Filter Title & Currency Switcher */}
        <HStack spacing={3} wrap="wrap" justify={{ base: "space-between", sm: "flex-start" }}>
          <HStack spacing={2}>
            <Icon as={FiFilter} boxSize={4.5} color="blue.400" />
            <Text fontWeight="800" fontSize="15px" color={textColor}>
              Price & Currency:
            </Text>
          </HStack>

          {/* Unified Currency Toggle Pill (₹ INR / $ USD) */}
          <HStack bg={useColorModeValue("gray.100", "black")} p={1} borderRadius="full" border="1px solid" borderColor={borderColor}>
            <Button
              size="xs"
              h="26px"
              px={3}
              rounded="full"
              fontSize="12px"
              fontWeight="800"
              colorScheme={currency === "INR" ? "green" : "gray"}
              bg={currency === "INR" ? "green.500" : "transparent"}
              color={currency === "INR" ? "black" : subTextColor}
              onClick={() => handleCurrencyToggle("INR")}
            >
              ₹ Rupee (INR)
            </Button>

            <Button
              size="xs"
              h="26px"
              px={3}
              rounded="full"
              fontSize="12px"
              fontWeight="800"
              colorScheme={currency === "USD" ? "blue" : "gray"}
              bg={currency === "USD" ? "blue.500" : "transparent"}
              color={currency === "USD" ? "white" : subTextColor}
              onClick={() => handleCurrencyToggle("USD")}
            >
              $ Dollar (USD)
            </Button>
          </HStack>
        </HStack>

        {/* Middle: Live Range Slider */}
        <Box flex="1" maxW={{ base: "100%", md: "380px" }} px={{ base: 1, sm: 2 }}>
          <Flex justify="space-between" fontSize="13px" fontWeight="800" color="blue.400" mb={1}>
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
            <RangeSliderTrack bg={useColorModeValue("gray.200", "gray.800")} h="6px" borderRadius="full">
              <RangeSliderFilledTrack bgGradient="linear(to-r, #00f2fe, #b224ef)" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} boxSize={4.5} bg="#00f2fe" boxShadow="0 0 8px #00f2fe" />
            <RangeSliderThumb index={1} boxSize={4.5} bg="#b224ef" boxShadow="0 0 8px #b224ef" />
          </RangeSlider>
        </Box>

        {/* Right: Min Threshold Indicator */}
        <Badge
          colorScheme="blue"
          variant="subtle"
          bg={useColorModeValue("blue.50", "rgba(0, 242, 254, 0.1)")}
          color="blue.400"
          border="1px solid"
          borderColor={useColorModeValue("blue.200", "rgba(0, 242, 254, 0.3)")}
          px={3}
          py={1}
          borderRadius="xl"
          fontSize="12px"
          fontWeight="700"
          textAlign="center"
          alignSelf={{ base: "flex-start", md: "center" }}
        >
          Min Limit: {currency === "INR" ? "₹100 INR" : "$1.20 USD"}
        </Badge>
      </Flex>
    </Box>
  );
}
