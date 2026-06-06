import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { MessageSquare, Send, X, ShieldAlert, Award, ShoppingBag } from "lucide-react";

export default function WhatsAppWidget() {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "15557943321"; // Representative business line

  const handleSend = () => {
    if (!message.trim()) return;
    const text = encodeURIComponent(`Hello Moses Chris platform team, ${message}`);
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, "_blank");
    setMessage("");
  };

  const handleQuickCTA = (topic: string) => {
    const text = encodeURIComponent(`Hello, I'd like to consult on the topic of: ${topic}`);
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <Box position="fixed" bottom="6" right="6" zIndex="1000">
      {expanded ? (
        <Box
          w={{ base: "320px", md: "360px" }}
          bg="white"
          borderRadius="xs"
          boxShadow="lg"
          border="1px solid"
          borderColor="navy.200"
          overflow="hidden"
          animation="fade-in 0.3s ease"
        >
          {/* Header */}
          <Box bg="navy.800" p="4" color="white">
            <Flex justify="space-between" align="center">
              <HStack spaceX="2">
                <Box bg="white" p="1" borderRadius="xs">
                  <MessageSquare size={18} className="text-navy-800" />
                </Box>
                <Box textAlign="left">
                  <Text fontSize="sm" fontWeight="bold">Moses Chris Support</Text>
                  <Text fontSize="10px" color="navy.200">Typically replies immediately</Text>
                </Box>
              </HStack>
              <IconButton
                aria-label="Close Chat"
                variant="ghost"
                color="white"
                size="xs"
                onClick={() => setExpanded(false)}
                _hover={{ bg: "navy.700" }}
              >
                <X size={14} />
              </IconButton>
            </Flex>
          </Box>

          {/* Body and Catalog links */}
          <Box p="4" maxH="380px" overflowY="auto" bg="white">
            <Text fontSize="xs" mb="3" color="navy.500" textAlign="left">
              Welcome to the Moses Chris platform. Let us know how we can support you today.
            </Text>

            <VStack align="stretch" spaceY="2" mb="4">
              <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" color="navy.400" textAlign="left">
                Quick Consultative Channels
              </Text>
              
              <Button
                variant="outline"
                size="sm"
                justifyContent="flex-start"
                onClick={() => handleQuickCTA("Crisis Counseling & DV Trauma Intake")}
                borderColor="navy.200"
                borderRadius="xs"
                bg="white"
                _hover={{ borderColor: "teal.600", bg: "teal.50" }}
              >
                <HStack spaceX="2" align="center">
                  <ShieldAlert size={14} className="text-red-600" />
                  <Box textAlign="left">
                    <Text fontSize="xs" fontWeight="bold" color="navy.800">Crisis Counseling Intake</Text>
                    <Text fontSize="9px" color="navy.500">Immediate safe, confidential audit</Text>
                  </Box>
                </HStack>
              </Button>

              <Button
                variant="outline"
                size="sm"
                justifyContent="flex-start"
                onClick={() => handleQuickCTA("Enrollment Support - Moses Chris Academy")}
                borderColor="navy.200"
                borderRadius="xs"
                bg="white"
                _hover={{ borderColor: "teal.600", bg: "teal.50" }}
              >
                <HStack spaceX="2" align="center">
                  <Award size={14} className="text-teal-600" />
                  <Box textAlign="left">
                    <Text fontSize="xs" fontWeight="bold" color="navy.800">Academy Student Help</Text>
                    <Text fontSize="9px" color="navy.500">Course enrollment or Zoom linkages</Text>
                  </Box>
                </HStack>
              </Button>

              <Button
                variant="outline"
                size="sm"
                justifyContent="flex-start"
                onClick={() => handleQuickCTA("Book Orders & Custom Physical Shipments")}
                borderColor="navy.200"
                borderRadius="xs"
                bg="white"
                _hover={{ borderColor: "teal.600", bg: "teal.50" }}
              >
                <HStack spaceX="2" align="center">
                  <ShoppingBag size={14} className="text-teal-600" />
                  <Box textAlign="left">
                    <Text fontSize="xs" fontWeight="bold" color="navy.800">E-Commerce Book Orders</Text>
                    <Text fontSize="9px" color="navy.500">Bulk deliveries or Kindle link support</Text>
                  </Box>
                </HStack>
              </Button>
            </VStack>
          </Box>

          {/* Quick Input Form */}
          <Box p="3" bg="white" borderTop="1px solid" borderColor="navy.100">
            <Flex spaceX="2">
              <Input
                placeholder="Type your message..."
                size="sm"
                bg="white"
                borderRadius="xs"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                border="1px solid"
                borderColor="navy.200"
              />
              <IconButton
                aria-label="Send WhatsApp"
                bg="navy.800"
                color="white"
                size="sm"
                onClick={handleSend}
                _hover={{ bg: "navy.750" }}
                borderRadius="xs"
              >
                <Send size={14} />
              </IconButton>
            </Flex>
          </Box>
        </Box>
      ) : (
        <Button
          onClick={() => setExpanded(true)}
          bg="teal.600"
          color="white"
          borderRadius="full"
          h="14"
          w="14"
          boxShadow="lg"
          _hover={{ bg: "teal.700", transform: "scale(1.05)" }}
          transition="all 0.2s"
          as="div"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <MessageSquare size={26} className="text-white fill-current" />
        </Button>
      )}
    </Box>
  );
}
