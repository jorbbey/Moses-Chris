import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { usePlatformStore } from "../store";
import { BlogPost, ArchiveMonth } from "../types";
import { MONTHLY_ARCHIVES, ALL_CATEGORIES, sanitizeArticleHtml } from "../data/articles";
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
  Image,
} from "@chakra-ui/react";
import {
  Search,
  BookOpen,
  ThumbsUp,
  MessageSquare,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Archive,
  Filter,
  ExternalLink,
  Layers,
  Sparkles,
  X,
} from "lucide-react";

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { blogPosts, likeBlogPost, addBlogComment } = usePlatformStore();

  // URL state synchronization
  const monthParam = searchParams.get("month") || "";
  const articleParam = searchParams.get("article") || "";
  const catParam = searchParams.get("cat") || "All";

  const [selectedMonth, setSelectedMonth] = useState<string>(monthParam);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(catParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // Reading mode state
  const [readingPostId, setReadingPostId] = useState<string | null>(articleParam || null);

  // Comment submission state
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Sync state when URL params change
  useEffect(() => {
    if (monthParam !== selectedMonth) {
      setSelectedMonth(monthParam);
      setCurrentPage(1);
    }
  }, [monthParam]);

  useEffect(() => {
    if (articleParam && articleParam !== readingPostId) {
      setReadingPostId(articleParam);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [articleParam]);

  // Update URL search params cleanly
  const updateUrlParams = (newMonth: string, newArticleId?: string | null) => {
    const params = new URLSearchParams();
    if (newMonth) params.set("month", newMonth);
    if (newArticleId) params.set("article", newArticleId);
    if (activeCategoryId !== "All") params.set("cat", activeCategoryId);
    setSearchParams(params);
  };

  const handleMonthChange = (monthKey: string) => {
    setSelectedMonth(monthKey);
    setCurrentPage(1);
    updateUrlParams(monthKey, readingPostId);
  };

  const handleOpenArticle = (id: string) => {
    setReadingPostId(id);
    updateUrlParams(selectedMonth, id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseArticle = () => {
    setReadingPostId(null);
    updateUrlParams(selectedMonth, null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filtered posts based on category, search query, and month
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategoryId === "All" || post.category === activeCategoryId;
      
      const matchesMonth =
        !selectedMonth || selectedMonth === "all" || post.monthKey === selectedMonth;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        (post.content && post.content.toLowerCase().includes(q));

      return matchesCategory && matchesMonth && matchesSearch;
    });
  }, [blogPosts, activeCategoryId, selectedMonth, searchQuery]);

  // Grouped posts by month for timeline view
  const postsGroupedByMonth = useMemo(() => {
    const groups: { archive: ArchiveMonth; posts: BlogPost[] }[] = [];
    MONTHLY_ARCHIVES.forEach((arch) => {
      const postsForThisMonth = filteredPosts.filter((p) => p.monthKey === arch.key);
      if (postsForThisMonth.length > 0) {
        groups.push({
          archive: arch,
          posts: postsForThisMonth,
        });
      }
    });
    return groups;
  }, [filteredPosts]);

  // Pagination for grid view
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const selectedPost = useMemo(() => {
    if (!readingPostId) return null;
    return blogPosts.find((p) => p.id === readingPostId) || null;
  }, [blogPosts, readingPostId]);

  const relatedPosts = useMemo(() => {
    if (!selectedPost) return [];
    // Prioritize articles from the same month or same category
    return blogPosts
      .filter((p) => p.id !== selectedPost.id && (p.monthKey === selectedPost.monthKey || p.category === selectedPost.category))
      .slice(0, 3);
  }, [blogPosts, selectedPost]);

  const handleLeaveComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim() || !readingPostId) return;

    addBlogComment(readingPostId, {
      author: commentName.trim(),
      text: commentText.trim(),
    });

    setCommentName("");
    setCommentText("");
  };

  const selectedArchiveInfo = MONTHLY_ARCHIVES.find((a) => a.key === selectedMonth);

  return (
    <Box bg="slate.50" minH="100vh">
      {/* Top Banner */}
      <Box bg="navy.800" color="white" py={{ base: "12", md: "16" }} borderBottom="3px solid" borderColor="gold.500">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <HStack spaceX="3" mb="3">
            <Badge bg="gold.500" color="navy.800" fontWeight="extrabold" letterSpacing="wider" borderRadius="xs">
              THE CHRONICLE DISPATCH
            </Badge>
            <Badge bg="teal.600" color="white" borderRadius="xs">
              {blogPosts.length} Articles in Archive
            </Badge>
          </HStack>
          <Heading fontSize={{ base: "2xl", md: "4xl" }} color="white" fontWeight="extrabold" mb="3" lineHeight="tight">
            Scholarly Notes, Articles & Archives
          </Heading>
          <Text fontSize="sm" color="slate.300" maxW="700px" lineHeight="relaxed">
            Explore Moses Chris's complete archive of 228 clinical investigations, epidemiological dispatches, trauma resilience frameworks, and public health papers catalogued by month.
          </Text>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }} py="8">
        {/* VIEW 1: ARTICLE READER VIEW */}
        {selectedPost ? (
          <Box maxW="900px" mx="auto">
            {/* Back to archive navigation */}
            <Flex justify="space-between" align="center" mb="6" wrap="wrap" gap="2">
              <Button
                size="xs"
                variant="outline"
                borderColor="slate.300"
                color="slate.700"
                bg="white"
                _hover={{ bg: "slate.100" }}
                leftIcon={<ChevronLeft size={14} />}
                onClick={handleCloseArticle}
              >
                Back to Archives & Articles
              </Button>

              {selectedPost.sourceUrl && (
                <Button
                  size="xs"
                  variant="ghost"
                  color="teal.700"
                  as="a"
                  href={selectedPost.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  rightIcon={<ExternalLink size={12} />}
                >
                  View Original on moseschris.com
                </Button>
              )}
            </Flex>

            {/* Publication Card */}
            <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="slate.200" p={{ base: "5", md: "8" }} boxShadow="sm" textAlign="left" mb="8">
              <HStack justify="space-between" wrap="wrap" gap="2" mb="4">
                <HStack spaceX="2">
                  <Badge bg="teal.600" color="white" size="sm">
                    {selectedPost.category}
                  </Badge>
                  {selectedPost.monthLabel && (
                    <Badge bg="slate.100" color="slate.700" size="sm">
                      {selectedPost.monthLabel}
                    </Badge>
                  )}
                </HStack>
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

              <Heading fontSize={{ base: "xl", md: "3xl" }} color="navy.800" fontWeight="extrabold" mb="4" lineHeight="snug">
                {selectedPost.title}
              </Heading>

              {/* Author Attribution */}
              <HStack spaceX="3" pb="6" mb="6" borderBottom="1px solid" borderColor="slate.100">
                <Box w="36px" h="36px" borderRadius="full" bg="teal.600" color="white" display="flex" alignItems="center" justifyContent="center" fontWeight="bold" fontSize="xs">
                  MC
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="navy.800">
                    {selectedPost.author || "Moses Chris"}
                  </Text>
                  <Text fontSize="10px" color="slate.400">
                    {selectedPost.authorTitle || "Author, Epidemiologist & Public Health Advocate"}
                  </Text>
                </Box>
              </HStack>

              {/* Featured Cover Image */}
              <Box h={{ base: "220px", md: "360px" }} bg="slate.100" borderRadius="xl" overflow="hidden" mb="6" border="1px solid" borderColor="slate.100">
                <Image src={selectedPost.image} alt={selectedPost.title} w="full" h="full" objectFit="cover" />
              </Box>

              {/* Article Content */}
              <Box color="slate.700" fontSize="sm" lineHeight="tall" mb="8">
                {selectedPost.summary && (
                  <Box p="4" bg="teal.50/50" borderLeft="4px solid" borderColor="teal.600" borderRadius="md" mb="6">
                    <Text fontWeight="semibold" color="navy.800" fontSize="md">
                      {selectedPost.summary}
                    </Text>
                  </Box>
                )}

                {/* Render sanitized HTML if available, or clean text paragraphs */}
                {selectedPost.contentHtml ? (
                  <div
                    className="article-body-content space-y-4 text-slate-700 leading-relaxed [&>p]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-navy-800 [&>h2]:mt-6 [&>h2]:mb-2 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-navy-800 [&>h3]:mt-4 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-amber-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4"
                    dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(selectedPost.contentHtml) }}
                  />
                ) : (
                  <VStack align="stretch" spaceY="4">
                    {selectedPost.content.split("\n\n").map((para, i) => (
                      <Text key={i}>{para}</Text>
                    ))}
                  </VStack>
                )}
              </Box>

              {/* Action Bar */}
              <HStack pt="6" borderTop="1px solid" borderColor="slate.100" justify="space-between" align="center" wrap="wrap" gap="2">
                <HStack spaceX="3">
                  <Button
                    size="xs"
                    bg="teal.50"
                    color="teal.700"
                    _hover={{ bg: "teal.100" }}
                    leftIcon={<ThumbsUp size={12} />}
                    onClick={() => likeBlogPost(selectedPost.id)}
                  >
                    Recommend File ({selectedPost.likes})
                  </Button>
                </HStack>
                <Text fontSize="11px" color="slate.400">
                  Published under Clinical Archives • {selectedPost.publishedAt}
                </Text>
              </HStack>
            </Box>

            {/* Reader Discussions */}
            <Box bg="white" p="6" borderRadius="2xl" border="1px solid" borderColor="slate.200" boxShadow="sm" textAlign="left" mb="8">
              <Heading fontSize="md" fontWeight="bold" color="navy.800" mb="4">
                Reader Discussions ({selectedPost.comments.length})
              </Heading>

              {selectedPost.comments.length === 0 ? (
                <Text fontSize="xs" color="slate.400" mb="6">
                  No public discussions have been posted on this paper yet. Be the first to contribute.
                </Text>
              ) : (
                <VStack align="stretch" spaceY="3" mb="6">
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

              {/* Comment form */}
              <form onSubmit={handleLeaveComment} className="border-t border-slate-100 pt-4">
                <Text fontSize="xs" fontWeight="bold" color="slate.600" mb="2">
                  Leave a Scholarly Perspective
                </Text>
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
                    placeholder="Contribute your professional perspective or clinical questions..."
                    size="xs"
                    bg="slate.50"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    rows={3}
                  />
                </Box>
                <Button type="submit" size="xs" bg="navy.800" color="white" _hover={{ bg: "teal.600" }}>
                  Submit Contribution
                </Button>
              </form>
            </Box>

            {/* Related Publications */}
            {relatedPosts.length > 0 && (
              <Box textAlign="left">
                <Text fontSize="xs" fontWeight="bold" color="slate.400" uppercase="true" letterSpacing="wider" mb="4">
                  Related Dispatches & Papers
                </Text>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                  {relatedPosts.map((post) => (
                    <Box
                      key={post.id}
                      p="4"
                      bg="white"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="slate.200"
                      cursor="pointer"
                      onClick={() => handleOpenArticle(post.id)}
                      transition="all 0.2s"
                      _hover={{ transform: "translateY(-2px)", borderColor: "teal.400", boxShadow: "md" }}
                    >
                      <HStack justify="space-between" mb="2">
                        <Badge bg="teal.50" color="teal.700" fontSize="8px">
                          {post.category}
                        </Badge>
                        <Text fontSize="9px" color="slate.400">
                          {post.monthLabel || post.publishedAt}
                        </Text>
                      </HStack>
                      <Heading fontSize="xs" fontWeight="bold" color="navy.800" lineClamp="2" mb="1" minH="32px">
                        {post.title}
                      </Heading>
                      <Text fontSize="10px" color="slate.500" lineClamp="2">
                        {post.summary}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            )}
          </Box>
        ) : (
          /* VIEW 2: FULL ARCHIVE AND ARTICLES CATALOG */
          <Box>
            {/* Control Bar: Archives Select, Search, and Filters */}
            <Box bg="white" p="5" borderRadius="xl" border="1px solid" borderColor="slate.200" boxShadow="xs" mb="6">
              <Flex direction={{ base: "column", lg: "row" }} justify="space-between" align={{ base: "stretch", lg: "center" }} gap="4">
                {/* ARCHIVE SELECT LIST (Exact match for moseschris.com archive select list) */}
                <HStack spaceX="2" flex="1" minW={{ base: "100%", lg: "320px" }} maxW={{ base: "100%", lg: "420px" }}>
                  <Archive size={18} className="text-teal-600 shrink-0" />
                  <Box flex="1">
                    <Text fontSize="10px" color="slate.400" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb="1">
                      Archives Select List (By Month)
                    </Text>
                    <select
                      id="blog-archive-select-dropdown"
                      aria-label="Select Monthly Archive"
                      value={selectedMonth}
                      onChange={(e) => handleMonthChange(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-300 text-navy-900 text-xs font-medium rounded-lg px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    >
                      <option value="">All Archives ({blogPosts.length} Articles)</option>
                      {MONTHLY_ARCHIVES.map((arch) => (
                        <option key={arch.key} value={arch.key}>
                          {arch.label} ({arch.count})
                        </option>
                      ))}
                    </select>
                  </Box>
                  {selectedMonth && (
                    <Button
                      size="xs"
                      variant="ghost"
                      color="slate.400"
                      _hover={{ color: "red.500" }}
                      onClick={() => handleMonthChange("")}
                      title="Clear Month Filter"
                      mt="4"
                    >
                      <X size={14} />
                    </Button>
                  )}
                </HStack>

                {/* Search Bar */}
                <HStack spaceX="2" bg="slate.50" px="3" py="2" borderRadius="lg" border="1px solid" borderColor="slate.200" flex="1" maxW={{ base: "100%", lg: "360px" }}>
                  <Search size={16} className="text-slate-400 shrink-0" />
                  <Input
                    placeholder="Search across all 228 articles..."
                    size="xs"
                    border="none"
                    _focus={{ outline: "none", boxShadow: "none" }}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  {searchQuery && (
                    <Button size="xs" variant="ghost" p="0" onClick={() => setSearchQuery("")}>
                      <X size={12} className="text-slate-400" />
                    </Button>
                  )}
                </HStack>

                {/* View Mode Toggle */}
                <HStack spaceX="1" bg="slate.100" p="1" borderRadius="lg">
                  <Button
                    size="xs"
                    bg={viewMode === "grid" ? "white" : "transparent"}
                    color={viewMode === "grid" ? "teal.700" : "slate.600"}
                    boxShadow={viewMode === "grid" ? "xs" : "none"}
                    _hover={{ bg: viewMode === "grid" ? "white" : "slate.200" }}
                    onClick={() => setViewMode("grid")}
                  >
                    Grid View
                  </Button>
                  <Button
                    size="xs"
                    bg={viewMode === "timeline" ? "white" : "transparent"}
                    color={viewMode === "timeline" ? "teal.700" : "slate.600"}
                    boxShadow={viewMode === "timeline" ? "xs" : "none"}
                    _hover={{ bg: viewMode === "timeline" ? "white" : "slate.200" }}
                    onClick={() => setViewMode("timeline")}
                    leftIcon={<Layers size={12} />}
                  >
                    Group by Month
                  </Button>
                </HStack>
              </Flex>

              {/* Monthly Quick Select Horizontal Chips */}
              <Box mt="4" pt="3" borderTop="1px solid" borderColor="slate.100">
                <HStack spaceX="1" overflowX="auto" pb="1" className="scrollbar-none">
                  <Button
                    size="xs"
                    shrink="0"
                    bg={!selectedMonth ? "teal.600" : "white"}
                    color={!selectedMonth ? "white" : "slate.600"}
                    border="1px solid"
                    borderColor={!selectedMonth ? "teal.600" : "slate.200"}
                    _hover={{ bg: "teal.600", color: "white" }}
                    onClick={() => handleMonthChange("")}
                    borderRadius="full"
                  >
                    All Months ({blogPosts.length})
                  </Button>
                  {MONTHLY_ARCHIVES.map((arch) => {
                    const isSelected = selectedMonth === arch.key;
                    return (
                      <Button
                        key={arch.key}
                        size="xs"
                        shrink="0"
                        bg={isSelected ? "teal.600" : "white"}
                        color={isSelected ? "white" : "slate.600"}
                        border="1px solid"
                        borderColor={isSelected ? "teal.600" : "slate.200"}
                        _hover={{ bg: "teal.600", color: "white" }}
                        onClick={() => handleMonthChange(arch.key)}
                        borderRadius="full"
                      >
                        {arch.label} ({arch.count})
                      </Button>
                    );
                  })}
                </HStack>
              </Box>

              {/* Category Filter Chips */}
              <Box mt="3" pt="3" borderTop="1px solid" borderColor="slate.100">
                <HStack spaceX="1" overflowX="auto" pb="1" className="scrollbar-none">
                  <Text fontSize="10px" color="slate.400" fontWeight="bold" uppercase="true" mr="1" shrink="0">
                    Topic:
                  </Text>
                  {ALL_CATEGORIES.map((cat) => {
                    const isSelected = activeCategoryId === cat;
                    return (
                      <Button
                        key={cat}
                        size="xs"
                        shrink="0"
                        variant={isSelected ? "solid" : "ghost"}
                        bg={isSelected ? "navy.800" : "transparent"}
                        color={isSelected ? "white" : "slate.600"}
                        _hover={{ bg: isSelected ? "navy.800" : "slate.100" }}
                        onClick={() => {
                          setActiveCategoryId(cat);
                          setCurrentPage(1);
                        }}
                        borderRadius="md"
                      >
                        {cat}
                      </Button>
                    );
                  })}
                </HStack>
              </Box>
            </Box>

            {/* Active Filter Info Banner */}
            {(selectedMonth || activeCategoryId !== "All" || searchQuery) && (
              <Flex justify="space-between" align="center" bg="teal.50" border="1px solid" borderColor="teal.200" p="3" borderRadius="lg" mb="6" wrap="wrap" gap="2">
                <HStack spaceX="2">
                  <Filter size={14} className="text-teal-700" />
                  <Text fontSize="xs" color="teal.900" fontWeight="medium">
                    Showing results for:{" "}
                    {selectedArchiveInfo && (
                      <strong className="text-teal-800 underline mr-1">{selectedArchiveInfo.label} ({selectedArchiveInfo.count} articles)</strong>
                    )}
                    {activeCategoryId !== "All" && (
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded mr-1">
                        Topic: {activeCategoryId}
                      </span>
                    )}
                    {searchQuery && (
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Query: "{searchQuery}"
                      </span>
                    )}
                    {" — "}{filteredPosts.length} matches found
                  </Text>
                </HStack>
                <Button
                  size="xs"
                  variant="outline"
                  borderColor="teal.400"
                  color="teal.800"
                  _hover={{ bg: "teal.100" }}
                  onClick={() => {
                    setSelectedMonth("");
                    setActiveCategoryId("All");
                    setSearchQuery("");
                    setCurrentPage(1);
                    updateUrlParams("", null);
                  }}
                >
                  Reset All Filters
                </Button>
              </Flex>
            )}

            {/* Results count & page summary */}
            <Flex justify="space-between" align="center" mb="4" color="slate.500" fontSize="xs">
              <Text>
                Showing {filteredPosts.length === 0 ? 0 : viewMode === "grid" ? `${(currentPage - 1) * postsPerPage + 1}–${Math.min(currentPage * postsPerPage, filteredPosts.length)}` : filteredPosts.length} of {filteredPosts.length} articles
                {selectedArchiveInfo && ` in ${selectedArchiveInfo.label}`}
              </Text>
              {viewMode === "grid" && totalPages > 1 && (
                <Text>Page {currentPage} of {totalPages}</Text>
              )}
            </Flex>

            {/* Content Display: Empty State */}
            {filteredPosts.length === 0 ? (
              <Box py="16" bg="white" borderRadius="2xl" textAlign="center" border="1px dashed" borderColor="slate.300">
                <BookOpen size={44} className="text-slate-300 mx-auto mb-2" />
                <Heading fontSize="sm" fontWeight="bold" color="navy.800" mb="1">
                  No articles match your criteria
                </Heading>
                <Text fontSize="xs" color="slate.500" mb="4">
                  Try clearing your search query or choosing a different monthly archive.
                </Text>
                <Button
                  size="xs"
                  bg="teal.600"
                  color="white"
                  _hover={{ bg: "teal.500" }}
                  onClick={() => {
                    setSelectedMonth("");
                    setActiveCategoryId("All");
                    setSearchQuery("");
                  }}
                >
                  View All {blogPosts.length} Articles
                </Button>
              </Box>
            ) : viewMode === "timeline" ? (
              /* MONTHLY TIMELINE / GROUPED BY MONTH VIEW */
              <VStack align="stretch" spaceY="8">
                {postsGroupedByMonth.map(({ archive, posts }) => (
                  <Box key={archive.key} bg="white" p="6" borderRadius="xl" border="1px solid" borderColor="slate.200" boxShadow="xs">
                    {/* Month Header Banner */}
                    <Flex justify="space-between" align="center" pb="4" mb="6" borderBottom="2px solid" borderColor="slate.100">
                      <HStack spaceX="3">
                        <Box w="10px" h="24px" bg="teal.600" borderRadius="xs" />
                        <Heading fontSize="lg" fontWeight="extrabold" color="navy.800">
                          {archive.label}
                        </Heading>
                        <Badge bg="teal.50" color="teal.700" fontSize="xs" px="2" py="0.5">
                          {posts.length} {posts.length === 1 ? "Article" : "Articles"}
                        </Badge>
                      </HStack>
                      <Button
                        size="xs"
                        variant="ghost"
                        color="teal.600"
                        _hover={{ bg: "teal.50" }}
                        onClick={() => {
                          setSelectedMonth(archive.key);
                          setViewMode("grid");
                          setCurrentPage(1);
                        }}
                      >
                        Focus on this month →
                      </Button>
                    </Flex>

                    {/* Articles in this month */}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
                      {posts.map((post) => (
                        <ArticleCard
                          key={post.id}
                          post={post}
                          onOpenArticle={() => handleOpenArticle(post.id)}
                          onLike={() => likeBlogPost(post.id)}
                        />
                      ))}
                    </SimpleGrid>
                  </Box>
                ))}
              </VStack>
            ) : (
              /* GRID VIEW WITH PAGINATION */
              <Box>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6" mb="8">
                  {paginatedPosts.map((post) => (
                    <ArticleCard
                      key={post.id}
                      post={post}
                      onOpenArticle={() => handleOpenArticle(post.id)}
                      onLike={() => likeBlogPost(post.id)}
                    />
                  ))}
                </SimpleGrid>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <Flex justify="center" align="center" gap="2" pt="4" pb="8">
                    <Button
                      size="xs"
                      variant="outline"
                      borderColor="slate.300"
                      color="slate.600"
                      isDisabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      leftIcon={<ChevronLeft size={14} />}
                    >
                      Previous
                    </Button>

                    <HStack spaceX="1">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5 && currentPage > 3) {
                          pageNum = currentPage - 2 + i;
                          if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                        }
                        return (
                          <Button
                            key={pageNum}
                            size="xs"
                            bg={currentPage === pageNum ? "teal.600" : "white"}
                            color={currentPage === pageNum ? "white" : "slate.700"}
                            border="1px solid"
                            borderColor={currentPage === pageNum ? "teal.600" : "slate.200"}
                            _hover={{ bg: "teal.600", color: "white" }}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 300, behavior: "smooth" });
                            }}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </HStack>

                    <Button
                      size="xs"
                      variant="outline"
                      borderColor="slate.300"
                      color="slate.600"
                      isDisabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      rightIcon={<ChevronRight size={14} />}
                    >
                      Next
                    </Button>
                  </Flex>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Subcomponent for Article Card
interface ArticleCardProps {
  key?: React.Key;
  post: BlogPost;
  onOpenArticle: () => void;
  onLike: () => void;
}

function ArticleCard({
  post,
  onOpenArticle,
  onLike,
}: ArticleCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="sm"
      border="1px solid"
      borderColor="slate.200"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      transition="all 0.2s ease"
      _hover={{ transform: "translateY(-3px)", boxShadow: "md", borderColor: "teal.300" }}
    >
      <Box h="170px" bg="slate.100" overflow="hidden" position="relative">
        <Image
          src={post.image}
          alt={post.title}
          w="full"
          h="full"
          objectFit="cover"
          loading="lazy"
        />
        <Box position="absolute" top="3" left="3">
          <Badge bg="teal.600" color="white" fontSize="9px" px="2" py="0.5" borderRadius="xs">
            {post.category}
          </Badge>
        </Box>
        {post.monthLabel && (
          <Box position="absolute" top="3" right="3">
            <Badge bg="navy.800/90" color="white" fontSize="9px" px="2" py="0.5" borderRadius="xs">
              {post.monthLabel}
            </Badge>
          </Box>
        )}
      </Box>

      <Box p="5" flex="1" display="flex" flexDirection="column" justifyContent="space-between" textAlign="left">
        <Box>
          <HStack justify="space-between" mb="2" color="slate.400" fontSize="10px">
            <HStack spaceX="1">
              <Calendar size={11} className="text-amber-500" />
              <Text>{post.publishedAt}</Text>
            </HStack>
            <HStack spaceX="1">
              <Clock size={11} className="text-amber-500" />
              <Text>{post.readTime}</Text>
            </HStack>
          </HStack>

          <Heading
            fontSize="sm"
            fontWeight="bold"
            color="navy.800"
            minH="42px"
            lineClamp="2"
            mb="2"
            lineHeight="snug"
            cursor="pointer"
            onClick={onOpenArticle}
            _hover={{ color: "teal.600" }}
          >
            {post.title}
          </Heading>

          <Text fontSize="11px" color="slate.500" lineClamp="3" minH="50px" mb="4" lineHeight="relaxed">
            {post.summary}
          </Text>
        </Box>

        <Box borderTop="1px solid" borderColor="slate.100" pt="3">
          <Flex justify="space-between" align="center">
            <Button
              size="xs"
              variant="ghost"
              color="slate.400"
              _hover={{ color: "teal.600", bg: "teal.50" }}
              leftIcon={<ThumbsUp size={12} />}
              onClick={onLike}
              p="1"
            >
              <Text fontSize="10px">{post.likes}</Text>
            </Button>

            <Button
              size="xs"
              variant="ghost"
              color="gold.600"
              _hover={{ color: "gold.500", bg: "amber.50" }}
              rightIcon={<ArrowRight size={12} />}
              onClick={onOpenArticle}
              fontWeight="semibold"
            >
              Read Full Paper
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
