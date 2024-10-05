"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  FormLabel,
  useDisclosure,
  HStack,
  IconButton,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";

const HomePage = () => {
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } =
    useDisclosure();

  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    emailOTP: "",
  });

  const [loginData, setLoginData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      console.log("CREATING ACCOUNT");
      console.log("Data being sent:", JSON.stringify(signUpData, null, 2));

      const response = await axios.post("/api/signup", signUpData);
      console.log("Response received:", response.data);

      onSignUpClose(); // Close the modal on successful signup
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", {
          response: error.response?.data,
          status: error.response?.status,
        });
      } else {
        console.error("Error creating user:", error);
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", loginData);
      console.log("Login successful:", response.data);
      onLoginClose(); // Close the modal on successful login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleVerifyEmail = async () => {
    // Call the API to send OTP to email
    setIsEmailVerified(true); // Simulating email verification success
  };

  const handleCaptchaChange = (value: string) => {
    setCaptchaValue(value); // Store reCAPTCHA value
  };

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      bg="gray.100"
      color="gray.800"
    >
      {/* Navbar */}
      <Flex
        as="nav"
        p={4}
        bg="blue.600"
        color="white"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo */}
        <Box fontSize="xl" fontWeight="bold">
          Knight
        </Box>

        {/* Search, Login, SignUp */}
        <HStack spacing={4}>
          <Input placeholder="Search..." w="300px" bg="white" color="black" />
          <IconButton
            icon={<SearchIcon />}
            colorScheme="teal"
            aria-label="Search"
          />
          <Button colorScheme="teal" onClick={onLoginOpen}>
            Login
          </Button>
          <Button colorScheme="teal" onClick={onSignUpOpen}>
            Sign Up
          </Button>
        </HStack>
      </Flex>

      {/* Sign Up Modal */}
      <Modal isOpen={isSignUpOpen} onClose={onSignUpClose}>
        <ModalOverlay />
        <ModalContent borderRadius="md" bg="gray.50" maxW="35%"> {/* Increased the max width */}
          <ModalHeader textAlign="center">Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Enter your username"
                  name="username"
                  value={signUpData.username}
                  onChange={handleSignUpChange}
                />
              </HStack>
              <VStack align="start" spacing={4} w="100%"> 
  <HStack w="100%" flexWrap={{ base: "wrap", md: "nowrap" }} align="start">
  <FormLabel>Email</FormLabel>
    <Input
      placeholder="Enter your email"
      name="email"
      value={signUpData.email}
      onChange={handleSignUpChange}
      isReadOnly={isEmailVerified}
      flex="1"
    />
    {!isEmailVerified ? (
      <Button colorScheme="blue" onClick={handleVerifyEmail} w={{ base: "100%", md: "auto" }}>
        Verify Email
      </Button>
    ) : (
      <>
        <Input
          placeholder="Enter OTP"
          name="emailOTP"
          value={signUpData.emailOTP}
          onChange={handleSignUpChange}
          flex="1"
        />
        <Button colorScheme="green" w={{ base: "100%", md: "auto" }}>
          Submit OTP
        </Button>
      </>
    )}
  </HStack>
</VStack>

              <HStack justify="space-between">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                />
              </HStack>
              <HStack justify="space-between" align="center">
              <FormLabel minW="150px">Confirm Password</FormLabel> 
              <Input
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={handleSignUpChange}
              />
            </HStack>


              {/* Google reCAPTCHA placeholder */}
              <HStack justify="center">
                <Box w="100%">
                  {/* Integrate actual reCAPTCHA */}
                  <Box textAlign="center" py={2} color="gray.600">
                    [reCAPTCHA Component]
                  </Box>
                </Box>
              </HStack>

              <Button colorScheme="teal" onClick={handleSignUp}>
                Create Account
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
        <ModalOverlay />
        <ModalContent borderRadius="md" bg="gray.50" maxW="lg">
          <ModalHeader textAlign="center">Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Input
                  placeholder="Enter your email or username"
                  name="emailOrUsername"
                  value={loginData.emailOrUsername}
                  onChange={handleLoginChange}
                />
              </HStack>
              <HStack justify="space-between">
                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </HStack>

              {/* Google reCAPTCHA placeholder */}
              <HStack justify="center">
                <Box w="100%">
                  {/* Integrate actual reCAPTCHA */}
                  <Box textAlign="center" py={2} color="gray.600">
                    [reCAPTCHA Component]
                  </Box>
                </Box>
              </HStack>

              <Button colorScheme="teal" onClick={handleLogin}>
                Login
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HomePage;
