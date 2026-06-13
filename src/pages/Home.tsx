import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  SimpleGrid,
  HStack,
  VStack,
  Badge,
  Image,
} from "@chakra-ui/react";
import {
  ShieldAlert,
  Brain,
  Award,
  Heart,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Activity,
  Milestone,
  CheckCircle,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { usePlatformStore } from "../store";
import mchrisHero1 from "../assets/MChris Hero 1.jpg";
import mchrisAbout from "../assets/MChris About.jpg";
import { BookCover } from "../components/BookCover";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { courses, products } = usePlatformStore();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Take first 3 courses to showcase
  const featuredCourses = courses.slice(0, 3);
  
  // Take book products to showcase
  const featuredBooks = products.filter(p => p.category === "book" || p.category === "ebook").slice(0, 3);

  const testimonials = [
    {
      id: 1,
      quote: "Moses Chris has been an invaluable asset to our municipal health crisis council. His dual competency in clinical epidemiology and trauma counseling restored alignment and order inside our community isolation hubs.",
      author: "Dr. Alistair Vance, Regional Health Commissioner",
    },
    {
      id: 2,
      quote: "The workbook on escaping abuse provided practical, step-by-step security advice that changed my outlook entirely. His compassion and knowledge shine through every page.",
      author: "Evelyn C., Domestic Violence Advocacy Scholar",
    },
    {
      id: 3,
      quote: "Attending the Incident Command training was a career-defining moment. Moses brings unmatched theoretical depth and hands-on crisis command simulations.",
      author: "Major Sarah G., Emergency Resource Coordinator",
    }
  ];

  const stats = [
    { value: "121+", label: t("stats.certificates", "Certificates & Credentials") },
    { value: "164+", label: t("stats.awards", "Global Awards") },
    { value: "298+", label: t("stats.cases", "Resolved Public & Personal Cases") }
  ];

  const services = [
    {
      icon: <Activity size={32} className="text-teal-500" />,
      title: "Epidemiological Surveillance",
      desc: "Local/regional disease tracking models, biohazard containment, clinical research, and outbreak simulation workshops.",
      tag: "Consulting"
    },
    {
      icon: <Brain size={32} className="text-teal-500" />,
      title: "Clinical Counselling",
      desc: "Licensed therapeutic counselling focusing on anxiety, post-partum distress, relationship healing, and cognitive reconstruction.",
      tag: "Therapy"
    },
    {
      icon: <ShieldAlert size={32} className="text-teal-500" />,
      title: "Domestic Violence Advocacy",
      desc: "Frontline victim protection frameworks, immediate hazard safety mapping, legal restraining resources, and educational seminars.",
      tag: "Advocacy"
    },
    {
      icon: <Heart size={32} className="text-teal-500" />,
      title: "Maternal & Child Wellness",
      desc: "Community-driven prenatal tracking systems, nourishment coaching, pediatrician coordinate lists, and neonatal care resources.",
      tag: "Wellness"
    },
    {
      icon: <TrendingUp size={32} className="text-teal-500" />,
      title: "Executive Leadership Coaching",
      desc: "Capacity-building audits, ethical command leadership structure, and organizational transition counselling for key executives.",
      tag: "Coaching"
    },
    {
      icon: <Layers size={32} className="text-teal-500" />,
      title: "Emergency Response Command",
      desc: "Custom incident command structural plans, FEMA-integrated disaster readiness schedules, and frontline coordinator training.",
      tag: "Training"
    }
  ];

  const upcomingEvents = [
    {
      title: "Incident Command Structure (ICS) Certification Seminar",
      date: "June 12, 2026",
      time: "10:00 AM - 3:00 PM EST",
      type: "Online Zoom Workshop",
      tag: "Academy Course Prep"
    },
    {
      title: "Coercive Control & Legal Protection Frameworks Masterclass",
      date: "June 25, 2026",
      time: "2:00 PM - 5:00 PM EST",
      type: "Interactive Seminar (Hybrid)",
      tag: "Domestic Advocacy"
    },
    {
      title: "Outbreak Response Field Prep & Diagnostics Lab",
      date: "July 08, 2026",
      time: "9:00 AM - 1:00 PM EST",
      type: "Regional Clinical Center",
      tag: "Public Health"
    }
  ];

  return (
    <Box>
      {/* 1. HERO SECTION */}
      <Box
        position="relative"
        bg="white"
        color="navy.800"
        pt={{ base: "8", md: "16" }}
        pb={{ base: "12", md: "20" }}
        px={{ base: "2", md: "0" }}
        borderBottom="1px solid"
        borderColor="navy.200"
        overflow="hidden"
      >
        <Box maxW="90%" mx="auto">
          <SimpleGrid columns={{ base: 1, lg: 12 }} gap="12" align="center">
            {/* Left Texts */}
            <Box textStyle="left" gridColumn={{ base: "1", lg: "span 7" }}>
              <Badge
                variant="solid"
                bg="teal.50"
                color="teal.700"
                mb="4"
                fontWeight="extrabold"
                fontSize="xs"
                letterSpacing="wider"
                px="3.5"
                py="1.5"
                borderRadius="xs"
              >
                <Sparkles size={12} style={{ display: "inline-block", marginRight: "4px" }} />
                AUTHOR • EPIDEMIOLOGIST • COUNSELLOR
              </Badge>
              
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "5.5xl", xl: "7xl" }}
                fontWeight="normal"
                fontFamily="heading"
                lineHeight="shorter"
                mb="4"
                color="navy.800"
                letterSpacing="tight"
              >
                We Care<br />
                <span style={{ color: "#78716C", fontStyle: "italic" }}>About You.</span>
              </Heading>

              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="medium"
                color="teal.700"
                lineHeight="short"
                mb="4"
              >
                {t("hero.sub", "Redefining Public Health, Mental Wellness, Child Protection, & Domestic Violence Support")}
              </Text>

              <Text
                fontSize="sm"
                color="navy.500"
                lineHeight="tall"
                mb="8"
                maxW="xl"
              >
                {t("hero.desc", "Moses Chris handles dual-mission efforts as an expert Epidemiologist, Master Counsellor, Author, and Crisis Command Trainer — delivering research-backed consulting and deeply compassionate personal guidance.")}
              </Text>

              <Flex direction={{ base: "column", sm: "row" }} spaceX={{ sm: "4" }} spaceY={{ base: "3", sm: "0" }}>
                <Link to="/appointments">
                  <Button
                    size="lg"
                    bg="navy.800"
                    color="white"
                    fontWeight="bold"
                    _hover={{ bg: "navy.700" }}
                    w="full"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    fontSize="xs"
                    borderRadius="xs"
                  >
                    {t("hero.cta_book", "Book Appointment")}
                  </Button>
                </Link>
                <Link to="/academy">
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="navy.200"
                    color="navy.800"
                    _hover={{ bg: "navy.50" }}
                    w="full"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    fontSize="xs"
                    borderRadius="xs"
                  >
                    {t("hero.cta_academy", "Explore Academy")}
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="ghost"
                    color="navy.800"
                    _hover={{ bg: "navy.50" }}
                    w="full"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    fontSize="xs"
                    borderRadius="xs"
                  >
                    {t("hero.cta_contact", "Contact Moses")}
                  </Button>
                </Link>
              </Flex>
            </Box>

            {/* Right Graphic/Portrait Mockup */}
            <Box gridColumn={{ base: "1", lg: "span 5" }} display="flex" justifyContent="center">
              <Box position="relative">
                {/* Visual Frame */}
                <Box
                  position="absolute"
                  top="4"
                  left="4"
                  w="full"
                  h="full"
                  border="1px solid"
                  borderColor="navy.200"
                  borderRadius="xs"
                  zIndex="0"
                />
                <Box
                  bg="navy.100"
                  w={{ base: "280px", md: "380px" }}
                  h={{ base: "320px", md: "440px" }}
                  borderRadius="xs"
                  position="relative"
                  zIndex="1"
                  overflow="hidden"
                >
                  <Image
                    src={mchrisHero1}
                    alt="Moses Chris Professional Presentation"
                    objectFit="cover"
                    w="full"
                    h="full"
                    referrerPolicy="no-referrer"
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="white"
                    p="4"
                    borderTop="1px solid"
                    borderColor="navy.200"
                  >
                    <Text fontSize="xs" fontWeight="bold" color="navy.800">Moses Chris, MPH, Registered Therapist</Text>
                    <Text fontSize="9px" fontWeight="bold" color="teal.700" letterSpacing="wider" textTransform="uppercase">AUTHOR • EPIDEMIOLOGIST • HUMAN RIGHTS ADVOCATE</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      {/* 2. ACHIEVEMENT STATISTICS COUTNERS */}
      <Box bg="navy.800" color="white" py="8" borderBottom="1px solid" borderColor="navy.900">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="8" textAlign="center">
            {stats.map((stat, idx) => (
              <VStack key={idx} spaceY="1">
                <Text fontSize="4xl" fontWeight="bold" fontFamily="heading" fontStyle="italic" color="white">
                  {stat.value}
                </Text>
                <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" color="navy.300">
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* 3. BIOGRAPHY PREVIEW */}
      <Box py="12" maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
        <SimpleGrid columns={{ base: 1, md: 12 }} gap="12" align="center">
          <Box gridColumn={{ base: "1", md: "span 5" }} display="flex" justifyContent="center">
            <Box position="relative" w={{ base: "284px", md: "384px" }} h={{ base: "340px", md: "460px" }} mx="auto">
              {/* Artistic decorative background frame */}
              <Box
                position="absolute"
                bg="teal.600"
                top="4"
                left="4"
                w="full"
                h="full"
                border="1px solid"
                borderColor="navy.250"
                borderRadius="xs"
                zIndex="0"
              />
              {/* Main Image Container */}
              <Box
                position="relative"
                zIndex="1"
                bg="navy.50"
                w="full"
                h="full"
                borderRadius="xs"
                border="1px solid"
                borderColor="navy.200"
                overflow="hidden"
                boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              >
                <Image
                  src={mchrisAbout}
                  alt="About Moses Chris"
                  objectFit="cover"
                  w="full"
                  h="full"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle visual banner overlay for completeness */}
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  bg="rgba(10, 25, 47, 0.75)"
                  py="2"
                  px="3"
                  backdropFilter="blur(4px)"
                >
                  <Text fontSize="10px" color="teal.300" textTransform="uppercase" letterSpacing="widest" fontWeight="semibold">
                    Moses Chris In Consultation
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box gridColumn={{ base: "1", md: "span 7" }} textAlign="left">
            <Badge variant="solid" bg="teal.600" color="white" mb="2" borderRadius="xs">
              ABOUT MOSES CHRIS
            </Badge>
            <Heading fontSize="3xl" fontWeight="normal" fontFamily="heading" mb="4" color="navy.800">
              A Dual Calling: High Science & Personal Sanctuary
            </Heading>
            <Text fontSize="sm" color="navy.500" mb="4" lineHeight="tall">
              Moses Chris believes that local communities require both institutional precision and empathetic spaces to survive infectious, psychological, and social threats. This philosophy unites his dual roles: identifying disease curves and helping survivors reclaim wellness in safe, private clinical therapy.
            </Text>
            <Text fontSize="sm" color="navy.500" mb="6" lineHeight="tall">
              He has spent over two decades advising public councils, presenting at clinical seminars, training emergency medical squads, and writing manual guides that translate emergency protocols into straightforward, lifesaving tools.
            </Text>
            <Link to="/about">
              <Button size="sm" bg="navy.800" color="white" rightIcon={<ArrowRight size={14} />} _hover={{ bg: "teal.600" }} borderRadius="xs">
                Read Biography & Credentials
              </Button>
            </Link>
          </Box>
        </SimpleGrid>
      </Box>

      {/* 4. SERVICES OVERVIEW */}
      <Box bg="navy.800" color="white" py="12" borderBottom="1px solid" borderColor="navy.900">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }} textAlign="center">
          <Badge bg="teal.600" color="white" mb="2" fontWeight="bold" borderRadius="xs">
            SERVICES & OPERATIONS
          </Badge>
          <Heading fontSize="3xl" fontWeight="normal" fontFamily="heading" mb="2" color="white">
            {t("services.title", "Professional Expertise")}
          </Heading>
          <Text fontSize="sm" color="navy.300" maxW="600px" mx="auto" mb="12">
            {t("services.subtitle", "Global consulting and compassionate support in crucial domains")}
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8">
            {services.map((svc, idx) => (
              <Box
                key={idx}
                p="6"
                bg="navy.900"
                borderRadius="xs"
                border="1px solid"
                borderColor="slate.700"
                textAlign="left"
                transition="all 0.2s"
                _hover={{ transform: "translateY(-4px)", borderColor: "teal.400" }}
              >
                <HStack justify="space-between" align="flex-start" mb="4">
                  <Box p="3" bg="navy.800" borderRadius="xs" color="teal.400">
                    {svc.icon}
                  </Box>
                  <Badge variant="solid" bg="teal.600" color="white" fontSize="9px" borderRadius="xs">
                    {svc.tag}
                  </Badge>
                </HStack>
                <Heading fontSize="lg" fontWeight="bold" mb="2" color="white">
                  {svc.title}
                </Heading>
                <Text fontSize="xs" color="slate.300" lineHeight="tall" mb="5">
                  {svc.desc}
                </Text>
                <Link to="/services">
                  <Button size="xs" variant="ghost" color="teal.400" _hover={{ color: "teal.300" }} rightIcon={<ArrowRight size={10} />} px="0">
                    Explore Domain Details
                  </Button>
                </Link>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* 5. ACADEMY PREVIEW */}
      <Box py="12" maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
        <Flex justify="space-between" align="flex-end" mb="10" direction={{ base: "column", sm: "row" }}>
          <Box mb={{ base: "4", sm: "0" }}>
            <Badge variant="solid" bg="teal.600" color="white" mb="2" borderRadius="xs">
              LMS LEARNING MANAGEMENT SYSTEM
            </Badge>
            <Heading fontSize="3xl" color="navy.800" fontWeight="normal" fontFamily="heading">
              Moses Chris Academy Portal
            </Heading>
            <Text fontSize="sm" color="navy.500">
              Interactive coursework with progress tracking, digital assessments, and printable accreditation certificates.
            </Text>
          </Box>
          <Link to="/academy">
            <Button size="sm" variant="outline" borderColor="navy.800" color="navy.800" _hover={{ bg: "navy.50" }} borderRadius="xs">
              Explore Academy Portal
            </Button>
          </Link>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
          {featuredCourses.map((crs) => (
            <Box
              key={crs.id}
              bg="white"
              borderRadius="xs"
              border="1px solid"
              borderColor="navy.200"
              overflow="hidden"
            >
              <Box bg="navy.800" p="4" color="white" minH="120px" display="flex" flexDirection="column" justify="space-between">
                <Badge alignSelf="flex-start" bg="teal.600" color="white" fontSize="9px" borderRadius="xs">
                  {crs.category}
                </Badge>
                <Heading fontSize="md" fontWeight="bold" mt="3" color="white" lineClamp="2">
                  {crs.title}
                </Heading>
              </Box>
              
              <Box p="5">
                <Text fontSize="xs" color="navy.500" minH="54px" lineClamp="3" mb="4">
                  {crs.summary}
                </Text>
                
                <HStack justify="space-between" borderTop="1px solid" borderColor="navy.100" pt="4" pb="2">
                  <Text fontSize="xs" fontWeight="bold" color="navy.400">
                    {crs.lessonsCount} lessons • {crs.duration}
                  </Text>
                  {crs.enrolled ? (
                    <Badge variant="solid" bg="teal.600" color="white" fontSize="10px" borderRadius="xs">
                      Enrolled: {crs.progress}%
                    </Badge>
                  ) : (
                    <Badge variant="outline" borderColor="navy.200" color="navy.500" fontSize="10px" borderRadius="xs">Not Enrolled</Badge>
                  )}
                </HStack>

                <Link to="/academy">
                  <Button size="xs" w="full" mt="3" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} borderRadius="xs">
                    {crs.enrolled ? "Resume Course Dashboard" : "View Syllabus & Enroll"}
                  </Button>
                </Link>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* 6. FEATURED BOOKS SHOWCASE */}
      <Box bg="navy.50" py="12" borderTop="1px solid" borderBottom="1px solid" borderColor="navy.200">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <VStack textAlign="center" spaceY="2" mb="12">
            <Badge bg="teal.600" color="white" borderRadius="xs">Advocacy Publications</Badge>
            <Heading fontSize="3xl" color="navy.800" fontWeight="normal" fontFamily="heading">Featured Books by Moses Chris</Heading>
            <Text fontSize="sm" color="navy.500" maxW="600px">
              Scientific case textbooks, crisis management checklists, and life-rebuilding templates available in paper formats and instant high-quality PDF downloads.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
            {featuredBooks.map((product) => (
              <Box key={product.id} bg="white" borderRadius="xs" p="5" border="1px solid" borderColor="navy.200" display="flex" flexDirection="column" justifyContent="space-between">
                <Box>
                  <Box h="290px" bg="white" mb="4" borderRadius="xs" display="flex" alignItems="center" justifyContent="center" border="1px solid" borderColor="navy.150" py="4">
                    <BookCover id={product.id} title={product.title} image={product.image} author={product.author} size="lg" />
                  </Box>
                  <Badge bg="teal.600" color="white" mb="2" fontSize="9px" borderRadius="xs">
                    {product.category === "book" ? "PHYSICAL PAPERBACK" : "DIGITAL E-BOOK"}
                  </Badge>
                  <Heading fontSize="md" fontWeight="bold" mb="2" color="navy.800" lineClamp="2" minH="44px">
                    {product.title}
                  </Heading>
                  <Text fontSize="xs" color="navy.500" mb="4" lineClamp="3" minH="54px">
                    {product.summary}
                  </Text>
                </Box>
                
                <HStack justify="space-between" align="center" pt="3" borderTop="1px solid" borderColor="navy.100">
                  <Text fontSize="lg" fontWeight="bold" color="teal.700">
                    ${product.price}
                  </Text>
                  
                  <Link to="/shop">
                    <Button size="xs" variant="outline" borderColor="navy.800" color="navy.800" _hover={{ bg: "navy.800", color: "white" }} borderRadius="xs">
                      Shop Options
                    </Button>
                  </Link>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* 7. TESTIMONIALS CAROUSEL */}
      <Box py="12" maxW="90%" mx="auto" px={{ base: "4", md: "0" }} textAlign="center">
        <Badge variant="solid" bg="teal.600" color="white" mb="2" borderRadius="xs">
          CLIENT VOICE & TRUSTED COUNSEL
        </Badge>
        <Heading fontSize="3xl" color="navy.800" fontWeight="normal" fontFamily="heading" mb="8">
          Recognized Authority, Direct Support
        </Heading>

        <Box p="8" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200" borderLeftWidth="4px" borderLeftColor="teal.600">
          <Text fontSize={{ base: "md", md: "lg" }} fontStyle="italic" color="navy.600" mb="6" lineHeight="tall">
            "{testimonials[activeTestimonial].quote}"
          </Text>
          <Text fontSize="sm" fontWeight="bold" color="navy.800">
            {testimonials[activeTestimonial].author}
          </Text>
        </Box>

        <HStack justify="center" mt="6" spaceX="2">
          {testimonials.map((t, idx) => (
            <Button
              key={t.id}
              w="3"
              h="3"
              borderRadius="full"
              minW="auto"
              p="0"
              bg={activeTestimonial === idx ? "teal.600" : "navy.100"}
              onClick={() => setActiveTestimonial(idx)}
            />
          ))}
        </HStack>
      </Box>

      {/* 8. UPCOMING EVENTS PANEL */}
      <Box bg="navy.800" color="white" py="12" borderTop="1px solid" borderBottom="1px solid" borderColor="navy.900">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <VStack textAlign="center" spaceY="2" mb="12">
            <Badge bg="teal.600" color="white" borderRadius="xs">COMMUNITY DISPATCH</Badge>
            <Heading fontSize="3xl" color="white" fontWeight="normal" fontFamily="heading">Upcoming Workshops & Keynotes</Heading>
            <Text fontSize="sm" color="navy.300">
              Participate in live emergency, counseling audits, and mental wellness preparedness panels.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
            {upcomingEvents.map((evt, idx) => (
              <Box key={idx} p="6" bg="navy.900" borderRadius="xs" borderLeft="2px solid" borderColor="teal.400">
                <HStack justify="space-between" mb="3">
                  <Badge bg="navy.800" color="teal.300" fontSize="9px" borderRadius="xs">
                    {evt.tag}
                  </Badge>
                  <HStack spaceX="1">
                    <Calendar size={12} className="text-teal-400" />
                    <Text fontSize="10px" color="slate.300">Live Session</Text>
                  </HStack>
                </HStack>
                
                <Heading fontSize="md" fontWeight="bold" color="white" mb="3" minH="44px">
                  {evt.title}
                </Heading>
                
                <VStack align="flex-start" spaceY="1" pt="3" borderTop="1px solid" borderColor="slate.800">
                  <Text fontSize="xs" fontWeight="bold" color="teal.300">{evt.date}</Text>
                  <Text fontSize="11px" color="slate.300">{evt.time}</Text>
                  <Text fontSize="11px" color="teal.400" fontWeight="semibold">{evt.type}</Text>
                </VStack>

                <Link to="/contact">
                  <Button size="xs" w="full" mt="4" bg="teal.600" color="white" _hover={{ bg: "teal.500" }} borderRadius="xs">
                    Request Attendance Details
                  </Button>
                </Link>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* 9. CONTACT OUTTAKE SECTOR */}
      <Box py="12" textAlign="center" maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
        <Heading fontSize="3xl" color="navy.800" fontWeight="normal" fontFamily="heading" mb="4">
          Do You Require Consultation, Support, or Crisis Counseling?
        </Heading>
        <Text fontSize="sm" color="navy.500" mb="8" lineHeight="tall">
          Moses Chris coordinates client cases with high safety encryption standards. If you are experiencing dangerous domestic abuse, seek safe pathways immediately, or write in confidence to initiate safety plans and legal aid coordinates.
        </Text>
        
        <HStack justify="center" spaceX="4" direction={{ base: "column", sm: "row" }} spaceY={{ base: "3", sm: "0" }}>
          <Link to="/appointments">
            <Button size="lg" bg="navy.800" color="white" fontWeight="bold" _hover={{ bg: "navy.700" }} borderRadius="xs">
              Secure Counselling Intake
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" borderColor="navy.800" color="navy.800" _hover={{ bg: "navy.50" }} borderRadius="xs">
              Direct General Enquiry
            </Button>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
}
