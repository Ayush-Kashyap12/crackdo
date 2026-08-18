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
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FiLock, FiShield, FiTrendingUp } from "react-icons/fi";
import { RiGithubFill, RiGithubLine } from "react-icons/ri";
import { GITHUB_REPO } from "../constants";
import ThemeToggle from "./ThemeToggle";
import Logo3D from "../../app/components/Logo3D";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState("");

  const bgHeader = "gray.950";
  const borderColor = "gray.800";
  const topBarBg = "black";

  return (
    <Box position="sticky" top={0} zIndex={1000} boxShadow="xl">
      {/* Top Announcement Bar - Clean New Platform Launch */}
      <Box bg={topBarBg} color="white" py={3} px={6} fontSize="16px" fontWeight="700" borderBottom="1px solid" borderColor="gray.800">
        <Flex maxW="1400px" mx="auto" align="center" justify="space-between">
          <HStack spacing={3} overflow="hidden">
            <Badge colorScheme="green" bg="green.500" color="black" px={3} py={1} borderRadius="full" fontSize="14px" fontWeight="800">
              LIVE MARKETPLACE
            </Badge>
            <Text isTruncated color="white" fontSize="16px" fontWeight="700">
              🏆 <strong>CRACKDO Auction Platform</strong> — Escrow Protected Online Bidding
            </Text>
          </HStack>
          <HStack spacing={6} display={{ base: "none", lg: "flex" }}>
            <HStack spacing={2}>
              <Icon as={FiShield} boxSize={5} color="blue.400" />
              <Text fontSize="15px" color="gray.100" fontWeight="700">100% Escrow Guarantee</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FiLock} boxSize={5} color="green.400" />
              <Text fontSize="15px" color="gray.100" fontWeight="700">Verified Sellers</Text>
            </HStack>
          </HStack>
        </Flex>
      </Box>

      {/* Main Header Bar */}
      <Flex
        bg={bgHeader}
        minH={"84px"}
        py={{ base: 3, md: 4 }}
        px={{ base: 4, md: 8 }}
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
            icon={isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={7} h={7} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
            color="white"
          />
        </Flex>

        {/* Brand Logo with 3D Pop-out Hover Effect & ONLINE Pulse Badge */}
        <HStack spacing={4} align="center">
          <Link href="/">
            <HStack spacing={3} cursor="pointer" align="center">
              <Logo3D size="sm" showSubtext={false} />
              <Badge colorScheme="green" bg="green.900" color="green.300" border="1px solid" borderColor="green.600" borderRadius="md" px={3} py={1} fontSize="14px" fontWeight="800">
                ONLINE
              </Badge>
            </HStack>
          </Link>
        </HStack>

        {/* Global Search Bar - Large Clear Input */}
        <Box display={{ base: "none", lg: "block" }} flex="1" maxW="460px" mx={6}>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none" h="full">
              <SearchIcon color="gray.400" boxSize={5} />
            </InputLeftElement>
            <Input
              placeholder="Search CRACKDO auctions, watches, tech..."
              borderRadius="full"
              bg="gray.900"
              color="white"
              fontSize="17px"
              fontWeight="600"
              h="50px"
              border="1px solid"
              borderColor="gray.700"
              _focus={{
                bg: "black",
                borderColor: "blue.400",
                boxShadow: "0 0 14px rgba(0,242,254,0.4)",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Box>

        {/* Navigation Links - Large Readable Font */}
        <Box display={{ base: "none", md: "block" }}>
          <DesktopNav />
        </Box>

        {/* Actions & Buttons */}
        <Stack direction={"row"} align="center" spacing={{ base: 2, md: 4 }}>
          <ThemeToggle />

          <IconButton
            aria-label="open github"
            size="lg"
            variant="ghost"
            color="white"
            _hover={{ bg: "gray.800" }}
            icon={colorMode === "light" ? <RiGithubFill size={24} /> : <RiGithubLine size={24} />}
            onClick={() => open(GITHUB_REPO, "_blank")}
          />

          <Link href="/register">
            <Button
              size="lg"
              h="48px"
              rounded="full"
              colorScheme="blue"
              bg="blue.500"
              _hover={{ bg: "blue.600", transform: "translateY(-1px)", boxShadow: "0 4px 15px rgba(0,122,255,0.4)" }}
              rightIcon={<ArrowRightIcon w={4} h={4} />}
              fontWeight="800"
              fontSize="17px"
              px={7}
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
  const linkColor = "gray.100";
  const linkHoverColor = "#00f2fe";
  const popoverContentBgColor = "gray.900";

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={9}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                href={navItem.href ?? "#"}
                fontSize={"17px"}
                fontWeight={800}
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
                borderColor="gray.700"
                boxShadow={"2xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
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
      p={3}
      rounded={"md"}
      _hover={{ bg: "gray.800" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text transition={"all .2s ease"} _groupHover={{ color: "blue.400" }} fontWeight={800} fontSize="16px" color="white">
            {label}
          </Text>
          <Text fontSize={"14px"} color="gray.300">
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
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack bg="gray.950" p={6} display={{ md: "none" }} borderBottom="1px solid" borderColor="gray.800">
      <InputGroup size="lg" mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input placeholder="Search CRACKDO..." borderRadius="md" bg="gray.900" color="white" fontSize="17px" />
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
      <Box py={3} as="a" href={href ?? "#"} display="flex" justifyContent="space-between" alignItems="center">
        <Text fontWeight={800} color="gray.100" fontSize="18px">
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
            color="white"
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <Stack mt={1} pl={4} borderLeft={2} borderStyle={"solid"} borderColor="blue.500" align={"start"}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href} fontSize="16px" color="gray.300" fontWeight="700">
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
