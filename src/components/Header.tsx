import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Badge,
  IconButton,
  NativeSelect,
  VStack
} from "@chakra-ui/react";
import { Menu, X, ShoppingCart, User, Award } from "lucide-react";
import { usePlatformStore } from "../store";
import mosesChrisLogo from "../assets/Moses_Chris_trans.png";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { cart, courses } = usePlatformStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Translate navigation label key or fallback
  const getNavLabel = (key: string, customEn: string) => {
    return t(`nav.${key}`, { defaultValue: customEn });
  };

  const navItems = [
    { name: "home", label: getNavLabel("home", "Home"), path: "/" },
    { name: "about", label: getNavLabel("about", "About"), path: "/about" },
    { name: "services", label: getNavLabel("services", "Services"), path: "/services" },
    { name: "academy", label: getNavLabel("academy", "Academy"), path: "/academy" },
    { name: "appointments", label: getNavLabel("appointments", "Appointments"), path: "/appointments" },
    { name: "resources", label: getNavLabel("resources", "Resources"), path: "/resources" },
    { name: "shop", label: getNavLabel("shop", "Shop"), path: "/shop" },
    { name: "blog", label: getNavLabel("blog", "Blog"), path: "/blog" },
    { name: "contact", label: getNavLabel("contact", "Contact"), path: "/contact" },
  ];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const activeCourseCount = courses.filter(c => c.enrolled).length;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="100"
      bg="white"
      borderBottom="1px solid"
      borderColor="navy.200"
      color="navy.800"
    >
      <Box w="100%" px={{ base: "4", md: "10" }} py="3">
        <Flex justify="space-between" align="center">
          {/* Brand/Logo */}
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <Box>
              <VStack align="flex-start" gap="1">
                <Box
                  w="24"
                  h="12"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <img
                    src={mosesChrisLogo}
                    alt="Moses Chris Logo"
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", objectPosition: "left" }}
                    referrerPolicy="no-referrer"
                  />
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "9px", sm: "10px", md: "11px" }}
                    fontWeight="bold"
                    letterSpacing="widest"
                    color="teal.700"
                    textTransform="uppercase"
                    textAlign="left"
                    lineHeight="shorter"
                  >
                    Epidemiologist & Consultant
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <HStack
            as="nav"
            spaceX={{ base: "1", lg: "2" }}
            display={{ base: "none", xl: "flex" }}
          >
            {navItems.map((item) => (
              <Box key={item.name} position="relative">
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    color={isActive(item.path) ? "navy.800" : "navy.500"}
                    bg="transparent"
                    _hover={{ color: "navy.800", bg: "navy.50" }}
                    fontWeight={isActive(item.path) ? "bold" : "semibold"}
                    fontSize="11px"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    px="2.5"
                    borderRadius="xs"
                  >
                    {item.label}
                  </Button>
                </Link>
                {isActive(item.path) && (
                  <Box
                    position="absolute"
                    bottom="-4px"
                    left="50%"
                    transform="translateX(-50%)"
                    w="80%"
                    h="2px"
                    bg="navy.800"
                  />
                )}
              </Box>
            ))}
          </HStack>

          {/* User Controls / Utility */}
          <HStack spaceX="3" align="center">
            {/* Language Switcher */}
            <Box display="flex" alignItems="center">
              <NativeSelect.Root size="xs" variant="subtle" maxW="84px">
                <NativeSelect.Field
                  bg="navy.50"
                  color="navy.800"
                  borderColor="navy.200"
                  _hover={{ borderColor: "navy.800" }}
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  borderRadius="xs"
                >
                  <option value="en" style={{ color: "#0F172A" }}>EN</option>
                  <option value="fr" style={{ color: "#0F172A" }}>FR</option>
                  <option value="es" style={{ color: "#0F172A" }}>ES</option>
                  <option value="pt" style={{ color: "#0F172A" }}>PT</option>
                  <option value="de" style={{ color: "#0F172A" }}>DE</option>
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Box>

            {/* Cart Icon */}
            <Link to="/shop">
              <IconButton
                aria-label="Shop Cart"
                variant="ghost"
                color="navy.800"
                position="relative"
                _hover={{ bg: "navy.50" }}
                borderRadius="xs"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    variant="solid"
                    bg="teal.600"
                    color="white"
                    borderRadius="full"
                    fontSize="10px"
                    fontWeight="extrabold"
                    transform="scale(0.85)"
                    px="1.5"
                  >
                    {cartCount}
                  </Badge>
                )}
              </IconButton>
            </Link>

            {/* Academy Student Profile Shortcut */}
            <Link to="/academy">
              <IconButton
                aria-label="Student LMS Portal"
                variant="outline"
                borderColor="navy.800"
                color="navy.800"
                _hover={{ bg: "navy.800", color: "white" }}
                display={{ base: "none", md: "inline-flex" }}
                borderRadius="xs"
              >
                <User size={18} />
                {activeCourseCount > 0 && (
                  <Box
                    w="8px"
                    h="8px"
                    bg="teal.500"
                    borderRadius="full"
                    position="absolute"
                    top="2px"
                    right="2px"
                  />
                )}
              </IconButton>
            </Link>

            {/* Mobile Menu Toggle */}
            <IconButton
              aria-label="Toggle Navigation Menu"
              display={{ base: "inline-flex", xl: "none" }}
              variant="outline"
              color="navy.800"
              borderColor="navy.200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              _hover={{ bg: "navy.50" }}
              borderRadius="xs"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </IconButton>
          </HStack>
        </Flex>

        {/* Mobile Navigation Drawer Panel */}
        {mobileMenuOpen && (
          <Box
            display={{ base: "block", xl: "none" }}
            mt="4"
            pt="4"
            borderTop="1px solid"
            borderColor="navy.200"
          >
            <Flex direction="column" spaceY="2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    w="full"
                    justifyContent="flex-start"
                    color={isActive(item.path) ? "navy.800" : "navy.600"}
                    bg={isActive(item.path) ? "navy.50" : "transparent"}
                    _hover={{ bg: "navy.50", color: "navy.800" }}
                    fontWeight={isActive(item.path) ? "bold" : "semibold"}
                    textTransform="uppercase"
                    letterSpacing="widest"
                    fontSize="xs"
                    borderRadius="xs"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}

              <HStack pt="4" borderTop="1px solid" borderColor="navy.200" justify="space-between">
                <Link to="/academy" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    size="sm"
                    variant="solid"
                    bg="navy.800"
                    color="white"
                    _hover={{ bg: "navy.700" }}
                    borderRadius="xs"
                  >
                    Student Portal ({activeCourseCount} {activeCourseCount === 1 ? "course" : "courses"})
                  </Button>
                </Link>
              </HStack>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
}
