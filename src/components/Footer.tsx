import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Input,
  Button,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import {
  Facebook,
  Instagram,
  Youtube,
  Send,
  Phone,
  Mail,
  MapPin,
  Heart,
  BookOpen,
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <Box as="footer" bg="navy.800" color="slate.400" pt="10" pb="6" borderTop="1px solid" borderColor="navy.200">
      <Box w="100%" px={{ base: "4", md: "10" }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="10" mb="12">
          {/* Brand Presentation */}
          <VStack align="flex-start" spaceY="4">
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="tight">
                MOSES CHRIS
              </Text>
              <Text fontSize="xs" color="teal.500" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                Redefining Community Care & Advocacy
              </Text>
            </Box>
            <Text fontSize="sm" lineHeight="tall">
              Moses Chris is a dedicated Author, Epidemiologist, Mental Health Counsellor, and Human Rights Advocate operating with an inclusive mission of care and scholarly action.
            </Text>
            <HStack spaceX="3 pt-2">
              <IconButton aria-label="Facebook Link" bg="slate.800" _hover={{ bg: "teal.600", color: "white" }} borderRadius="xs" as="a" href="https://facebook.com" target="_blank">
                <Facebook size={16} />
              </IconButton>
              <IconButton aria-label="Instagram Link" bg="slate.800" _hover={{ bg: "teal.600", color: "white" }} borderRadius="xs" as="a" href="https://instagram.com" target="_blank">
                <Instagram size={16} />
              </IconButton>
              <IconButton aria-label="YouTube Link" bg="slate.800" _hover={{ bg: "teal.600", color: "white" }} borderRadius="xs" as="a" href="https://youtube.com" target="_blank">
                <Youtube size={16} />
              </IconButton>
            </HStack>
          </VStack>

          {/* Quick Pillars */}
          <VStack align="flex-start" spaceY="3">
            <Box fontSize="md" fontWeight="bold" color="white" position="relative" pb="2">
              Our Active Pillars
              <Box position="absolute" bottom="0" left="0" w="40px" h="2px" bg="teal.600" />
            </Box>
            <VStack align="flex-start" spaceY="1">
              <Link to="/services"><Text fontSize="sm" _hover={{ color: "teal.400" }}>Epidemiological Operations</Text></Link>
              <Link to="/services"><Text fontSize="sm" _hover={{ color: "teal.400" }}>Trauma Counselling & Support</Text></Link>
              <Link to="/services"><Text fontSize="sm" _hover={{ color: "teal.400" }}>Domestic Violence Safety Advocacy</Text></Link>
              <Link to="/services"><Text fontSize="sm" _hover={{ color: "teal.400" }}>Maternal & Pediatric Wellness</Text></Link>
              <Link to="/academy"><Text fontSize="sm" _hover={{ color: "teal.400" }}>Incident Command Training</Text></Link>
            </VStack>
          </VStack>

          {/* Contact Details */}
          <VStack align="flex-start" spaceY="3">
            <Box fontSize="md" fontWeight="bold" color="white" position="relative" pb="2">
              Consulting Offices
              <Box position="absolute" bottom="0" left="0" w="40px" h="2px" bg="teal.600" />
            </Box>
            <VStack align="flex-start" spaceY="3">
              <HStack spaceX="3" align="flex-start">
                <MapPin size={18} className="text-teal-500" />
                <Text fontSize="sm">
                  Global Consulting Services, Office HQ & Counseling Center in US/Europe
                </Text>
              </HStack>
              <HStack spaceX="3">
                <Mail size={16} className="text-teal-500" />
                <Text fontSize="sm">contact@moseschris.com</Text>
              </HStack>
              <HStack spaceX="3">
                <Phone size={16} className="text-teal-500" />
                <Text fontSize="sm">+1 (555) 7943-321</Text>
              </HStack>
            </VStack>
          </VStack>

          {/* Newsletter and updates */}
          <VStack align="flex-start" spaceY="4">
            <Box fontSize="md" fontWeight="bold" color="white" position="relative" pb="2">
              Dispatch Advocacy
              <Box position="absolute" bottom="0" left="0" w="40px" h="2px" bg="teal.600" />
            </Box>
            <Text fontSize="sm">
              Subscribe to obtain occasional alerts regarding outbreak containment checklists, domestic shelter support updates, and new courses.
            </Text>
            {subscribed ? (
              <Box p="3" bg="slate.800" borderRadius="xs" borderLeft="3px solid" borderColor="teal.500" w="full">
                <Text fontSize="xs" fontWeight="bold" color="teal.400">✓ Subscription Confirmed!</Text>
                <Text fontSize="10px">You are added to Moses Chris's mailing list.</Text>
              </Box>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full">
                <Flex>
                  <Input
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    bg="slate.900"
                    border="none"
                    borderColor="transparent"
                    _focus={{ outline: "none" }}
                    mr="2"
                    size="sm"
                    color="white"
                    borderRadius="xs"
                  />
                  <Button type="submit" bg="teal.600" color="white" _hover={{ bg: "teal.500" }} size="sm" borderRadius="xs">
                    <Send size={14} />
                  </Button>
                </Flex>
              </form>
            )}
          </VStack>
        </SimpleGrid>

        <Box pt="8" borderTop="1px solid" borderColor="slate.800" textAlign="center">
          <Text fontSize="xs" color="slate.500">
            © {new Date().getFullYear()} Moses Chris Platform Ecosystem. All Rights Reserved. Built as an enterprise health portal.
          </Text>
          <HStack justify="center" mt="2" spaceX="2">
            <Heart size={10} className="text-red-500 fill-current" />
            <Text fontSize="10px" color="slate.600">
              Committed to Universal Care, Epidemic Defense, and Human Resilience.
            </Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
