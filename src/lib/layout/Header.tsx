"use client";

import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSearch } from "../SearchContext";
import ThemeToggle from "./ThemeToggle";
import Logo3D from "../../app/components/Logo3D";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();
  const { searchQuery, setSearchQuery } = useSearch();

  const bgHeader = useColorModeValue("white", "gray.950");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const topBarBg = useColorModeValue("blue.900", "black");
  const textColor = useColorModeValue("gray.800", "white");

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    // Smooth scroll to marketplace if typing search term
    if (val.trim().length > 0 && typeof window !== "undefined") {
      const element = document.getElementById("all_products");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Box position="sticky" top={0} zIndex={1000} boxShadow="md" maxW="100%">
      {/* Top Announcement Bar */}
      <Box bg={topBarBg} color="white" py={2} px={{ base: 3, md: 6 }} fontSize="14px" fontWeight="600" borderBottom="1px solid" borderColor="gray.800">
        <Flex maxW="1350px" mx="auto" align="center" justify="space-between">
          <HStack spacing={2} overflow="hidden">
            <Badge colorScheme="green" bg="green.500" color="black" px={2.5} py={0.5} borderRadius="full" fontSize="11px" fontWeight="800">
              LIVE
            </Badge>
            <Text isTruncated color="white" fontSize="14px" fontWeight="700">
              🏆 <strong>CRACKDO Auction Platform</strong> — Escrow Protected Bidding
            </Text>
          </HStack>
          <HStack spacing={5} display={{ base: "none", lg: "flex" }}>
            <HStack spacing={1.5}>
              <Icon as={SearchIcon} boxSize={4} color="blue.400" />
              <Text fontSize="13px" color="gray.100" fontWeight="600">Real-Time Live Search</Text>
            </HStack>
          </HStack>
        </Flex>
      </Box>

      {/* Main Header Bar */}
      <Flex
        bg={bgHeader}
        minH={"76px"}
        py={{ base: 2, md: 3 }}
        px={{ base: 3, sm: 6, md: 8 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={borderColor}
        align={"center"}
        justify="space-between"
      >
        {/* Mobile Hamburger Menu Icon */}
        <Flex display={{ base: "flex", md: "none" }} align="center">
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3.5} h={3.5} /> : <HamburgerIcon w={6} h={6} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
            color={textColor}
          />
        </Flex>

        {/* Brand Logo with 3D Pop-out Hover Effect */}
        <HStack spacing={3} align="center">
          <Link href="/">
            <HStack spacing={2} cursor="pointer" align="center">
              <Logo3D size="sm" showSubtext={false} />
              <Badge colorScheme="green" bg="green.900" color="green.300" border="1px solid" borderColor="green.600" borderRadius="md" px={2} py={0.5} fontSize="12px" fontWeight="800">
                ONLINE
              </Badge>
            </HStack>
          </Link>
        </HStack>

        {/* Global Synchronized Search Bar */}
        <Box display={{ base: "none", lg: "block" }} flex="1" maxW="400px" mx={6}>
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="blue.400" boxSize={4} />
            </InputLeftElement>
            <Input
              placeholder="Search CRACKDO auctions, watches, tech..."
              borderRadius="full"
              bg={useColorModeValue("gray.100", "gray.900")}
              color={textColor}
              fontSize="15px"
              fontWeight="600"
              border="1px solid"
              borderColor={useColorModeValue("gray.300", "gray.700")}
              _focus={{
                bg: useColorModeValue("white", "black"),
                borderColor: "blue.400",
                boxShadow: "0 0 12px rgba(0,242,254,0.35)",
              }}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </InputGroup>
        </Box>

        {/* Navigation Links */}
        <Box display={{ base: "none", md: "block" }}>
          <DesktopNav />
        </Box>

        {/* Actions & Buttons */}
        <Stack direction={"row"} align="center" spacing={{ base: 1.5, sm: 3 }}>
          <ThemeToggle />

          <Link href="/register">
            <Button
              size="md"
              h="42px"
              rounded="full"
              colorScheme="blue"
              bg="blue.500"
              _hover={{ bg: "blue.600", transform: "translateY(-1px)" }}
              rightIcon={<ArrowRightIcon w={3} h={3} />}
              fontWeight="700"
              fontSize="15px"
              px={5}
            >
              Sign In
            </Button>
          </Link>
        </Stack>
      </Flex>

      {/* Mobile Drawer */}
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.700", "gray.100");
  const linkHoverColor = useColorModeValue("blue.600", "#00f2fe");
  const popoverContentBgColor = useColorModeValue("white", "gray.900");

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={7}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                href={navItem.href ?? "#"}
                fontSize={"15px"}
                fontWeight={700}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                boxShadow={"2xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"xs"}
              >
                <Stack spacing={2}>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2.5}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.800") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text transition={"all .2s ease"} _groupHover={{ color: "blue.400" }} fontWeight={700} fontSize="14px" color={useColorModeValue("gray.800", "white")}>
            {label}
          </Text>
          <Text fontSize={"12px"} color={useColorModeValue("gray.500", "gray.300")}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .2s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={4} h={4} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <Stack bg={useColorModeValue("white", "gray.950")} p={5} display={{ md: "none" }} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.800")}>
      <InputGroup size="md" mb={3}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="blue.400" />
        </InputLeftElement>
        <Input
          placeholder="Search CRACKDO..."
          borderRadius="md"
          bg={useColorModeValue("gray.100", "gray.900")}
          color={useColorModeValue("gray.800", "white")}
          fontSize="15px"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={2} onClick={children && onToggle}>
      <Box py={2.5} as="a" href={href ?? "#"} display="flex" justifyContent="space-between" alignItems="center">
        <Text fontWeight={700} color={useColorModeValue("gray.800", "gray.100")} fontSize="16px">
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={5}
            h={5}
            color={useColorModeValue("gray.600", "white")}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <Stack mt={1} pl={4} borderLeft={2} borderStyle={"solid"} borderColor="blue.500" align={"start"}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={1.5} href={child.href} fontSize="14px" color={useColorModeValue("gray.600", "gray.300")} fontWeight="600">
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Live Auctions",
    href: "/#all_products",
  },
  {
    label: "Categories",
    children: [
      { label: "Electronics & Tech", subLabel: "Laptops, Phones, Drones", href: "/#all_products" },
      { label: "Luxury & Watches", subLabel: "Rolex, Fine Jewelry, Art", href: "/#all_products" },
      { label: "Gaming Gear", subLabel: "Consoles, Keyboards, GPUs", href: "/#all_products" },
      { label: "Outdoor & Travel", subLabel: "Expedition Gear, Instruments", href: "/#all_products" },
    ],
  },
  {
    label: "How Escrow Works",
    href: "/#how_it_works",
  },
  {
    label: "Buyer Security",
    href: "/#escrow_security",
  },
];
