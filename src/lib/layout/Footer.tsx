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
  const bg = useColorModeValue("white", "black");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box bg={bg} color={textColor} pt={12} pb={8} borderTop="1px solid" borderColor={borderColor}>
      <Container maxW="1250px" px={{ base: 4, sm: 6 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} mb={10}>
          {/* Brand Info */}
          <Stack spacing={3.5}>
            <Heading size="md" color={textColor} letterSpacing="tight" fontSize="20px" fontWeight="900">
              ⚡ CRACKDO
            </Heading>
            <Text fontSize="14px" color={subTextColor} lineHeight="1.6" fontWeight="500">
              The trusted online auction platform for luxury goods, high-end electronics, and collectibles with instant buyer escrow protection.
            </Text>
            <HStack spacing={4} color="blue.400" fontSize="13px" fontWeight="700">
              <HStack spacing={1}>
                <Icon as={FiShield} boxSize={4} />
                <Text>Escrow Protected</Text>
              </HStack>
              <HStack spacing={1}>
                <Icon as={FiLock} boxSize={4} />
                <Text>256-bit SSL</Text>
              </HStack>
            </HStack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={3}>
            <Text fontWeight="800" fontSize="15px" color={textColor} textTransform="uppercase" letterSpacing="wider">
              Marketplace
            </Text>
            <Link href="/#all_products">
              <Text fontSize="14px" color={subTextColor} fontWeight="600" _hover={{ color: "blue.400" }}>
                Live Electronics
              </Text>
            </Link>
            <Link href="/#all_products">
              <Text fontSize="14px" color={subTextColor} fontWeight="600" _hover={{ color: "blue.400" }}>
                Luxury Watches & Art
              </Text>
            </Link>
            <Link href="/#all_products">
              <Text fontSize="14px" color={subTextColor} fontWeight="600" _hover={{ color: "blue.400" }}>
                Gaming & Hardware
              </Text>
            </Link>
            <Link href="/#how_it_works">
              <Text fontSize="14px" color={subTextColor} fontWeight="600" _hover={{ color: "blue.400" }}>
                How Bidding Works
              </Text>
            </Link>
          </Stack>

          {/* Security & Guarantees */}
          <Stack spacing={3}>
            <Text fontWeight="800" fontSize="15px" color={textColor} textTransform="uppercase" letterSpacing="wider">
              Buyer Guarantees
            </Text>
            <HStack color={subTextColor} fontSize="14px" fontWeight="600">
              <Icon as={FiCheckCircle} color="green.400" boxSize={4} />
              <Text>100% Escrow Refund Policy</Text>
            </HStack>
            <HStack color={subTextColor} fontSize="14px" fontWeight="600">
              <Icon as={FiCheckCircle} color="green.400" boxSize={4} />
              <Text>Anti-Snipe Bid Extensions</Text>
            </HStack>
            <HStack color={subTextColor} fontSize="14px" fontWeight="600">
              <Icon as={FiCheckCircle} color="green.400" boxSize={4} />
              <Text>Verified Merchant Audits [Demo]</Text>
            </HStack>
            <HStack color={subTextColor} fontSize="14px" fontWeight="600">
              <Icon as={FiCheckCircle} color="green.400" boxSize={4} />
              <Text>24/7 Dispute Resolution</Text>
            </HStack>
          </Stack>

          {/* VIP Drop Alerts */}
          <Stack spacing={3}>
            <Text fontWeight="800" fontSize="15px" color={textColor} textTransform="uppercase" letterSpacing="wider">
              VIP Auction Alerts
            </Text>
            <Text fontSize="13px" color={subTextColor} fontWeight="500">
              Be the first to know when rare items and low reserve tech lots go live on CRACKDO.
            </Text>
            <Stack direction="row" spacing={2}>
              <Input
                placeholder="Enter your email"
                size="md"
                bg={useColorModeValue("gray.100", "gray.900")}
                fontSize="14px"
                border="1px solid"
                borderColor={borderColor}
                _focus={{ borderColor: "blue.400" }}
              />
              <Button size="md" colorScheme="blue" px={4} fontSize="14px" fontWeight="800">
                Join
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>

        <Divider borderColor={borderColor} my={6} />

        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align="center"
          fontSize="13px"
          color={subTextColor}
          fontWeight="600"
          gap={3}
        >
          <Text>© {new Date().getFullYear()} CRACKDO Inc. All rights reserved. Built with Next.js & Chakra UI.</Text>
          <HStack spacing={5}>
            <Text cursor="pointer" _hover={{ color: textColor }}>Privacy Policy</Text>
            <Text cursor="pointer" _hover={{ color: textColor }}>Terms of Service</Text>
            <Text cursor="pointer" _hover={{ color: textColor }}>Escrow Terms</Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
