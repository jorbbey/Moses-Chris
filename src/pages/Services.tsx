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
  Dna,
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

      {/* Cell and Gene Therapy Services Section */}
      <Box bg="white" py="16" borderTop="1px solid" borderColor="navy.200">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          
          {/* Header */}
          <VStack align="flex-start" mb="12" spaceY="3">
            <HStack spaceX="2" align="center">
              <Box p="2" bg="teal.50" borderRadius="xs" color="teal.600">
                <Dna size={24} />
              </Box>
              <Badge bg="teal.50" color="teal.750" fontWeight="extrabold" borderRadius="xs" letterSpacing="wider" px="2" py="0.5">
                ADVANCED THERAPEUTICS
              </Badge>
            </HStack>
            
            <Heading fontSize={{ base: "2xl", md: "4xl" }} color="navy.800" fontWeight="normal" fontFamily="heading" mt="2">
              Cell and Gene Therapy Services
            </Heading>
            
            <Text fontSize="md" color="navy.500" maxW="850px" lineHeight="relaxed">
              As a leading expert in cell and gene therapy, our team offers a comprehensive range of services to support the development and implementation of innovative treatments. Our goal is to help clients navigate the complex landscape of cell and gene therapy, from concept to commercialization.
            </Text>
          </VStack>

          {/* Core Services, Expertise, Benefits Grid */}
          <SimpleGrid columns={{ base: 1, lg: 12 }} gap="12" alignItems="flex-start">
            
            {/* Left Hand: Services Menu */}
            <Box gridColumn={{ base: "1", lg: "span 7" }}>
              <VStack align="stretch" spaceY="6">
                <Heading fontSize="xl" fontWeight="normal" fontFamily="heading" color="navy.800" pb="2" borderBottom="2px solid" borderColor="teal.500" width="max-content">
                  Services
                </Heading>
                
                <VStack align="stretch" spaceY="4">
                  <Box p="4" bg="navy.50" borderRadius="xs" borderLeft="4px solid" borderColor="teal.500">
                    <Text fontSize="sm" fontWeight="bold" color="navy.800" mb="1">Strategic Consulting</Text>
                    <Text fontSize="xs" color="navy.500" lineHeight="relaxed">Our team provides expert guidance on the development and implementation of cell and gene therapy products, including market analysis, regulatory strategy, and commercialization planning.</Text>
                  </Box>

                  <Box p="4" bg="navy.50" borderRadius="xs" borderLeft="4px solid" borderColor="teal.500">
                    <Text fontSize="sm" fontWeight="bold" color="navy.800" mb="1">Preclinical Development</Text>
                    <Text fontSize="xs" color="navy.500" lineHeight="relaxed">We offer preclinical development services, including cell line development, vector design, and in vitro and in vivo testing.</Text>
                  </Box>

                  <Box p="4" bg="navy.50" borderRadius="xs" borderLeft="4px solid" borderColor="teal.500">
                    <Text fontSize="sm" fontWeight="bold" color="navy.800" mb="1">Clinical Trial Management</Text>
                    <Text fontSize="xs" color="navy.500" lineHeight="relaxed">Our team provides clinical trial management services, including study design, site selection, patient recruitment, and data management.</Text>
                  </Box>

                  <Box p="4" bg="navy.50" borderRadius="xs" borderLeft="4px solid" borderColor="teal.500">
                    <Text fontSize="sm" fontWeight="bold" color="navy.800" mb="1">Regulatory Affairs</Text>
                    <Text fontSize="xs" color="navy.500" lineHeight="relaxed">We offer regulatory affairs services, including IND and BLA submission, FDA interaction, and compliance management.</Text>
                  </Box>

                  <Box p="4" bg="navy.50" borderRadius="xs" borderLeft="4px solid" borderColor="teal.500">
                    <Text fontSize="sm" fontWeight="bold" color="navy.800" mb="1">Manufacturing and Quality Control</Text>
                    <Text fontSize="xs" color="navy.500" lineHeight="relaxed">Our team provides manufacturing and quality control services, including process development, scale-up, and quality assurance.</Text>
                  </Box>

                  <Box p="4" bg="navy.50" borderRadius="xs" borderLeft="4px solid" borderColor="teal.500">
                    <Text fontSize="sm" fontWeight="bold" color="navy.800" mb="1">Cell and Gene Therapy Product Development</Text>
                    <Text fontSize="xs" color="navy.500" lineHeight="relaxed">We offer cell and gene therapy product development services, including product design, development, and testing.</Text>
                  </Box>

                  <Box p="4" bg="navy.50" borderRadius="xs" borderLeft="4px solid" borderColor="teal.500">
                    <Text fontSize="sm" fontWeight="bold" color="navy.800" mb="1">Training and Education</Text>
                    <Text fontSize="xs" color="navy.500" lineHeight="relaxed">Our team provides training and education services, including workshops, webinars, and online courses on cell and gene therapy.</Text>
                  </Box>
                </VStack>
              </VStack>
            </Box>

            {/* Right Hand: Expertise & Benefits Stack */}
            <Box gridColumn={{ base: "1", lg: "span 5" }}>
              <VStack align="stretch" spaceY="10">
                
                {/* Expertise Block */}
                <Box>
                  <Heading fontSize="xl" fontWeight="normal" fontFamily="heading" color="navy.800" pb="2" mb="5" borderBottom="2px solid" borderColor="teal.500" width="max-content">
                    Expertise
                  </Heading>
                  <VStack align="stretch" spaceY="4">
                    <Box borderWidth="1px" borderColor="navy.200" p="4" borderRadius="xs">
                      <HStack spaceX="2" mb="1" align="flex-start">
                        <CheckCircle size={16} className="text-teal-600 shrink-0 mt-0.5" />
                        <Text fontSize="sm" fontWeight="bold" color="navy.800">Cell Therapy</Text>
                      </HStack>
                      <Text fontSize="xs" color="navy.500" pl="6" lineHeight="relaxed">
                        Our team has expertise in cell therapy, including autologous and allogeneic cell therapies, and cell-based immunotherapies.
                      </Text>
                    </Box>

                    <Box borderWidth="1px" borderColor="navy.200" p="4" borderRadius="xs">
                      <HStack spaceX="2" mb="1" align="flex-start">
                        <CheckCircle size={16} className="text-teal-600 shrink-0 mt-0.5" />
                        <Text fontSize="sm" fontWeight="bold" color="navy.800">Gene Therapy</Text>
                      </HStack>
                      <Text fontSize="xs" color="navy.500" pl="6" lineHeight="relaxed">
                        We have expertise in gene therapy, including viral and non-viral gene delivery, and gene editing technologies such as CRISPR/Cas9.
                      </Text>
                    </Box>

                    <Box borderWidth="1px" borderColor="navy.200" p="4" borderRadius="xs">
                      <HStack spaceX="2" mb="1" align="flex-start">
                        <CheckCircle size={16} className="text-teal-600 shrink-0 mt-0.5" />
                        <Text fontSize="sm" fontWeight="bold" color="navy.800">Regenerative Medicine</Text>
                      </HStack>
                      <Text fontSize="xs" color="navy.500" pl="6" lineHeight="relaxed">
                        Our team has expertise in regenerative medicine, including tissue engineering, biomaterials, and stem cell therapies.
                      </Text>
                    </Box>
                  </VStack>
                </Box>

                {/* Benefits Block */}
                <Box>
                  <Heading fontSize="xl" fontWeight="normal" fontFamily="heading" color="navy.800" pb="2" mb="5" borderBottom="2px solid" borderColor="teal.500" width="max-content">
                    Benefits
                  </Heading>
                  <VStack align="stretch" spaceY="4">
                    <Box borderWidth="1px" borderColor="navy.200" p="4" borderRadius="xs" bg="teal.50/10">
                      <HStack spaceX="2" mb="1" align="center">
                        <Badge bg="teal.600" color="white" fontSize="9px" borderRadius="xs">INNOVATIVE</Badge>
                        <Text fontSize="sm" fontWeight="bold" color="navy.800">Innovative Solutions</Text>
                      </HStack>
                      <Text fontSize="xs" color="navy.500" pl="1" lineHeight="relaxed">
                        Our team provides innovative solutions to complex problems in cell and gene therapy.
                      </Text>
                    </Box>

                    <Box borderWidth="1px" borderColor="navy.200" p="4" borderRadius="xs" bg="teal.50/10">
                      <HStack spaceX="2" mb="1" align="center">
                        <Badge bg="teal.600" color="white" fontSize="9px" borderRadius="xs">EXPERT</Badge>
                        <Text fontSize="sm" fontWeight="bold" color="navy.800">Expert Guidance</Text>
                      </HStack>
                      <Text fontSize="xs" color="navy.500" pl="1" lineHeight="relaxed">
                        We offer expert guidance and support throughout the development and commercialization process.
                      </Text>
                    </Box>

                    <Box borderWidth="1px" borderColor="navy.200" p="4" borderRadius="xs" bg="teal.50/10">
                      <HStack spaceX="2" mb="1" align="center">
                        <Badge bg="teal.600" color="white" fontSize="9px" borderRadius="xs">COMPLIANT</Badge>
                        <Text fontSize="sm" fontWeight="bold" color="navy.800">Regulatory Compliance</Text>
                      </HStack>
                      <Text fontSize="xs" color="navy.500" pl="1" lineHeight="relaxed">
                        Our team ensures regulatory compliance and helps clients navigate the complex regulatory landscape.
                      </Text>
                    </Box>

                    <Box borderWidth="1px" borderColor="navy.200" p="4" borderRadius="xs" bg="teal.50/10">
                      <HStack spaceX="2" mb="1" align="center">
                        <Badge bg="teal.600" color="white" fontSize="9px" borderRadius="xs">EFFICIENT</Badge>
                        <Text fontSize="sm" fontWeight="bold" color="navy.800">Cost-Effective Solutions</Text>
                      </HStack>
                      <Text fontSize="xs" color="navy.500" pl="1" lineHeight="relaxed">
                        We provide cost-effective solutions that help clients achieve their goals without breaking the bank.
                      </Text>
                    </Box>
                  </VStack>
                </Box>

              </VStack>
            </Box>

          </SimpleGrid>

          {/* Get In Touch CTA Banner */}
          <Box mt="12" p="8" bg="navy.50" borderRadius="xs" border="1px solid" borderColor="navy.200">
            <SimpleGrid columns={{ base: 1, md: 12 }} gap="6" alignItems="center">
              <Box gridColumn={{ base: "1", md: "span 9" }}>
                <Heading fontSize="lg" fontWeight="normal" fontFamily="heading" color="navy.800" mb="2">
                  Get in Touch
                </Heading>
                <Text fontSize="xs" color="navy.500" lineHeight="relaxed">
                  If you’re interested in learning more about our cell and gene therapy services, please don’t hesitate to get in touch. We’d be happy to discuss your needs and provide a customized solution.
                </Text>
              </Box>
              <Box gridColumn={{ base: "1", md: "span 3" }} textAlign={{ base: "left", md: "right" }}>
                <Link to="/contact">
                  <Button size="sm" bg="teal.600" color="white" _hover={{ bg: "teal.700" }} borderRadius="xs" width="full">
                    Contact Our Specialist
                  </Button>
                </Link>
              </Box>
            </SimpleGrid>
          </Box>

        </Box>
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
