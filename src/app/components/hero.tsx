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
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

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
      py={{ base: 8, md: 14 }}
      px={{ base: 3, md: 8 }}
      borderRadius={{ base: "2xl", md: "3xl" }}
      mb={8}
      bg={useColorModeValue("white", "transparent")}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "rgba(255, 255, 255, 0.15)")}
      boxShadow={useColorModeValue("md", "0 20px 50px rgba(0,0,0,0.7)")}
      position="relative"
      overflow="hidden"
      maxW="100%"
    >
      <Container maxW="1250px" px={{ base: 1, sm: 4 }} position="relative" zIndex={2}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, lg: 12 }} alignContent="center">
          {/* Left Column: Value Proposition */}
          <Stack spacing={{ base: 4, md: 5 }} justify="center">
            <HStack spacing={2} wrap="wrap">
              <Badge
                colorScheme="blue"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="13px"
                fontWeight="700"
                display="inline-flex"
                alignItems="center"
                gap={1.5}
                bg={useColorModeValue("blue.500", "blue.600")}
                color="white"
              >
                <Icon as={FiTrendingUp} boxSize={4} /> ⚡ AUCTION MARKETPLACE
              </Badge>
              <Badge colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="full" fontSize="13px" fontWeight="700">
                [Demo Preview]
              </Badge>
            </HStack>

            {/* CRACKDO Interactive 3D Pop-Out Logo */}
            <Box py={1} maxW="100%" overflow="hidden">
              <Logo3D size="hero" showSubtext={true} />
            </Box>

            {/* Updated Benefit Headline (Font size reduced by 2px) */}
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="900"
              lineHeight="1.2"
              letterSpacing="tight"
              color={textColor}
            >
              Bid confidently. Buy securely.
            </Heading>

            {/* Updated Subheadline (Font size reduced by 2px to 16px/17px) */}
            <Text fontSize={{ base: "15px", md: "17px" }} color={subTextColor} lineHeight="1.6" fontWeight="500">
              Discover live auctions from verified sellers with protected payments from bid to checkout.
            </Text>

            {/* Main CTA (Explore Live Auctions →) */}
            <Stack direction={{ base: "column", sm: "row" }} spacing={3} pt={2}>
              <Link href="#all_products" style={{ width: "100%" }}>
                <Button
                  size="lg"
                  h="50px"
                  w={{ base: "100%", sm: "auto" }}
                  rounded="full"
                  colorScheme="blue"
                  bg="blue.500"
                  _hover={{ bg: "blue.600", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  rightIcon={<Icon as={FiArrowRight} boxSize={4.5} />}
                  px={8}
                  fontSize="16px"
                  fontWeight="800"
                  boxShadow="md"
                >
                  Explore Live Auctions
                </Button>
              </Link>
              <Link href="#how_it_works" style={{ width: "100%" }}>
                <Button
                  size="lg"
                  h="50px"
                  w={{ base: "100%", sm: "auto" }}
                  rounded="full"
                  variant="outline"
                  color={textColor}
                  borderColor={useColorModeValue("gray.300", "gray.700")}
                  _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
                  px={7}
                  fontSize="16px"
                  fontWeight="700"
                >
                  How Escrow Works
                </Button>
              </Link>
            </Stack>

            {/* Trust Metrics - Honest Demo Label */}
            <HStack spacing={6} pt={2} fontSize="14px" color={subTextColor} wrap="wrap">
              <HStack spacing={1.5}>
                <Icon as={FiShield} color="green.400" boxSize={4.5} />
                <Text fontWeight="700">100% Escrow Protection</Text>
              </HStack>
              <HStack spacing={1.5}>
                <Icon as={FiCheckCircle} color="blue.400" boxSize={4.5} />
                <Text fontWeight="700">Verified Sellers [Demo]</Text>
              </HStack>
            </HStack>
          </Stack>

          {/* Right Column: Featured Auction Preview */}
          <Flex justify="center" align="center" maxW="100%">
            <Box
              w="full"
              maxW={{ base: "100%", sm: "440px" }}
              bg={cardBg}
              borderRadius="2xl"
              p={{ base: 4, sm: 5 }}
              boxShadow="xl"
              border="1px solid"
              borderColor={borderColor}
              position="relative"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-4px)", borderColor: "blue.400" }}
            >
              {/* Card Header */}
              <Flex justify="space-between" align="center" mb={3} wrap="wrap" gap={2}>
                <HStack spacing={2}>
                  <Badge colorScheme="blue" bg="blue.600" color="white" px={2.5} py={0.5} borderRadius="full" fontSize="11px" fontWeight="800">
                    FEATURED LOT
                  </Badge>
                  <Badge colorScheme="purple" variant="subtle" px={2} py={0.5} borderRadius="md" fontSize="11px" fontWeight="700">
                    Demo Lot
                  </Badge>
                </HStack>

                <HStack spacing={1} color="red.400" fontWeight="700" fontSize="14px">
                  <Icon as={FiClock} />
                  <Text fontFamily="mono">
                    {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </Text>
                </HStack>
              </Flex>

              {/* Product Preview Image */}
              <Box borderRadius="xl" overflow="hidden" position="relative" mb={3} h={{ base: "180px", sm: "220px" }} bg="gray.100">
                <Image
                  src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop"
                  alt="Advanced Quadcopter Drone"
                  w="full"
                  h="full"
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  bottom={2.5}
                  left={2.5}
                  bg="rgba(0, 0, 0, 0.85)"
                  backdropFilter="blur(6px)"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="lg"
                  fontSize="12px"
                  fontWeight="700"
                >
                  Lot #101 • Be the First Bidder!
                </Box>
              </Box>

              {/* Lot Info */}
              <Heading size="md" mb={1.5} noOfLines={1} color={textColor} fontSize="18px" fontWeight="800">
                Advanced Quadcopter Drone 4K HDR
              </Heading>
              <Text fontSize="14px" color={subTextColor} mb={3.5} noOfLines={2} lineHeight="1.5" fontWeight="500">
                Equipped with 3-axis gimbal, 4K 60fps sensor, 30-min flight time, and 2.5km max range.
              </Text>

              {/* Current Opening Price */}
              <Flex justify="space-between" align="center" bg={useColorModeValue("gray.50", "black")} p={3.5} borderRadius="xl" border="1px solid" borderColor={borderColor}>
                <Box>
                  <Text fontSize="11px" color="gray.400" textTransform="uppercase" fontWeight="700" letterSpacing="wider">
                    Opening Base Price
                  </Text>
                  <Text fontSize="24px" fontWeight="900" color="blue.400" lineHeight="1.1">
                    {formatPrice(799.99)}
                  </Text>
                  <Text fontSize="12px" color="gray.400" fontWeight="600" mt={0.5}>
                    Opening Bid • Min Step {formatPrice(25)}
                  </Text>
                </Box>

                <Button
                  size="md"
                  h="42px"
                  colorScheme="blue"
                  rounded="lg"
                  px={5}
                  fontSize="14px"
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
