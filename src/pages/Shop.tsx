import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePlatformStore } from "../store";
import { Product } from "../types";
import { BookCover } from "../components/BookCover";
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
  IconButton,
  Image,
} from "@chakra-ui/react";
import {
  Search,
  ShoppingCart,
  Star,
  Download,
  ExternalLink,
  Trash2,
  Lock,
  Compass,
  CheckCircle,
  CreditCard,
  Heart,
  ChevronRight,
} from "lucide-react";

export default function Shop() {
  const {
    products,
    cart,
    wishlist,
    addCartItem,
    removeCartItem,
    updateCartQuantity,
    clearCart,
    toggleWishlist
  } = usePlatformStore();

  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab ] = useState<"catalog" | "cart" | "downloads">("catalog");

  // Selected product to inspect details
  const [detailedProductId, setDetailedProductId] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Checkout states
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [chosenGateway, setChosenGateway] = useState<"stripe" | "paypal" | "flutterwave" | "paystack">("stripe");
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  
  // Storing items purchased to download afterward
  const [downloadableItems, setDownloadableItems ] = useState<Product[]>([]);
  // Simulated downloading states
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const categories = ["All", "book", "ebook", "training", "resource"];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    setCheckoutModalOpen(true);
  };

  const handleCompletePayment = () => {
    setPurchaseComplete(true);
    // Add cart digital ebooks or resources to downloads
    const digital = cart
      .filter((item) => item.product.category === "ebook" || item.product.category === "resource")
      .map((item) => item.product);
    
    setDownloadableItems((prev) => [...prev, ...digital]);
    clearCart();
    
    setTimeout(() => {
      setCheckoutModalOpen(false);
      setPurchaseComplete(false);
      setActiveTab("downloads");
    }, 2000);
  };

  const handleDownloadSimulate = (title: string, id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  const detailedProduct = products.find((p) => p.id === detailedProductId);

  return (
    <Box bg="white" minH="100vh">
      {/* Title banner */}
      <Box bg="white" color="navy.800" py="16" borderBottom="1px solid" borderColor="navy.200">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} spaceY={{ base: "6", md: "0" }}>
            <Box textAlign="left">
              <Badge bg="teal.50" color="teal.750" mb="4" fontWeight="extrabold" borderRadius="xs" letterSpacing="wider">
                MOSES CHRIS COMMERCE GATEWAY
              </Badge>
              <Heading fontSize={{ base: "3xl", md: "5xl" }} color="navy.800" fontWeight="normal" fontFamily="heading" mb="4" lineHeight="tight">
                E-Commerce Publications Desk
              </Heading>
              <Text fontSize="sm" color="navy.500" fontStyle="italic" maxW="600px" lineHeight="relaxed">
                Order physical paperback books, or obtain instant digital download access for crisis containment manuals and protection worksheets.
              </Text>
            </Box>

            <HStack spaceX="3">
              <Button
                size="sm"
                bg={activeTab === "catalog" ? "navy.800" : "white"}
                color={activeTab === "catalog" ? "white" : "navy.800"}
                variant={activeTab === "catalog" ? "solid" : "outline"}
                borderColor="navy.200"
                fontWeight="bold"
                onClick={() => { setActiveTab("catalog"); setDetailedProductId(null); }}
                borderRadius="xs"
                _hover={{ bg: activeTab === "catalog" ? "navy.700" : "navy.50" }}
              >
                Browse Books & Manuals
              </Button>
              <Button
                size="sm"
                bg={activeTab === "cart" ? "navy.800" : "white"}
                color={activeTab === "cart" ? "white" : "navy.800"}
                variant={activeTab === "cart" ? "solid" : "outline"}
                borderColor="navy.200"
                fontWeight="bold"
                position="relative"
                onClick={() => { setActiveTab("cart"); setDetailedProductId(null); }}
                borderRadius="xs"
                _hover={{ bg: activeTab === "cart" ? "navy.700" : "navy.50" }}
              >
                My Cart
                {cart.length > 0 && (
                  <Badge variant="solid" bg="teal.600" color="white" ml="2" borderRadius="full">
                    {cart.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Button>
              <Button
                size="sm"
                bg={activeTab === "downloads" ? "navy.800" : "white"}
                color={activeTab === "downloads" ? "white" : "navy.800"}
                variant={activeTab === "downloads" ? "solid" : "outline"}
                borderColor="navy.200"
                fontWeight="bold"
                onClick={() => { setActiveTab("downloads"); setDetailedProductId(null); }}
                borderRadius="xs"
                _hover={{ bg: activeTab === "downloads" ? "navy.700" : "navy.50" }}
              >
                My Digital Access
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Box>

      {/* Main Core */}
      <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }} py="8">
        {/* TAB 1: PRODUCT CATALOG */}
        {activeTab === "catalog" && !detailedProductId && (
          <Box>
            {/* Search and Category Filters */}
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "stretch", md: "center" }} mb="8" gap="4">
              <HStack spaceX="2" wrap="wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    size="xs"
                    bg={categoryFilter === cat ? "teal.600" : "white"}
                    color={categoryFilter === cat ? "white" : "navy.800"}
                    _hover={{ bg: "teal.600", color: "white" }}
                    onClick={() => setCategoryFilter(cat)}
                    borderRadius="xs"
                    border="1px solid"
                    borderColor="navy.200"
                    textTransform="capitalize"
                  >
                    {cat === "book" ? "Paperback" : cat === "ebook" ? "Digital PDF" : cat === "All" ? "All Categories" : cat}
                  </Button>
                ))}
              </HStack>

              <HStack spaceX="2" bg="white" px="3" py="1.5" borderRadius="xs" border="1px solid" borderColor="navy.200" maxW="320px" w="full">
                <Search size={16} className="text-navy-400" />
                <Input
                  placeholder="Search publications..."
                  size="xs"
                  border="none"
                  _focus={{ outline: "none", boxShadow: "none" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </HStack>
            </Flex>

            {/* Grid display */}
            <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap="8">
              {filteredProducts.map((p) => {
                const isStarred = wishlist.includes(p.id);
                return (
                  <Box
                    key={p.id}
                    bg="white"
                    borderRadius="xs"
                    border="1px solid"
                    borderColor="navy.200"
                    overflow="hidden"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    {/* Cover graphic */}
                    <Box
                      h="200px"
                      bg="navy.50"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      borderBottom="1px solid"
                      borderColor="navy.100"
                    >
                      <BookCover id={p.id} title={p.title} image={p.image} author={p.author} size="md" />
                      
                      {/* Wishlist toggle */}
                      <IconButton
                        aria-label="Wishlist Toggle"
                        position="absolute"
                        top="3"
                        right="3"
                        bg="white"
                        size="sm"
                        borderRadius="xs"
                        border="1px solid"
                        borderColor="navy.200"
                        onClick={() => toggleWishlist(p.id)}
                        _hover={{ bg: "navy.50" }}
                      >
                        <Heart size={16} className={isStarred ? "text-red-500 fill-current" : "text-navy-400"} />
                      </IconButton>
                    </Box>

                    {/* Meta and titles */}
                    <Box p="4" flex="1" display="flex" flexDirection="column" justify="space-between">
                      <Box textAlign="left">
                        <HStack justify="space-between" mb="2">
                          <Badge bg="teal.50" color="teal.750" fontSize="8px" fontWeight="bold" borderRadius="xs">
                            {p.category === "book" ? "PHYSICAL PAPERBACK" : "DIGITAL E-BOOK"}
                          </Badge>
                          <HStack spaceX="0.5">
                            <Star size={10} className="text-teal-600 fill-current" />
                            <Text fontSize="10px" fontWeight="bold" color="navy.600">{p.rating}</Text>
                          </HStack>
                        </HStack>

                        <Heading fontSize="xs" fontWeight="bold" color="navy.800" minH="36px" lineClamp="2" mb="1">
                          {p.title}
                        </Heading>
                        <Text fontSize="9px" color="navy.400" mb="3">By {p.author}</Text>
                        <Text fontSize="10px" color="navy.500" lineClamp="3" minH="44px" mb="4">
                          {p.summary}
                        </Text>
                      </Box>

                      {/* Add / details footer */}
                      <Box pt="3" borderTop="1px solid" borderColor="navy.100">
                        <Flex justify="space-between" align="center" mb="3">
                          <Text fontSize="md" fontWeight="bold" color="teal.700">
                            ${p.price}
                          </Text>
                          <Button size="xs" variant="ghost" color="navy.800" _hover={{ color: "teal.600" }} onClick={() => { setDetailedProductId(p.id); setIsDescriptionExpanded(false); }}>
                            Learn Details
                          </Button>
                        </Flex>

                        <Button size="xs" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} w="full" leftIcon={<ShoppingCart size={12} />} onClick={() => addCartItem(p)} borderRadius="xs">
                          Add to Book Bag
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        )}

        {/* TAB 1.5: PRODUCT DETAILED POPUP PREVIEW */}
        {activeTab === "catalog" && detailedProduct && (
          <Box maxW="900px" mx="auto" p="6" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200" textAlign="left">
            <SimpleGrid columns={{ base: 1, md: 10 }} gap="8" align="center">
              <Box gridColumn={{ base: "1", md: "span 4" }} h="320px" bg="navy.50" borderRadius="xs" display="flex" align="center" justify="center">
                <BookCover id={detailedProduct.id} title={detailedProduct.title} image={detailedProduct.image} author={detailedProduct.author} size="lg" />
              </Box>

              <Box gridColumn={{ base: "1", md: "span 6" }}>
                <HStack mb="2">
                  <Badge bg="teal.50" color="teal.750" fontSize="9px" fontWeight="bold" borderRadius="xs">
                    {detailedProduct.category.toUpperCase()}
                  </Badge>
                  {detailedProduct.amazonKindleLink && (
                    <Badge variant="outline" color="teal.700" borderColor="teal.500" fontSize="8px" borderRadius="xs">
                      Amazon Kindle Compatible
                    </Badge>
                  )}
                </HStack>

                <Heading fontSize="lg" fontWeight="normal" fontFamily="heading" color="navy.800" mb="2">
                  {detailedProduct.title}
                </Heading>
                <Text fontSize="xs" color="navy.400" mb="4">By {detailedProduct.author} (Registered Therapist / Epidemiologist)</Text>
                
                <Box mb="6">
                  {(() => {
                    const paragraphs = detailedProduct.descriptionParagraphs || [detailedProduct.summary];
                    const count = paragraphs.length;
                    const showToggle = count > 3;
                    const displayed = (showToggle && !isDescriptionExpanded) ? paragraphs.slice(0, 3) : paragraphs;

                    return (
                      <VStack align="stretch" spaceY="3">
                        {displayed.map((p, idx) => (
                          <Text key={idx} fontSize="xs" color="navy.600" lineHeight="relaxed">
                            {p}
                          </Text>
                        ))}
                        {showToggle && (
                          <Button
                            size="xs"
                            variant="link"
                            color="teal.600"
                            fontWeight="bold"
                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                            alignSelf="flex-start"
                            py="1"
                            _hover={{ textDecoration: "underline", color: "teal.700" }}
                          >
                            {isDescriptionExpanded ? "Read Less ▲" : `Read More ▼ (+${count - 3} paragraphs)`}
                          </Button>
                        )}
                      </VStack>
                    );
                  })()}
                </Box>

                {detailedProduct.productDetails && detailedProduct.productDetails.length > 0 && (
                  <Box mb="6" p="3" bg="navy.50" borderRadius="xs" border="1px solid" borderColor="navy.150">
                    <Text fontSize="10px" fontWeight="bold" color="navy.700" mb="2" uppercase="true">Publication Specifications</Text>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2">
                      {detailedProduct.productDetails.map((detail) => (
                        <HStack key={detail.label} justify="space-between" fontSize="10px" borderBottom="1px dashed" borderColor="navy.200" pb="1">
                          <Text color="navy.500" fontWeight="medium">{detail.label}:</Text>
                          <Text color="navy.800" fontWeight="bold" textAlign="right">{detail.value}</Text>
                        </HStack>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}

                <Box mb="6">
                  <Text fontSize="10px" fontWeight="bold" color="navy.400" mb="2" uppercase="true">Included Features</Text>
                  <VStack align="stretch" spaceY="1">
                    {detailedProduct.features?.map((f) => (
                      <HStack key={f} spaceX="2">
                        <CheckCircle size={12} className="text-teal-600" />
                        <Text fontSize="11px" color="navy.500">{f}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <HStack spaceX="3" pt="4" borderTop="1px solid" borderColor="navy.100">
                  <Box>
                    <Text fontSize="10px" color="navy.400" lineHeight="shorter">PRICE</Text>
                    <Text fontSize="xl" fontWeight="extrabold" color="teal.700">${detailedProduct.price}</Text>
                  </Box>
                  
                  <Button size="sm" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} onClick={() => addCartItem(detailedProduct)} borderRadius="xs">
                    Add to Book Bag
                  </Button>

                  {detailedProduct.amazonKindleLink && (
                    <Link to={{ pathname: detailedProduct.amazonKindleLink } as any}>
                      <Button size="sm" variant="outline" borderColor="navy.800" color="navy.800" _hover={{ bg: "navy.50" }} borderRadius="xs">
                        Buy on Kindle
                        <ExternalLink size={12} style={{ marginLeft: "4px" }} />
                      </Button>
                    </Link>
                  )}

                  <Button size="sm" variant="ghost" color="navy.500" onClick={() => setDetailedProductId(null)}>
                    Back to Catalog
                  </Button>
                </HStack>
              </Box>
            </SimpleGrid>
          </Box>
        )}

        {/* TAB 2: CART VIEW */}
        {activeTab === "cart" && (
          <Box maxW="800px" mx="auto" textAlign="left">
            <Heading fontSize="xl" fontWeight="normal" fontFamily="heading" color="navy.800" mb="2">
              My E-Commerce Book Bag
            </Heading>
            <Text fontSize="xs" color="navy.500" mb="8">
              Review publications in your cart. After secure check-out, any digital worksheets, PDF checklists, or e-books will immediately unlock inside your digital access center.
            </Text>

            {cart.length === 0 ? (
              <Box py="16" bg="white" borderRadius="xs" textAlign="center" border="1px solid" borderColor="navy.200">
                <ShoppingCart size={44} className="text-navy-300 mx-auto mb-3" />
                <Heading fontSize="sm" fontWeight="bold" mb="1" color="navy.800">Your book bag is empty</Heading>
                <Text fontSize="xs" color="navy.500" mb="4">You do not have any items ready for purchase.</Text>
                <Button size="xs" bg="navy.800" color="white" onClick={() => setActiveTab("catalog")} borderRadius="xs" _hover={{ bg: "navy.700" }}>Return to Bookstore</Button>
              </Box>
            ) : (
              <VStack align="stretch" spaceY="4">
                {cart.map((item) => (
                  <Box key={item.product.id} p="4" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200">
                    <Flex justify="space-between" align="center" wrap="wrap" gap="4">
                      <HStack spaceX="4" align="center">
                        <BookCover id={item.product.id} title={item.product.title} image={item.product.image} author={item.product.author} size="xs" />
                        <Box>
                          <Heading fontSize="xs" fontWeight="bold" color="navy.800" lineClamp="1">
                            {item.product.title}
                          </Heading>
                          <Text fontSize="10px" color="teal.700" fontWeight="bold">
                            ${item.product.price} each • {item.product.category.toUpperCase()}
                          </Text>
                        </Box>
                      </HStack>

                      <HStack spaceX="3">
                        {/* Quantity adjustment */}
                        <HStack spaceX="1">
                          <Button size="xs" borderRadius="xs" onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}>-</Button>
                          <Text fontSize="xs" fontWeight="bold" px="2" color="navy.800">{item.quantity}</Text>
                          <Button size="xs" borderRadius="xs" onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}>+</Button>
                        </HStack>

                        <Text fontSize="sm" fontWeight="extrabold" color="navy.800" minW="60px" textAlign="right">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </Text>

                        <IconButton
                          aria-label="Remove Item"
                          variant="ghost"
                          borderRadius="xs"
                          onClick={() => removeCartItem(item.product.id)}
                          _hover={{ color: "red.600", bg: "red.50" }}
                        >
                          <Trash2 size={14} />
                        </IconButton>
                      </HStack>
                    </Flex>
                  </Box>
                ))}

                {/* Subtotal calculations */}
                <Box bg="white" p="5" borderRadius="xs" border="1px solid" borderColor="navy.200" alignSelf="flex-end" w="300px">
                  <Flex justify="space-between" mb="2">
                    <Text fontSize="xs" color="navy.500">Cart Subtotal</Text>
                    <Text fontSize="xs" fontWeight="bold" color="navy.800">${cartSubtotal.toFixed(2)}</Text>
                  </Flex>
                  <Flex justify="space-between" mb="4" borderTop="1px solid" borderColor="navy.100" pt="2">
                    <Text fontSize="xs" fontWeight="bold" color="navy.800">Secure Total</Text>
                    <Text fontSize="sm" fontWeight="extrabold" color="teal.700">${cartSubtotal.toFixed(2)}</Text>
                  </Flex>

                  <Button size="xs" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} fontWeight="bold" w="full" borderRadius="xs" onClick={handleCheckoutClick}>
                    Proceed to Secure Checkout
                  </Button>
                </Box>
              </VStack>
            )}

            {/* Simulated Payment Gateway / Amazon Checkout Redirection Dialog inside the flow */}
            {checkoutModalOpen && (() => {
              const amazonPublicationsInCart = cart.filter(item => !!item.product.amazonKindleLink);
              const localDigitalInCart = cart.filter(item => !item.product.amazonKindleLink);
              const hasAmazonPublications = amazonPublicationsInCart.length > 0;
              const hasLocalDigital = localDigitalInCart.length > 0;

              return (
                <Box mt="8" p="6" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200">
                  {hasAmazonPublications && (
                    <Box mb={hasLocalDigital ? "6" : "0"}>
                      <HStack spaceX="2" mb="3">
                        <ExternalLink size={16} className="text-amber-500" />
                        <Heading fontSize="xs" fontWeight="bold" color="navy.800" uppercase="true">Amazon secure checkout</Heading>
                      </HStack>
                      <Text fontSize="10px" color="navy.500" mb="4">
                        The printed or Kindle editions in your bag are secured and fulfilled directly through Amazon. Select a title below to view and complete your safe purchase there:
                      </Text>

                      <VStack align="stretch" spaceY="3" mb="4">
                        {amazonPublicationsInCart.map((item) => (
                          <Box key={item.product.id} p="3" bg="amber.50" border="1px solid" borderColor="amber.200" borderRadius="xs">
                            <Flex justify="space-between" align="center" wrap="wrap" gap="2">
                              <Box textAlign="left">
                                <Text fontSize="11px" fontWeight="bold" color="navy.800">{item.product.title}</Text>
                                <Text fontSize="9px" color="navy.500">Fulfillment: Amazon Secure Dispatch • Qty: {item.quantity}</Text>
                              </Box>
                              <Button
                                as="a"
                                href={item.product.amazonKindleLink}
                                target="_blank"
                                rel="noreferrer"
                                size="xs"
                                bg="orange.500"
                                _hover={{ bg: "orange.650" }}
                                color="white"
                                fontWeight="bold"
                                borderRadius="xs"
                                rightIcon={<ExternalLink size={10} />}
                              >
                                Buy on Amazon
                              </Button>
                            </Flex>
                          </Box>
                        ))}
                      </VStack>

                      <Button
                        size="xs"
                        bg="navy.900"
                        color="white"
                        _hover={{ bg: "navy.800" }}
                        w="full"
                        onClick={() => {
                          // Open all Amazon links in tabs
                          amazonPublicationsInCart.forEach((item) => {
                            if (item.product.amazonKindleLink) {
                              window.open(item.product.amazonKindleLink, "_blank");
                            }
                            removeCartItem(item.product.id);
                          });
                          if (!hasLocalDigital) {
                            setCheckoutModalOpen(false);
                          }
                        }}
                        borderRadius="xs"
                      >
                        Launch Selected Books On Amazon & Clear from Cart
                      </Button>
                    </Box>
                  )}

                  {hasLocalDigital && (
                    <Box borderTop={hasAmazonPublications ? "1px solid" : "none"} borderColor="navy.200" pt={hasAmazonPublications ? "6" : "0"}>
                      <HStack spaceX="2" mb="3">
                        <Lock size={16} className="text-teal-600" />
                        <Text fontSize="xs" fontWeight="bold" color="navy.800" uppercase="true">Symmetric Encryption Checkout Gateways</Text>
                      </HStack>
                      <Text fontSize="10px" color="navy.500" mb="4">
                        Select your favored payment gateway for remaining direct digital downloads. Payments are processed in secure sandboxed test scopes.
                      </Text>

                      <SimpleGrid columns="4" gap="2" mb="6">
                        {["stripe", "paypal", "flutterwave", "paystack"].map((gw) => (
                          <Button
                            key={gw}
                            size="xs"
                            variant={chosenGateway === gw ? "solid" : "outline"}
                            bg={chosenGateway === gw ? "teal.600" : "white"}
                            color={chosenGateway === gw ? "white" : "navy.800"}
                            onClick={() => setChosenGateway(gw as any)}
                            borderColor="navy.200"
                            borderRadius="xs"
                            _hover={{ bg: "navy.50" }}
                          >
                            {gw.toUpperCase()}
                          </Button>
                        ))}
                      </SimpleGrid>

                      {purchaseComplete ? (
                        <Box p="4" bg="teal.50" borderRadius="xs" display="flex" align="center" mb="2" border="1px solid" borderColor="teal.300">
                          <CheckCircle size={16} className="text-teal-600 mr-2" />
                          <Box pl="1">
                            <Text fontSize="xs" fontWeight="bold" color="teal.800">Payment Processed Successfully!</Text>
                            <Text fontSize="9px" color="teal.700">Digital publications were unlocked instantly under your account profile.</Text>
                          </Box>
                        </Box>
                      ) : (
                        <Button size="xs" bg="navy.800" color="white" w="full" leftIcon={<CreditCard size={12} />} onClick={handleCompletePayment} borderRadius="xs" _hover={{ bg: "navy.700" }}>
                          Submit Test Payment of ${localDigitalInCart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}
                        </Button>
                      )}
                    </Box>
                  )}
                </Box>
              );
            })()}
          </Box>
        )}

        {/* TAB 3: DIGITAL PREVIEW / DOWNLOADABLE ASSETS */}
        {activeTab === "downloads" && (
          <Box maxW="800px" mx="auto" textAlign="left">
            <Heading fontSize="xl" fontWeight="normal" fontFamily="heading" color="navy.800" mb="2">
              My Digital Publications Access
            </Heading>
            <Text fontSize="xs" color="navy.500" mb="8">
              Access your unlocked digital publications, checklists, maternal screening forms, and outbreak surveillance blueprints instantly.
            </Text>

            {downloadableItems.length === 0 ? (
              <Box py="16" bg="white" borderRadius="xs" textAlign="center" border="1px solid" borderColor="navy.200">
                <Compass size={44} className="text-navy-300 mx-auto mb-3" />
                <Heading fontSize="sm" fontWeight="bold" mb="1" color="navy.800">No unlocked digital assets yet</Heading>
                <Text fontSize="xs" color="navy.500" mb="4">Complete a digital purchase inside the bookstore to unlock instant high-quality PDF downloads.</Text>
                <Button size="xs" bg="navy.800" color="white" onClick={() => setActiveTab("catalog")} borderRadius="xs" _hover={{ bg: "navy.700" }}>Return to Bookstore</Button>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="6">
                {downloadableItems.map((item) => {
                  const isDownloading = downloadingId === item.id;
                  return (
                    <Box key={item.id} p="5" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200" display="flex" flexDirection="column" justify="space-between">
                      <Box mb="4">
                        <Badge bg="teal.600" color="white" mb="2" fontSize="8px" borderRadius="xs">UNLOCKED ACCESS</Badge>
                        <Heading fontSize="xs" fontWeight="bold" color="navy.800" mb="1">
                          {item.title}
                        </Heading>
                        <Text fontSize="10px" color="navy.500" mb="4">Format: Interactive Digital PDF Document</Text>
                      </Box>

                      <Button
                        size="xs"
                        bg={isDownloading ? "teal.600" : "navy.800"}
                        color="white"
                        _hover={{ bg: isDownloading ? "teal.700" : "navy.700" }}
                        leftIcon={<Download size={14} />}
                        onClick={() => handleDownloadSimulate(item.title, item.id)}
                        borderRadius="xs"
                      >
                        {isDownloading ? "Downloading Secure PDF..." : "Download High-Quality PDF"}
                      </Button>
                    </Box>
                  );
                })}
              </SimpleGrid>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
