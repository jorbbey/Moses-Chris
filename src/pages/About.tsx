import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Flex,
  HStack,
  VStack,
  Image,
  Button,
} from "@chakra-ui/react";
import {
  BookOpen,
  Award,
  Shield,
  Activity,
  Globe,
  Briefcase,
  Heart,
  UserCheck,
  FileText,
  Compass,
  Trophy,
  Users,
  CheckCircle,
  TrendingUp,
  MapPin,
  GraduationCap,
} from "lucide-react";
import mchrisHero1 from "../assets/MChris Hero 1.jpg";
import mchrisAbout from "../assets/MChris About.jpg";
import mchrisAboutPageI from "../assets/MChris_AboutPage_I.jpg";
import mchrisInAct from "../assets/Mchris_in_act.jpg";

export default function About() {
  const [activeTab, setActiveTab] = useState<"ventures" | "research" | "books">("ventures");

  const coreValues = [
    {
      title: "Universal Compassion",
      desc: "Providing safe counseling support, child security, and family guidance without prejudice."
    },
    {
      title: "Scholarly Precision & Truth",
      desc: "Delivering epidemiological consulting and clinical biosafety tracing founded on robust scientific evidence."
    },
    {
      title: "Unyielding Advocacy",
      desc: "Championing social justice, domestic abuse safety plans, and child survival globally."
    },
    {
      title: "Collaborative Empowerment",
      desc: "Developing capacity, sparking conversations, and creating a ripple effect of positivity."
    }
  ];

  const ventures = [
    {
      name: "PIPC Consulting LLC",
      role: "CEO / Founder",
      desc: "A premier advisory helping global institutions formulate infectious disease containment, domestic abuse safety loops, and emergency preparedness strategies."
    },
    {
      name: "Chris Moses Wellness Academy",
      role: "CEO / Founder",
      desc: "An educational platform designed to empower minds, offer training in epidemiology, child survival protection, and compassion fatigue management."
    },
    {
      name: "Chris Moses Grocery Hub",
      role: "CEO / Founder",
      desc: "A social venture focusing on health food options, addressing supply equity, and exploring wholesome nutrition beyond traditional boundary choices."
    }
  ];

  const researchPapers = [
    {
      num: 1,
      title: "Networks for Pandemic Preparedness using Community Emergency Response Teams (CERTs)",
      subtitle: "A Comparative Study of COVID-19 Response in 10 West and Central African Countries",
      tag: "Epidemiology & Outbreak"
    },
    {
      num: 2,
      title: "COVID-19 and its Impacts on Recovered Patients",
      subtitle: "Tracing physiological and long-term diagnostic updates across affected demographics.",
      tag: "Clinical Surveillance"
    },
    {
      num: 3,
      title: "A Study on Parental Satisfaction in Extremely Premature Neonatal Care Services across the United States",
      subtitle: "Evaluating safety protocols, pediatric systems, and post-partum care support models.",
      tag: "Maternal & Child Health"
    },
    {
      num: 4,
      title: "Hazard Vulnerability Intern Profiles",
      subtitle: "Analyzing incident command frameworks, risk maps, and organizational adaptive levels.",
      tag: "Crisis Response"
    },
    {
      num: 5,
      title: "The Safety of Baby Boxes for Reducing SIDS Risks",
      subtitle: "A critical public health review of preventive safety measures for infant housing.",
      tag: "Pediatric Safekeeping"
    },
    {
      num: 6,
      title: "Exploring Health Food Options Beyond Individual Choices",
      subtitle: "Investigating systemic equity, food deserts, and communal distribution channels.",
      tag: "Public Health Nutrition"
    },
    {
      num: 7,
      title: "Infectious Disease Risk Assessment in King County, Washington",
      subtitle: "Comprehensive localized surveillance data mapping and emergency response coordination.",
      tag: "County Biohazard Assessment"
    },
    {
      num: 8,
      title: "Strengthening Surveillance Systems and Emergency Preparedness",
      subtitle: "Optimizing institutional reporting channels and emergency mitigation responses.",
      tag: "Surveillance Technology"
    },
    {
      num: 9,
      title: "Best Practices in Trying DVPO Cases: A Case Study",
      subtitle: "Legal and community methodologies for handling Domestic Violence Protection Orders with evidence.",
      tag: "Domestic Abuse Advocacy"
    },
    {
      num: 10,
      title: "Women Sexually Abused: A Case Study of Dangbo Village",
      subtitle: "A clinical and cultural inquiry into recovery barriers and community response networks.",
      tag: "Victim Assistance Science"
    }
  ];

  const novels = [
    {
      title: "Renewal: A Story of Survival and Self-Discovery",
      type: "Fiction / Spiritual Healing",
      desc: "An evocative story following the journeys of overcoming trauma, discovering resilience, and rebuilding core human dignity."
    },
    {
      title: "Safeguarding Democracy: A Warning to America and the World",
      type: "Political Philosophy / Social Justice",
      desc: "Advocating for democratic protections, systemic transparent health systems, and proactive constitutional awareness."
    },
    {
      title: "Voodoo Ransom: A Father’s Love vs. a Mother’s Secrets",
      type: "Psychological Suspense / Custody",
      desc: "A gripping analysis of a custody dispute involving international elements, child custody interference, and family resilience."
    }
  ];

  const careerHighlights = [
    {
      icon: <Globe size={18} className="text-teal-600" />,
      title: "Anti-Corruption Protection",
      desc: "Led an anti-corruption organization in the Benin Republic, championing administrative transparency, democratic values, and institutional integrity."
    },
    {
      icon: <Shield size={18} className="text-teal-600" />,
      title: "Human Rights & Journalism",
      desc: "Worked actively as a Human Rights Activist and investigative journalist, documenting victim struggles and securing public attention on injustices."
    },
    {
      icon: <Briefcase size={18} className="text-teal-600" />,
      title: "Diverse Multi-Sector Service",
      desc: "Served in key professional roles across highly distinguished bodies including Delorme Universal, Super Tech, Edormond Community College, and Harborview Medical Center."
    },
    {
      icon: <Award size={18} className="text-teal-600" />,
      title: "Global Leadership Positions",
      desc: "Held executive leadership offices in international and national advocacy, healthcare, and education coalitions."
    }
  ];

  return (
    <Box bg="white" minH="100vh">
      {/* SECTION 1: ELEGANT HERO ROW (with mchrisHero1) */}
      <Box bg="navy.50" color="navy.800" py={{ base: "12", md: "20" }} borderBottom="1px solid" borderColor="navy.200">
        <Box maxW="90%" mx="auto">
          <SimpleGrid columns={{ base: 1, lg: 12 }} gap="12" align="center">
            {/* Left Column Text */}
            <Box textStyle="left" gridColumn={{ base: "1", lg: "span 7" }} textAlign="left">
              <Badge bg="teal.600" color="white" mb="3" fontWeight="bold" px="3" py="1" borderRadius="xs" textTransform="uppercase" letterSpacing="wider">
                AUTHOR • TRAINER • EPIDEMIOLOGIST
              </Badge>
              <Heading fontSize={{ base: "3xl", md: "5xl" }} color="navy.800" fontWeight="normal" fontFamily="heading" mb="4">
                Chris S. Moses
              </Heading>
              <Heading fontSize="lg" color="teal.700" fontWeight="medium" mb="6" fontFamily="sans-serif">
                Renowned Expert in Preventing Child Custody Interference, International Child Abduction, and Domestic Violence.
              </Heading>
              <Text fontSize="sm" color="navy.600" mb="6" lineHeight="tall">
                With a rich, diverse background spanning field epidemiology, child and maternal health systems, and complex emergency project management, Chris S. Moses has dedicated his life to protecting vulnerable populations. 
              </Text>
              <Text fontSize="sm" color="navy.600" mb="8" lineHeight="tall">
                As a global consultant, Chris trains organizations worldwide, sharing critical expertise in Public Health, Victim Assistance programs, socio-legal protections, and diversity, inclusion, and bias.
              </Text>
              <HStack spaceX="4" wrap="wrap">
                <Button bg="navy.800" color="white" _hover={{ bg: "navy.700" }} borderRadius="xs" size="md" fontWeight="bold" as="a" href="/contact">
                  Request Consultation
                </Button>
                <Button variant="outline" borderColor="teal.600" color="teal.600" _hover={{ bg: "teal.50" }} borderRadius="xs" size="md" fontWeight="bold" as="a" href="#research-catalog">
                  Explore Publications
                </Button>
              </HStack>
            </Box>

            {/* Right Column Image Framed elegantly */}
            <Box gridColumn={{ base: "1", lg: "span 5" }} display="flex" justifyContent="center">
              <Box position="relative" w={{ base: "284px", md: "384px" }} h={{ base: "340px", md: "460px" }}>
                {/* Visual shadow border ornament */}
                <Box
                  position="absolute"
                  bg="teal.700"
                  top="-4"
                  left="-4"
                  w="full"
                  h="full"
                  borderRadius="xs"
                  zIndex="0"
                />
                <Box
                  position="relative"
                  zIndex="1"
                  bg="white"
                  w="full"
                  h="full"
                  borderRadius="xs"
                  border="1px solid"
                  borderColor="navy.200"
                  overflow="hidden"
                  boxShadow="md"
                >
                  <Image
                    src={mchrisAboutPageI}
                    alt="Chris S. Moses Professional Portrait"
                    objectFit="cover"
                    w="full"
                    h="full"
                    referrerPolicy="no-referrer"
                  />
                  <Box position="absolute" bottom="0" left="0" right="0" bg="rgba(10, 25, 47, 0.85)" py="3" px="4" backdropFilter="blur(4px)">
                    <Text fontSize="12px" color="teal.300" textTransform="uppercase" letterSpacing="widest" fontWeight="semibold">
                      Chris S. Moses
                    </Text>
                    <Text fontSize="10px" color="white" opacity="0.8">
                      CEO & Public Health Scholar
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      {/* SECTION 2: BIOGRAPHY DETAILS & EXPERTISE ROW (with mchrisAbout) */}
      <Box py="16" maxW="90%" mx="auto">
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap="12">
          {/* Left Column Photo Framed */}
          <Box gridColumn={{ base: "1", lg: "span 5" }} display="flex" justifyContent="center" order={{ base: 2, lg: 1 }}>
            <Box position="relative" w={{ base: "284px", md: "364px" }} h={{ base: "340px", md: "440px" }} mx="auto" mt={{ base: "6", lg: "0" }}>
              {/* Artistic decorative frame */}
              <Box
                position="absolute"
                bg="navy.800"
                bottom="-4"
                right="-4"
                w="full"
                h="full"
                borderRadius="xs"
                zIndex="0"
              />
              <Box
                position="relative"
                zIndex="1"
                bg="white"
                w="full"
                h="full"
                borderRadius="xs"
                border="1px solid"
                borderColor="navy.200"
                overflow="hidden"
                boxShadow="md"
              >
                <Image
                  src={mchrisInAct}
                  alt="Chris S. Moses in academic field work"
                  objectFit="cover"
                  w="full"
                  h="full"
                  referrerPolicy="no-referrer"
                />
                <Box position="absolute" top="0" left="0" bg="teal.600" color="white" px="3" py="1" fontSize="10px" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                  In Practice
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Column Core Biography, Mission & Values */}
          <Box gridColumn={{ base: "1", lg: "span 7" }} order={{ base: 1, lg: 2 }} textAlign="left">
            <Heading fontSize="2xl" fontWeight="normal" fontFamily="heading" color="navy.800" mb="4" borderBottom="1px solid" borderColor="navy.200" pb="2">
              Mission and Values
            </Heading>
            <Text fontSize="sm" color="navy.600" mb="4" lineHeight="tall">
              Chris S. Moses believes in pure human potential. He is deeply dedicated to **empowering minds, sparking meaningful conversations, and illuminating the path to success** for those navigating crisis.
            </Text>
            <Text fontSize="sm" color="navy.600" mb="6" lineHeight="tall">
              His core purpose is to create an enduring **ripple effect of positivity**, encouraging and inspiring individuals to unleash their full capability and make a meaningful, compassionate impact on the world.
            </Text>

            <Heading fontSize="2xl" fontWeight="normal" fontFamily="heading" color="navy.800" mb="4" pt="4" borderBottom="1px solid" borderColor="navy.200" pb="2">
              Background and Expertise
            </Heading>
            <Text fontSize="sm" color="navy.600" mb="4" lineHeight="tall">
              As a seasoned author and structured trainer, Chris has written and researched extensively on child and elder abuse, compassion fatigue, child custody, custody interference, international child kidnapping, criminal and social justice, Chain Currency Wellness, High Blood Pressure, Maternal and Child Health, and domestic violence.
            </Text>
            <Text fontSize="sm" color="navy.600" mb="6" lineHeight="tall">
              Notably, he successfully defended a **masterly thesis on Domestic Violence and Victim Assistance with Distinction**, generating direct recommendations for publication in authoritative socio-legal journals.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* SECTION 3: CORE FOUNDATIONS OF WISDOM */}
      <Box bg="navy.800" color="white" py="16">
        <Box maxW="90%" mx="auto">
          <VStack textAlign="center" spaceY="2" mb="12">
            <Badge bg="teal.600" color="white" px="3" py="1" borderRadius="xs" fontWeight="bold">
              OPERATING ETHICS
            </Badge>
            <Heading fontSize="3xl" color="white" fontWeight="normal" fontFamily="heading">
              Our Core Philosophical Foundations
            </Heading>
            <Text fontSize="xs" color="slate.300" maxW="600px">
              Every system designed, training conducted, or counseling provided by Chris S. Moses aligns strictly with these four pillars of action.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6">
            {coreValues.map((val, idx) => (
              <Box key={idx} p="6" bg="navy.900" borderRadius="xs" border="1px solid" borderColor="navy.700" transition="all 0.3s" _hover={{ borderColor: "teal.500" }}>
                <CheckCircle size={28} className="text-teal-400 mb-4" />
                <Heading fontSize="md" color="white" mb="3" fontWeight="bold">
                  {val.title}
                </Heading>
                <Text fontSize="xs" color="slate.300" lineHeight="tall">
                  {val.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* SECTION 4: CAREER HIGHLIGHTS GRID */}
      <Box py="16" bg="white" borderBottom="1px solid" borderColor="navy.200">
        <Box maxW="90%" mx="auto">
          <VStack textAlign="center" spaceY="2" mb="12">
            <Badge bg="teal.50" color="teal.700" px="3" py="1" borderRadius="xs" fontWeight="bold">
              TRACK RECORD
            </Badge>
            <Heading fontSize="3xl" color="navy.800" fontWeight="normal" fontFamily="heading">
              Executive Career Highlights
            </Heading>
            <Text fontSize="xs" color="navy.500" maxW="600px">
              Over two decades of dedication, ranging from democratic advocacy in West Africa to healthcare coordination in administrative nodes.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="8">
            {careerHighlights.map((hl, idx) => (
              <Box key={idx} p="6" bg="navy.50" borderRadius="xs" border="1px solid" borderColor="navy.150" textAlign="left">
                <Box p="3" bg="white" borderRadius="xs" w="10" h="10" display="flex" alignItems="center" justifyContent="center" mb="4" border="1px solid" borderColor="navy.200">
                  {hl.icon}
                </Box>
                <Heading fontSize="sm" color="navy.800" fontWeight="bold" mb="2">
                  {hl.title}
                </Heading>
                <Text fontSize="xs" color="navy.600" lineHeight="tall">
                  {hl.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* SECTION 5: INTERACTIVE TABS - PUBLICATIONS, VENTURES & PAPERS (ID referenced) */}
      <Box id="research-catalog" bg="navy.50" py="16" borderBottom="1px solid" borderColor="navy.200">
        <Box maxW="90%" mx="auto">
          <VStack textAlign="center" spaceY="2" mb="10">
            <Badge bg="teal.600" color="white" px="3" py="1" borderRadius="xs" fontWeight="bold">
              THE AUTHOR'S ARCHIVE
            </Badge>
            <Heading fontSize="3xl" color="navy.800" fontWeight="normal" fontFamily="heading">
              Ventures, Novels & Scientific Research
            </Heading>
            <Text fontSize="xs" color="navy.500" maxW="600px">
              Explore the spectrum of Chris S. Moses' work, ranging from active business corporations to best-selling literature and field monographs.
            </Text>
          </VStack>

          {/* Tab Navigation buttons */}
          <Flex justify="center" mb="10" spaceX="2" wrap="wrap" direction="row">
            <Button
              size="sm"
              bg={activeTab === "ventures" ? "navy.800" : "white"}
              color={activeTab === "ventures" ? "white" : "navy.800"}
              onClick={() => setActiveTab("ventures")}
              _hover={{ bg: "navy.800", color: "white" }}
              borderRadius="xs"
              border="1px solid"
              borderColor={activeTab === "ventures" ? "navy.800" : "navy.200"}
              px="6"
              py="4"
              m="1"
              fontWeight="bold"
            >
              Current Corporate Ventures
            </Button>
            <Button
              size="sm"
              bg={activeTab === "books" ? "navy.800" : "white"}
              color={activeTab === "books" ? "white" : "navy.800"}
              onClick={() => setActiveTab("books")}
              _hover={{ bg: "navy.800", color: "white" }}
              borderRadius="xs"
              border="1px solid"
              borderColor={activeTab === "books" ? "navy.800" : "navy.200"}
              px="6"
              py="4"
              m="1"
              fontWeight="bold"
            >
              Published Novels & Literature
            </Button>
            <Button
              size="sm"
              bg={activeTab === "research" ? "navy.800" : "white"}
              color={activeTab === "research" ? "white" : "navy.800"}
              onClick={() => setActiveTab("research")}
              _hover={{ bg: "navy.800", color: "white" }}
              borderRadius="xs"
              border="1px solid"
              borderColor={activeTab === "research" ? "navy.800" : "navy.200"}
              px="6"
              py="4"
              m="1"
              fontWeight="bold"
            >
              Scientific & Legal Research Papers ({researchPapers.length})
            </Button>
          </Flex>

          {/* TAB 1: CORPORATE VENTURES */}
          {activeTab === "ventures" && (
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
              {ventures.map((ven, idx) => (
                <Box key={idx} p="6" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200" boxShadow="sm" textAlign="left" borderTopWidth="4px" borderTopColor="teal.600">
                  <Badge bg="teal.50" color="teal.750" mb="2" fontWeight="extrabold" fontSize="10px">
                    {ven.role}
                  </Badge>
                  <Heading fontSize="md" color="navy.800" mb="3" fontWeight="bold">
                    {ven.name}
                  </Heading>
                  <Text fontSize="xs" color="navy.500" lineHeight="tall">
                    {ven.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          )}

          {/* TAB 2: PUBLISHED NOVELS */}
          {activeTab === "books" && (
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
              {novels.map((nov, idx) => (
                <Box key={idx} p="6" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200" boxShadow="sm" textAlign="left" display="flex" flexDirection="column" justifyContent="space-between">
                  <Box>
                    <Badge bg="navy.50" color="navy.800" mb="3" fontWeight="semibold" fontSize="9px" px="2" py="0.5">
                      {nov.type}
                    </Badge>
                    <Heading fontSize="md" color="navy.800" mb="3" fontFamily="heading">
                      {nov.title}
                    </Heading>
                    <Text fontSize="xs" color="navy.500" lineHeight="tall" mb="6">
                      {nov.desc}
                    </Text>
                  </Box>
                  <Button size="xs" colorScheme="teal" variant="link" color="teal.700" fontWeight="bold" as="a" href="/shop" alignSelf="flex-start">
                    View in Shop →
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          )}

          {/* TAB 3: SCIENTIFIC RESEARCH PAPERS */}
          {activeTab === "research" && (
            <VStack align="stretch" spaceY="4">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                {researchPapers.map((paper) => (
                  <Box key={paper.num} p="5" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200" boxShadow="sm" textAlign="left" position="relative" pl="14">
                    {/* Index Sphere */}
                    <Box
                      position="absolute"
                      left="4"
                      top="5"
                      w="7"
                      h="7"
                      borderRadius="full"
                      bg="teal.600"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="bold"
                      fontSize="xs"
                    >
                      {paper.num}
                    </Box>
                    <Badge bg="teal.50" color="teal.800" mb="1" fontSize="9px" fontWeight="bold" borderRadius="xs">
                      {paper.tag}
                    </Badge>
                    <Heading fontSize="sm" color="navy.800" fontWeight="semibold" mb="1" lineHeight="short">
                      {paper.title}
                    </Heading>
                    <Text fontSize="xs" color="navy.500" fontStyle="italic">
                      {paper.subtitle}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
              <Text fontSize="xs" color="navy.400" textAlign="center" mt="4">
                * Note: To request access, citations, or physical prints of these studies for public journals or NGO work, please submit a verified query via the contact console.
              </Text>
            </VStack>
          )}
        </Box>
      </Box>

      {/* SECTION 6: THE VISUAL PHOTO SHOWCASE GALLERY */}
      <Box py="16" bg="white">
        <Box maxW="90%" mx="auto">
          <VStack textAlign="center" spaceY="2" mb="12">
            <Badge bg="teal.600" color="white" px="3" py="1" borderRadius="xs" fontWeight="bold">
              PHOTO PORTFOLIO
            </Badge>
            <Heading fontSize="3xl" color="navy.800" fontWeight="normal" fontFamily="heading">
              Captured Moments of Practice & Guidance
            </Heading>
            <Text fontSize="xs" color="navy.500" maxW="600px">
              A dual visual representation of Chris S. Moses' work, bridging rigorous epidemiological study with direct community victim assistance consultation.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
            {/* Gallery Image 1 */}
            <Box bg="navy.50" p="4" borderRadius="xs" border="1px solid" borderColor="navy.200" position="relative">
              <Box borderRadius="xs" overflow="hidden" h={{ base: "300px", md: "400px" }} w="full">
                <Image
                  src={mchrisAboutPageI}
                  alt="Chris S. Moses as Trainer & Consultant"
                  w="full"
                  h="full"
                  objectFit="cover"
                  referrerPolicy="no-referrer"
                />
              </Box>
              <Box mt="4" textAlign="left">
                <Badge variant="solid" bg="teal.600" color="white" mb="2" borderRadius="xs" fontSize="10px">
                  ADMINISTRATIVE SCHOLASTIC CORE
                </Badge>
                <Heading fontSize="md" color="navy.800" mb="1" fontWeight="bold">
                  The Clinical Trainer & Expert
                </Heading>
                <Text fontSize="xs" color="navy.500" lineHeight="short">
                  Chris Moses delivering insights inside public health forums, assisting agencies, government boards, and domestic support shelter frameworks.
                </Text>
              </Box>
            </Box>

            {/* Gallery Image 2 */}
            <Box bg="navy.50" p="4" borderRadius="xs" border="1px solid" borderColor="navy.200" position="relative">
              <Box borderRadius="xs" overflow="hidden" h={{ base: "300px", md: "400px" }} w="full">
                <Image
                  src={mchrisInAct}
                  alt="Chris S. Moses Domestic Safe Space Director"
                  w="full"
                  h="full"
                  objectFit="cover"
                  referrerPolicy="no-referrer"
                />
              </Box>
              <Box mt="4" textAlign="left">
                <Badge variant="solid" bg="navy.800" color="white" mb="2" borderRadius="xs" fontSize="10px">
                  FIELD ADVOCACY ACTION
                </Badge>
                <Heading fontSize="md" color="navy.800" mb="1" fontWeight="bold">
                  Ground-Level Human Rights & Research
                </Heading>
                <Text fontSize="xs" color="navy.500" lineHeight="short">
                  Advocating for democratic protection, custody interference intervention, and pandemic preparedness response across municipal zones.
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      {/* SECTION 7: CALL TO ACTION FOR INQUIRIES */}
      <Box py="12" bg="navy.50" borderTop="1px solid" borderColor="navy.200">
        <Box maxW="90%" mx="auto">
          <Box border="1px solid" borderColor="navy.200" borderRadius="xs" bg="white" p="8" position="relative" overflow="hidden">
            <SimpleGrid columns={{ base: 1, md: 10 }} gap="8" align="center">
              <Box gridColumn={{ base: "1", md: "span 3" }}>
                <Image
                  src="https://images.unsplash.com/photo-1579684389782-64d84b5e902a?auto=format&fit=crop&q=80&w=300"
                  alt="Epidemiology and Health research tools"
                  borderRadius="xs"
                  referrerPolicy="no-referrer"
                />
              </Box>
              <Box gridColumn={{ base: "1", md: "span 7" }} textAlign="left">
                <Heading fontSize="xl" fontWeight="normal" fontFamily="heading" color="navy.800" mb="2">
                  Need to Verify Credentials or Bulk Book Training?
                </Heading>
                <Text fontSize="xs" color="navy.500" mb="6" lineHeight="tall">
                  Chris S. Moses maintains standard certifications under premium state registers and emergency committees for mental therapy, human rights advocacy, and epidemiologic investigation agencies. If your academic institution, government hospital, or safety shelter requires official certification transcripts or seeks custom group counseling structures, feel free to submit a verified inquiry.
                </Text>

                <HStack spaceX="3">
                  <Button size="xs" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} fontWeight="bold" borderRadius="xs" as="a" href="mailto:contact@moseschris.com">
                    Request Credential Packet
                  </Button>
                  <Button size="xs" variant="outline" borderColor="navy.800" color="navy.800" _hover={{ bg: "navy.50" }} borderRadius="xs" as="a" href="/services">
                    Download Service Brochure
                  </Button>
                </HStack>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
