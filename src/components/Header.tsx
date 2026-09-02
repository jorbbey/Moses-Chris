import React, { useState, useEffect } from "react";
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
  VStack,
} from "@chakra-ui/react";
import { Menu, X, ShoppingCart, User, Globe, ChevronDown } from "lucide-react";
import { usePlatformStore } from "../store";
import mosesChrisLogo from "../assets/moseschrislogo-trans.png"; 
import LanguageSelectorModal from "./LanguageSelectorModal";
import {
  getStoredLanguage,
  subscribeLanguageChange,
  changeApplicationLanguage,
} from "../services/translator";
import { getLanguageByCode } from "../data/languages";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { cart, courses } = usePlatformStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>(getStoredLanguage());

  useEffect(() => {
    return subscribeLanguageChange((newLang) => {
      setCurrentLang(newLang);
    });
  }, []);

  const activeLangObj = getLanguageByCode(currentLang);

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
                  h="10"
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
            {/* Language Selector Button */}
            <Button
              variant="outline"
              size="xs"
              h="32px"
              px="2.5"
              borderColor="navy.200"
              color="navy.800"
              bg="white"
              _hover={{ bg: "teal.50", borderColor: "teal.500" }}
              borderRadius="xs"
              onClick={() => setLangModalOpen(true)}
              title="Change language - Over 55 worldwide languages available"
            >
              <HStack spaceX="1.5">
                <Globe size={14} className="text-teal-600" />
                <Text fontSize="xs" fontWeight="bold">
                  {activeLangObj ? `${activeLangObj.flag} ${activeLangObj.name}` : "🌐 English"}
                </Text>
                <ChevronDown size={12} className="text-slate-400" />
              </HStack>
            </Button>

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

              {/* Mobile Language Switcher Section */}
              <Box pt="4" borderTop="1px solid" borderColor="navy.200">
                <Flex justify="space-between" align="center" mb="2.5">
                  <HStack spaceX="1.5">
                    <Globe size={15} className="text-teal-600" />
                    <Text fontSize="xs" fontWeight="bold" color="navy.800" textTransform="uppercase" letterSpacing="wider">
                      Language: {activeLangObj?.flag} {activeLangObj?.name || "English"}
                    </Text>
                  </HStack>
                  <Button
                    size="xs"
                    variant="subtle"
                    bg="teal.50"
                    color="teal.800"
                    _hover={{ bg: "teal.100" }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLangModalOpen(true);
                    }}
                    borderRadius="xs"
                    fontSize="10px"
                    fontWeight="bold"
                    px="2"
                  >
                    All 55+ Languages
                  </Button>
                </Flex>

                {/* Quick 1-tap language pills */}
                <Flex wrap="wrap" gap="1.5">
                  {[
                    { code: "en", name: "English", flag: "🇬🇧" },
                    { code: "ig", name: "Igbo", flag: "🇳🇬" },
                    { code: "yo", name: "Yoruba", flag: "🇳🇬" },
                    { code: "ha", name: "Hausa", flag: "🇳🇬" },
                    { code: "sw", name: "Swahili", flag: "🇰🇪" },
                    { code: "fr", name: "Français", flag: "🇫🇷" },
                    { code: "es", name: "Español", flag: "🇪🇸" },
                    { code: "ar", name: "العربية", flag: "🇸🇦" },
                  ].map((l) => (
                    <Button
                      key={l.code}
                      size="xs"
                      variant={currentLang === l.code ? "solid" : "outline"}
                      bg={currentLang === l.code ? "teal.600" : "white"}
                      color={currentLang === l.code ? "white" : "slate.700"}
                      borderColor={currentLang === l.code ? "teal.600" : "slate.200"}
                      fontSize="10px"
                      px="2.5"
                      py="1"
                      borderRadius="full"
                      onClick={async () => {
                        await changeApplicationLanguage(l.code);
                        setCurrentLang(l.code);
                      }}
                    >
                      {l.flag} {l.name}
                    </Button>
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>

      {/* 55+ Worldwide Languages Selection Modal */}
      <LanguageSelectorModal
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
      />
    </Box>
  );
}
