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

const CATEGORIES = ["All Lots", "Electronics", "Luxury", "Gaming", "Outdoor"];

const Home = () => {
  const { currency } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState("All Lots");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRangeUSD, setPriceRangeUSD] = useState<[number, number]>([1, 3500]);
  const [selectedProductForBid, setSelectedProductForBid] = useState<ProductDataProps | null>(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  // Filter products by category, search, and price range
  const filteredProducts = ProductData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All Lots" || item.category === selectedCategory;
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Price filter check against item.basePrice (USD)
    const currentPriceUSD = item.basePrice + (item.bidIncrementBy * 2);
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
    <Box pb={16} position="relative">
      {/* 3D Falling Crystal & Black Mirror Background Canvas */}
      <BlackMirrorCrystalBg />

      <Container maxW="1250px" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        {/* Hero Section */}
        <Hero onOpenBidModal={handleOpenBidModal} />

        {/* Live Activity Ticker */}
        <LiveTicker />

        {/* Filter & Auctions Marketplace */}
        <Box id="all_products" pt={10} mb={14}>
          <Stack spacing={7} mb={8}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap={4}
            >
              <Box>
                <HStack spacing={2.5} mb={1.5}>
                  <Badge colorScheme="blue" bg="blue.600" color="white" px={3} py={1} borderRadius="full" fontSize="12px" fontWeight="800">
                    LIVE MARKETPLACE
                  </Badge>
                  <Text fontSize="14px" color="gray.400" fontWeight="600">
                    Showing prices in {currency === "INR" ? "₹ INR (Rupees)" : "$ USD (Dollars)"}
                  </Text>
                </HStack>
                <Heading size="xl" fontWeight="900" color="white" fontSize="32px">
                  Featured Live Auctions
                </Heading>
              </Box>

              {/* Search Bar */}
              <Box w={{ base: "full", md: "360px" }}>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" boxSize={4.5} />
                  </InputLeftElement>
                  <Input
                    placeholder="Filter CRACKDO auctions..."
                    borderRadius="xl"
                    fontSize="16px"
                    bg="rgba(10, 14, 23, 0.85)"
                    backdropFilter="blur(10px)"
                    color="white"
                    border="1px solid"
                    borderColor="gray.700"
                    _focus={{ borderColor: "blue.400", boxShadow: "0 0 12px rgba(0,242,254,0.3)" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Box>
            </Flex>

            {/* Category Filter Pills */}
            <HStack spacing={3} overflowX="auto" pb={1}>
              <Icon as={FiFilter} color="#00f2fe" boxSize={5} me={1} display={{ base: "none", sm: "block" }} />
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <Button
                    key={cat}
                    size="md"
                    h="40px"
                    rounded="full"
                    variant={isActive ? "solid" : "outline"}
                    colorScheme={isActive ? "blue" : "gray"}
                    bg={isActive ? "blue.500" : "rgba(12, 16, 25, 0.7)"}
                    backdropFilter="blur(8px)"
                    color={isActive ? "white" : "gray.200"}
                    borderColor={isActive ? "blue.500" : "gray.700"}
                    _hover={{ bg: isActive ? "blue.600" : "gray.800" }}
                    onClick={() => setSelectedCategory(cat)}
                    px={5}
                    fontSize="15px"
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
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8} justifyItems="center">
              {filteredProducts.map((bid) => (
                <BidCard key={bid.slug} {...bid} onOpenBidModal={handleOpenBidModal} />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={16} bg="rgba(12, 16, 25, 0.85)" backdropFilter="blur(12px)" borderRadius="2xl" border="1px solid" borderColor="gray.800">
              <Heading size="md" mb={3} color="white" fontSize="20px">
                No auctions match your price filter
              </Heading>
              <Text fontSize="16px" color="gray.400" mb={6}>
                Try expanding your price range or resetting filters.
              </Text>
              <Button size="md" colorScheme="blue" fontSize="15px" fontWeight="800" onClick={() => { setSelectedCategory("All Lots"); setSearchQuery(""); setPriceRangeUSD([1, 3500]); }}>
                Reset All Filters
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
