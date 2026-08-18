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
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

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
      w={{ base: "100%", sm: "330px", md: "350px" }}
      maxW="100%"
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow={useColorModeValue("md", "lg")}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-4px)",
        borderColor: "blue.400",
      }}
      pos="relative"
    >
      {/* Top Media Container */}
      <Box pos="relative" h={{ base: "180px", sm: "200px" }} bg="gray.950" overflow="hidden">
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
          <Badge colorScheme="blue" bg="blue.600" color="white" px={2.5} py={0.5} borderRadius="full" fontSize="11px" fontWeight="800">
            {data.category || "Auction Lot"}
          </Badge>
          <HStack spacing={1} bg="rgba(0,0,0,0.85)" backdropFilter="blur(8px)" color="white" px={2} py={0.5} borderRadius="full" fontSize="11px" fontWeight="700">
            <Icon as={FiEye} boxSize={3} color="blue.300" />
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
          px={3}
          py={1}
          borderRadius="lg"
          fontSize="12px"
          fontWeight="800"
          border="1px solid"
          borderColor="rgba(255,255,255,0.2)"
        >
          ⏱️ <Text as="span" fontFamily="mono" color="red.400">{hours}h {minutes}m {seconds}s</Text> remaining
        </Box>
      </Box>

      {/* Card Written Info Section - Font sizes reduced by 2px */}
      <Stack p={5} spacing={3}>
        <Link href={`/bid/${data.slug}`}>
          <Text
            fontWeight="800"
            fontSize="16px"
            lineHeight="1.3"
            noOfLines={1}
            color={textColor}
            _hover={{ color: "blue.400" }}
          >
            {data.productName}
          </Text>
        </Link>

        <Text fontSize="13px" color={subTextColor} lineHeight="1.5" noOfLines={2} h="38px">
          {data.description}
        </Text>

        <Divider borderColor={borderColor} />

        {/* Dynamic Currency Pricing & Bids */}
        <Flex justify="space-between" align="center" pt={1}>
          <Box>
            <Text fontSize="11px" color="gray.400" textTransform="uppercase" fontWeight="700" letterSpacing="wider">
              Opening Base Price
            </Text>
            <Text fontSize="24px" fontWeight="900" color="blue.400" lineHeight="1.1">
              {formatPrice(data.basePrice)}
            </Text>
            <Text fontSize="11px" color="gray.400" fontWeight="600" mt={0.5}>
              Min Step {formatPrice(data.bidIncrementBy)}
            </Text>
          </Box>

          <Box textAlign="right">
            <HStack spacing={1} color="green.400" justify="flex-end" fontSize="13px" fontWeight="800">
              <Icon as={FiTrendingUp} boxSize={3.5} />
              <Text>{data.activeBids} Bids</Text>
            </HStack>
            <Text fontSize="11px" color="gray.400" fontWeight="600" mt={0.5}>
              Opening Lot
            </Text>
          </Box>
        </Flex>

        {/* Action Button */}
        <Button
          w="full"
          size="md"
          h="44px"
          mt={2}
          rounded="xl"
          colorScheme="blue"
          bg="blue.500"
          _hover={{ bg: "blue.600", transform: "translateY(-1px)" }}
          fontSize="15px"
          fontWeight="800"
          leftIcon={<Icon as={FiLock} boxSize={3.5} />}
          onClick={() => data.onOpenBidModal && data.onOpenBidModal(data)}
        >
          Start Bidding
        </Button>
      </Stack>
    </Box>
  );
}
