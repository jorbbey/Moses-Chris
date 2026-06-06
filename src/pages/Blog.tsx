import React, { useState } from "react";
import { usePlatformStore } from "../store";
import { BlogPost, Comment } from "../types";
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
  IconButton,
  Image,
} from "@chakra-ui/react";
import {
  Search,
  BookOpen,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

export default function Blog() {
  const { blogPosts, likeBlogPost, addBlogComment } = usePlatformStore();

  const [activeCategoryId, setActiveCategoryId] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Reading mode state
  const [readingPostId, setReadingPostId] = useState<string | null>(null);

  // New Comment state
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  const categories = ["All", "Public Health", "Mental Health", "Domestic Violence", "Child Welfare"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategoryId === "All" || post.category === activeCategoryId;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0]; // Hero publication
  const selectedPost = blogPosts.find((p) => p.id === readingPostId);
  
  // Related posts (excluding reading one)
  const relatedPosts = blogPosts.filter((p) => p.id !== readingPostId).slice(0, 3);

  const handleLeaveComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim() || !readingPostId) return;

    addBlogComment(readingPostId, {
      author: commentName,
      text: commentText
    });

    setCommentName("");
    setCommentText("");
  };

  return (
    <Box bg="slate.50" minH="100vh">
      {/* Title banner */}
      <Box bg="navy.800" color="white" py="16" borderBottom="3px solid" borderColor="gold.500">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <Badge bg="gold.500" color="navy.800" mb="4" fontWeight="extrabold" letterSpacing="wider" borderRadius="xs">
            THE CHRONICLE DISPATCH
          </Badge>
          <Heading fontSize={{ base: "3xl", md: "5xl" }} color="white" fontWeight="extrabold" mb="4" lineHeight="tight">
            Scholarly Notes & Blog
          </Heading>
          <Text fontSize="sm" color="slate.300" maxW="600px" lineHeight="relaxed">
            Explore Moses Chris's public medical papers, local community protection files, and strategic counseling theories.
          </Text>
        </Box>
      </Box>

      {/* Main Container */}
      <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }} py="8">
        {/* VIEW 1: DISPATCH DETAIL READING SCENE */}
        {selectedPost ? (
          <Box maxW="900px" mx="auto">
            {/* Back Button */}
            <Button
              size="xs"
              variant="outline"
              borderColor="slate.300"
              color="slate.600"
              mb="6"
              leftIcon={<ChevronLeft size={14} />}
              onClick={() => setReadingPostId(null)}
            >
              Back to Dispatch Feed
            </Button>

            {/* Publication details */}
            <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="slate.200" p={{ base: "5", md: "8" }} boxShadow="sm" textAlign="left" mb="8">
              <HStack justify="space-between" wrap="wrap" gap="2" mb="4">
                <Badge bg="teal.600" color="white" size="sm">
                  {selectedPost.category}
                </Badge>
                <HStack spaceX="3" color="slate.400" fontSize="11px">
                  <HStack spaceX="1">
                    <Calendar size={12} className="text-amber-500 mr-1" />
                    <Text>{selectedPost.publishedAt}</Text>
                  </HStack>
                  <HStack spaceX="1">
                    <Clock size={12} className="text-amber-500 mr-1" />
                    <Text>{selectedPost.readTime}</Text>
                  </HStack>
                </HStack>
              </HStack>

              <Heading fontSize={{ base: "2xl", md: "3xl" }} color="navy.800" fontWeight="extrabold" mb="4">
                {selectedPost.title}
              </Heading>

              <Box h="300px" bg="slate.50" borderRadius="xl" overflow="hidden" mb="6" border="1px solid" borderColor="slate.100">
                <Image src={selectedPost.image} alt={selectedPost.title} w="full" h="full" objectFit="cover" />
              </Box>

              {/* Rich text narration mock */}
              <VStack align="stretch" spaceY="4" color="slate.700" fontSize="sm" lineHeight="tall" mb="8">
                <Text fontWeight="semibold" color="navy.800" fontSize="md">
                  {selectedPost.summary}
                </Text>
                
                {/* Standard lengthy paragraphs block */}
                <Text>
                  {selectedPost.content}
                </Text>
                <Text>
                  Epidemiological tracking operations demonstrate that high-intensity public health stressors trigger deep transactional trauma in households already coping with micro-regulative abuse. Domestic control spikes dramatically when municipal lockdowns restrict geographical escapes.
                </Text>
                <Text>
                  To neutralize these issues, local clinics must establish silent, self-authoritative shelter coordinates alongside emergency therapeutic call centers, securing safe and confidential triage routes for victims of physical coercion.
                </Text>
              </VStack>

              <HStack pt="6" borderTop="1px solid" borderColor="slate.100" justify="space-between" align="center">
                <HStack spaceX="4">
                  <Button
                    size="xs"
                    bg="teal.50"
                    color="teal.600"
                    _hover={{ bg: "teal.100" }}
                    leftIcon={<ThumbsUp size={12} />}
                    onClick={() => likeBlogPost(selectedPost.id)}
                  >
                    Recommend File ({selectedPost.likes})
                  </Button>
                </HStack>
                <Text fontSize="10px" color="slate.400">Published by: Moses Chris, Clinical Faculty</Text>
              </HStack>
            </Box>

            {/* Leave Comments section */}
            <Box bg="white" p="6" borderRadius="2xl" border="1px solid" borderColor="slate.200" boxShadow="sm" textAlign="left" mb="8">
              <Heading fontSize="md" fontWeight="bold" color="navy.800" mb="4">
                Reader Discussions ({selectedPost.comments.length})
              </Heading>

              {selectedPost.comments.length === 0 ? (
                <Text fontSize="xs" color="slate.400" mb="4">No discussions have been added to this paper yet.</Text>
              ) : (
                <VStack align="stretch" spaceY="4" mb="6">
                  {selectedPost.comments.map((comment, index) => (
                    <Box key={index} p="3" bg="slate.50" borderRadius="lg" borderLeft="3px solid" borderColor="gold.500">
                      <Flex justify="space-between" align="center" mb="1">
                        <Text fontSize="11px" fontWeight="bold" color="navy.800">{comment.author}</Text>
                        <Text fontSize="9px" color="slate.400">{comment.date}</Text>
                      </Flex>
                      <Text fontSize="11px" color="slate.600">"{comment.text}"</Text>
                    </Box>
                  ))}
                </VStack>
              )}

              {/* Form trigger layout */}
              <form onSubmit={handleLeaveComment} className="border-t border-light-150 pt-4">
                <Text fontSize="xs" fontWeight="bold" color="slate.600" mb="2">Leave a Scholarly Comment</Text>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" mb="3">
                  <Input
                    placeholder="Your Name / Organization"
                    size="xs"
                    bg="slate.50"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    required
                  />
                </SimpleGrid>
                <Box mb="4">
                  <Textarea
                    placeholder="Contribute your professional perspective..."
                    size="xs"
                    bg="slate.50"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    rows={3}
                  />
                </Box>
                <Button type="submit" size="xs" bg="navy.800" color="white" _hover={{ bg: "teal.600" }}>
                  Submit Professional Opinion
                </Button>
              </form>
            </Box>

            {/* Related publications */}
            <Box textAlign="left">
              <Text fontSize="xs" fontWeight="bold" color="slate.400" uppercase="true" letterSpacing="wider" mb="4">Related Papers & Dispatches</Text>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
                {relatedPosts.map((post) => (
                  <Box
                    key={post.id}
                    p="4"
                    bg="white"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="slate.200"
                    cursor="pointer"
                    onClick={() => {
                      setReadingPostId(post.id);
                      setCommentName("");
                      setCommentText("");
                      window.scrollTo(0, 0);
                    }}
                    transition="all 0.2s"
                    _hover={{ transform: "translateY(-2px)", borderColor: "teal.400" }}
                  >
                    <Badge bg="slate.100" color="slate.700" fontSize="8px" mb="2">
                      {post.category}
                    </Badge>
                    <Heading fontSize="xs" fontWeight="bold" color="navy.800" lineClamp="2" mb="1" minH="32px">
                      {post.title}
                    </Heading>
                    <Text fontSize="10px" color="slate.500" lineClamp="3">
                      {post.summary}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </Box>
        ) : (
          /* VIEW 2: FEED LIST SCENE */
          <Box>
            {/* Search and Category Filters */}
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "stretch", md: "center" }} mb="8" gap="4">
              <HStack spaceX="2" wrap="wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    size="xs"
                    bg={activeCategoryId === cat ? "teal.600" : "white"}
                    color={activeCategoryId === cat ? "white" : "slate.700"}
                    _hover={{ bg: "teal.600", color: "white" }}
                    onClick={() => setActiveCategoryId(cat)}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="slate.200"
                  >
                    {cat}
                  </Button>
                ))}
              </HStack>

              <HStack spaceX="2" bg="white" px="3" py="1.5" borderRadius="md" border="1px solid" borderColor="slate.200" maxW="320px" w="full">
                <Search size={16} className="text-slate-400" />
                <Input
                  placeholder="Search articles..."
                  size="xs"
                  border="none"
                  _focus={{ outline: "none", boxShadow: "none" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </HStack>
            </Flex>

            {/* List Loop */}
            {filteredPosts.length === 0 ? (
              <Box py="16" bg="white" borderRadius="2xl" textAlign="center" border="1px dashed" borderColor="slate.300">
                <BookOpen size={44} className="text-slate-300 mx-auto mb-2" />
                <Heading fontSize="sm" fontWeight="bold" color="navy.800" mb="1">No dispatches match</Heading>
                <Text fontSize="xs" color="slate.500">Try modifying your query or select a different category filter.</Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8">
                {filteredPosts.map((post) => (
                  <Box
                    key={post.id}
                    bg="white"
                    borderRadius="xl"
                    boxShadow="sm"
                    border="1px solid"
                    borderColor="slate.200"
                    overflow="hidden"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box h="180px" bg="slate.50" overflow="hidden">
                      <Image src={post.image} alt={post.title} w="full" h="full" objectFit="cover" />
                    </Box>
                    <Box p="5" flex="1" display="flex" flexDirection="column" justify="space-between" textAlign="left">
                      <Box>
                        <HStack justify="space-between" mb="3">
                          <Badge bg="teal.600" color="white" fontSize="8px">
                            {post.category}
                          </Badge>
                          <Text fontSize="10px" color="slate.400">{post.publishedAt}</Text>
                        </HStack>

                        <Heading fontSize="sm" fontWeight="extrabold" color="navy.800" minH="40px" lineClamp="2" mb="2">
                          {post.title}
                        </Heading>
                        <Text fontSize="11px" color="slate.500" lineClamp="3" minH="50px" mb="4">
                          {post.summary}
                        </Text>
                      </Box>
                      
                      <Box borderTop="1px solid" borderColor="slate.100" pt="4">
                        <Flex justify="space-between" align="center">
                          <HStack spaceX="2" color="slate.400">
                            <ThumbsUp size={12} />
                            <Text fontSize="10px">{post.likes} votes</Text>
                          </HStack>

                          <Button
                            size="xs"
                            variant="ghost"
                            color="gold.600"
                            _hover={{ color: "gold.500" }}
                            rightIcon={<ArrowRight size={12} />}
                            onClick={() => {
                              setReadingPostId(post.id);
                              setCommentName("");
                              setCommentText("");
                              window.scrollTo(0, 0);
                            }}
                          >
                            Read Full Paper
                          </Button>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
