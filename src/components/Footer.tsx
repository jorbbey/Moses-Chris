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
  Badge,
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
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const TikTokIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.122 6.295 6.295 0 0 0 .614 8.784 6.347 6.347 0 0 0 8.243-.12 6.236 6.236 0 0 0 2.012-4.577V8.536a8.202 8.202 0 0 0 4.756 1.503V6.594a4.832 4.832 0 0 1-1.002.092z" />
  </svg>
);

const facebookPages = [
  { name: "Chris Moses Official", label: "Official Page", url: "https://www.facebook.com/share/1Pbz5WD2RC/?mibextid=wwXIfr" },
  { name: "Chris Moses", label: "Personal Profile", url: "https://www.facebook.com/share/19VBhtTRak/?mibextid=wwXIfr" },
  { name: "Benjamin Lord", label: "Advocacy Profile", url: "https://www.facebook.com/share/18csFLVz9U/?mibextid=wwXIfr" },
  { name: "PIPC Consulting LLC", label: "Organization", url: "https://www.facebook.com/share/19KVmhU2DG/?mibextid=wwXIfr" },
  { name: "CM Trauma Focus", label: "Trauma Hub", url: "https://www.facebook.com/share/19VSoorBZR/?mibextid=wwXIfr" },
];

const tikTokUrl = "https://www.tiktok.com/@trauma.coach.chri?_r=1&_t=ZP-98JNVGT3zXr";
const instagramUrl = "https://www.instagram.com/chris_mosesofficial?igsh=N3NqOThmY3l1MXJz&utm_source=qr";

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showFbMenu, setShowFbMenu] = useState(false);

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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="10" mb="10">
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
            
            {/* Social Icons Bar */}
            <VStack align="flex-start" spaceY="2" w="full">
              <HStack spaceX="2">
                <IconButton
                  aria-label="TikTok - @trauma.coach.chri"
                  title="TikTok: @trauma.coach.chri"
                  bg="slate.800"
                  color="slate.300"
                  _hover={{ bg: "teal.600", color: "white" }}
                  borderRadius="xs"
                  as="a"
                  href={tikTokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TikTokIcon size={16} />
                </IconButton>

                <Box position="relative">
                  <Button
                    size="xs"
                    bg="slate.800"
                    color="slate.300"
                    _hover={{ bg: "teal.600", color: "white" }}
                    borderRadius="xs"
                    onClick={() => setShowFbMenu(!showFbMenu)}
                    leftIcon={<Facebook size={14} />}
                    rightIcon={<ChevronDown size={12} />}
                    px="2"
                    h="32px"
                    fontWeight="medium"
                    fontSize="xs"
                  >
                    Facebook Pages (5)
                  </Button>

                  {showFbMenu && (
                    <Box
                      position="absolute"
                      bottom="100%"
                      left="0"
                      mb="2"
                      w="240px"
                      bg="slate.900"
                      border="1px solid"
                      borderColor="slate.700"
                      borderRadius="xs"
                      p="2"
                      boxShadow="xl"
                      zIndex="50"
                    >
                      <Text fontSize="10px" color="teal.400" fontWeight="bold" uppercase="true" letterSpacing="wider" mb="2" px="2">
                        Official Facebook Profiles
                      </Text>
                      <VStack align="stretch" spaceY="1">
                        {facebookPages.map((page, idx) => (
                          <Box
                            key={idx}
                            as="a"
                            href={page.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            p="2"
                            borderRadius="xs"
                            _hover={{ bg: "slate.800", color: "white" }}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            color="slate.200"
                            fontSize="xs"
                            onClick={() => setShowFbMenu(false)}
                          >
                            <Box>
                              <Text fontWeight="medium" fontSize="xs" color="white">{page.name}</Text>
                              <Text fontSize="10px" color="slate.400">{page.label}</Text>
                            </Box>
                            <ExternalLink size={12} className="text-teal-400" />
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  )}
                </Box>

                <IconButton
                  aria-label="Instagram - @chris_mosesofficial"
                  title="Instagram: @chris_mosesofficial"
                  bg="slate.800"
                  color="slate.300"
                  _hover={{ bg: "teal.600", color: "white" }}
                  borderRadius="xs"
                  as="a"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={16} />
                </IconButton>

                <IconButton aria-label="YouTube Link" bg="slate.800" color="slate.300" _hover={{ bg: "teal.600", color: "white" }} borderRadius="xs" as="a" href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube size={16} />
                </IconButton>
              </HStack>
            </VStack>
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
                <MapPin size={18} className="text-teal-500 shrink-0" />
                <Text fontSize="sm">
                  Global Consulting Services, Office HQ & Counseling Center in US/Europe
                </Text>
              </HStack>
              <HStack spaceX="3">
                <Mail size={16} className="text-teal-500 shrink-0" />
                <Text fontSize="sm">contact@moseschris.com</Text>
              </HStack>
              <HStack spaceX="3">
                <Phone size={16} className="text-teal-500 shrink-0" />
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

        {/* Dedicated Social Channels Banner in Footer */}
        <Box my="6" p="4" bg="slate.900/80" border="1px solid" borderColor="slate.800" borderRadius="xs">
          <Text fontSize="xs" fontWeight="bold" color="white" mb="3" letterSpacing="wider" uppercase="true" display="flex" alignItems="center">
            <Facebook size={14} className="text-teal-400 mr-2 inline" />
            Official Social Media Hub (TikTok, Instagram & Facebook)
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 7 }} gap="3">
            <Box
              as="a"
              href={tikTokUrl}
              target="_blank"
              rel="noopener noreferrer"
              p="2.5"
              bg="slate.800"
              _hover={{ bg: "teal.700", color: "white" }}
              borderRadius="xs"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              color="slate.200"
              transition="all 0.2s"
            >
              <HStack spaceX="2">
                <TikTokIcon size={14} className="text-teal-400" />
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="white" lineHeight="tight">TikTok</Text>
                  <Text fontSize="10px" color="slate.400">@trauma.coach.chri</Text>
                </Box>
              </HStack>
              <ExternalLink size={12} className="text-slate-400" />
            </Box>

            <Box
              as="a"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              p="2.5"
              bg="slate.800"
              _hover={{ bg: "teal.700", color: "white" }}
              borderRadius="xs"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              color="slate.200"
              transition="all 0.2s"
            >
              <HStack spaceX="2">
                <Instagram size={14} className="text-teal-400 shrink-0" />
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="white" lineHeight="tight">Instagram</Text>
                  <Text fontSize="10px" color="slate.400">@chris_mosesofficial</Text>
                </Box>
              </HStack>
              <ExternalLink size={12} className="text-slate-400 shrink-0" />
            </Box>

            {facebookPages.map((page, i) => (
              <Box
                key={i}
                as="a"
                href={page.url}
                target="_blank"
                rel="noopener noreferrer"
                p="2.5"
                bg="slate.800"
                _hover={{ bg: "teal.700", color: "white" }}
                borderRadius="xs"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                color="slate.200"
                transition="all 0.2s"
              >
                <HStack spaceX="2">
                  <Facebook size={14} className="text-teal-400 shrink-0" />
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="white" lineHeight="tight">{page.name}</Text>
                    <Text fontSize="10px" color="slate.400">{page.label}</Text>
                  </Box>
                </HStack>
                <ExternalLink size={12} className="text-slate-400 shrink-0" />
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box pt="6" borderTop="1px solid" borderColor="slate.800" textAlign="center">
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

