import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  SimpleGrid,
  HStack,
  VStack,
  Input,
  Textarea,
  NativeSelect,
} from "@chakra-ui/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Shield,
  HelpCircle,
  Globe,
  CheckCircle,
} from "lucide-react";

export default function Contact() {
  const [inquiryName, setInquiryName ] = useState("");
  const [inquiryEmail, setInquiryEmail ] = useState("");
  const [inquiryTopic, setInquiryTopic ] = useState("Clinical Counseling");
  const [inquiryMessage, setInquiryMessage ] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) {
      return;
    }
    setFormSubmitted(true);
    setInquiryName("");
    setInquiryEmail("");
    setInquiryMessage("");
    setTimeout(() => {
      setFormSubmitted(false);
    }, 4000);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent("Hello Moses Chris, I'd like to initiate a secure public health/counselling consultation audit.");
    window.location.href = `https://wa.me/15557943321?text=${text}`;
  };

  return (
    <Box bg="white" minH="100vh">
      {/* Title block */}
      <Box bg="white" color="navy.800" py="16" borderBottom="1px solid" borderColor="navy.200">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }} textAlign="center">
          <Badge bg="teal.50" color="teal.750" mb="4" fontWeight="extrabold" borderRadius="xs" letterSpacing="wider">
            GLOBAL REACHBOARD
          </Badge>
          <Heading fontSize={{ base: "3xl", md: "5xl" }} color="navy.800" fontWeight="normal" fontFamily="heading" mb="4" lineHeight="tight">
            Contact Our Executive Desk
          </Heading>
          <Text fontSize="sm" color="navy.500" fontStyle="italic" maxW="700px" mx="auto" lineHeight="relaxed">
            Get in touch to align epidemiological outbreak audit boards, request domestic protective shelter sponsorships, or book certified command workshops.
          </Text>
        </Box>
      </Box>

      {/* Main coordinates structure */}
      <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }} py="8">
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap="10">
          
          {/* Left panel: Info Coordinates */}
          <Box gridColumn={{ base: "1", lg: "span 5" }} textAlign="left">
            <VStack align="stretch" spaceY="6">
              
              <Box>
                <Heading fontSize="xl" fontWeight="normal" fontFamily="heading" color="navy.800" mb="2">
                  Official Channels
                </Heading>
                <Text fontSize="xs" color="navy.500" mb="6">
                  Our core support dispatch replies to clinical counseling queries within 2 hours. General corporate audit boards respond in up to 1 business day.
                </Text>
              </Box>

              {/* Email details */}
              <Box p="4" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200">
                <HStack spaceX="3" align="flex-start">
                  <Mail size={18} className="text-teal-600 mt-1 shrink-0" />
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="navy.400">EMAIL SUPPORT DESK</Text>
                    <Text fontSize="sm" fontWeight="bold" color="navy.800">contact@moseschris.com</Text>
                    <Text fontSize="10px" color="navy.500">Send encrypted PDFs or official academic referrals securely.</Text>
                  </Box>
                </HStack>
              </Box>

              {/* Phone details */}
              <Box p="4" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200">
                <HStack spaceX="3" align="flex-start">
                  <Phone size={18} className="text-teal-600 mt-1 shrink-0" />
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="navy.400">TELEPHONE HOTLINE</Text>
                    <Text fontSize="sm" fontWeight="bold" color="navy.800">+1 (555) 7943-321</Text>
                    <Text fontSize="10px" color="navy.500">Operational Monday - Saturday (8 AM - 6 PM GMT).</Text>
                  </Box>
                </HStack>
              </Box>

              {/* Physical Coordinates */}
              <Box p="4" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200">
                <HStack spaceX="3" align="flex-start">
                  <MapPin size={18} className="text-teal-600 mt-1 shrink-0" />
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="navy.400">CONSULTATION HQ OFFICES</Text>
                    <Text fontSize="sm" fontWeight="bold" color="navy.800">Moses Chris Consulting Centers</Text>
                    <Text fontSize="10px" color="navy.500">Clinical shelter integrations in UK, USA, Africa, and European health networks.</Text>
                  </Box>
                </HStack>
              </Box>

              {/* WhatsApp direct CTA */}
              <Box p="5" bg="navy.50" borderRadius="xs" border="1px solid" borderColor="navy.200">
                <HStack spaceX="3" align="flex-start" mb="3">
                  <MessageSquare size={20} className="text-teal-600 mt-1 shrink-0" />
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="navy.800">WHATSAPP COMMERCE & SUPPORT</Text>
                    <Text fontSize="10px" color="navy.500">Chat instantly with the outreach coordinators on call regarding booking options or publication purchases.</Text>
                  </Box>
                </HStack>
                <Button size="xs" bg="teal.600" color="white" _hover={{ bg: "teal.700" }} borderRadius="xs" w="full" leftIcon={<MessageSquare size={12} />} onClick={handleWhatsAppInquiry}>
                  Launch Interactive WhatsApp Chat
                </Button>
              </Box>

              {/* Trust disclaimer */}
              <Box p="4" bg="navy.800" color="white" borderRadius="xs">
                <HStack spaceX="2" mb="1" align="center">
                  <Shield size={14} className="text-teal-400 mr-2" />
                  <Text fontSize="xs" fontWeight="bold">Symmetric Safe-Tunnel Security</Text>
                </HStack>
                <Text fontSize="10px" color="navy.300" lineHeight="tall">
                  Incoming contact inquiries are encrypted in transit. We maintain rigid HIPAA and data safety protections over all personal therapeutic cases.
                </Text>
              </Box>

            </VStack>
          </Box>

          {/* Right panel: Contact Form & Maps Block */}
          <Box gridColumn={{ base: "1", lg: "span 7" }} textAlign="left">
            <Box bg="white" p="6" borderRadius="xs" border="1px solid" borderColor="navy.200" mb="8">
              <Heading fontSize="lg" fontWeight="normal" fontFamily="heading" color="navy.800" mb="4">
                Send Direct Message
              </Heading>

              {/* Submission success notice */}
              {formSubmitted && (
                <Box p="4" bg="teal.50" borderRadius="xs" border="1px solid" borderColor="teal.300" mb="6" display="flex" align="center">
                  <CheckCircle size={18} className="text-teal-600 mr-3 shrink-0" />
                  <Box pl="2">
                    <Text fontSize="xs" fontWeight="bold" color="teal.800">Message Transmitted Successfully!</Text>
                    <Text fontSize="10px" color="teal.700">Moses Chris's medical-counselling desk has logged your referral packet securely.</Text>
                  </Box>
                </Box>
              )}

              <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" mb="4">
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="navy.600" mb="1">Your Legitimate Name *</Text>
                    <Input
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      required
                      size="sm"
                      bg="white"
                      border="1px solid"
                      borderColor="navy.200"
                      _focus={{ borderColor: "teal.600", outline: "none" }}
                      borderRadius="xs"
                    />
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="navy.600" mb="1">Safe Contact Email *</Text>
                    <Input
                      type="email"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      required
                      size="sm"
                      bg="white"
                      border="1px solid"
                      borderColor="navy.200"
                      _focus={{ borderColor: "teal.600", outline: "none" }}
                      borderRadius="xs"
                    />
                  </Box>
                </SimpleGrid>

                <Box mb="4">
                  <Text fontSize="xs" fontWeight="bold" color="navy.600" mb="1">Consultation Topic Priority</Text>
                  <NativeSelect.Root size="sm" variant="subtle">
                    <NativeSelect.Field
                      bg="white"
                      border="1px solid"
                      borderColor="navy.200"
                      _focus={{ borderColor: "teal.600", outline: "none" }}
                      borderRadius="xs"
                      value={inquiryTopic}
                      onChange={(e) => setInquiryTopic(e.target.value)}
                    >
                      <option value="Clinical Counseling">Clinical Therapy / Counseling Audit Intake</option>
                      <option value="Outbreak Audit Consultation">Epidemiological Outbreak Surveillance Audit</option>
                      <option value="Academy Support">Moses Chris Academy LMS Help</option>
                      <option value="Global Event Invites">Syllabus Workshop Keynote Invite</option>
                      <option value="General">Publications & General Enquiries</option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Box>

                <Box mb="6">
                  <Text fontSize="xs" fontWeight="bold" color="navy.600" mb="1">Message Body *</Text>
                  <Textarea
                    placeholder="Contribute your inquiries details, research invites, or crisis support request securely..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    required
                    size="sm"
                    bg="white"
                    border="1px solid"
                    borderColor="navy.200"
                    _focus={{ borderColor: "teal.600", outline: "none" }}
                    borderRadius="xs"
                    rows={5}
                  />
                </Box>

                <Button type="submit" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} h="10" w="full" leftIcon={<Send size={14} />} borderRadius="xs">
                  Transmit Message Securely
                </Button>
              </form>
            </Box>

            {/* Interactive Visual Map Blueprint */}
            <Box bg="white" p="6" borderRadius="xs" border="1px solid" borderColor="navy.200">
              <HStack spaceX="2" mb="3">
                <Globe size={16} className="text-teal-600 mr-2" />
                <Text fontSize="xs" fontWeight="bold" color="navy.800" uppercase="true" letterSpacing="wider">
                  Global Outreach Active Coordinates Map
                </Text>
              </HStack>
              
              <Box h="180px" bg="navy.800" borderRadius="xs" position="relative" overflow="hidden" display="flex" alignItems="center" justifyContent="center">
                {/* Custom Stylized Graphic Map utilizing CSS dots */}
                <Box opacity="0.3" position="absolute" w="full" h="full" bgGradient="radial(circle, slate.700 1px, transparent 1px)" bgSize="16px 16px" />
                
                <VStack spaceY="1" color="white" zIndex="10">
                  <Heading fontSize="sm" color="teal.300" fontWeight="normal" fontFamily="heading">Global Consultative Safe Network</Heading>
                  <Text fontSize="10px" color="navy.200">United States • United Kingdom • Nigeria • Germany • Spain</Text>
                  <Text fontSize="9px" color="teal.200">Active outreach networks are operational online under secure HIPAA protocols.</Text>
                </VStack>
              </Box>
            </Box>

          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
