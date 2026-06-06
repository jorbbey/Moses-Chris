import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  HStack,
  VStack,
  Button,
  Image,
} from "@chakra-ui/react";
import {
  Activity,
  Heart,
  ShieldCheck,
  Award,
  Users,
  ChevronDown,
  HelpCircle,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function Services() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const servicesDetails = [
    {
      id: "epidemiology",
      icon: <Activity size={24} className="text-teal-600" />,
      title: "Epidemiology & Outbreak Surveillance",
      subtitle: "Securing Municipal & Corporate Health Frontiers",
      desc: "Our epidemiology unit offers deep-dive surveillance auditing, case tracing analytics, and outbreak handling command consults. We coordinate closely with hospital boards, public health offices, and national regulatory bodies.",
      benefits: [
        "Infectious hazard exposure reporting",
        "Statistical outlier case surveillance modeling",
        "Biosafety workspace sanitization protocols",
        "CDC/WHO alignment training workshops"
      ],
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "mental-health",
      icon: <Users size={24} className="text-teal-600" />,
      title: "Clinical Trauma Counselling",
      subtitle: "Evidence-Based Psycho-Diagnostic Reorientation",
      desc: "Compassionate private mental health therapy utilizing Cognitive Behavioral Therapy (CBT) and Dialectical Behavioral adjustments. We emphasize healing relationship trauma, high postpartum anxiety, depression, and adolescent support.",
      benefits: [
        "Completely private 1-on-1 counseling",
        "Postpartum anxiety tracking models",
        "Trauma-informed cognitive restructuring",
        "Child behavior & parent alignment strategies"
      ],
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "domestic-violence",
      icon: <ShieldCheck size={24} className="text-teal-600" />,
      title: "Domestic Violence Support & Advocacy",
      subtitle: "Immediate Sanctuary, Security Mapping, and Judicial Orientation",
      desc: "Advocating fiercely for physical-digital security, immediate domestic evacuation blueprints, child survival defenses, and legal restraining order coordinates with trusted lawyers.",
      benefits: [
        "Private immediate safety planning guides",
        "Transitional shelter & relocation linkage",
        "Anonymized communication safety audits",
        "Legal support & child custody coordination"
      ],
      img: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "maternal-health",
      icon: <Heart size={24} className="text-teal-600" />,
      title: "Maternal & Child Health Care Support",
      subtitle: "Comprehensive Clinical Pre-Natal & Infant Milestones",
      desc: "Deploying high-quality maternal education materials, pediatric tracking worksheets, infant developmental milestone lists, and postnatal nutritional guidance.",
      benefits: [
        "Localized pediatrician & midwifery databases",
        "Fetal acceleration tracking charts",
        "Postpartum mental health assessment logs",
        "Toddler developmental milestones logging"
      ],
      img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "coaching",
      icon: <Award size={24} className="text-teal-600" />,
      title: "Executive Ethical Leadership & Consulting",
      desc: "Tailored strategic consulting for healthcare executives, university leaders, and non-profit founders designed to optimize command capabilities and team resilience.",
      benefits: [
        "Socio-ethical risk assessments",
        "Organizational alignment analysis",
        "Executive transition counselling",
        "Public presentation & keynote coaching"
      ],
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const faqs = [
    {
      q: "Are the clinical counselling session entries kept completely private?",
      a: "Yes. Under clinical licensing standards, all therapy sessions, safety maps, intake documentation, and child protection discussions are encrypted and stored in fully secure systems. No client data is ever disclosed without explicit physical consent."
    },
    {
      q: "How can we book Moses Chris for statewide outbreak audits?",
      a: "For municipal or corporate epidemiological consults, you can submit an executive inquiry on our Contact page or send an inquiry to initiate scheduling under standard consulting retainers."
    },
    {
      q: "Does the domestic violence advocacy program offer financial aid?",
      a: "While Moses Chris does not directly dispense rescue grants, we hold collaborative partnerships with transitional shelters, nonprofit legal defenses, and national advocacy foundations to help you secure immediate welfare resources seamlessly."
    },
    {
      q: "Can I download pdf materials instantly?",
      a: "Yes. All digital books, outbreak checklist logs, and safety planners purchased inside our online shop are delivered as high-fidelity interactive PDFs on the final checkout window and emailed straight to you."
    }
  ];

  return (
    <Box>
      {/* Page Title banner */}
      <Box bg="white" color="navy.800" py="16" textAlign="center" borderBottom="1px solid" borderColor="navy.250">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <Badge bg="teal.50" color="teal.750" mb="4" fontWeight="extrabold" borderRadius="xs" letterSpacing="wider">
            SERVICES & EXPERTIZE
          </Badge>
          <Heading fontSize={{ base: "3xl", md: "5xl" }} color="navy.800" fontWeight="normal" fontFamily="heading" mb="4" lineHeight="tight">
            Professional Solutions
          </Heading>
          <Text fontSize="md" color="navy.500" fontStyle="italic" maxW="700px" mx="auto" lineHeight="relaxed">
            Scientific precision matched with deep compassion. Explore our active operations, specialized clinical consultations, and advisory options.
          </Text>
        </Box>
      </Box>

      {/* Services List Loop */}
      <Box py="12" maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
        <VStack align="stretch" spaceY="16">
          {servicesDetails.map((svc, idx) => (
            <SimpleGrid
              key={svc.title}
              columns={{ base: 1, md: 12 }}
              gap="12"
              alignItems="center"
              pt={idx > 0 ? "12" : "0"}
              borderTop={idx > 0 ? "1px solid" : "none"}
              borderColor="navy.200"
            >
              {/* Text Side (Alternate layout order based on index) */}
              <Box
                gridColumn={{ base: "1", md: "span 7" }}
                order={{ base: "2", md: idx % 2 === 0 ? "1" : "2" }}
                textAlign="left"
              >
                <HStack spaceX="2" mb="2" align="center">
                  <Box p="2" bg="navy.50" borderRadius="xs" color="teal.600">
                    {svc.icon}
                  </Box>
                  <Text fontSize="10px" fontWeight="semibold" color="teal.700" textTransform="uppercase" letterSpacing="widest">
                    Pillar Operation
                  </Text>
                </HStack>
                
                <Heading fontSize="2xl" fontWeight="normal" fontFamily="heading" color="navy.800" mb="1">
                  {svc.title}
                </Heading>
                
                {svc.subtitle && (
                  <Text fontSize="xs" fontWeight="bold" color="teal.650" fontStyle="italic" mb="3">
                    {svc.subtitle}
                  </Text>
                )}

                <Text fontSize="sm" color="navy.500" mb="6" lineHeight="tall">
                  {svc.desc}
                </Text>

                {/* Key Benefits List */}
                <Box mb="6">
                  <Text fontSize="xs" fontWeight="bold" color="navy.800" mb="3">
                    Key Deliverables & Methodologies:
                  </Text>
                  <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
                    {svc.benefits.map((b) => (
                      <HStack key={b} spaceX="2" align="center">
                        <CheckCircle size={14} className="text-teal-600 shrink-0" />
                        <Text fontSize="xs" color="navy.500">{b}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>

                <HStack spaceX="3">
                  <Link to="/appointments">
                    <Button size="xs" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} fontWeight="bold" borderRadius="xs" pr="3">
                      Book Counselling Call
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="xs" variant="outline" borderColor="navy.800" color="navy.800" _hover={{ bg: "navy.50" }} borderRadius="xs">
                      Executive Inquiry
                    </Button>
                  </Link>
                </HStack>
              </Box>

              {/* Image Side */}
              <Box
                gridColumn={{ base: "1", md: "span 5" }}
                order={{ base: "1", md: idx % 2 === 0 ? "2" : "1" }}
              >
                <Box
                  borderRadius="xs"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="navy.200"
                  maxH="280px"
                >
                  <Image
                    src={svc.img}
                    alt={svc.title}
                    w="full"
                    h="full"
                    objectFit="cover"
                    referrerPolicy="no-referrer"
                  />
                </Box>
              </Box>
            </SimpleGrid>
          ))}
        </VStack>
      </Box>

      {/* Frequently Asked Questions */}
      <Box bg="navy.50" py="12" borderTop="1px solid" borderBottom="1px solid" borderColor="navy.200">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <VStack textAlign="center" spaceY="2" mb="12">
            <Badge bg="teal.600" color="white" borderRadius="xs">FAQ PANEL</Badge>
            <Heading fontSize="3xl" color="navy.800" fontWeight="normal" fontFamily="heading">Frequently Asked Questions</Heading>
            <Text fontSize="sm" color="navy.500">
              Common client questions regarding safety planning, therapy booking, and corporate public clinical retainers.
            </Text>
          </VStack>

          <VStack align="stretch" spaceY="4">
            {faqs.map((faq, index) => (
              <Box
                key={index}
                bg="white"
                borderRadius="xs"
                p="5"
                cursor="pointer"
                onClick={() => toggleFaq(index)}
                border="1px solid"
                borderColor={activeFaq === index ? "teal.600" : "navy.200"}
              >
                <Flex justify="space-between" align="center">
                  <HStack spaceX="3" align="center">
                    <HelpCircle size={18} className="text-teal-600 shrink-0" />
                    <Text fontSize="sm" fontWeight="bold" color="navy.800" textAlign="left">
                      {faq.q}
                    </Text>
                  </HStack>
                  <ChevronDown
                    size={16}
                    className="text-navy-400 shrink-0"
                    style={{
                      transform: activeFaq === index ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s"
                    }}
                  />
                </Flex>
                
                {activeFaq === index && (
                  <Box mt="4" pt="4" borderTop="1px solid" borderColor="navy.100">
                    <Text fontSize="xs" color="navy.500" lineHeight="tall">
                      {faq.a}
                    </Text>
                  </Box>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* Trust Banner Call To Action */}
      <Box py="12" textAlign="center" maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
        <Box bg="white" color="navy.800" borderRadius="xs" p="8" border="1px solid" borderColor="navy.200">
          <Heading fontSize="2xl" fontWeight="normal" fontFamily="heading" color="navy.800" mb="3">
            In Danger of Domestic Violence?
          </Heading>
          <Text fontSize="xs" color="navy.500" mb="6" maxW="600px" mx="auto" lineHeight="tall">
            Do not wait. We build confidential security escape checklists and offer protected support lines to help you relocate securely. Write in code or book an expedited counselling slot to initiate action immediately.
          </Text>
          <HStack justify="center" spaceX="4">
            <Link to="/appointments">
              <Button size="sm" bg="navy.800" color="white" fontWeight="bold" _hover={{ bg: "navy.700" }} borderRadius="xs">
                Expedite Counselling Call
              </Button>
            </Link>
            <Link to="/resources">
              <Button size="sm" variant="outline" color="navy.800" borderColor="navy.800" _hover={{ bg: "navy.50" }} borderRadius="xs">
                Confidential Action Maps
              </Button>
            </Link>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
