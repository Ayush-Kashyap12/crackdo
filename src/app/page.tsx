"use client";

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { FiFilter, FiTrendingUp } from "react-icons/fi";
import { ProductData } from "lib/constants";
import { ProductDataProps } from "lib/types/product";
import BidCard from "./components/BidCard";
import BidModal from "./components/BidModal";
import BlackMirrorCrystalBg from "./components/BlackMirrorCrystalBg";
import Hero from "./components/hero";
import HowItWorks from "./components/HowItWorks";
import LiveTicker from "./components/LiveTicker";
import PriceFilter from "./components/PriceFilter";
import TrustBanner from "./components/TrustBanner";
import { useCurrency } from "../lib/CurrencyContext";
import { useSearch } from "../lib/SearchContext";

const CATEGORIES = ["All Lots", "Electronics", "Luxury", "Gaming", "Outdoor"];

const Home = () => {
  const { currency } = useCurrency();
  const { searchQuery, setSearchQuery } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState("All Lots");
  const [priceRangeUSD, setPriceRangeUSD] = useState<[number, number]>([1, 3500]);
  const [selectedProductForBid, setSelectedProductForBid] = useState<ProductDataProps | null>(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  // Synchronized search filter matching productName, category, description, and specifications
  const filteredProducts = ProductData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All Lots" || item.category === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.productName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query)) ||
      (item.details && item.details.some((d) => d.value.toLowerCase().includes(query)));
    
    // Price filter check against item.basePrice (USD)
    const currentPriceUSD = item.basePrice;
    const matchesPrice = currentPriceUSD >= priceRangeUSD[0] && currentPriceUSD <= priceRangeUSD[1];

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const handleOpenBidModal = (productOrSlug: ProductDataProps | string) => {
    if (typeof productOrSlug === "string") {
      const found = ProductData.find((p) => p.slug === productOrSlug);
      if (found) setSelectedProductForBid(found);
    } else {
      setSelectedProductForBid(productOrSlug);
    }
    setIsBidModalOpen(true);
  };

  const handlePriceChange = (minUSD: number, maxUSD: number) => {
    setPriceRangeUSD([minUSD, maxUSD]);
  };

  return (
    <Box pb={16} position="relative" maxW="100%">
      {/* 3D Falling Crystal & Black Mirror Background Canvas */}
      <BlackMirrorCrystalBg />

      <Container maxW="1250px" px={{ base: 3, sm: 6 }} position="relative" zIndex={1}>
        {/* Hero Section */}
        <Hero onOpenBidModal={handleOpenBidModal} />

        {/* Live Activity Ticker */}
        <LiveTicker />

        {/* Filter & Auctions Marketplace */}
        <Box id="all_products" pt={6} mb={12}>
          <Stack spacing={6} mb={8}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap={4}
            >
              <Box>
                <HStack spacing={2} mb={1}>
                  <Badge colorScheme="blue" bg="blue.600" color="white" px={2.5} py={0.5} borderRadius="full" fontSize="11px" fontWeight="800">
                    LIVE MARKETPLACE
                  </Badge>
                  <Text fontSize="13px" color={useColorModeValue("gray.600", "gray.400")} fontWeight="600">
                    Showing prices in {currency === "INR" ? "₹ INR (Rupees)" : "$ USD (Dollars)"}
                  </Text>
                </HStack>
                <Heading size="lg" fontWeight="900" color={useColorModeValue("gray.800", "white")} fontSize={{ base: "22px", md: "28px" }}>
                  Featured Live Auctions {searchQuery ? `— Result for "${searchQuery}"` : ""}
                </Heading>
              </Box>

              {/* Synchronized Marketplace Search Bar */}
              <Box w={{ base: "full", md: "340px" }}>
                <InputGroup size="md">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="blue.400" boxSize={4} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search auctions by keyword, brand, or model..."
                    borderRadius="xl"
                    fontSize="15px"
                    fontWeight="500"
                    bg={useColorModeValue("white", "rgba(10, 14, 23, 0.85)")}
                    backdropFilter="blur(10px)"
                    color={useColorModeValue("gray.800", "white")}
                    border="1px solid"
                    borderColor={useColorModeValue("gray.300", "gray.700")}
                    _focus={{ borderColor: "blue.400", boxShadow: "0 0 12px rgba(0,242,254,0.3)" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Box>
            </Flex>

            {/* Category Filter Pills */}
            <HStack spacing={2.5} overflowX="auto" pb={1} maxW="100%">
              <Icon as={FiFilter} color="blue.400" boxSize={4.5} me={1} display={{ base: "none", sm: "block" }} />
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <Button
                    key={cat}
                    size="sm"
                    h="36px"
                    rounded="full"
                    variant={isActive ? "solid" : "outline"}
                    colorScheme={isActive ? "blue" : "gray"}
                    bg={isActive ? "blue.500" : useColorModeValue("white", "rgba(12, 16, 25, 0.7)")}
                    backdropFilter="blur(8px)"
                    color={isActive ? "white" : useColorModeValue("gray.700", "gray.200")}
                    borderColor={isActive ? "blue.500" : useColorModeValue("gray.300", "gray.700")}
                    _hover={{ bg: isActive ? "blue.600" : useColorModeValue("gray.100", "gray.800") }}
                    onClick={() => setSelectedCategory(cat)}
                    px={4}
                    fontSize="13px"
                    fontWeight="800"
                  >
                    {cat}
                  </Button>
                );
              })}
            </HStack>

            {/* Solo Price Range & Unified Currency Filter (₹ INR / $ USD) */}
            <PriceFilter onPriceChange={handlePriceChange} />
          </Stack>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 6, sm: 8 }} justifyItems="center">
              {filteredProducts.map((bid) => (
                <BidCard key={bid.slug} {...bid} onOpenBidModal={handleOpenBidModal} />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={12} bg={useColorModeValue("white", "rgba(12, 16, 25, 0.85)")} backdropFilter="blur(12px)" borderRadius="2xl" border="1px solid" borderColor={useColorModeValue("gray.200", "gray.800")}>
              <Heading size="md" mb={2} color={useColorModeValue("gray.800", "white")} fontSize="18px">
                No auctions match "{searchQuery}"
              </Heading>
              <Text fontSize="14px" color={useColorModeValue("gray.600", "gray.400")} mb={5}>
                Try expanding your search query or resetting filters.
              </Text>
              <Button size="md" colorScheme="blue" fontSize="14px" fontWeight="800" onClick={() => { setSelectedCategory("All Lots"); setSearchQuery(""); setPriceRangeUSD([1, 3500]); }}>
                Clear Search & Reset Filters
              </Button>
            </Box>
          )}
        </Box>

        {/* How Bidding Works */}
        <HowItWorks />

        {/* Trust & Escrow Guarantee Banner */}
        <TrustBanner />

        {/* Bid Modal */}
        <BidModal
          isOpen={isBidModalOpen}
          onClose={() => setIsBidModalOpen(false)}
          product={selectedProductForBid}
        />
      </Container>
    </Box>
  );
};

export default Home;
