"use client";

import { Badge, Box, Container, HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";

const MOCK_ACTIVITIES = [
  { user: "@alex_dev", action: "placed a bid of $850.00", lot: "Advanced Quadcopter Drone", time: "10s ago [Sample]" },
  { user: "@sarah_m", action: "won the auction at $1,375.00", lot: "High-Performance Laptop", time: "1m ago [Sample]" },
  { user: "@marco_v", action: "placed a bid of $3,550.00", lot: "Luxury Chronograph Wristwatch", time: "2m ago [Sample]" },
  { user: "@tech_guru", action: "placed a bid of $2,299.99", lot: "Pro Gaming Laptop RTX 4090", time: "3m ago [Sample]" },
  { user: "@elena_k", action: "placed a bid of $950.00", lot: "Flagship AI Smartphone Pro", time: "4m ago [Sample]" },
];

export default function LiveTicker() {
  const [index, setIndex] = useState(0);
  const bg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MOCK_ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = MOCK_ACTIVITIES[index];

  return (
    <Box bg={bg} borderY="1px solid" borderColor={borderColor} py={3} my={6}>
      <Container maxW="1250px" px={{ base: 3, sm: 6 }}>
        <HStack justify="between" align="center" spacing={3} fontSize="14px">
          <HStack spacing={2} flexShrink={0}>
            <Badge colorScheme="purple" variant="solid" px={2.5} py={0.5} borderRadius="full" fontSize="11px" fontWeight="800">
              DEMO FEED
            </Badge>
            <Icon as={FiTrendingUp} color="blue.400" boxSize={4} />
            <Text fontWeight="800" color={textColor} fontSize="14px" display={{ base: "none", sm: "block" }}>
              Sample Activity:
            </Text>
          </HStack>

          <HStack flex="1" overflow="hidden" spacing={2} key={index} className="fade-in" fontSize="13px" isTruncated>
            <Text fontWeight="800" color="blue.400">
              {current.user}
            </Text>
            <Text color={subTextColor} fontWeight="500" isTruncated>
              {current.action} on <strong>{current.lot}</strong>
            </Text>
            <Badge bg={useColorModeValue("gray.100", "gray.800")} color={subTextColor} fontSize="11px" fontWeight="700" px={2} py={0.5} borderRadius="md" display={{ base: "none", md: "inline-block" }}>
              {current.time}
            </Badge>
          </HStack>

          <Text display={{ base: "none", lg: "block" }} fontSize="12px" color="gray.400" fontWeight="600">
            [Demo Preview Feed]
          </Text>
        </HStack>
      </Container>
    </Box>
  );
}
