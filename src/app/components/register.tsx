"use client";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiCheckCircle, FiLock, FiMail, FiShield, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill, RiGithubFill } from "react-icons/ri";
import Logo3D from "./Logo3D";
import BlackMirrorCrystalBg from "./BlackMirrorCrystalBg";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("signup");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: activeTab === "login" ? "Welcome Back to CRACKDO! 🚀" : "Account Created Successfully! 🎉",
        description: activeTab === "login" 
          ? "You have logged in with 100% Escrow Account Security." 
          : "Your CRACKDO account is verified and ready for live bidding.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }, 900);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Authentication`,
      description: `Redirecting to ${provider} secure OAuth login...`,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Box minH="100vh" py={12} px={4} position="relative" display="flex" alignItems="center" justifyContent="center">
      {/* Background 3D Falling Crystal Canvas */}
      <BlackMirrorCrystalBg />

      {/* Enlarged Container for Weak Eyesight Readability (720px Max Width) */}
      <Container maxW="720px" position="relative" zIndex={2}>
        {/* Back Link */}
        <Link href="/">
          <HStack spacing={2} color="#00f2fe" mb={6} cursor="pointer" fontSize="18px" fontWeight="800" _hover={{ textDecoration: "underline" }}>
            <Icon as={FiArrowLeft} boxSize={6} />
            <Text>Back to CRACKDO Live Marketplace</Text>
          </HStack>
        </Link>

        {/* Black Mirror Card Container - Extra Spacious Padding */}
        <Box
          className="black-mirror-card"
          p={{ base: 8, md: 12 }}
          borderRadius="3xl"
          boxShadow="0 30px 60px rgba(0,0,0,0.9)"
        >
          {/* Logo Header */}
          <Stack align="center" spacing={4} mb={8} textAlign="center">
            <Logo3D size="md" showSubtext={false} />
            <Badge colorScheme="blue" bg="blue.600" color="white" px={4} py={1.5} borderRadius="full" fontSize="15px" fontWeight="800">
              🔒 ESCROW PROTECTED ACCOUNT
            </Badge>
            <Heading size="lg" color="white" fontSize="30px" fontWeight="900">
              {activeTab === "signup" ? "Create Your CRACKDO Account" : "Sign In to Your Account"}
            </Heading>
          </Stack>

          {/* Enlarged Tab Switcher (Sign In / Create Account) */}
          <Flex bg="black" p={2} borderRadius="full" mb={8} border="1px solid" borderColor="gray.800">
            <Button
              flex="1"
              size="lg"
              h="52px"
              rounded="full"
              fontSize="18px"
              fontWeight="800"
              colorScheme={activeTab === "signup" ? "blue" : "gray"}
              bg={activeTab === "signup" ? "blue.500" : "transparent"}
              color={activeTab === "signup" ? "white" : "gray.300"}
              onClick={() => setActiveTab("signup")}
            >
              Create Account
            </Button>
            <Button
              flex="1"
              size="lg"
              h="52px"
              rounded="full"
              fontSize="18px"
              fontWeight="800"
              colorScheme={activeTab === "login" ? "blue" : "gray"}
              bg={activeTab === "login" ? "blue.500" : "transparent"}
              color={activeTab === "login" ? "white" : "gray.300"}
              onClick={() => setActiveTab("login")}
            >
              Sign In
            </Button>
          </Flex>

          {/* Social One-Click Login */}
          <Stack spacing={4} mb={8}>
            <Button
              w="full"
              size="lg"
              h="54px"
              variant="outline"
              bg="rgba(255,255,255,0.05)"
              borderColor="gray.700"
              color="white"
              _hover={{ bg: "rgba(255,255,255,0.1)", borderColor: "blue.400" }}
              fontSize="17px"
              fontWeight="800"
              leftIcon={<FcGoogle size={26} />}
              onClick={() => handleSocialLogin("Google")}
            >
              Continue with Google
            </Button>

            <HStack spacing={4}>
              <Button
                flex="1"
                size="lg"
                h="50px"
                variant="outline"
                bg="rgba(255,255,255,0.05)"
                borderColor="gray.700"
                color="white"
                _hover={{ bg: "gray.800" }}
                fontSize="16px"
                fontWeight="800"
                leftIcon={<RiGithubFill size={24} />}
                onClick={() => handleSocialLogin("GitHub")}
              >
                GitHub
              </Button>
              <Button
                flex="1"
                size="lg"
                h="50px"
                variant="outline"
                bg="rgba(255,255,255,0.05)"
                borderColor="gray.700"
                color="white"
                _hover={{ bg: "gray.800" }}
                fontSize="16px"
                fontWeight="800"
                leftIcon={<RiAppleFill size={24} />}
                onClick={() => handleSocialLogin("Apple")}
              >
                Apple ID
              </Button>
            </HStack>
          </Stack>

          <Flex align="center" my={6}>
            <Divider borderColor="gray.800" />
            <Text px={4} fontSize="15px" color="gray.400" fontWeight="800" textTransform="uppercase" letterSpacing="wider">
              or with email
            </Text>
            <Divider borderColor="gray.800" />
          </Flex>

          {/* Auth Form - Enlarged Inputs & Labels */}
          <form onSubmit={handleAuthSubmit}>
            <Stack spacing={5}>
              {activeTab === "signup" && (
                <HStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontSize="16px" fontWeight="800" color="gray.200">
                      First Name
                    </FormLabel>
                    <InputGroup size="lg">
                      <InputLeftElement pointerEvents="none" h="full" color="gray.400">
                        <FiUser size={22} />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Alex"
                        h="54px"
                        fontSize="17px"
                        fontWeight="600"
                        bg="gray.950"
                        borderColor="gray.700"
                        color="white"
                        _focus={{ borderColor: "blue.400" }}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="16px" fontWeight="800" color="gray.200">
                      Last Name
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Morgan"
                      h="54px"
                      fontSize="17px"
                      fontWeight="600"
                      bg="gray.950"
                      borderColor="gray.700"
                      color="white"
                      _focus={{ borderColor: "blue.400" }}
                    />
                  </FormControl>
                </HStack>
              )}

              <FormControl isRequired>
                <FormLabel fontSize="16px" fontWeight="800" color="gray.200">
                  Email Address
                </FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none" h="full" color="gray.400">
                    <FiMail size={22} />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="alex@example.com"
                    h="54px"
                    fontSize="17px"
                    fontWeight="600"
                    bg="gray.950"
                    borderColor="gray.700"
                    color="white"
                    _focus={{ borderColor: "blue.400" }}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="16px" fontWeight="800" color="gray.200">
                  Password
                </FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none" h="full" color="gray.400">
                    <FiLock size={22} />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    h="54px"
                    fontSize="17px"
                    fontWeight="600"
                    bg="gray.950"
                    borderColor="gray.700"
                    color="white"
                    _focus={{ borderColor: "blue.400" }}
                  />
                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      color="gray.400"
                      _hover={{ color: "white" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewOffIcon boxSize={5} /> : <ViewIcon boxSize={5} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                size="lg"
                h="58px"
                mt={4}
                colorScheme="blue"
                bg="blue.500"
                _hover={{ bg: "blue.600", transform: "translateY(-1px)", boxShadow: "0 8px 25px rgba(0, 242, 254, 0.4)" }}
                fontSize="19px"
                fontWeight="800"
                rounded="xl"
                isLoading={isLoading}
              >
                {activeTab === "signup" ? "Create Free Account" : "Sign In to CRACKDO"}
              </Button>

              {/* Security guarantee footnote */}
              <HStack justify="center" pt={3} fontSize="15px" color="gray.300" fontWeight="700">
                <Icon as={FiCheckCircle} color="green.400" boxSize={5} />
                <Text>256-Bit SSL Encrypted Escrow Account</Text>
              </HStack>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
