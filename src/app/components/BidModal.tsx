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
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiLock, FiShield } from "react-icons/fi";
import { ProductDataProps } from "../../lib/types/product";
import { useCurrency } from "../../lib/CurrencyContext";

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDataProps | null;
  onBidSubmitted?: (productSlug: string, newBid: number) => void;
}

export default function BidModal({ isOpen, onClose, product, onBidSubmitted }: BidModalProps) {
  const toast = useToast();
  const { currency, formatPrice, usdToInrRate } = useCurrency();

  if (!product) return null;

  const currentBidUSD = product.basePrice + (product.bidIncrementBy * 2);
  const minRequiredBidUSD = currentBidUSD + product.bidIncrementBy;

  // Amount in active currency units
  const minRequiredActive = currency === "INR" ? Math.round(minRequiredBidUSD * usdToInrRate) : minRequiredBidUSD;
  const [userBid, setUserBid] = useState<string>(String(minRequiredActive));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numUserBid = parseFloat(userBid) || 0;
  const isValidBid = numUserBid >= minRequiredActive;

  const handlePlaceBid = () => {
    if (!isValidBid) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const symbol = currency === "INR" ? "₹" : "$";
      if (onBidSubmitted) {
        onBidSubmitted(product.slug, numUserBid);
      }
      toast({
        title: "Bid Confirmed & Escrow Locked!",
        description: `Your bid of ${symbol}${numUserBid.toLocaleString()} on "${product.productName}" has been placed with 100% Escrow Protection.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay backdropFilter="blur(8px)" bg="rgba(0,0,0,0.85)" />
      <ModalContent borderRadius="2xl" overflow="hidden" bg="gray.950" border="1px solid" borderColor="gray.800" color="white">
        <ModalHeader bg="black" pb={4} borderBottom="1px solid" borderColor="gray.800">
          <HStack justify="space-between">
            <Text fontSize="18px" fontWeight="800">
              Place Escrow Bid ({currency})
            </Text>
            <Badge colorScheme="green" bg="green.500" color="black" px={3} py={1} borderRadius="full" fontSize="11px" fontWeight="800">
              LIVE AUCTION
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="white" />

        <ModalBody py={6}>
          <Stack spacing={5}>
            {/* Product Summary */}
            <HStack spacing={4} align="flex-start">
              <Box borderRadius="xl" overflow="hidden" w="90px" h="90px" bg="gray.900" flexShrink={0} border="1px solid" borderColor="gray.800">
                <Image
                  src={product.images[0]}
                  alt={product.productName}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
              <Box>
                <Text fontWeight="800" fontSize="16px" color="white" noOfLines={2}>
                  {product.productName}
                </Text>
                <HStack spacing={3} mt={1.5}>
                  <Text fontSize="13px" color="gray.400" fontWeight="600">
                    Base: {formatPrice(product.basePrice)}
                  </Text>
                  <Text fontSize="13px" color="blue.400" fontWeight="800">
                    +{formatPrice(product.bidIncrementBy)} Inc.
                  </Text>
                </HStack>
              </Box>
            </HStack>

            <Divider borderColor="gray.800" />

            {/* Current Top Bid info */}
            <Flex justify="space-between" align="center" bg="black" p={4} borderRadius="xl" border="1px solid" borderColor="gray.800">
              <Box>
                <Text fontSize="12px" color="gray.400" textTransform="uppercase" fontWeight="800" letterSpacing="wider">
                  Current Highest Bid
                </Text>
                <Text fontSize="24px" fontWeight="900" color="#00f2fe">
                  {formatPrice(currentBidUSD)}
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="12px" color="gray.400" textTransform="uppercase" fontWeight="800" letterSpacing="wider">
                  Minimum Next Bid
                </Text>
                <Text fontSize="20px" fontWeight="800" color="green.400">
                  {formatPrice(minRequiredBidUSD)}
                </Text>
              </Box>
            </Flex>

            {/* Bid Input */}
            <Box>
              <Text fontSize="14px" fontWeight="800" mb={2} color="gray.200">
                Your Custom Bid Amount ({currency === "INR" ? "₹ INR" : "$ USD"})
              </Text>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none" color="gray.400" fontSize="18px">
                  {currency === "INR" ? "₹" : "$"}
                </InputLeftElement>
                <Input
                  type="number"
                  placeholder={String(minRequiredActive)}
                  value={userBid}
                  onChange={(e) => setUserBid(e.target.value)}
                  borderRadius="xl"
                  fontWeight="800"
                  fontSize="18px"
                  bg="gray.900"
                  borderColor="gray.700"
                  color="white"
                  _focus={{ borderColor: "blue.400", boxShadow: "0 0 12px rgba(0,242,254,0.3)" }}
                  isInvalid={!isValidBid}
                />
              </InputGroup>

              {!isValidBid && (
                <Text fontSize="13px" color="red.400" mt={1.5} fontWeight="700">
                  Bid must be at least {formatPrice(minRequiredBidUSD)}
                </Text>
              )}
            </Box>

            {/* Escrow Trust Note */}
            <HStack bg="rgba(0, 242, 254, 0.08)" border="1px solid" borderColor="rgba(0, 242, 254, 0.2)" p={4} borderRadius="xl" spacing={3}>
              <Icon as={FiShield} boxSize={6} color="#00f2fe" flexShrink={0} />
              <Box fontSize="13px">
                <Text fontWeight="800" color="#00f2fe">
                  100% Buyer Escrow Protection Included
                </Text>
                <Text color="gray.300" mt={0.5}>
                  Funds are held safely in escrow until item arrival & inspection.
                </Text>
              </Box>
            </HStack>
          </Stack>
        </ModalBody>

        <ModalFooter bg="black" pt={4} borderTop="1px solid" borderColor="gray.800">
          <HStack w="full" justify="space-between">
            <Button variant="ghost" size="md" onClick={onClose} color="gray.400" _hover={{ color: "white" }}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              size="lg"
              rounded="xl"
              px={7}
              fontSize="16px"
              fontWeight="800"
              onClick={handlePlaceBid}
              isDisabled={!isValidBid}
              isLoading={isSubmitting}
              leftIcon={<Icon as={FiLock} />}
            >
              Confirm & Lock Bid ({currency === "INR" ? `₹${numUserBid.toLocaleString()}` : `$${numUserBid.toLocaleString()}`})
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
