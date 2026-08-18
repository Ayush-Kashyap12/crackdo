"use client";

import {
  Box,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiCheckCircle, FiClock, FiLock, FiShield } from "react-icons/fi";

export default function TrustBanner() {
  const bg = "blue.900";
  const cardBg = "whiteAlpha.100";

  const TRUST_ITEMS = [
    {
      icon: FiShield,
      title: "100% Escrow Protection",
      description:
        "Your winning bid payment is held safely in escrow. Sellers are only paid after you inspect and approve your delivered item.",
    },
    {
      icon: FiCheckCircle,
      title: "Verified Merchant Audits",
      description:
        "Every seller undergoes identity check, inventory proofing, and historical reliability scoring before listing high-value lots.",
    },
    {
      icon: FiClock,
      title: "Anti-Snipe Bid Extension",
      description:
        "If a bid is placed in the final 60 seconds, the timer auto-extends by 2 minutes so all legitimate bidders get a fair shot.",
    },
    {
      icon: FiLock,
      title: "Bank-Grade Encryption",
      description:
        "All bid communications, escrow transactions, and payout settlements are protected with 256-bit end-to-end SSL encryption.",
    },
  ];

  return (
    <Box id="escrow_security" bg={bg} color="white" py={16} px={4} borderRadius="3xl" my={14}>
      <Container maxW="1250px">
        <Stack spacing={4} textAlign="center" mb={12}>
          <Heading size="xl" fontWeight="900" color="white">
            Why 50,000+ Collectors & Traders Trust CRACKDO
          </Heading>
          <Text maxW="720px" mx="auto" fontSize="16px" color="gray.200" fontWeight="500">
            We built CRACKDO to eliminate scam risks and unfair bidding tactics in online auctions.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {TRUST_ITEMS.map((item, idx) => (
            <Stack
              key={idx}
              bg={cardBg}
              backdropFilter="blur(10px)"
              p={7}
              borderRadius="2xl"
              border="1px solid"
              borderColor="whiteAlpha.300"
              spacing={4}
            >
              <Icon as={item.icon} boxSize={9} color="#00f2fe" />
              <Text fontWeight="800" fontSize="18px" color="white">
                {item.title}
              </Text>
              <Text fontSize="15px" color="gray.200" lineHeight="1.6" fontWeight="500">
                {item.description}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
