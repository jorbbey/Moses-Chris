import React, { useState } from "react";
import { usePlatformStore } from "../store";
import { Course, Lesson, Quiz } from "../types";
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
  BookOpen,
  Award,
  Calendar,
  CheckCircle,
  Play,
  FileText,
  Video,
  Download,
  AlertCircle,
  Search,
  Check,
  User,
  GraduationCap
} from "lucide-react";

export default function Academy() {
  const {
    courses,
    enrollInCourse,
    completeLesson,
    submitQuiz,
    resetQuiz,
    studentName,
    studentEmail
  } = usePlatformStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Selected course to inspect / study
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  
  // Active lesson selected to watch / read
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Selections for active course quiz
  const [quizSelections, setQuizSelections] = useState<Record<string, number>>({});
  const [quizFeedback, setQuizFeedback] = useState<{ passed: boolean; score: number } | null>(null);
  const [quizErrorMessage, setQuizErrorMessage] = useState<string | null>(null);
  
  // Tabs for main Academy view vs Student Dashboard view
  const [academyTab, setAcademyTab] = useState<"catalog" | "dashboard" | "zoom">("catalog");

  const categories = ["All", "Epidemiology", "Mental Health", "Domestic Violence"];

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const enrolledCourses = courses.filter(c => c.enrolled);
  
  const handleEnroll = (courseId: string) => {
    enrollInCourse(courseId);
    setActiveCourseId(courseId);
    setAcademyTab("dashboard");
    // Auto-select first lesson
    const course = courses.find(c => c.id === courseId);
    if (course && course.lessons.length > 0) {
      setActiveLessonId(course.lessons[0].id);
    }
  };

  const activeCourse = courses.find(c => c.id === activeCourseId);
  const activeLesson = activeCourse?.lessons.find(l => l.id === activeLessonId);

  const handleLessonComplete = (lessonId: string) => {
    if (!activeCourseId) return;
    completeLesson(activeCourseId, lessonId);
  };

  const handleQuizSelection = (questionId: string, optionIdx: number) => {
    setQuizSelections(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleQuizSubmit = () => {
    if (!activeCourseId || !activeCourse) return;
    
    // Check if all answered
    const unanswered = activeCourse.quizzes.some((_, idx) => quizSelections[idx] === undefined);
    if (unanswered) {
      setQuizErrorMessage("Please answer all diagnostic assessment questions prior to verifying credentials.");
      return;
    }

    setQuizErrorMessage(null);
    const selectionsArray = activeCourse.quizzes.map((_, idx) => quizSelections[idx]);
    const feedback = submitQuiz(activeCourseId, selectionsArray);
    setQuizFeedback(feedback);
  };

  const handleQuizReset = () => {
    if (!activeCourseId) return;
    resetQuiz(activeCourseId);
    setQuizSelections({});
    setQuizFeedback(null);
    setQuizErrorMessage(null);
  };

  const zoomClasses = [
    {
      id: "zoom-1",
      topic: "ICS Outbreak Command Structure Logistics",
      instructor: "Moses Chris",
      date: "2026-06-03",
      time: "1:00 PM UTC",
      link: "https://zoom.us"
    },
    {
      id: "zoom-2",
      topic: "Confidential Safety Mapping Group Consult",
      instructor: "Moses Chris",
      date: "2026-06-10",
      time: "4:00 PM UTC",
      link: "https://zoom.us"
    }
  ];

  // Printable mock certificate trigger
  const [certDownloadName, setCertDownloadName] = useState<string | null>(null);
  
  const triggerCertificatePrint = (title: string) => {
    setCertDownloadName(title);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <Box bg="white" minH="100vh">
      {/* Visual Header */}
      <Box bg="white" color="navy.800" py="16" borderBottom="1px solid" borderColor="navy.200">
        <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }}>
          <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} spaceY={{ base: "6", md: "0" }}>
            <Box textAlign="left">
              <Badge bg="teal.50" color="teal.750" mb="4" fontWeight="extrabold" borderRadius="xs" letterSpacing="wider">
                MOSES CHRIS ACADEMY (LMS)
              </Badge>
              <Heading fontSize={{ base: "3xl", md: "5xl" }} color="navy.800" fontWeight="normal" fontFamily="heading" mb="4" lineHeight="tight">
                Interactive Learning Center
              </Heading>
              <Text fontSize="sm" color="navy.500" fontStyle="italic" maxW="600px" lineHeight="relaxed">
                Learn emergency biological command systems, certified victim advocacy, and mental wellness models directly from state-registered faculty.
              </Text>
            </Box>
            
            {/* Quick dashboard statistics */}
            <HStack spaceX="4" bg="navy.50" p="4" borderRadius="xs" border="1px solid" borderColor="navy.200">
              <Box textAlign="center">
                <Text fontSize="xl" fontWeight="bold" color="teal.700">{enrolledCourses.length}</Text>
                <Text fontSize="9px" color="navy.500">MY COURSES</Text>
              </Box>
              <Box w="1px" h="10" bg="navy.200" />
              <Box textAlign="center">
                <Text fontSize="xl" fontWeight="bold" color="teal.600">
                  {courses.filter(c => c.certificateEarned).length}
                </Text>
                <Text fontSize="9px" color="navy.500">CERTIFICATES</Text>
              </Box>
            </HStack>
          </Flex>
        </Box>
      </Box>

      {/* Main Layout Area */}
      <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }} py="8">
        {/* Navigation Tabs */}
        <Flex borderBottom="1px solid" borderColor="navy.200" mb="8" spaceX="4">
          <Button
            variant="ghost"
            fontSize="sm"
            fontWeight="bold"
            pb="3"
            borderRadius="0"
            color={academyTab === "catalog" ? "teal.700" : "navy.500"}
            borderBottom="2px solid"
            borderColor={academyTab === "catalog" ? "teal.600" : "transparent"}
            onClick={() => { setAcademyTab("catalog"); setActiveCourseId(null); }}
          >
            Course Catalog
          </Button>
          <Button
            variant="ghost"
            fontSize="sm"
            fontWeight="bold"
            pb="3"
            borderRadius="0"
            color={academyTab === "dashboard" ? "teal.700" : "navy.500"}
            borderBottom="2px solid"
            borderColor={academyTab === "dashboard" ? "teal.600" : "transparent"}
            onClick={() => { setAcademyTab("dashboard"); setActiveCourseId(enrolledCourses[0]?.id || null); }}
          >
            My Student Workspace
          </Button>
          <Button
            variant="ghost"
            fontSize="sm"
            fontWeight="bold"
            pb="3"
            borderRadius="0"
            color={academyTab === "zoom" ? "teal.700" : "navy.500"}
            borderBottom="2px solid"
            borderColor={academyTab === "zoom" ? "teal.600" : "transparent"}
            onClick={() => { setAcademyTab("zoom"); setActiveCourseId(null); }}
          >
            Live Webinars & Zoom Sync
          </Button>
        </Flex>

        {/* 1. CATALOG TAB VIEW */}
        {academyTab === "catalog" && !activeCourseId && (
          <Box>
            {/* Search and Categories bar */}
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "stretch", md: "center" }} mb="8" gap="4">
              <HStack spaceX="2" wrap="wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    size="xs"
                    bg={selectedCategory === cat ? "teal.600" : "white"}
                    color={selectedCategory === cat ? "white" : "navy.800"}
                    _hover={{ bg: "teal.600", color: "white" }}
                    onClick={() => setSelectedCategory(cat)}
                    borderRadius="xs"
                    border="1px solid"
                    borderColor="navy.200"
                  >
                    {cat}
                  </Button>
                ))}
              </HStack>

              <HStack spaceX="2" bg="white" px="3" py="1.5" borderRadius="xs" border="1px solid" borderColor="navy.200" maxW="320px" w="full">
                <Search size={16} className="text-navy-400" />
                <Input
                  placeholder="Search syllabus..."
                  size="xs"
                  border="none"
                  _focus={{ outline: "none", boxShadow: "none" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </HStack>
            </Flex>

            {/* Courses Catalog list */}
            {filteredCourses.length === 0 ? (
              <Box py="12" bg="white" borderRadius="xs" textAlign="center" border="1px dashed" borderColor="navy.200">
                <AlertCircle size={32} className="text-navy-400 mx-auto mb-2" />
                <Text fontSize="sm" color="navy.500">No courses match your query or selected filters.</Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8">
                {filteredCourses.map((crs) => (
                  <Box key={crs.id} bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200" overflow="hidden" display="flex" flexDirection="column" justifyContent="space-between">
                    <Box bg="navy.50" p="5" color="navy.800" minH="140px" display="flex" flexDirection="column" justify="space-between" borderBottom="1px solid" borderColor="navy.100">
                      <HStack justify="space-between">
                        <Badge bg="teal.50" color="teal.750" fontSize="9px" fontWeight="bold" borderRadius="xs">
                          {crs.category}
                        </Badge>
                        <Badge bg="teal.600" color="white" fontSize="9px" borderRadius="xs">
                          {crs.duration}
                        </Badge>
                      </HStack>
                      <Heading fontSize="md" fontWeight="bold" mt="4" color="navy.800">
                        {crs.title}
                      </Heading>
                    </Box>
                    <Box p="5" flex="1" display="flex" flexDirection="column" justify="space-between">
                      <Box>
                        <Text fontSize="xs" color="navy.500" mb="6" lineClamp="3">
                          {crs.summary}
                        </Text>
                        
                        <HStack spaceX="3" mb="6" align="center">
                          <Image src={crs.instructorAvatar} alt={crs.instructorName} w="32px" h="32px" borderRadius="full" />
                          <Box>
                            <Text fontSize="10px" fontWeight="bold" color="navy.800">{crs.instructorName}</Text>
                            <Text fontSize="9px" color="navy.500">{crs.instructorTitle}</Text>
                          </Box>
                        </HStack>
                      </Box>

                      <Box borderTop="1px solid" borderColor="navy.100" pt="4">
                        {crs.enrolled ? (
                          <VStack align="stretch" spaceY="2">
                            <Flex justify="space-between" align="center">
                              <Text fontSize="10px" fontWeight="bold" color="teal.700">Enrolled Workspace</Text>
                              <Text fontSize="10px" fontWeight="bold" color="teal.700">{crs.progress}% completed</Text>
                            </Flex>
                            {/* Custom progress tracker */}
                            <Box w="full" h="1.5" bg="navy.50" borderRadius="full" overflow="hidden">
                              <Box w={`${crs.progress}%`} h="full" bg="teal.600" transition="width 0.3s" />
                            </Box>
                            <Button size="xs" bg="teal.600" color="white" w="full" borderRadius="xs" onClick={() => { setActiveCourseId(crs.id); setAcademyTab("dashboard"); }}>
                              Open Course Workspace
                            </Button>
                          </VStack>
                        ) : (
                          <Button size="xs" w="full" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} borderRadius="xs" onClick={() => handleEnroll(crs.id)}>
                            Enroll Now (Complementary Access)
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            )}

            {/* Success Stories section */}
            <Box mt="16" p="8" bg="white" color="navy.800" borderRadius="xs" border="1px solid" borderColor="navy.200">
              <SimpleGrid columns={{ base: 1, md: 12 }} gap="8" align="center">
                <Box gridColumn={{ base: "1", md: "span 3" }}>
                  <Box bg="navy.50" p="4" borderRadius="xs" textAlign="center" border="1px solid" borderColor="navy.200">
                    <GraduationCap size={44} className="text-teal-600 mx-auto mb-2" />
                    <Text fontSize="lg" fontWeight="bold" color="navy.800">1,200+ Graduates</Text>
                    <Text fontSize="10px" color="navy.500">Certified Community Leaders</Text>
                  </Box>
                </Box>
                <Box gridColumn={{ base: "1", md: "span 9" }} textAlign="left">
                  <Badge bg="teal.50" color="teal.750" mb="2" fontWeight="bold" borderRadius="xs">STUDENT SUCCESS REPORT</Badge>
                  <Heading fontSize="xl" mb="2" color="navy.800" fontWeight="normal" fontFamily="heading">Welfare & Surveillance Accreditation</Heading>
                  <Text fontSize="xs" color="navy.500" mb="4" lineHeight="tall">
                    "The syllabus covers critical FEMA operations alongside clinical empathy tools. The ability to verify and display outbound certificates allowed me to secure licensing on my community mental health advisory board."
                  </Text>
                  <Text fontSize="11px" fontWeight="bold" color="teal.700">- Captain Thomas R., Municipal Incident Commander</Text>
                </Box>
              </SimpleGrid>
            </Box>
          </Box>
        )}

        {/* 2. DASHBOARD VIEW (ACTIVE INTERACTIVE LESSONS & QUIZZES) */}
        {academyTab === "dashboard" && (
          <Box>
            {enrolledCourses.length === 0 ? (
              <Box py="16" bg="white" borderRadius="xs" textAlign="center" border="1px solid" borderColor="navy.200">
                <BookOpen size={44} className="text-navy-300 mx-auto mb-3" />
                <Heading fontSize="lg" fontWeight="normal" fontFamily="heading" color="navy.800" mb="2">Your Student Workspace is Empty</Heading>
                <Text fontSize="xs" color="navy.500" mb="6" maxW="400px" mx="auto">
                  You have not enrolled in any programs yet. Visit the Course Catalog to begin your certification training.
                </Text>
                <Button size="xs" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} onClick={() => setAcademyTab("catalog")} borderRadius="xs">
                  Browse Courses Catalog
                </Button>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, lg: 12 }} gap="8">
                {/* Left side courses menu selectors */}
                <Box gridColumn={{ base: "1", lg: "span 4" }}>
                  <VStack align="stretch" spaceY="3">
                    <Text fontSize="xs" fontWeight="bold" color="navy.400" uppercase="true" letterSpacing="wider">My Enrolled Workspaces</Text>
                    {enrolledCourses.map((crs) => (
                      <Box
                        key={crs.id}
                        p="4"
                        bg={activeCourseId === crs.id ? "teal.50" : "white"}
                        borderRadius="xs"
                        border="1px solid"
                        borderColor={activeCourseId === crs.id ? "teal.300" : "navy.200"}
                        cursor="pointer"
                        onClick={() => {
                          setActiveCourseId(crs.id);
                          setQuizSelections({});
                          setQuizFeedback(null);
                          setQuizErrorMessage(null);
                          if (crs.lessons.length > 0) {
                            setActiveLessonId(crs.lessons[0].id);
                          }
                        }}
                        transition="all 0.2s"
                        _hover={{ borderColor: "teal.400" }}
                      >
                        <Heading fontSize="xs" fontWeight="bold" color="navy.800" lineClamp="1" mb="2">
                          {crs.title}
                        </Heading>
                        {/* Custom progress tracker */}
                        <Box w="full" h="1.5" bg="navy.50" borderRadius="full" overflow="hidden" mb="2">
                          <Box w={`${crs.progress}%`} h="full" bg="teal.600" transition="width 0.3s" />
                        </Box>
                        <Flex justify="space-between" align="center">
                          <Text fontSize="9px" color="navy.500">Progress: {crs.progress}%</Text>
                          {crs.certificateEarned && (
                            <Badge bg="teal.600" color="white" fontSize="8px" borderRadius="xs">Cert Available</Badge>
                          )}
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </Box>

                {/* Right side active course dashboard interactive console */}
                {activeCourse ? (
                  <Box gridColumn={{ base: "1", lg: "span 8" }} bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200" overflow="hidden">
                    {/* Course Title bar */}
                    <Box bg="navy.50" color="navy.800" p="5" borderBottom="1px solid" borderColor="navy.100">
                      <Flex justify="space-between" align="center" wrap="wrap">
                        <Box textAlign="left">
                          <Badge bg="teal.50" color="teal.750" fontSize="8px" mb="1" borderRadius="xs">{activeCourse.category}</Badge>
                          <Heading fontSize="sm" fontWeight="bold" color="navy.800">{activeCourse.title}</Heading>
                        </Box>
                        {activeCourse.certificateEarned && (
                          <Button size="xs" bg="teal.600" color="white" fontWeight="extrabold" leftIcon={<Award size={12} />} onClick={() => triggerCertificatePrint(activeCourse.title)} borderRadius="xs" _hover={{ bg: "teal.700" }}>
                            Print/Download Certificate
                          </Button>
                        )}
                      </Flex>
                    </Box>

                    {/* Active lesson screen player */}
                    <Box p="6">
                      {activeLesson ? (
                        <Box bg="navy.50" p="5" borderRadius="xs" border="1px solid" borderColor="navy.100" mb="6" textAlign="left">
                          <Flex justify="space-between" align="center" mb="3">
                            <HStack spaceX="2">
                              {activeLesson.type === "video" ? <Video size={16} className="text-teal-600" /> : <FileText size={16} className="text-teal-600" />}
                              <Text fontSize="xs" fontWeight="bold" color="navy.800">Active Lesson: {activeLesson.title}</Text>
                            </HStack>
                            <Badge bg="teal.600" color="white" size="sm" borderRadius="xs">{activeLesson.duration}</Badge>
                          </Flex>
                          
                          {/* Animated Player or Content container */}
                          <Box h="180px" bg="navy.900" borderRadius="xs" mb="4" display="flex" alignItems="center" justifyContent="center" position="relative" overflow="hidden">
                            {activeLesson.type === "video" ? (
                              <video src={activeLesson.mediaUrl} controls className="w-full h-full object-cover" />
                            ) : (
                              <VStack spaceY="2" color="white">
                                <FileText size={40} className="text-amber-500" />
                                <Text fontSize="xs" fontWeight="bold">PDF Resource Worksheet Active</Text>
                                <Button size="xs" bg="teal.600" color="white" as="a" href="#" download borderRadius="xs">Download Study PDF</Button>
                              </VStack>
                            )}
                          </Box>

                          <Flex justify="space-between" align="center">
                            <Text fontSize="10px" color="navy.500">Complete this lesson to advance your progress meter.</Text>
                            {activeLesson.completed ? (
                              <Badge bg="teal.600" color="white" size="xs" borderRadius="xs">✓ Completed</Badge>
                            ) : (
                              <Button size="xs" bg="teal.600" color="white" _hover={{ bg: "teal.700" }} onClick={() => handleLessonComplete(activeLesson.id)} borderRadius="xs">
                                Mark Lesson as Completed
                              </Button>
                            )}
                          </Flex>
                        </Box>
                      ) : (
                        <Box py="6" textAlign="center">
                          <Text fontSize="xs" color="navy.500">Select a scheduled lesson below to start study.</Text>
                        </Box>
                      )}

                      {/* Course syllabus list */}
                      <Box mb="8" textAlign="left">
                        <Text fontSize="xs" fontWeight="bold" color="navy.400" mb="3" uppercase="true" letterSpacing="wider">Course Curriculum</Text>
                        <VStack align="stretch" spaceY="2">
                          {activeCourse.lessons.map((lsn) => (
                            <Flex
                              key={lsn.id}
                              p="3"
                              bg={activeLessonId === lsn.id ? "navy.50" : "white"}
                              borderRadius="xs"
                              border="1px solid"
                              borderColor={activeLessonId === lsn.id ? "teal.300" : "navy.100"}
                              align="center"
                              justify="space-between"
                              cursor="pointer"
                              onClick={() => {
                                setActiveLessonId(lsn.id);
                                setQuizFeedback(null);
                                setQuizErrorMessage(null);
                              }}
                            >
                              <HStack spaceX="3">
                                <Box color="teal.500">
                                  {lsn.completed ? <CheckCircle size={16} className="text-teal-500 fill-teal-100" /> : <Play size={14} />}
                                </Box>
                                <Box>
                                  <Text fontSize="xs" fontWeight="bold" color="navy.800">{lsn.title}</Text>
                                  <Text fontSize="9px" color="slate.500">{lsn.type.toUpperCase()} • {lsn.duration}</Text>
                                </Box>
                              </HStack>
                              
                              <Badge variant="ghost" colorScheme="slate" fontSize="8px">{lsn.duration}</Badge>
                            </Flex>
                          ))}
                        </VStack>
                      </Box>

                      {/* Outbox Assessment Quiz */}
                      <Box borderTop="1px solid" borderColor="slate.200" pt="6" textAlign="left">
                        <HStack spaceX="2" mb="3">
                          <Award size={18} className="text-amber-500" />
                          <Text fontSize="xs" fontWeight="bold" color="navy.800" uppercase="true" letterSpacing="wider">Digital Credential Assessment</Text>
                        </HStack>

                        {activeCourse.progress < 100 ? (
                          <Box p="4" bg="amber.50" borderRadius="xl" display="flex" alignItems="start">
                            <AlertCircle size={16} className="text-amber-600 mr-3 shrink-0" />
                            <Box pl="2">
                              <Text fontSize="xs" fontWeight="bold" color="amber-800">Syllabus Incomplete</Text>
                              <Text fontSize="10px" color="amber-700">You must click and complete all study lessons before compiling the final certified output quiz.</Text>
                            </Box>
                          </Box>
                        ) : activeCourse.quizCompleted ? (
                          <Box p="4" bg="teal.50" borderRadius="xl">
                            <Text fontSize="xs" fontWeight="bold" color="teal-800">Quiz Completed Successfully!</Text>
                            <Text fontSize="10px" color="teal-700" mb="3">Your score: <strong>{activeCourse.quizScore}%</strong>. A printable credential has been generated for your profile.</Text>
                            <HStack spaceX="2">
                              <Button size="xs" bg="gold.500" color="navy.800" fontWeight="bold" onClick={() => triggerCertificatePrint(activeCourse.title)}>
                                Print My Certificate
                              </Button>
                              <Button size="xs" variant="outline" borderColor="red.300" color="red.500" onClick={handleQuizReset}>
                                Reset & Retake Test
                              </Button>
                            </HStack>
                          </Box>
                        ) : (
                          <Box bg="slate.50" p="4" borderRadius="xl" border="1px dashed" borderColor="slate.300">
                            <Text fontSize="11px" color="slate.600" mb="4">
                              Pass this diagnostic quiz with 70% or higher to unlock your printable Moses Chris Academy accreditation credentials.
                            </Text>

                            <VStack align="stretch" spaceY="4" mb="4">
                              {activeCourse.quizzes.map((quiz, qIdx) => (
                                <Box key={quiz.id}>
                                  <Text fontSize="xs" fontWeight="bold" color="navy.800" mb="2">
                                    Q{qIdx + 1}: {quiz.question}
                                  </Text>
                                  <VStack align="stretch" spaceY="2" pl="2">
                                    {quiz.options.map((opt, optIdx) => (
                                      <Button
                                        key={opt}
                                        size="xs"
                                        variant={quizSelections[qIdx] === optIdx ? "solid" : "outline"}
                                        bg={quizSelections[qIdx] === optIdx ? "teal.600" : "white"}
                                        color={quizSelections[qIdx] === optIdx ? "white" : "navy.800"}
                                        justifyContent="flex-start"
                                        onClick={() => handleQuizSelection(qIdx.toString(), optIdx)}
                                        border="1px solid"
                                        borderColor="navy.200"
                                        borderRadius="xs"
                                      >
                                        {opt}
                                      </Button>
                                    ))}
                                  </VStack>
                                </Box>
                              ))}
                            </VStack>

                            <Button size="xs" bg="navy.800" color="white" w="full" _hover={{ bg: "navy.700" }} onClick={handleQuizSubmit} borderRadius="xs">
                              Submit Answers & Verify Core
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box gridColumn={{ base: "1", lg: "span 8" }} py="12" bg="white" border="1px solid" borderColor="navy.200" borderRadius="xs" textAlign="center">
                    <Text fontSize="xs" color="navy.500">Pick a workspace from the left panel to begin.</Text>
                  </Box>
                )}
              </SimpleGrid>
            )}
          </Box>
        )}

        {/* 3. ZOOM CLASSES TAB VIEW */}
        {academyTab === "zoom" && (
          <Box maxW="90%" mx="auto">
            <Badge bg="teal.600" color="white" mb="2" borderRadius="xs">ZOOM API & CALENDAR SYNC</Badge>
            <Heading fontSize="2xl" color="navy.800" fontWeight="normal" fontFamily="heading" mb="2">
              Daily Live Classes & Webinars
            </Heading>
            <Text fontSize="xs" color="navy.500" mb="8">
              Review upcoming live interactive video conference sessions, mental welfare syncs, and emergency response commands. Link your profile to load calendar reminders.
            </Text>

            <VStack align="stretch" spaceY="4">
              {zoomClasses.map((cls) => (
                <Box key={cls.id} p="5" bg="white" borderRadius="xs" border="1px solid" borderColor="navy.200">
                  <Flex justify="space-between" align="center" wrap="wrap" direction={{ base: "column", sm: "row" }} spaceY={{ base: "3", sm: "0" }}>
                    <Box textAlign="left">
                      <HStack spaceX="2" mb="1">
                        <Badge variant="solid" bg="teal.600" color="white" fontSize="8px" borderRadius="xs">ZOOM LIVE</Badge>
                        <Text fontSize="10px" fontWeight="bold" color="teal.700">{cls.date} • {cls.time}</Text>
                      </HStack>
                      <Heading fontSize="sm" fontWeight="bold" color="navy.800" mb="1">
                        {cls.topic}
                      </Heading>
                      <Text fontSize="9px" color="navy.500">Instructor: {cls.instructor} (Registered Epidemiologist)</Text>
                    </Box>

                    <Button size="xs" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} as="a" href={cls.link} target="_blank" borderRadius="xs">
                      Join Active Zoom Session
                    </Button>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </Box>

      {/* Printable certificate view (hidden by default unless printing) */}
      {certDownloadName && (
        <Box
          id="printable-cert"
          display="none"
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="white"
          p="12"
          zIndex="9999"
          color="black"
          textAlign="center"
          fontFamily="serif"
          border="15px double"
          borderColor="#B45309"
        >
          <VStack spaceY="6" py="12">
            <Award size={64} className="text-amber-600 mx-auto" />
            <Text fontSize="14px" letterSpacing="widest" fontWeight="bold">MOSES CHRIS ACADEMY OF ADVOCACY</Text>
            <Heading fontSize="36px" fontWeight="extrabold">CERTIFICATE OF COMPLETION</Heading>
            <Text fontSize="16px">This official credential document certifies that</Text>
            <Heading fontSize="28px" fontStyle="italic" color="navy.800">{studentName}</Heading>
            <Text fontSize="16px">has successfully analyzed the full academic syllabus, completed practical lab assessments, and passed the final digital credential quiz for:</Text>
            <Heading fontSize="22px" color="teal.700" fontWeight="bold">{certDownloadName}</Heading>
            <Text fontSize="14px">In testimony whereof, the accredited signatures of the faculty team are hereunto appended.</Text>
            
            <HStack justify="space-between" w="80%" pt="12" mx="auto">
              <Box borderTop="1px solid" borderColor="black" w="150px" pt="2">
                <Text fontSize="12px" fontWeight="bold">Moses Chris, MPH</Text>
                <Text fontSize="10px" color="slate.500">PROGRAM INSTRUCTOR</Text>
              </Box>
              <Box borderTop="1px solid" borderColor="black" w="150px" pt="2">
                <Text fontSize="12px" fontWeight="bold">{new Date().toISOString().split("T")[0]}</Text>
                <Text fontSize="10px" color="slate.500">DATE OF VALIDATION</Text>
              </Box>
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Add styled print CSS for certificate printer */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-cert, #printable-cert * {
            visibility: visible;
          }
          #printable-cert {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </Box>
  );
}
