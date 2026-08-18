"use client";

import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  Button,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiLock, FiShield, FiCheckCircle } from "react-icons/fi";

const Footer = () => {
  const bg = "black";
  const textColor = "gray.300";

  return (
    <Box bg={bg} color="white" pt={14} pb={10} borderTop="1px solid" borderColor="gray.800">
      <Container maxW="1250px">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10} mb={12}>
          {/* Brand Info */}
          <Stack spacing={4}>
            <Heading size="md" color="white" letterSpacing="tight" fontSize="22px" fontWeight="900">
              ⚡ CRACKDO
            </Heading>
            <Text fontSize="15px" color={textColor} lineHeight="1.6" fontWeight="500">
              The #1 trusted online auction platform for verified luxury goods, high-end electronics, and rare collectibles with instant buyer escrow protection.
            </Text>
            <HStack spacing={4} color="blue.400" fontSize="14px" fontWeight="700">
              <HStack spacing={1.5}>
                <Icon as={FiShield} boxSize={4.5} />
                <Text>Escrow Protected</Text>
              </HStack>
              <HStack spacing={1.5}>
                <Icon as={FiLock} boxSize={4.5} />
                <Text>256-bit SSL</Text>
              </HStack>
            </HStack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={3.5}>
            <Text fontWeight="800" fontSize="16px" color="white" textTransform="uppercase" letterSpacing="wider">
              Marketplace
            </Text>
            <Link href="/#all_products">
              <Text fontSize="15px" color={textColor} fontWeight="600" _hover={{ color: "blue.400" }}>
                Live Electronics
              </Text>
            </Link>
            <Link href="/#all_products">
              <Text fontSize="15px" color={textColor} fontWeight="600" _hover={{ color: "blue.400" }}>
                Luxury Watches & Art
              </Text>
            </Link>
            <Link href="/#all_products">
              <Text fontSize="15px" color={textColor} fontWeight="600" _hover={{ color: "blue.400" }}>
                Gaming & Hardware
              </Text>
            </Link>
            <Link href="/#how_it_works">
              <Text fontSize="15px" color={textColor} fontWeight="600" _hover={{ color: "blue.400" }}>
                How Bidding Works
              </Text>
            </Link>
          </Stack>

          {/* Security & Guarantees */}
          <Stack spacing={3.5}>
            <Text fontWeight="800" fontSize="16px" color="white" textTransform="uppercase" letterSpacing="wider">
              Buyer Guarantees
            </Text>
            <HStack color={textColor} fontSize="15px" fontWeight="600">
              <Icon as={FiCheckCircle} color="green.400" boxSize={4.5} />
              <Text>100% Escrow Refund Policy</Text>
            </HStack>
            <HStack color={textColor} fontSize="15px" fontWeight="600">
              <Icon as={FiCheckCircle} color="green.400" boxSize={4.5} />
              <Text>Anti-Snipe Bid Extensions</Text>
            </HStack>
            <HStack color={textColor} fontSize="15px" fontWeight="600">
              <Icon as={FiCheckCircle} color="green.400" boxSize={4.5} />
              <Text>Verified Merchant Audits</Text>
            </HStack>
            <HStack color={textColor} fontSize="15px" fontWeight="600">
              <Icon as={FiCheckCircle} color="green.400" boxSize={4.5} />
              <Text>24/7 Live Dispute Resolution</Text>
            </HStack>
          </Stack>

          {/* VIP Drop Alerts */}
          <Stack spacing={3.5}>
            <Text fontWeight="800" fontSize="16px" color="white" textTransform="uppercase" letterSpacing="wider">
              VIP Auction Alerts
            </Text>
            <Text fontSize="14px" color={textColor} fontWeight="500">
              Be the first to know when rare items and low reserve tech lots go live on CRACKDO.
            </Text>
            <Stack direction="row" spacing={2}>
              <Input
                placeholder="Enter your email"
                size="md"
                bg="gray.900"
                fontSize="15px"
                border="1px solid"
                borderColor="gray.700"
                _focus={{ borderColor: "blue.400" }}
              />
              <Button size="md" colorScheme="blue" px={5} fontSize="15px" fontWeight="800">
                Join
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>

        <Divider borderColor="gray.800" my={8} />

        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align="center"
          fontSize="14px"
          color={textColor}
          fontWeight="600"
          gap={4}
        >
          <Text>© {new Date().getFullYear()} CRACKDO Inc. All rights reserved. Built with Next.js & Chakra UI.</Text>
          <HStack spacing={6}>
            <Text cursor="pointer" _hover={{ color: "white" }}>Privacy Policy</Text>
            <Text cursor="pointer" _hover={{ color: "white" }}>Terms of Service</Text>
            <Text cursor="pointer" _hover={{ color: "white" }}>Escrow Terms</Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
