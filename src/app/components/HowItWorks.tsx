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
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box id="how_it_works" py={12} px={{ base: 2, sm: 4 }} my={6}>
      <Container maxW="1250px">
        <Stack spacing={3} textAlign="center" mb={10}>
          <Badge colorScheme="blue" bg="blue.600" color="white" mx="auto" px={3.5} py={1} borderRadius="full" fontSize="13px" fontWeight="800">
            SIMPLE & SECURE
          </Badge>
          <Heading size="lg" fontWeight="900" color={textColor} fontSize={{ base: "22px", md: "28px" }}>
            How Escrow Bidding Works on CRACKDO
          </Heading>
          <Text color={subTextColor} maxW="640px" mx="auto" fontSize="15px" fontWeight="500">
            Buy and sell high-value lots with complete confidence in 4 straightforward steps.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          {STEPS.map((s, idx) => (
            <Stack
              key={idx}
              bg={cardBg}
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              boxShadow={useColorModeValue("sm", "lg")}
              spacing={4}
              position="relative"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-4px)", borderColor: "blue.400" }}
            >
              <Flex justify="space-between" align="center">
                <Flex
                  w={12}
                  h={12}
                  borderRadius="xl"
                  bg="blue.500"
                  color="white"
                  align="center"
                  justify="center"
                >
                  <Icon as={s.icon} boxSize={5} />
                </Flex>
                <Text fontSize="24px" fontWeight="900" color={useColorModeValue("gray.300", "gray.700")}>
                  {s.step}
                </Text>
              </Flex>

              <Heading size="sm" fontWeight="800" color={textColor} fontSize="17px">
                {s.title}
              </Heading>
              <Text fontSize="14px" color={subTextColor} lineHeight="1.6" fontWeight="500">
                {s.description}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
