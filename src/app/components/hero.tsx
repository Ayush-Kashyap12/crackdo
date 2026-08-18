"use client";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiClock, FiShield, FiTrendingUp } from "react-icons/fi";
import Logo3D from "./Logo3D";
import { useCurrency } from "../../lib/CurrencyContext";

export default function Hero({ onOpenBidModal }: { onOpenBidModal?: (slug: string) => void }) {
  const { formatPrice } = useCurrency();
  const cardBg = "gray.900";

  // Timer countdown simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      className="crystal-pattern-overlay"
      py={{ base: 12, md: 18 }}
      px={{ base: 4, md: 8 }}
      borderRadius="3xl"
      mb={10}
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.15)"
      boxShadow="0 20px 50px rgba(0,0,0,0.7)"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="1250px" position="relative" zIndex={2}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignContent="center">
          {/* Left Column: CRACKDO Hero Branding & Clean Value Prop */}
          <Stack spacing={6} justify="center">
            <HStack spacing={3} wrap="wrap">
              <Badge
                colorScheme="blue"
                px={4}
                py={1.5}
                borderRadius="full"
                fontSize="15px"
                fontWeight="800"
                display="inline-flex"
                alignItems="center"
                gap={2}
                bg="blue.600"
                color="white"
              >
                <Icon as={FiTrendingUp} boxSize={4.5} /> ⚡ AUCTION MARKETPLACE
              </Badge>
              <Badge colorScheme="green" variant="subtle" bg="green.900" color="green.300" border="1px solid" borderColor="green.700" px={3.5} py={1.5} borderRadius="full" fontSize="15px" fontWeight="800">
                🚀 NEWLY LAUNCHED PLATFORM
              </Badge>
            </HStack>

            {/* CRACKDO Interactive 3D Pop-Out Logo */}
            <Box py={2}>
              <Text fontSize="16px" fontWeight="800" color="#00f2fe" letterSpacing="wider" textTransform="uppercase" mb={2}>
                Hover Logo to Experience 3D Pop-Out Effect ✦
              </Text>
              <Logo3D size="hero" showSubtext={true} />
            </Box>

            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="900"
              lineHeight="1.2"
              letterSpacing="tight"
              color="white"
            >
              Bid, Win & Trade Verified Items with{" "}
              <Text as="span" bgGradient="linear(to-r, #00f2fe, #f6d365, #b224ef)" bgClip="text">
                Instant Escrow Protection
              </Text>
            </Heading>

            {/* Increased Body Text to 18px */}
            <Text fontSize={{ base: "17px", md: "19px" }} color="gray.200" lineHeight="1.6" fontWeight="600">
              Welcome to <strong>CRACKDO</strong>! Explore real auctions on high-end electronics, luxury watches, and gaming gear. Start bidding directly with 100% money-back escrow protection.
            </Text>

            {/* CTAs */}
            <Stack direction={{ base: "column", sm: "row" }} spacing={4} pt={2}>
              <Link href="#all_products">
                <Button
                  size="lg"
                  h="56px"
                  rounded="full"
                  colorScheme="blue"
                  bg="blue.500"
                  _hover={{ bg: "blue.600", transform: "translateY(-2px)", boxShadow: "0 10px 25px rgba(0, 242, 254, 0.4)" }}
                  transition="all 0.2s"
                  rightIcon={<Icon as={FiArrowRight} boxSize={5} />}
                  px={9}
                  fontSize="18px"
                  fontWeight="800"
                  boxShadow="lg"
                >
                  Explore Live Auctions
                </Button>
              </Link>
              <Link href="#how_it_works">
                <Button
                  size="lg"
                  h="56px"
                  rounded="full"
                  variant="outline"
                  color="white"
                  borderColor="gray.700"
                  _hover={{ bg: "gray.800", borderColor: "blue.400" }}
                  px={8}
                  fontSize="18px"
                  fontWeight="800"
                >
                  How Escrow Works
                </Button>
              </Link>
            </Stack>

            {/* Clean Honest Trust Metrics */}
            <HStack spacing={7} pt={3} fontSize="16px" color="gray.200" wrap="wrap">
              <HStack spacing={2}>
                <Icon as={FiShield} color="green.400" boxSize={5} />
                <Text fontWeight="800" color="white">100% Escrow Protection</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FiCheckCircle} color="blue.400" boxSize={5} />
                <Text fontWeight="800" color="white">Verified Sellers</Text>
              </HStack>
            </HStack>
          </Stack>

          {/* Right Column: Featured Opening Auction Preview */}
          <Flex justify="center" align="center">
            <Box
              w="full"
              maxW="480px"
              bg={cardBg}
              borderRadius="2xl"
              p={6}
              boxShadow="2xl"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.2)"
              position="relative"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-4px)", borderColor: "blue.400" }}
            >
              {/* Card Live Header */}
              <Flex justify="space-between" align="center" mb={4}>
                <HStack spacing={2.5}>
                  <Badge colorScheme="blue" bg="blue.600" color="white" px={3} py={1} borderRadius="full" fontSize="13px" fontWeight="800">
                    FEATURED LOT
                  </Badge>
                  <Badge colorScheme="green" variant="subtle" bg="green.900" color="green.300" px={2.5} py={1} borderRadius="md" fontSize="13px" fontWeight="800">
                    Verified Escrow
                  </Badge>
                </HStack>

                <HStack spacing={1.5} color="red.400" fontWeight="800" fontSize="16px">
                  <Icon as={FiClock} boxSize={4.5} />
                  <Text fontFamily="mono">
                    {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </Text>
                </HStack>
              </Flex>

              {/* Product Preview Image */}
              <Box borderRadius="xl" overflow="hidden" position="relative" mb={4} h="250px" bg="gray.950">
                <Image
                  src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop"
                  alt="Advanced Quadcopter Drone"
                  w="full"
                  h="full"
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  bottom={3}
                  left={3}
                  bg="rgba(0, 0, 0, 0.85)"
                  backdropFilter="blur(8px)"
                  color="white"
                  px={3.5}
                  py={1.5}
                  borderRadius="lg"
                  fontSize="14px"
                  fontWeight="800"
                >
                  Lot #101 • Be the First Bidder!
                </Box>
              </Box>

              {/* Lot Info */}
              <Heading size="md" mb={2} noOfLines={1} color="white" fontSize="22px" fontWeight="800">
                Advanced Quadcopter Drone 4K HDR
              </Heading>
              <Text fontSize="16px" color="gray.300" mb={4} noOfLines={2} lineHeight="1.5" fontWeight="500">
                Equipped with 3-axis gimbal, 4K 60fps sensor, 30-min flight time, and 2.5km max range.
              </Text>

              {/* Current Opening Price */}
              <Flex justify="space-between" align="center" bg="black" p={4} borderRadius="xl" border="1px solid" borderColor="gray.800">
                <Box>
                  <Text fontSize="13px" color="gray.400" textTransform="uppercase" fontWeight="800" letterSpacing="wider">
                    Opening Base Price
                  </Text>
                  <Text fontSize="30px" fontWeight="900" color="#00f2fe" lineHeight="1.1">
                    {formatPrice(799.99)}
                  </Text>
                  <Text fontSize="14px" color="gray.400" fontWeight="700" mt={1}>
                    Opening Bid • Min Step {formatPrice(25)}
                  </Text>
                </Box>

                <Button
                  size="md"
                  h="46px"
                  colorScheme="blue"
                  rounded="lg"
                  px={6}
                  fontSize="16px"
                  fontWeight="800"
                  onClick={() => onOpenBidModal && onOpenBidModal("1")}
                >
                  Start Bidding
                </Button>
              </Flex>
            </Box>
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
