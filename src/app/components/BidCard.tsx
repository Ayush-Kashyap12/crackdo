"use client";

import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEye, FiLock, FiTrendingUp } from "react-icons/fi";
import { ProductDataProps } from "../../lib/types/product";
import { useCurrency } from "../../lib/CurrencyContext";

interface BidCardProps extends ProductDataProps {
  onOpenBidModal?: (product: ProductDataProps) => void;
}

export default function BidCard(data: BidCardProps) {
  const { formatPrice } = useCurrency();
  const cardBg = "gray.900";
  const borderColor = "gray.800";

  const currentBidUSD = data.basePrice + data.bidIncrementBy * 2;

  // Real-time countdown
  const [secondsRemaining, setSecondsRemaining] = useState(data.endsInHours * 3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  return (
    <Box
      role="group"
      w={{ base: "full", sm: "340px", md: "360px" }}
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lg"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        boxShadow: "2xl",
        transform: "translateY(-6px)",
        borderColor: "blue.400",
      }}
      pos="relative"
    >
      {/* Top Media Container */}
      <Box pos="relative" h="220px" bg="gray.950" overflow="hidden">
        <Image
          src={data.images[0]}
          alt={data.productName}
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.5s ease"
          _groupHover={{ transform: "scale(1.08)" }}
        />

        {/* Top Badges */}
        <Flex pos="absolute" top={3} left={3} right={3} justify="space-between" align="center">
          <Badge colorScheme="blue" bg="blue.600" color="white" px={3} py={1} borderRadius="full" fontSize="12px" fontWeight="800">
            {data.category || "Auction Lot"}
          </Badge>
          <HStack spacing={1.5} bg="rgba(0,0,0,0.85)" backdropFilter="blur(8px)" color="white" px={2.5} py={1} borderRadius="full" fontSize="12px" fontWeight="700">
            <Icon as={FiEye} boxSize={3.5} color="blue.300" />
            <Text>{data.watchers} watching</Text>
          </HStack>
        </Flex>

        {/* Bottom Countdown Badge */}
        <Box
          pos="absolute"
          bottom={3}
          left={3}
          bg="rgba(0,0,0,0.9)"
          backdropFilter="blur(8px)"
          color="white"
          px={3.5}
          py={1.5}
          borderRadius="lg"
          fontSize="13px"
          fontWeight="800"
          border="1px solid"
          borderColor="rgba(255,255,255,0.2)"
        >
          ⏱️ <Text as="span" fontFamily="mono" color="red.400">{hours}h {minutes}m {seconds}s</Text> remaining
        </Box>
      </Box>

      {/* Card Written Info Section */}
      <Stack p={6} spacing={4}>
        <Link href={`/bid/${data.slug}`}>
          <Text
            fontWeight="800"
            fontSize="18px"
            lineHeight="1.3"
            noOfLines={1}
            color="white"
            _hover={{ color: "blue.400" }}
          >
            {data.productName}
          </Text>
        </Link>

        <Text fontSize="14px" color="gray.300" lineHeight="1.5" noOfLines={2} h="42px">
          {data.description}
        </Text>

        <Divider borderColor="gray.800" />

        {/* Dynamic Currency Pricing & Bids */}
        <Flex justify="space-between" align="center" pt={1}>
          <Box>
            <Text fontSize="11px" color="gray.400" textTransform="uppercase" fontWeight="800" letterSpacing="wider">
              Current Top Bid
            </Text>
            <Text fontSize="26px" fontWeight="900" color="#00f2fe" lineHeight="1.1">
              {formatPrice(currentBidUSD)}
            </Text>
            <Text fontSize="12px" color="gray.400" fontWeight="600" mt={1}>
              Base {formatPrice(data.basePrice)}
            </Text>
          </Box>

          <Box textAlign="right">
            <HStack spacing={1.5} color="green.400" justify="flex-end" fontSize="14px" fontWeight="800">
              <Icon as={FiTrendingUp} boxSize={4} />
              <Text>{data.activeBids} Bids</Text>
            </HStack>
            <Text fontSize="12px" color="gray.400" fontWeight="600" mt={1}>
              +{formatPrice(data.bidIncrementBy)} step
            </Text>
          </Box>
        </Flex>

        {/* Action Button */}
        <Button
          w="full"
          size="lg"
          h="46px"
          mt={2}
          rounded="xl"
          colorScheme="blue"
          bg="blue.500"
          _hover={{ bg: "blue.600", transform: "translateY(-1px)", boxShadow: "0 6px 20px rgba(0, 242, 254, 0.4)" }}
          fontSize="16px"
          fontWeight="800"
          leftIcon={<Icon as={FiLock} boxSize={4} />}
          onClick={() => data.onOpenBidModal && data.onOpenBidModal(data)}
        >
          Place Quick Bid
        </Button>
      </Stack>
    </Box>
  );
}
