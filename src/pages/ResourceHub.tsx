import React, { useState } from "react";
import { usePlatformStore } from "../store";
import { ResourceInfo } from "../types";
import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Button,
  SimpleGrid,
  HStack,
  VStack,
  Input,
  IconButton,
  Image,
} from "@chakra-ui/react";
import {
  Search,
  Download,
  FileCheck,
  Award,
  AlertOctagon,
  ShieldAlert,
  ChevronRight,
  TrendingDown,
  Activity,
  Heart,
  Tags,
} from "lucide-react";

export default function ResourceHub() {
  const { resources, incrementResourceDownload } = usePlatformStore();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const categories = [
    "All",
    "Mental Health",
    "Domestic Violence",
    "Public Health",
    "Emergency Preparedness",
    "Child Welfare",
    "Maternal Health"
  ];

  const handleDownload = (id: string, title: string) => {
    incrementResourceDownload(id);
    alert(`Downloading requested PDF framework: ${title}. Keep this information safe.`);
  };

  const filteredResources = resources.filter((res) => {
    const matchesCategory = activeCategory === "All" || res.category === activeCategory;
    const matchesQuery = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         res.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !activeTag || res.tags.includes(activeTag);
    return matchesCategory && matchesQuery && matchesTag;
  });

  // Extract all unique tags
  const allTags = Array.from(new Set(resources.flatMap((r) => r.tags)));

  return (
    <Box bg="slate.50" minH="100vh">
      {/* Visual Header */}
      <Box bg="navy.800" color="white" py="16" borderBottom="3px solid" borderColor="gold.500">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} spaceY={{ base: "6", md: "0" }}>
            <Box textAlign="left">
              <Badge bg="gold.500" color="navy.800" mb="4" fontWeight="extrabold" borderRadius="xs" letterSpacing="wider">
                PUBLIC CLINICAL DIGITAL ARCHIVE
              </Badge>
              <Heading fontSize={{ base: "3xl", md: "5xl" }} color="white" fontWeight="extrabold" mb="4" lineHeight="tight">
                Advocacy Resources Hub
              </Heading>
              <Text fontSize="sm" color="slate.300" maxW="600px" lineHeight="relaxed">
                Search, filter, and obtain verified outreach files, neonatal milestone boards, and immediate domestic safe maps compiled by Moses Chris.
              </Text>
            </Box>

            <Box p="4" bg="navy.900" borderRadius="xl" border="1px solid" borderColor="slate.700">
              <Text fontSize="xl" fontWeight="bold" color="teal.400" textAlign="center">
                {resources.reduce((acc, r) => acc + r.downloadCount, 0)}
              </Text>
              <Text fontSize="9px" color="slate.400">TOTAL RESOURCE DOWNLOADS</Text>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Main Core */}
      <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }} py="8">
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap="8">
          {/* Left panel: Filters, Categories & Tags */}
          <Box gridColumn={{ base: "1", lg: "span 3" }} textAlign="left">
            <VStack align="stretch" spaceY="6">
              {/* Category selector */}
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="slate.400" uppercase="true" letterSpacing="wider" mb="3">
                  Filter by Category
                </Text>
                <VStack align="stretch" spaceY="1">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      size="xs"
                      variant="ghost"
                      justifyContent="flex-start"
                      color={activeCategory === cat ? "teal.600" : "slate.700"}
                      bg={activeCategory === cat ? "teal.50" : "transparent"}
                      fontWeight={activeCategory === cat ? "bold" : "medium"}
                      onClick={() => { setActiveCategory(cat); setActiveTag(null); }}
                      _hover={{ bg: "slate.100" }}
                    >
                      {cat}
                    </Button>
                  ))}
                </VStack>
              </Box>

              {/* Tags Cloud Filter */}
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="slate.400" uppercase="true" letterSpacing="wider" mb="3">
                  Filter by Tags
                </Text>
                <HStack spaceX="1.5" wrap="wrap" justify="flex-start">
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      size="9px"
                      variant="outline"
                      borderColor={activeTag === tag ? "teal.500" : "slate.200"}
                      bg={activeTag === tag ? "teal.50" : "white"}
                      color={activeTag === tag ? "teal.600" : "slate.600"}
                      onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                      borderRadius="full"
                      px="2"
                    >
                      #{tag}
                    </Button>
                  ))}
                </HStack>
              </Box>

              {/* Secure usage guidelines panel */}
              <Box p="4" bg="amber.50" borderRadius="xl" borderLeft="4px solid" borderColor="amber-500">
                <HStack spaceX="1.5" mb="1" align="center">
                  <AlertOctagon size={14} className="text-amber-600 mr-2 shrink-0" />
                  <Text fontSize="xs" fontWeight="bold" color="amber-800">Secure Storage Notice</Text>
                </HStack>
                <Text fontSize="10px" color="amber-700" lineHeight="tall">
                  For your immediate protection, do not stockpile sensitive escape safety planners on public computers. Clear your browser cache and cookies history after download completes if in high-hazard domestic environments.
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Right panel: Search inputs & Resources results */}
          <Box gridColumn={{ base: "1", lg: "span 9" }} textAlign="left">
            {/* Search Input bar */}
            <HStack spaceX="2" bg="white" px="4" py="2" borderRadius="xl" border="1px solid" borderColor="slate.200" mb="8">
              <Search size={18} className="text-slate-400" />
              <Input
                placeholder="Search medical guidelines, checklist SOPs, transition shelters databases..."
                size="sm"
                border="none"
                _focus={{ outline: "none", boxShadow: "none" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </HStack>

            {/* Resources list cards */}
            {filteredResources.length === 0 ? (
              <Box py="16" bg="white" borderRadius="2xl" textAlign="center" border="1px dashed" borderColor="slate.300">
                <FileCheck size={44} className="text-slate-300 mx-auto mb-2" />
                <Heading fontSize="sm" fontWeight="bold" color="navy.800" mb="1">No clinical files matches</Heading>
                <Text fontSize="xs" color="slate.500">Try modifying your text queries or reset category filters.</Text>
              </Box>
            ) : (
              <VStack align="stretch" spaceY="6">
                {filteredResources.map((res) => (
                  <Box
                    key={res.id}
                    p="6"
                    bg="white"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="slate.200"
                    boxShadow="sm"
                  >
                    <Flex justify="space-between" align="start" wrap="wrap" gap="4">
                      <VStack align="flex-start" spaceY="2" flex="1">
                        <HStack spaceX="2" wrap="wrap">
                          <Badge bg="teal.600" color="white" fontSize="9px">
                            {res.category}
                          </Badge>
                          <Badge variant="outline" color="slate.500" fontSize="9px">
                            {res.fileSize}
                          </Badge>
                          <Badge variant="ghost" colorScheme="slate" fontSize="9px">
                            {res.downloadCount} downloads
                          </Badge>
                        </HStack>

                        <Heading fontSize="md" fontWeight="bold" color="navy.800">
                          {res.title}
                        </Heading>

                        <Text fontSize="xs" color="slate.600" lineHeight="tall">
                          {res.description}
                        </Text>
                        
                        <HStack spaceX="1.5" pt="2" wrap="wrap">
                          <Tags size={12} className="text-slate-400 mr-1" />
                          {res.tags.map((t) => (
                            <Badge key={t} variant="solid" bg="slate.100" color="slate.600" fontSize="8px">
                              #{t}
                            </Badge>
                          ))}
                        </HStack>
                      </VStack>

                      <Button
                        size="xs"
                        bg="navy.800"
                        color="white"
                        _hover={{ bg: "teal.600" }}
                        leftIcon={<Download size={14} />}
                        onClick={() => handleDownload(res.id, res.title)}
                      >
                        Download PDF Framework
                      </Button>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
