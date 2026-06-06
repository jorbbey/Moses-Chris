import React, { useState } from "react";
import { usePlatformStore } from "../store";
import { Appointment } from "../types";
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
  Textarea,
  NativeSelect,
} from "@chakra-ui/react";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  CalendarCheck,
  Globe,
  Trash2,
  FileText,
  User,
  Activity,
  Shield,
  Plus
} from "lucide-react";

export default function Appointments() {
  const { appointments, bookAppointment, cancelAppointment, studentName, studentEmail } = usePlatformStore();

  const [activeTab, setActiveTab] = useState<"book" | "dashboard">("book");

  // Selection state
  const [selectedType, setSelectedType] = useState<"individual" | "private" | "group">("individual");
  const [selectedDate, setSelectedDate] = useState("2026-06-05");
  const [selectedTime, setSelectedTime] = useState("11:00 AM - 11:50 AM");
  const [selectedTimezone, setSelectedTimezone] = useState("GMT / UTC (Local)");
  
  // Client details
  const [clientName, setClientName] = useState(studentName);
  const [clientEmail, setClientEmail] = useState(studentEmail);
  const [clientNotes, setClientNotes] = useState("");

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const appointmentTypes = [
    {
      id: "individual",
      title: "1-on-1 Individual Therapy Session",
      price: 150,
      duration: "50 mins",
      desc: "Licensed therapeutic cognitive-behavioral counseling focusing strictly on trauma recovery, depression containment, and postpartum wellness.",
      tag: "Clinical"
    },
    {
      id: "private",
      title: "Private Domestic Violence Consultation",
      price: 120,
      duration: "50 mins",
      desc: "A highly encrypted, confidential safety-mapping discussion to design immediate secure evacuation pathways and direct legal referrals.",
      tag: "Advocacy"
    },
    {
      id: "group",
      title: "Group Public Health Support Circle",
      price: 45,
      duration: "1.5 hours",
      desc: "An interactive, collective support webinar sharing disaster readiness models and peer-led pediatric/maternal discussions.",
      tag: "Community"
    }
  ];

  const availableSlots = [
    "09:00 AM - 09:50 AM",
    "10:00 AM - 10:50 AM",
    "11:00 AM - 11:50 AM",
    "02:00 PM - 02:50 PM",
    "03:00 PM - 03:50 PM",
    "04:00 PM - 04:50 PM"
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      return;
    }

    const typeDetails = appointmentTypes.find(t => t.id === selectedType)!;

    bookAppointment({
      type: selectedType,
      typeName: typeDetails.title,
      duration: typeDetails.duration,
      price: typeDetails.price,
      date: selectedDate,
      timeSlot: selectedTime,
      timezone: selectedTimezone,
      clientName,
      clientEmail,
      clientNotes
    });

    setBookingSuccess(true);
    setClientNotes("");
    setTimeout(() => {
      setBookingSuccess(false);
      setActiveTab("dashboard");
    }, 2000);
  };

  const handleCancel = (id: string) => {
    cancelAppointment(id);
  };

  return (
    <Box bg="navy.50" minH="100vh">
      {/* Title banner */}
      <Box bg="white" color="navy.800" py="16" borderBottom="1px solid" borderColor="navy.250">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} spaceY={{ base: "6", md: "0" }}>
            <Box textAlign="left">
              <Badge bg="teal.50" color="teal.750" mb="4" fontWeight="extrabold" borderRadius="xs" letterSpacing="wider">
                CLINICAL SCHEDULING PORTAL
              </Badge>
              <Heading fontSize={{ base: "3xl", md: "5xl" }} color="navy.800" fontWeight="normal" fontFamily="heading" mb="4" lineHeight="tight">
                Secure Appointment Desk
              </Heading>
              <Text fontSize="sm" color="navy.500" maxW="600px" lineHeight="relaxed">
                Book confidential psychiatric counseling, legal dv safety defense drafting, and pediatric health retainers.
              </Text>
            </Box>

            <HStack spaceX="3">
              <Button
                size="sm"
                bg={activeTab === "book" ? "navy.800" : "transparent"}
                color={activeTab === "book" ? "white" : "navy.800"}
                border="1px solid"
                borderColor={activeTab === "book" ? "navy.800" : "navy.200"}
                fontWeight="bold"
                borderRadius="xs"
                _hover={{ bg: activeTab === "book" ? "navy.700" : "navy.50" }}
                onClick={() => setActiveTab("book")}
              >
                Schedule Consultation
              </Button>
              <Button
                size="sm"
                bg={activeTab === "dashboard" ? "navy.800" : "transparent"}
                color={activeTab === "dashboard" ? "white" : "navy.800"}
                border="1px solid"
                borderColor={activeTab === "dashboard" ? "navy.800" : "navy.200"}
                fontWeight="bold"
                borderRadius="xs"
                _hover={{ bg: activeTab === "dashboard" ? "navy.700" : "navy.50" }}
                onClick={() => setActiveTab("dashboard")}
              >
                My Booked Slots ({appointments.length})
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Box>

      {/* Main Core */}
      <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }} py="8">
        {/* TAB 1: SCHEDULING CONSOLE */}
        {activeTab === "book" && (
          <SimpleGrid columns={{ base: 1, lg: 12 }} gap="8">
            {/* Left side options: Choose Type */}
            <Box gridColumn={{ base: "1", lg: "span 7" }} textAlign="left">
              <VStack align="stretch" spaceY="4" mb="8">
                <Text fontSize="xs" fontWeight="bold" color="navy.400" uppercase="true" letterSpacing="wider">
                  Step 1: Select Appointment Specialty
                </Text>

                {appointmentTypes.map((type) => (
                  <Box
                    key={type.id}
                    p="5"
                    bg="white"
                    borderRadius="xs"
                    border="1px solid"
                    borderColor={selectedType === type.id ? "teal.650" : "navy.200"}
                    cursor="pointer"
                    onClick={() => setSelectedType(type.id as any)}
                    transition="all 0.2s"
                    _hover={{ bg: "navy.50" }}
                  >
                    <Flex justify="space-between" align="center" mb="2">
                      <HStack spaceX="2">
                        <Badge bg="teal.600" color="white" fontSize="9px" borderRadius="xs">
                          {type.tag}
                        </Badge>
                        <Text fontSize="xs" color="navy.500">
                          {type.duration} duration
                        </Text>
                      </HStack>
                      <Text fontSize="lg" fontWeight="bold" color="teal.700">
                        ${type.price}
                      </Text>
                    </Flex>
                    <Heading fontSize="sm" fontWeight="bold" mb="1" color="navy.800">
                      {type.title}
                    </Heading>
                    <Text fontSize="11px" color="navy.500" lineHeight="tall">
                      {type.desc}
                    </Text>
                  </Box>
                ))}
              </VStack>

              {/* Booking confirmation success modal banner */}
              {bookingSuccess && (
                <Box p="4" bg="teal.50" borderRadius="xs" border="1px solid" borderColor="teal.300" mb="6" display="flex" align="center">
                  <CheckCircle size={18} className="text-teal-600 mr-3" />
                  <Box pl="2">
                    <Text fontSize="xs" fontWeight="bold" color="teal.800">Booking Confirmed Successfully!</Text>
                    <Text fontSize="10px" color="teal.700">Your session has been logged and synchronized inside your personal calendar dashboard.</Text>
                  </Box>
                </Box>
              )}

              {/* Form entries */}
              <Box bg="white" p="6" borderRadius="xs" border="1px solid" borderColor="navy.200">
                <Text fontSize="xs" fontWeight="bold" color="navy.400" uppercase="true" letterSpacing="wider" mb="4">
                  Step 3: Secure Client Intake Form
                </Text>
                
                <form onSubmit={handleBookingSubmit}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" mb="4">
                    <Box>
                      <Text fontSize="xs" fontWeight="bold" color="navy.600" mb="1">Your Legal Name</Text>
                      <Input
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                        size="sm"
                        bg="white"
                        borderRadius="xs"
                        border="1px solid"
                        borderColor="navy.200"
                        _focus={{ borderColor: "teal.600", outline: "none" }}
                      />
                    </Box>
                    <Box>
                      <Text fontSize="xs" fontWeight="bold" color="navy.600" mb="1">Symmetric-Safe Email Address</Text>
                      <Input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        required
                        size="sm"
                        bg="white"
                        borderRadius="xs"
                        border="1px solid"
                        borderColor="navy.200"
                        _focus={{ borderColor: "teal.600", outline: "none" }}
                      />
                    </Box>
                  </SimpleGrid>

                  <Box mb="6">
                    <Text fontSize="xs" fontWeight="bold" color="navy.600" mb="1">Consultation Background Notes (Highly confidential description)</Text>
                    <Textarea
                      placeholder="Briefly describe what you would like to address (e.g. general surveillance consulting, emergency domestic security, parenting nutrition logs, relationship coaching)..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      size="sm"
                      bg="white"
                      borderRadius="xs"
                      border="1px solid"
                      borderColor="navy.200"
                      _focus={{ borderColor: "teal.600", outline: "none" }}
                      rows={4}
                    />
                  </Box>

                  <Button type="submit" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} h="10" w="full" borderRadius="xs">
                    Confirm & Hold Booking Slot
                  </Button>
                </form>
              </Box>
            </Box>

            {/* Right side widgets: Calendar and Select Time Slot */}
            <Box gridColumn={{ base: "1", lg: "span 5" }} textAlign="left">
              <VStack align="stretch" spaceY="6">
                {/* Date Select Panel */}
                <Box bg="white" p="5" borderRadius="xs" border="1px solid" borderColor="navy.200">
                  <Text fontSize="xs" fontWeight="bold" color="navy.400" uppercase="true" letterSpacing="wider" mb="3">
                    Step 2: Choose Date & Timezone
                  </Text>
                  
                  <Box mb="4">
                    <Text fontSize="xs" fontWeight="bold" color="navy.600" mb="1">Appointment Date</Text>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      size="sm"
                      bg="white"
                      borderRadius="xs"
                      border="1px solid"
                      borderColor="navy.200"
                      _focus={{ borderColor: "teal.600", outline: "none" }}
                      min="2026-05-30"
                    />
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="navy.600" mb="1">Client Local Timezone</Text>
                    <NativeSelect.Root size="sm" variant="subtle">
                      <NativeSelect.Field
                        bg="white"
                        borderRadius="xs"
                        border="1px solid"
                        borderColor="navy.200"
                        _focus={{ borderColor: "teal.600", outline: "none" }}
                        value={selectedTimezone}
                        onChange={(e) => setSelectedTimezone(e.target.value)}
                      >
                        <option value="GMT / UTC (Local)">GMT / UTC (Local)</option>
                        <option value="EST / New York">EST / Eastern Standard Time (New York)</option>
                        <option value="PST / California">PST / Pacific Standard Time (Los Angeles)</option>
                        <option value="GMT+1 / London">GMT+1 / British Summer Time (London)</option>
                        <option value="WAT / Lagos">WAT / West Africa Time (Lagos)</option>
                      </NativeSelect.Field>
                    </NativeSelect.Root>
                  </Box>
                </Box>

                {/* Available Hours list */}
                <Box bg="white" p="5" borderRadius="xs" border="1px solid" borderColor="navy.200">
                  <Text fontSize="xs" fontWeight="bold" color="navy.400" uppercase="true" letterSpacing="wider" mb="3">
                    Available Slots ({selectedDate})
                  </Text>
                  
                  <SimpleGrid columns="2" gap="2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        size="xs"
                        variant={selectedTime === slot ? "solid" : "outline"}
                        bg={selectedTime === slot ? "teal.600" : "white"}
                        color={selectedTime === slot ? "white" : "navy.800"}
                        onClick={() => setSelectedTime(slot)}
                        borderRadius="xs"
                        borderColor="navy.200"
                        _hover={{ bg: "navy.50", borderColor: "teal.600" }}
                      >
                        {slot.split(" ")[0]} {slot.split(" ")[1]}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* Privacy Standards Notice */}
                <Box p="4" bg="navy.800" color="white" borderRadius="xs" borderLeft="4px solid" borderColor="teal.400">
                  <HStack spaceX="2" mb="2">
                    <Shield size={16} className="text-teal-300 shrink-0" />
                    <Text fontSize="xs" fontWeight="bold">Confidentiality Guarantee</Text>
                  </HStack>
                  <Text fontSize="10px" color="navy.300" lineHeight="tall">
                    All therapeutic and consultation files compiled inside our appointments engine are kept under strict client-therapist protections. We do not transmit logs across insecure cookies, and we completely respect your privacy.
                  </Text>
                </Box>
              </VStack>
            </Box>
          </SimpleGrid>
        )}

        {/* TAB 2: CLIENT DASHBOARD */}
        {activeTab === "dashboard" && (
          <Box maxW="800px" mx="auto" textAlign="left">
            <Heading fontSize="xl" fontWeight="normal" fontFamily="heading" color="navy.800" mb="2">
              My Personal Scheduling Dashboard
            </Heading>
            <Text fontSize="xs" color="navy.500" mb="8">
              Review and manage your scheduled clinical counseling sessions, download checklists, or request slot rescheduling with Moses Chris's consulting desk.
            </Text>

            {appointments.length === 0 ? (
              <Box py="16" bg="white" borderRadius="xs" textAlign="center" border="1px solid" borderColor="navy.200">
                <CalendarCheck size="44" className="text-navy-300 mx-auto mb-3" />
                <Heading fontSize="sm" fontWeight="bold" mb="1" color="navy.800">No appointments booked</Heading>
                <Text fontSize="xs" color="navy.500" mb="4">You do not have any active appointments booked at this time.</Text>
                <Button size="xs" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} borderRadius="xs" onClick={() => setActiveTab("book")}>Book consultation session</Button>
              </Box>
            ) : (
              <VStack align="stretch" spaceY="4">
                {appointments.map((appt) => (
                  <Box
                    key={appt.id}
                    p="5"
                    bg="white"
                    borderRadius="xs"
                    border="1px solid"
                    borderColor="navy.200"
                    position="relative"
                  >
                    <Flex justify="space-between" align="start" wrap="wrap" gap="4">
                      <VStack align="flex-start" spaceY="1">
                        <HStack spaceX="2">
                          <Badge
                            bg={
                              appt.status === "confirmed" ? "teal.600" : "navy.400"
                            }
                            color="white"
                            fontSize="8px"
                            borderRadius="xs"
                          >
                            {appt.status.toUpperCase()}
                          </Badge>
                          <Text fontSize="xs" fontWeight="bold" color="teal.700">
                            ${appt.price} • {appt.duration}
                          </Text>
                        </HStack>
                        
                        <Heading fontSize="md" fontWeight="bold" color="navy.800">
                          {appt.typeName}
                        </Heading>

                        <HStack spaceX="4" color="navy.500" pt="1">
                          <HStack spaceX="1">
                            <Calendar size={12} className="text-teal-600" />
                            <Text fontSize="xs" fontWeight="bold">{appt.date}</Text>
                          </HStack>
                          <HStack spaceX="1">
                            <Clock size={12} className="text-teal-600" />
                            <Text fontSize="xs">{appt.timeSlot}</Text>
                          </HStack>
                          <HStack spaceX="1">
                            <Globe size={12} className="text-navy-400" />
                            <Text fontSize="10px">{appt.timezone}</Text>
                          </HStack>
                        </HStack>

                        {appt.clientNotes && (
                          <Box mt="3" p="3" bg="navy.50" borderRadius="xs" borderLeft="3px solid" borderColor="teal.600">
                            <HStack spaceX="1.5" mb="1">
                              <FileText size={10} className="text-navy-400" />
                              <Text fontSize="9px" fontWeight="bold" color="navy.400">CONFIDENTIAL NOTES</Text>
                            </HStack>
                            <Text fontSize="11px" color="navy.600">"{appt.clientNotes}"</Text>
                          </Box>
                        )}
                      </VStack>

                      {appt.status === "confirmed" && (
                        <Button
                          size="xs"
                          variant="outline"
                          borderColor="red.300"
                          color="red.600"
                          _hover={{ bg: "red.50" }}
                          borderRadius="xs"
                          onClick={() => handleCancel(appt.id)}
                        >
                          Cancel Appointment
                        </Button>
                      )}
                    </Flex>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
