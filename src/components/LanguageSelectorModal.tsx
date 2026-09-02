import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  IconButton,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { Search, Globe, X, Check, Sparkles } from "lucide-react";
import { ALL_LANGUAGES, POPULAR_LANGUAGE_CODES, LanguageOption } from "../data/languages";
import {
  getStoredLanguage,
  changeApplicationLanguage,
  subscribeLanguageChange,
} from "../services/translator";

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LanguageSelectorModal({ isOpen, onClose }: LanguageSelectorModalProps) {
  const [currentLang, setCurrentLang] = useState<string>(getStoredLanguage());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [isTranslating, setIsTranslating] = useState(false);
  const [justSelected, setJustSelected] = useState<string | null>(null);

  useEffect(() => {
    return subscribeLanguageChange((lang) => {
      setCurrentLang(lang);
    });
  }, []);

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered languages list
  const filteredLanguages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ALL_LANGUAGES.filter((item) => {
      // Region filter
      if (selectedRegion === "Popular") {
        if (!POPULAR_LANGUAGE_CODES.includes(item.code)) return false;
      } else if (selectedRegion !== "All" && item.region !== selectedRegion) {
        return false;
      }

      // Search filter
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.nativeName.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.region.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedRegion]);

  const handleSelectLanguage = async (lang: LanguageOption) => {
    setJustSelected(lang.name);
    setIsTranslating(true);
    await changeApplicationLanguage(lang.code);
    setCurrentLang(lang.code);

    setTimeout(() => {
      setIsTranslating(false);
      setJustSelected(null);
      onClose();
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="9999"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: "3", md: "6" }}
      bg="black/60"
      backdropFilter="blur(6px)"
      onClick={onClose}
    >
      <Box
        position="relative"
        w="100%"
        maxW="820px"
        maxH="90vh"
        bg="white"
        color="slate.800"
        borderRadius="md"
        boxShadow="2xl"
        border="1px solid"
        borderColor="navy.200"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Box px={{ base: "4", md: "6" }} py="4" bg="navy.900" color="white">
          <Flex justify="space-between" align="center">
            <HStack spaceX="3">
              <Box p="2" bg="teal.600" borderRadius="xs" color="white">
                <Globe size={20} />
              </Box>
              <Box>
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" lineHeight="tight">
                  Choose Your Language & Native Dialect
                </Text>
                <Text fontSize="xs" color="slate.300">
                  Over 55 worldwide languages supported • Full application instant transcription
                </Text>
              </Box>
            </HStack>

            <IconButton
              aria-label="Close"
              variant="ghost"
              color="slate.300"
              _hover={{ color: "white", bg: "white/10" }}
              size="sm"
              onClick={onClose}
            >
              <X size={18} />
            </IconButton>
          </Flex>
        </Box>

        {/* Translation notification indicator */}
        {isTranslating && (
          <Box px="4" py="2" bg="teal.600" color="white" textAlign="center" fontSize="xs" fontWeight="bold">
            <HStack justify="center" spaceX="2">
              <Sparkles size={14} className="animate-spin" />
              <Text>Translating full application to {justSelected}...</Text>
            </HStack>
          </Box>
        )}

        {/* Search & Region Filters */}
        <Box p={{ base: "3", md: "4" }} bg="slate.50" borderBottom="1px solid" borderColor="slate.200">
          <HStack spaceX="2" bg="white" px="3" py="2" borderRadius="sm" border="1px solid" borderColor="slate.300" mb="3">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search by language name, e.g. Igbo, Yoruba, Hausa, French, Spanish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                outline: "none",
                fontSize: "14px",
                backgroundColor: "transparent",
                border: "none",
                color: "#1e293b",
              }}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
              >
                <X size={14} />
              </button>
            )}
          </HStack>

          {/* Region Tabs */}
          <Flex wrap="wrap" gap="1.5">
            {[
              { id: "All", label: "All Languages (55+)" },
              { id: "African", label: "🌍 African (Igbo, Yoruba, Hausa, Swahili...)" },
              { id: "Popular", label: "⭐ Most Popular" },
              { id: "European", label: "🇪🇺 European" },
              { id: "Asian", label: "🌏 Asian" },
              { id: "Middle East", label: "🕌 Middle East" },
            ].map((tab) => (
              <Button
                key={tab.id}
                size="xs"
                variant={selectedRegion === tab.id ? "solid" : "outline"}
                bg={selectedRegion === tab.id ? "navy.800" : "white"}
                color={selectedRegion === tab.id ? "white" : "slate.700"}
                borderColor={selectedRegion === tab.id ? "navy.800" : "slate.300"}
                _hover={{ bg: selectedRegion === tab.id ? "navy.700" : "slate.100" }}
                borderRadius="full"
                px="3"
                py="1"
                fontWeight="medium"
                fontSize="xs"
                onClick={() => setSelectedRegion(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </Flex>
        </Box>

        {/* Language Grid */}
        <Box p={{ base: "3", md: "5" }} overflowY="auto" flex="1" maxH="55vh">
          {filteredLanguages.length === 0 ? (
            <VStack py="10" spaceY="2" color="slate.500">
              <Globe size={32} className="text-slate-400" />
              <Text fontWeight="semibold">No languages found matching &ldquo;{searchQuery}&rdquo;</Text>
              <Text fontSize="xs">Try searching for &ldquo;Igbo&rdquo;, &ldquo;Yoruba&rdquo;, &ldquo;Swahili&rdquo;, or &ldquo;Hausa&rdquo;</Text>
              <Button size="xs" variant="outline" mt="2" onClick={() => { setSearchQuery(""); setSelectedRegion("All"); }}>
                Reset Filters
              </Button>
            </VStack>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="2.5">
              {filteredLanguages.map((lang) => {
                const isCurrent = currentLang === lang.code;
                return (
                  <Button
                    key={lang.code}
                    variant="outline"
                    h="auto"
                    py="2.5"
                    px="3"
                    justifyContent="flex-start"
                    bg={isCurrent ? "teal.50" : "white"}
                    borderColor={isCurrent ? "teal.500" : "slate.200"}
                    borderWidth={isCurrent ? "1.5px" : "1px"}
                    _hover={{ bg: isCurrent ? "teal.100/50" : "slate.50", borderColor: "teal.400" }}
                    borderRadius="sm"
                    onClick={() => handleSelectLanguage(lang)}
                    display="flex"
                    alignItems="center"
                    w="100%"
                  >
                    <HStack spaceX="3" w="100%" justify="space-between">
                      <HStack spaceX="2.5" align="center" overflow="hidden">
                        <Text fontSize="xl" lineHeight="1" flexShrink={0}>
                          {lang.flag}
                        </Text>
                        <VStack align="flex-start" spaceY="0" overflow="hidden" textAlign="left">
                          <Text
                            fontSize="xs"
                            fontWeight={isCurrent ? "bold" : "semibold"}
                            color={isCurrent ? "teal.900" : "slate.800"}
                            lineHeight="tight"
                            isTruncated
                          >
                            {lang.name}
                          </Text>
                          <Text fontSize="10px" color="slate.500" lineHeight="tight" isTruncated>
                            {lang.nativeName}
                          </Text>
                        </VStack>
                      </HStack>

                      {isCurrent ? (
                        <Badge bg="teal.600" color="white" fontSize="9px" px="1.5" py="0.5" borderRadius="full">
                          <Check size={10} className="inline mr-0.5" /> Active
                        </Badge>
                      ) : (
                        <Text fontSize="10px" color="slate.400" textTransform="uppercase">
                          {lang.code}
                        </Text>
                      )}
                    </HStack>
                  </Button>
                );
              })}
            </SimpleGrid>
          )}
        </Box>

        {/* Footer info */}
        <Box px={{ base: "4", md: "6" }} py="3" bg="slate.100" borderTop="1px solid" borderColor="slate.200">
          <Flex justify="space-between" align="center" direction={{ base: "column", sm: "row" }} gap="2">
            <Text fontSize="xs" color="slate.600">
              Selected: <strong>{ALL_LANGUAGES.find(l => l.code === currentLang)?.name || "English"}</strong> ({currentLang.toUpperCase()})
            </Text>
            <HStack spaceX="2">
              {currentLang !== "en" && (
                <Button
                  size="xs"
                  variant="ghost"
                  color="teal.700"
                  _hover={{ bg: "teal.100" }}
                  onClick={() => handleSelectLanguage({ code: "en", name: "English", nativeName: "English", flag: "🇬🇧", region: "European" })}
                >
                  Reset to English
                </Button>
              )}
              <Button size="xs" variant="solid" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} onClick={onClose}>
                Done
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
