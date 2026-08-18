"use client";

import { Badge, Box, Container, HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";

const MOCK_ACTIVITIES = [
  { user: "@alex_dev", action: "placed a bid of $850.00", lot: "Advanced Quadcopter Drone", time: "10s ago" },
  { user: "@sarah_m", action: "won the auction at $1,375.00", lot: "High-Performance Laptop", time: "1m ago" },
  { user: "@marco_v", action: "placed a bid of $3,550.00", lot: "Luxury Chronograph Wristwatch", time: "2m ago" },
  { user: "@tech_guru", action: "placed a bid of $2,299.99", lot: "Pro Gaming Laptop RTX 4090", time: "3m ago" },
  { user: "@elena_k", action: "placed a bid of $950.00", lot: "Flagship AI Smartphone Pro", time: "4m ago" },
];

export default function LiveTicker() {
  const [index, setIndex] = useState(0);
  const bg = "gray.900";
  const borderColor = "gray.800";

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MOCK_ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = MOCK_ACTIVITIES[index];

  return (
    <Box bg={bg} borderY="1px solid" borderColor={borderColor} py={3.5} my={6}>
      <Container maxW="1250px">
        <HStack justify="between" align="center" spacing={4} fontSize="15px">
          <HStack spacing={3} flexShrink={0}>
            <Badge colorScheme="green" bg="green.500" color="black" px={3} py={1} borderRadius="full" fontSize="12px" fontWeight="800">
              LIVE FEED
            </Badge>
            <Icon as={FiTrendingUp} color="#00f2fe" boxSize={5} />
            <Text fontWeight="800" color="white" fontSize="15px">
              Recent Platform Bids:
            </Text>
          </HStack>

          <HStack flex="1" overflow="hidden" spacing={2.5} key={index} className="fade-in" fontSize="15px">
            <Text fontWeight="800" color="#00f2fe">
              {current.user}
            </Text>
            <Text color="gray.200" fontWeight="500">
              {current.action} on <strong style={{ color: "#ffffff" }}>{current.lot}</strong>
            </Text>
            <Badge bg="gray.800" color="gray.300" fontSize="12px" fontWeight="700" px={2} py={0.5} borderRadius="md">
              {current.time}
            </Badge>
          </HStack>

          <Text display={{ base: "none", md: "block" }} fontSize="13px" color="gray.400" fontWeight="600">
            Auto-Updating Live
          </Text>
        </HStack>
      </Container>
    </Box>
  );
}
