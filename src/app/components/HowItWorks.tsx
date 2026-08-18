"use client";

import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiCheckSquare, FiDollarSign, FiSearch, FiTruck } from "react-icons/fi";

const STEPS = [
  {
    step: "01",
    title: "Browse Verified Lots",
    description: "Explore curated auctions backed by merchant identity proofing and product authentication.",
    icon: FiSearch,
  },
  {
    step: "02",
    title: "Place Escrow Bids",
    description: "Submit live bids in real time. Your funds remain locked securely in escrow until item receipt.",
    icon: FiDollarSign,
  },
  {
    step: "03",
    title: "Fair Anti-Snipe Finish",
    description: "Last-second bids trigger automatic 2-minute timer extensions for transparent competitive bidding.",
    icon: FiCheckSquare,
  },
  {
    step: "04",
    title: "Inspected & Delivered",
    description: "Inspect your item upon delivery. Funds release to the seller only after your final approval.",
    icon: FiTruck,
  },
];

export default function HowItWorks() {
  const cardBg = "gray.900";
  const borderColor = "gray.800";

  return (
    <Box id="how_it_works" py={14} px={4} my={8}>
      <Container maxW="1250px">
        <Stack spacing={3} textAlign="center" mb={12}>
          <Badge colorScheme="blue" bg="blue.600" color="white" mx="auto" px={4} py={1.5} borderRadius="full" fontSize="14px" fontWeight="800">
            SIMPLE & SECURE
          </Badge>
          <Heading size="xl" fontWeight="900" color="white">
            How Escrow Bidding Works on CRACKDO
          </Heading>
          <Text color="gray.300" maxW="680px" mx="auto" fontSize="16px" fontWeight="500">
            Buy and sell high-value lots with complete confidence in 4 straightforward steps.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          {STEPS.map((s, idx) => (
            <Stack
              key={idx}
              bg={cardBg}
              p={7}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="lg"
              spacing={5}
              position="relative"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-4px)", borderColor: "blue.400" }}
            >
              <Flex justify="space-between" align="center">
                <Flex
                  w={14}
                  h={14}
                  borderRadius="xl"
                  bg="blue.500"
                  color="white"
                  align="center"
                  justify="center"
                >
                  <Icon as={s.icon} boxSize={6} />
                </Flex>
                <Text fontSize="28px" fontWeight="900" color="gray.700">
                  {s.step}
                </Text>
              </Flex>

              <Heading size="md" fontWeight="800" color="white" fontSize="18px">
                {s.title}
              </Heading>
              <Text fontSize="15px" color="gray.300" lineHeight="1.6" fontWeight="500">
                {s.description}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
