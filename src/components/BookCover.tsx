import React, { useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

// Import the local book cover assets
import renewalCoverImg from "../assets/renewal.jpg"; 
import safeguardingCoverImg from "../assets/safeguarding democracy.jpg";
import healingMindsCoverImg from "../assets/healing minds.png";
import behindDoorsCoverImg from "../assets/Behind Doors.png";
import maternalCoverImg from "../assets/maternal.png";
import emergencyCoverImg from "../assets/emergency.png";

interface BookCoverProps {
  id: string;
  title: string;
  image: string;
  author: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export const BookCover: React.FC<BookCoverProps> = ({ id, title, image, author, size = "md" }) => {
  const [imageError, setImageError] = useState(false);

  // Height and responsive class configurations with padding adjustments
  const heightMap = {
    xs: "45px",
    sm: "90px",
    md: "175px",
    lg: "275px"
  };

  const widthMap = {
    xs: "31px",
    sm: "62px",
    md: "120px",
    lg: "190px"
  };

  const actualHeight = heightMap[size];
  const actualWidth = widthMap[size];

  // Resolve which image source to use based on the product ID or Title keywords
  let resolvedImageSrc = image;
  const lowerTitle = title.toLowerCase();
  if (id === "prod-5" || lowerTitle.includes("renewal")) {
    resolvedImageSrc = renewalCoverImg;
  } else if (id === "prod-6" || lowerTitle.includes("safeguarding")) {
    resolvedImageSrc = safeguardingCoverImg;
  } else if (id === "prod-1" || lowerTitle.includes("healing minds") || lowerTitle.includes("healing...")) {
    resolvedImageSrc = healingMindsCoverImg;
  } else if (id === "prod-2" || lowerTitle.includes("behind closed doors") || lowerTitle.includes("behind...")) {
    resolvedImageSrc = behindDoorsCoverImg;
  } else if (id === "prod-3" || lowerTitle.includes("maternal")) {
    resolvedImageSrc = maternalCoverImg;
  } else if (id === "prod-4" || lowerTitle.includes("emergency")) {
    resolvedImageSrc = emergencyCoverImg;
  }

  // Common premium 3D Book Frame wrapper to make flat cover images look like physical books
  const renderPhysicalBook = (imgSrc: string) => {
    return (
      <Box
        w={actualWidth}
        h={actualHeight}
        position="relative"
        borderRadius="2px 5px 5px 2px"
        overflow="hidden"
        style={{
          boxShadow: size === "lg" 
            ? "0 12px 28px -5px rgba(0, 0, 0, 0.35), 0 8px 12px -6px rgba(0, 0, 0, 0.3), inset -2px 0 6px rgba(0,0,0,0.1)"
            : "0 6px 12px -3px rgba(0, 0, 0, 0.25), 0 3px 6px -2px rgba(0, 0, 0, 0.2)"
        }}
        bg="navy.50"
        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        _hover={{
          transform: "translateY(-6px) rotateY(-4deg) scale(1.03)",
          boxShadow: size === "lg"
            ? "0 20px 35px -5px rgba(0, 0, 0, 0.4), 0 12px 18px -6px rgba(0, 0, 0, 0.35)"
            : "0 10px 18px -3px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Core cover image */}
        <img
          src={imgSrc}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill"
          }}
        />

        {/* 3D Spine Crease Overlay (realistic paper binding indentation) */}
        <Box
          position="absolute"
          top="0"
          left="0"
          bottom="0"
          w="10%"
          pointerEvents="none"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.08) 3%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.0) 15%)"
          }}
        />

        {/* Soft edge gloss (simulates light reflecting off the right booklet curvature) */}
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          w="4%"
          pointerEvents="none"
          style={{
            background: "linear-gradient(to left, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)"
          }}
        />

        {/* Spine book border line */}
        <Box
          position="absolute"
          top="0"
          left="0"
          bottom="0"
          w="1px"
          bg="rgba(255,255,255,0.15)"
          pointerEvents="none"
        />
      </Box>
    );
  };

  // If there's NO compilation or loading error and the image state is fine, display the gorgeous physical cover image!
  if (!imageError && resolvedImageSrc) {
    return renderPhysicalBook(resolvedImageSrc);
  }

  // --- FALLBACK VECTOR DESIGNS (Triggered if actual images are unavailable or empty) ---

  // 1. RENEWAL COVER FALLBACK (Green waterfall/downpour, man silhouette, custom mint titles)
  if (id === "prod-5") {
    return (
      <Box
        w={actualWidth}
        h={actualHeight}
        borderRadius="2px 5px 5px 2px"
        boxShadow="md"
        position="relative"
        overflow="hidden"
        style={{
          background: "linear-gradient(135deg, #091a18 0%, #05100f 60%, #020606 100%)",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        p={size === "xs" ? "1" : size === "sm" ? "2" : size === "md" ? "3" : "5"}
        textAlign="center"
      >
        <Box
          position="absolute"
          top="15%"
          left="50%"
          transform="translateX(-50%)"
          w="80%"
          h="70%"
          borderRadius="full"
          filter="blur(24px)"
          opacity="0.3"
          style={{
            background: "radial-gradient(circle, rgba(167,243,208,0.7) 0%, rgba(5,16,15,0) 80%)",
          }}
          pointerEvents="none"
        />

        {size !== "xs" && (
          <svg
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="downpour" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#05100f" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="none" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1={`${10 + i * 12}%`}
                y1="0"
                x2={`${10 + i * 12 + 2}%`}
                y2="100%"
                stroke="url(#downpour)"
                strokeWidth={size === "lg" ? "1.5" : "0.75"}
                strokeDasharray="4, 12"
              />
            ))}
          </svg>
        )}

        {/* TOP TITLE: Renewal */}
        <VStack spaceY="0.5" w="full" transform={size === "xs" ? "scale(0.7)" : "none"}>
          <Text
            fontFamily="serif"
            fontWeight="bold"
            letterSpacing="wide"
            color="#a7f3d0"
            fontSize={size === "xs" ? "8px" : size === "sm" ? "10px" : size === "md" ? "16px" : "24px"}
            style={{
              textShadow: "0 0 10px rgba(167,243,208,0.3)"
            }}
          >
            Renewal
          </Text>
          {size !== "xs" && size !== "sm" && (
            <Text
              fontSize={size === "md" ? "6.5px" : "9px"}
              color="white"
              fontWeight="medium"
              letterSpacing="normal"
              opacity="0.9"
            >
              Survival and Self-Discovery
            </Text>
          )}
        </VStack>

        {/* MIDDLE: Man Silhouette */}
        {size !== "xs" && (
          <Box w="full" h="45%" display="flex" alignItems="center" justifyContent="center" position="relative" zIndex={2}>
            <svg
              viewBox="0 0 100 100"
              className="h-full object-contain"
              style={{ filter: "drop-shadow(0px -2px 8px rgba(167,243,208,0.2))" }}
            >
              <path
                d="M50,15 C52.5,15 54,17.5 54,20 C54,22.5 52.5,23.5 50,23.5 C47.5,23.5 46,22.5 46,20 C46,17.5 47.5,15 50,15 Z 
                   M50,23.5 C51,23.5 52,24 53,24.5 L68,29 C70.5,29.8 73,30.5 76,31 L80,32 C82,32.5 83,34.5 82,36 C81,37 79,37.5 77.5,36.5 L64,29 L58,29.5 L58,35 C64,39 67,42 66,45 L62,49 L60,45 L58,40 L58,74 L61,85 L59,85 L55,75 L52,65 L48,65 L45,75 L41,85 L39,85 L42,74 L42,40 L40,45 L38,49 L34,45 C33,42 36,39 42,35 L42,29.5 L36,29 L22.5,36.5 C21,37.5 19,37 18,36 C17,34.5 18,32.5 20,32 L24,31 C27,30.5 29.5,29.8 32,29 L47,24.5 C48,24 49,23.5 50,23.5 Z"
                fill="#000000"
                stroke="#a7f3d0"
                strokeWidth="0.5"
              />
            </svg>
          </Box>
        )}

        {/* BOTTOM: Chris Moses Author Label */}
        <Text
          fontWeight="semibold"
          color="#a7f3d0"
          fontSize={size === "xs" ? "5px" : size === "sm" ? "7px" : size === "md" ? "9px" : "13px"}
          letterSpacing="wider"
          w="full"
        >
          Chris Moses
        </Text>
      </Box>
    );
  }

  // 2. SAFEGUARDING DEMOCRACY COVER FALLBACK (Dark navy/blue, waving US flag backdrop, eagle head profile)
  if (id === "prod-6") {
    return (
      <Box
        w={actualWidth}
        h={actualHeight}
        borderRadius="2px 5px 5px 2px"
        boxShadow="md"
        position="relative"
        overflow="hidden"
        style={{
          background: "linear-gradient(135deg, #0f224b 0%, #061026 60%, #020612 100%)",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        p={size === "xs" ? "1" : size === "sm" ? "1.5" : size === "md" ? "3" : "5"}
        textAlign="center"
      >
        {/* American Flag Backdrop representation */}
        {size !== "xs" && (
          <svg
            className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
            viewBox="0 0 100 140"
            preserveAspectRatio="none"
          >
            {Array.from({ length: 13 }).map((_, i) => (
              <path
                key={i}
                d={`M0,${i * 10.7} Q25,${i * 10.7 - 5} 50,${i * 10.7 + 3} T100,${i * 10.7}`}
                fill="none"
                stroke={i % 2 === 0 ? "#b91c1c" : "#ffffff"}
                strokeWidth="6"
              />
            ))}
            <rect x="0" y="0" width="45" height="50" fill="#1e3a8a" opacity="0.9" />
            {Array.from({ length: 4 }).map((_, row) =>
              Array.from({ length: 4 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={7 + col * 10}
                  cy={7 + row * 12}
                  r="1.2"
                  fill="#ffffff"
                />
              ))
            )}
          </svg>
        )}

        {/* TOP AUTHOR: Chris Moses */}
        <Text
          fontWeight="bold"
          color="#d1fae5"
          fontSize={size === "xs" ? "5px" : size === "sm" ? "7px" : size === "md" ? "9px" : "13px"}
          letterSpacing="wide"
          w="full"
          transform={size === "xs" ? "scale(0.8)" : "none"}
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
        >
          Chris Moses
        </Text>

        {/* MIDDLE: Eagle Head SVG */}
        {size !== "xs" && (
          <Box w="full" h="45%" display="flex" justify="space-between" align="end" position="relative" zIndex={2}>
            <svg
              viewBox="0 0 100 100"
              className="h-full object-contain"
              style={{
                filter: "drop-shadow(2px 2px 5px rgba(0,0,0,0.5))",
                transform: "scale(1.2) translate(-8px, 4px)",
              }}
            >
              <g id="eagle-head">
                <path d="M10,80 L20,60 L30,55 L45,58 L65,72 L80,95 L10,100 Z" fill="#e2e8f0" />
                <path d="M30,55 Q50,75 80,95 L65,95 Z" fill="#cbd5e1" />
                <path d="M15,80 C18,65 22,40 38,32 C48,26 68,28 75,40 C80,48 80,58 74,68 C68,76 48,82 15,80 Z" fill="#ffffff" />
                <path d="M68,43 C74,40 85,38 90,44 C95,50 94,58 87,62 C80,66 77,65 74,64 L67,58 C68,54 68,46 68,43 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                <circle cx="58" cy="40" r="4" fill="#fbbf24" />
                <circle cx="58" cy="40" r="1.8" fill="#000" />
              </g>
            </svg>
          </Box>
        )}

        {/* BOTTOM TITLE: Safeguarding Democracy */}
        <VStack spaceY="0.5" w="full" transform={size === "xs" ? "scale(0.8)" : "none"}>
          <Text
            fontWeight="bold"
            color="white"
            fontSize={size === "xs" ? "6.5px" : size === "sm" ? "8.5px" : size === "md" ? "12px" : "18px"}
            lineHeight="shorter"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.9)"
            }}
          >
            Safeguarding Democracy
          </Text>
        </VStack>
      </Box>
    );
  }

  // 3. HEALING MINDS, PROTECTING LIVES COVER FALLBACK (`prod-1`)
  if (id === "prod-1") {
    return (
      <Box
        w={actualWidth}
        h={actualHeight}
        borderRadius="2px 5px 5px 2px"
        boxShadow="md"
        position="relative"
        overflow="hidden"
        style={{
          background: "linear-gradient(135deg, #0d3b36 0%, #061c1a 70%, #020b0a 100%)",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        p={size === "xs" ? "1" : size === "sm" ? "1.5" : size === "md" ? "3" : "5"}
        textAlign="center"
      >
        {/* Soft abstract ripple circular waves of relief */}
        <Box
          position="absolute"
          top="30%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="90%"
          h="60%"
          pointerEvents="none"
          opacity="0.15"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#2dd4bf" strokeWidth="1" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#2dd4bf" strokeWidth="1" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="#2dd4bf" strokeWidth="1" />
          </svg>
        </Box>

        <Text
          fontWeight="semibold"
          color="#2dd4bf"
          fontSize={size === "xs" ? "5px" : size === "sm" ? "7px" : size === "md" ? "9px" : "12px"}
          letterSpacing="wider"
          textTransform="uppercase"
        >
          Moses Chris
        </Text>

        {size !== "xs" && (
          <Box w="full" h="35%" display="flex" alignItems="center" justifyContent="center" zIndex={2}>
            {/* Elegant Caduceus/Shield or Cross public health icon overlay */}
            <svg viewBox="0 0 24 24" className="h-full object-contain opacity-70" fill="none" stroke="#2dd4bf" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </Box>
        )}

        <VStack spaceY="1" w="full">
          <Text
            fontFamily="serif"
            fontWeight="bold"
            color="white"
            fontSize={size === "xs" ? "6.5px" : size === "sm" ? "8.5px" : size === "md" ? "12px" : "18px"}
            lineHeight="shorter"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          >
            Healing Minds Protective Lives
          </Text>
        </VStack>
      </Box>
    );
  }

  // 4. BEHIND CLOSED DOORS COVER FALLBACK (`prod-2`)
  if (id === "prod-2") {
    return (
      <Box
        w={actualWidth}
        h={actualHeight}
        borderRadius="2px 5px 5px 2px"
        boxShadow="md"
        position="relative"
        overflow="hidden"
        style={{
          background: "linear-gradient(135deg, #270606 0%, #150202 60%, #050000 100%)",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        p={size === "xs" ? "1" : size === "sm" ? "1.5" : size === "md" ? "3" : "5"}
        textAlign="center"
      >
        {/* Slit of light coming through a closed door silhouette */}
        <Box
          position="absolute"
          top="0"
          bottom="0"
          left="48%"
          right="46%"
          filter="blur(8px)"
          pointerEvents="none"
          opacity="0.4"
          style={{
            background: "linear-gradient(to right, #ea580c 0%, #facc15 100%)"
          }}
        />

        <Text
          fontWeight="semibold"
          color="#fca5a5"
          fontSize={size === "xs" ? "5px" : size === "sm" ? "7px" : size === "md" ? "9px" : "12px"}
          letterSpacing="wider"
        >
          Moses Chris
        </Text>

        {size !== "xs" && (
          <Box w="full" h="35%" display="flex" alignItems="center" justifyContent="center" zIndex={2}>
            {/* Keyhole or unlocked door silhouette overlay */}
            <svg viewBox="0 0 24 24" className="h-full object-contain opacity-60" fill="none" stroke="#fca5a5" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </Box>
        )}

        <VStack spaceY="1" w="full">
          <Text
            fontFamily="serif"
            fontWeight="bold"
            color="white"
            fontSize={size === "xs" ? "6.5px" : size === "sm" ? "8.5px" : size === "md" ? "12px" : "18px"}
            lineHeight="shorter"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          >
            Behind Closed Doors
          </Text>
        </VStack>
      </Box>
    );
  }

  // 5. MATERNAL RESILIENCY COVER FALLBACK (`prod-3`)
  if (id === "prod-3") {
    return (
      <Box
        w={actualWidth}
        h={actualHeight}
        borderRadius="2px 5px 5px 2px"
        boxShadow="md"
        position="relative"
        overflow="hidden"
        style={{
          background: "linear-gradient(135deg, #5c2c16 0%, #3a190b 60%, #1f0b03 100%)",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        p={size === "xs" ? "1" : size === "sm" ? "1.5" : size === "md" ? "3" : "5"}
        textAlign="center"
      >
        {/* Soft abstract comforting halo of rose light */}
        <Box
          position="absolute"
          top="35%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="80%"
          h="60%"
          borderRadius="full"
          filter="blur(16px)"
          opacity="0.25"
          style={{
            background: "radial-gradient(circle, #f43f5e 0%, transparent 70%)"
          }}
          pointerEvents="none"
        />

        <Text
          fontWeight="semibold"
          color="#ffedd5"
          fontSize={size === "xs" ? "5px" : size === "sm" ? "7px" : size === "md" ? "9px" : "12px"}
          letterSpacing="wider"
        >
          Moses Chris
        </Text>

        {size !== "xs" && (
          <Box w="full" h="40%" display="flex" alignItems="center" justifyContent="center" zIndex={2}>
            {/* Elegant nurturing hands or baby icon overlay */}
            <svg viewBox="0 0 24 24" className="h-full object-contain opacity-80" fill="none" stroke="#ffedd5" strokeWidth="1.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </Box>
        )}

        <VStack spaceY="1" w="full">
          <Text
            fontFamily="serif"
            fontWeight="bold"
            color="white"
            fontSize={size === "xs" ? "6.5px" : size === "sm" ? "8.5px" : size === "md" ? "12px" : "18px"}
            lineHeight="shorter"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          >
            Maternal Resiliency
          </Text>
        </VStack>
      </Box>
    );
  }

  // 6. EMERGENCY ACTION BLUEPRINT COVER FALLBACK (`prod-4`)
  if (id === "prod-4") {
    return (
      <Box
        w={actualWidth}
        h={actualHeight}
        borderRadius="2px 5px 5px 2px"
        boxShadow="md"
        position="relative"
        overflow="hidden"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 70%, #020617 100%)",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        p={size === "xs" ? "1" : size === "sm" ? "1.5" : size === "md" ? "3" : "5"}
        textAlign="center"
      >
        {/* Warning / Emergency structural lines */}
        <Box
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
          opacity="0.1"
          pointerEvents="none"
          style={{
            backgroundImage: "radial-gradient(#f97316 1px, transparent 1px)",
            backgroundSize: "16px 16px"
          }}
        />

        <Text
          fontWeight="semibold"
          color="#ffedd5"
          fontSize={size === "xs" ? "5px" : size === "sm" ? "7px" : size === "md" ? "9px" : "12px"}
          letterSpacing="wider"
        >
          Moses Chris
        </Text>

        {size !== "xs" && (
          <Box w="full" h="35%" display="flex" alignItems="center" justifyContent="center" zIndex={2}>
            {/* Crisis megastar/hazard shield overlay */}
            <svg viewBox="0 0 24 24" className="h-full object-contain opacity-70" fill="none" stroke="#f97316" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </Box>
        )}

        <VStack spaceY="1" w="full">
          <Text
            fontFamily="serif"
            fontWeight="bold"
            color="white"
            fontSize={size === "xs" ? "6.5px" : size === "sm" ? "8.5px" : size === "md" ? "12px" : "18px"}
            lineHeight="shorter"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          >
            Emergency Blueprint
          </Text>
        </VStack>
      </Box>
    );
  }

  // Fallback for general items (plain flat image cover)
  return renderPhysicalBook(image);
};
