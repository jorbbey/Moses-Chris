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
  Textarea,
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
  GraduationCap,
  Clock,
  ShieldCheck,
  Coins,
  ChevronDown,
  ChevronUp,
  Heart,
  BookMarked,
  Info,
  Users,
  AwardIcon
} from "lucide-react";

interface CC_Day {
  day: number;
  title: string;
  say: string;
  practice: string;
  assignment: string;
}

interface CC_Week {
  week: number;
  title: string;
  days: CC_Day[];
}

const ccCurriculum: CC_Week[] = [
  {
    week: 1,
    title: "AUDIT THE CHAIN | \"Stop Ignoring the Bill\"",
    days: [
      {
        day: 1,
        title: "Your Body Keeps Receipts",
        say: "From Renewal: \"Have you ever felt like your body and mind are connected...\" Today we stop ignoring the bill. You're not broken. You're overdrawn.",
        practice: "Body Scan 3 min: Eyes closed. Start at head → shoulders → chest → stomach → legs. Ask: Where is tension? Where is ease?",
        assignment: "List 3 physical symptoms you've ignored:"
      },
      {
        day: 2,
        title: "The CC-6 Test",
        say: "Chain Currency has 6 links: Physical, Emotional, Mental, Spiritual, Environmental, Self-care, we score them!",
        practice: "CC-6 Audit: Rate each link 1-10 (1 = bankrupt, 10 = surplus) and describe the reason why.",
        assignment: "Sign Covenant: \"I agree to audit my chain daily for 30 days.\""
      },
      {
        day: 3,
        title: "Where Are You Withdrawing?",
        say: "Every scroll is a withdrawal. Every skipped meal is debt.",
        practice: "Withdrawal Log: For 24hrs, track 3 things that drain you. Time + Link + Cost 1-10.",
        assignment: "Name your top 3 withdrawals and their cost:"
      },
      {
        day: 4,
        title: "Where Are You Depositing?",
        say: "A walk is a deposit. A 'no' is a deposit. Sleeping is interest.",
        practice: "Deposit Log: List 3 things that refill you today. Time + Link + Value 1-10.",
        assignment: "Name 3 deposits you already make:"
      },
      {
        day: 5,
        title: "Your Cancer Moment",
        say: "From Renewal: \"My diagnosis was a wake-up call.\" What's your wake-up call?",
        practice: "Journal Prompt: When did your body/mind say \"enough\"? Describe the moment in 5 sentences.",
        assignment: "Write your Chain Currency bankruptcy story (approx 300 words). What link went to zero? What did it cost you?"
      },
      {
        day: 6,
        title: "The Ripple Effect",
        say: "One negative thought = physical tension = poor sleep = bad decision. That's the chain.",
        practice: "Trace 1 Ripple: Pick yesterday. Start with 1 thought → body → sleep → choice. Map it.",
        assignment: "Map yours: Thought → Body felt → Sleep was → Decision was:"
      },
      {
        day: 7,
        title: "Rest + Review | Sabbath For Your Chain",
        say: "Sabbath for your chain. No withdrawals today.",
        practice: "20-min Deposit Menu: Pick 3: Nap 10min / Walk / No phone / Tea / Music / Stretch.",
        assignment: "Sabbath review and wins:"
      }
    ]
  },
  {
    week: 2,
    title: "STRENGTHEN EACH LINK | \"Rebuild the Bank\"",
    days: [
      {
        day: 8,
        title: "Physical Link - Move",
        say: "From Ch2: \"Regular exercise can boost mood...\" Movement = deposit.",
        practice: "5-min mobility: Neck rolls 10x, Shoulder rolls 10x, Hip circles 10x.",
        assignment: "Walk 15 mins today. No phone scrolling. Just walk + breathe."
      },
      {
        day: 9,
        title: "Physical Link - Nourish",
        say: "Food is deposit or withdrawal.",
        practice: "Hunger Scale 1-10: Before eating, ask: Am I at 7? Stop at 8.",
        assignment: "Eat 1 meal today with no screen. Chew 20x. Notice taste."
      },
      {
        day: 10,
        title: "Emotional Link - Name It",
        say: "\"I'm stressed\" is vague. \"I'm overdrawn emotionally\" is data.",
        practice: "Feelings Wheel: Circle 3 exact feelings from today: Anxious / Numb / Overwhelmed / Hopeful / Tired / Other.",
        assignment: "Name 3 feelings today out loud: \"I feel _ because _\"."
      },
      {
        day: 11,
        title: "Emotional Link - Mindfulness",
        say: "From Ch2: \"Mindfulness practices can improve mental focus...\"",
        practice: "3-min Breath: In 4, hold 4, out 6. x6 rounds.",
        assignment: "Do 3-min breath 3x tomorrow. Set alarms: 10am, 2pm, 8pm."
      },
      {
        day: 12,
        title: "Mental Link - Self-Talk",
        say: "\"I'm unreachable\" was my lie. What's yours?",
        practice: "Catch + Replace: Catch 1 lie today. Write it. Replace it: Lie: \"I always _\" → Truth: \"I am learning to _\".",
        assignment: "Write 3 CC Affirmations regarding your daily deposits and rebuilding."
      },
      {
        day: 13,
        title: "Mental Link - Focus",
        say: "Mental fatigue = too many withdrawals.",
        practice: "25-min Focus Block: Timer 25min. 1 task only. Phone in another room.",
        assignment: "Do 1 focus block tomorrow on your most important task."
      },
      {
        day: 14,
        title: "Rest + Review",
        say: "Which link felt strongest this week?",
        practice: "CC-6 Quick Scan: Rescore Physical, Emotional, and Mental links.",
        assignment: "Assess the strongest link and proof of its strength."
      }
    ]
  },
  {
    week: 3,
    title: "THE HIDDEN LINKS | \"Audit What You Ignored\"",
    days: [
      {
        day: 15,
        title: "Spiritual Link - Purpose",
        say: "\"Spiritual connection: sense of purpose...\" Purpose = fuel.",
        practice: "\"Why\" Statement: Answer: Why did I survive? 3 words.",
        assignment: "Write yours in 1 sentence: \"I survived so I can _\""
      },
      {
        day: 16,
        title: "Spiritual Link - Nature/Journal",
        say: "From Ch2: \"Spending time in nature...\"",
        practice: "5-min Journal: Outside or by window. Prompt: \"God/Nature/Universe, what do I need to hear today?\"",
        assignment: "10 mins outside today. No phone. Just sky + breath."
      },
      {
        day: 17,
        title: "Environmental Link - People",
        say: "People are deposits or withdrawals.",
        practice: "Audit Top 5 Contacts: List 5 people you talk to most. Mark D=Deposit or W=Withdrawal.",
        assignment: "Text 1 deposit person: \"Thank you for being a deposit in my chain.\""
      },
      {
        day: 18,
        title: "Environmental Link - Space",
        say: "Your room is part of your chain. Clutter = mental debt.",
        practice: "5-min Desk Clean: Set timer. Only throw/fold 5 items.",
        assignment: "Fix 1 space: Make bed / Clear 1 shelf / Wipe table."
      },
      {
        day: 19,
        title: "Self-Care Link - Boundaries",
        say: "\"No\" is a deposit.",
        practice: "Script 1 Boundary: \"I care about you, and I can't _ today. I can _ instead.\"",
        assignment: "Use it once today. Write what happened."
      },
      {
        day: 20,
        title: "Self-Care Link - Sleep",
        say: "Sleep is compound interest.",
        practice: "Sleep Wind-down Plan: 9pm: Phone off. 9:15: Warm drink. 9:30: 3-min breath. 9:45: Lights out.",
        assignment: "Phone out of room tonight. Use alarm clock."
      },
      {
        day: 21,
        title: "Rest + Review",
        say: "Which hidden link surprised you?",
        practice: "Share in pod: \"I didn't know my _ link was so low/high.\"",
        assignment: "Identify the hidden link to rehabilitate next 30 days."
      }
    ]
  },
  {
    week: 4,
    title: "BUDGET & LEAD | \"Manage + Multiply\"",
    days: [
      {
        day: 22,
        title: "Debt vs Surplus",
        say: "Are you in CC debt? Let's do the math.",
        practice: "CC-6 Rescore: Take full CC-6 again like Day 2.",
        assignment: "Compare Day 2 vs Day 22. Which link gained most? By how many points?"
      },
      {
        day: 23,
        title: "90-Day CC Budget",
        say: "Like money: Income = deposits. Expenses = withdrawals.",
        practice: "Build Budget Template: Design entries for deposits to make and withdrawals to cut.",
        assignment: "Finish your personal 90-day budget layout."
      },
      {
        day: 24,
        title: "Breaking Negative Patterns",
        say: "From Ch2: \"To break the chain... identify weak links.\"",
        practice: "Pick 1 weak link from Day 22. Write 1 new habit for it.",
        assignment: "Rehab that 1 link for 30 days. Example: If Mental, then daily 25-min focus block."
      },
      {
        day: 25,
        title: "Managing Your CC Like Money",
        say: "\"Being mindful of our thoughts...\" is accounting.",
        practice: "Daily CC Ledger: End of day, write: Deposits count, Withdrawals count, and Net balance.",
        assignment: "Use ledger 3 days: Day 25, 26, 27."
      },
      {
        day: 26,
        title: "We All Have 24 Hours",
        say: "\"Just like time, each of us is given equal Chain Currency.\"",
        practice: "Time Audit: List yesterday in index blocks. Mark D or W.",
        assignment: "Cut 1 withdrawal from your day tomorrow. Replace with 1 deposit."
      },
      {
        day: 27,
        title: "Coach Someone",
        say: "\"When we invest, we create chain reaction...\"",
        practice: "Run CC-6 on partner in breakout room. 10 min each.",
        assignment: "Coach 1 friend/family this week. Send them Day 2 CC-6 test."
      },
      {
        day: 28,
        title: "Your Chain Story",
        say: "Write before/after like I did in Renewal.",
        practice: "5-min Share in Pod: \"30 days ago I was _ Today_.\"",
        assignment: "Post 1 paragraph in group: My Chain Story: Before _ → After _"
      },
      {
        day: 29,
        title: "Graduation Prep",
        say: "What will you deposit daily for 90 days?",
        practice: "Sign 90-Day CC Pledge: commit to 1 daily deposit in your chosen link.",
        assignment: "Film 30-sec video testimony: \"I graduated Chain Currency because — \""
      },
      {
        day: 30,
        title: "Commissioning - Chain Reaction",
        say: "From Renewal: \"You don't heal by holding pain. You heal by spending it.\" Go spend yours.",
        practice: "Group CC Oath: Stand and read: \"I am a Chain Currency leader. I audit. I deposit. I lead.\"",
        assignment: "Recruit 1 person for next cohort. Send them Day 1. Graduate!"
      }
    ]
  }
];

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
  
  // Tabs for main Academy view vs Student Dashboard view vs Zoom vs Premier Training (Default)
  const [academyTab, setAcademyTab] = useState<"training" | "catalog" | "dashboard" | "zoom">("training");

  // Track expanded day indices inside the 30-day curriculum
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });
  
  // Track inputs for interactive student practice journals
  const [studentAnswers, setStudentAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem("academy_student_answers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  
  // Load saved checkpoints from localStorage
  const [savedDayCheckpoints, setSavedDayCheckpoints] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem("academy_checkpoints");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track deep workbook answers of all 30 days
  const [workbook, setWorkbook] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem("academy_workbook_state");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return {
      day1_sym1: "", day1_sym2: "", day1_sym3: "", day1_score: 5,
      day2_scores: { "Physical": 5, "Emotional": 5, "Mental": 5, "Spiritual": 5, "Environmental": 5, "Self-care": 5 },
      day2_whys: { "Physical": "", "Emotional": "", "Mental": "", "Spiritual": "", "Environmental": "", "Self-care": "" },
      day2_covenant_name: "", day2_covenant_signed: false, day2_covenant_date: new Date().toISOString().split("T")[0],
      day3_items: [
        { name: "", link: "Physical", cost: 5 },
        { name: "", link: "Mental", cost: 5 },
        { name: "", link: "Emotional", cost: 5 }
      ],
      day4_items: [
        { name: "", link: "Physical", value: 5 },
        { name: "", link: "Mental", value: 5 },
        { name: "", link: "Emotional", value: 5 }
      ],
      day5_journal_sc: "", day5_story: "",
      day6_thought: "", day6_body: "", day6_sleep: "", day6_decision: "",
      day7_actions: [], day7_most_overdrawn: "Physical", day7_win: "",
      day8_reflection: "", day8_rolls_completed: false,
      day9_hunger_before: 5, day9_hunger_after: 5, day9_nourish_notes: "",
      day10_feelings: [], day10_other_feeling: "", day10_stmt1: "", day10_stmt2: "", day10_stmt3: "",
      day11_breath_times: 0, day11_alarm10am: false, day11_alarm2pm: false, day11_alarm8pm: false,
      day12_lie: "", day12_truth: "", day12_aff1: "", day12_aff2: "", day12_aff3: "",
      day13_focus_task: "", day13_phone_away: false, day13_focus_notes: "",
      day14_strongest: "Physical", day14_proof: "", day14_scores: { "Physical": 5, "Emotional": 5, "Mental": 5 },
      day15_why3: "", day15_sentence: "",
      day16_journal: "", day16_outside_completed: false,
      day17_contacts: [
        { name: "", type: "Deposit" },
        { name: "", type: "Deposit" },
        { name: "", type: "Deposit" },
        { name: "", type: "Deposit" },
        { name: "", type: "Deposit" }
      ],
      day17_copied: false,
      day18_desktimer: false, day18_bed: false, day18_shelf: false, day18_table: false, day18_space_fixed: "",
      day19_script_cant: "", day19_script_can: "", day19_what_happened: "",
      day20_phone_off: false, day20_warm_drink: false, day20_breath: false, day20_lights_out: false, day20_phone_out: false,
      day21_review_answer: "", day21_rehab_link: "Physical",
      day22_scores: { "Physical": 5, "Emotional": 5, "Mental": 5, "Spiritual": 5, "Environmental": 5, "Self-care": 5 },
      day23_budget: {
        "Physical": { deposit: "15 min walk", withdrawal: "No skipping Meals" },
        "Emotional": { deposit: "Name 1 feeling", withdrawal: "No shame talk" },
        "Mental": { deposit: "1 focus block", withdrawal: "No dome scroll" },
        "Spiritual": { deposit: "5min prayer", withdrawal: "No purpose doubt" },
        "Environmental": { deposit: "Claim 1 space", withdrawal: "No toxic chats" },
        "Self-Care": { deposit: "Sleep 7hrs", withdrawal: "No \"yes\" when tired" }
      },
      day24_weak_link: "Physical", day24_new_habit: "",
      day25_entries: {
        day25: { deposits: 0, withdrawals: 0, net: "Surplus" },
        day26: { deposits: 0, withdrawals: 0, net: "Surplus" },
        day27: { deposits: 0, withdrawals: 0, net: "Surplus" }
      },
      day26_blocks: { "08:00": "D", "12:00": "D", "15:00": "W", "18:00": "W", "21:00": "D" },
      day26_cut: "", day26_add: "",
      day27_partner_scores: { "Physical": 5, "Emotional": 5, "Mental": 5, "Spiritual": 5, "Environmental": 5, "Self-care": 5 },
      day27_friend_coached: "",
      day28_story_before: "", day28_story_after: "", day28_social_post: "",
      day29_pledge_name: "", day29_pledge_link: "Physical", day29_pledge_signed: false, day29_testimony: "",
      day30_oath_signed: false, day30_recruit: "", day30_grad_month: "June", day30_grad_year: "2026", day30_grad_name: ""
    };
  });

  const saveWorkbookField = (field: string, val: any) => {
    const updated = { ...workbook, [field]: val };
    setWorkbook(updated);
    try {
      localStorage.setItem("academy_workbook_state", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Breathing Coach state management
  const [breathingStatus, setBreathingStatus] = useState<"idle" | "inhale" | "hold" | "exhale">("idle");
  const [breathingSeconds, setBreathingSeconds] = useState<number>(0);
  const [breathingCounter, setBreathingCounter] = useState<number>(0);
  const [breathingIntervalId, setBreathingIntervalId] = useState<any>(null);

  const startBreathingCoach = () => {
    if (breathingIntervalId) {
      clearInterval(breathingIntervalId);
    }
    setBreathingStatus("inhale");
    setBreathingSeconds(4);
    
    const interval = setInterval(() => {
      setBreathingSeconds(prev => {
        if (prev <= 1) {
          let nextState: "idle" | "inhale" | "hold" | "exhale" = "idle";
          let nextSecs = 0;
          setBreathingStatus(curr => {
            if (curr === "inhale") {
              nextState = "hold";
              nextSecs = 4;
            } else if (curr === "hold") {
              nextState = "exhale";
              nextSecs = 6;
            } else if (curr === "exhale") {
              nextState = "inhale";
              nextSecs = 4;
              setBreathingCounter(c => c + 1);
            }
            return nextState;
          });
          return nextSecs;
        }
        return prev - 1;
      });
    }, 1000);
    setBreathingIntervalId(interval);
  };

  const stopBreathingCoach = () => {
    if (breathingIntervalId) {
      clearInterval(breathingIntervalId);
    }
    setBreathingIntervalId(null);
    setBreathingStatus("idle");
    setBreathingSeconds(0);
  };

  // Pomodoro Focus Timer states
  const [pomodoroSeconds, setPomodoroSeconds] = useState<number>(25 * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState<boolean>(false);
  const [pomodoroIntervalId, setPomodoroIntervalId] = useState<any>(null);

  const togglePomodoro = () => {
    if (pomodoroRunning) {
      clearInterval(pomodoroIntervalId);
      setPomodoroRunning(false);
      setPomodoroIntervalId(null);
    } else {
      setPomodoroRunning(true);
      const interval = setInterval(() => {
        setPomodoroSeconds(p => {
          if (p <= 1) {
            clearInterval(interval);
            setPomodoroRunning(false);
            setPomodoroIntervalId(null);
            alert("25-minute focus block completed! Take a break & make your deposit.");
            return 25 * 60;
          }
          return p - 1;
        });
      }, 1000);
      setPomodoroIntervalId(interval);
    }
  };

  const resetPomodoro = () => {
    if (pomodoroIntervalId) {
      clearInterval(pomodoroIntervalId);
    }
    setPomodoroRunning(false);
    setPomodoroIntervalId(null);
    setPomodoroSeconds(25 * 60);
  };

  // Active Week filter for curriculum navigator (1, 2, 3, 4)
  const [activeWeekCursor, setActiveWeekCursor] = useState<number>(1);

  const categories = ["All", "Chain Currency", "Epidemiology", "Mental Health", "Domestic Violence"];

  // HEPER: Render interactive widgets for the Student Workbook Manual
  const renderInteractiveWorkbookWidgets = (dayNum: number) => {
    switch (dayNum) {
      case 1:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 1 WORKBOOK SECTION: IDENTIFY IGNORED SIGNS</Text>
            
            <VStack align="stretch" spaceY="2">
              <Text fontSize="11px" fontWeight="semibold" color="navy.800">List 3 physical symptoms you've ignored:</Text>
              <Input
                placeholder="Symptom 1 (e.g. Constant tension headache)"
                size="xs"
                fontSize="xs"
                bg="white"
                value={workbook.day1_sym1 || ""}
                onChange={(e) => saveWorkbookField("day1_sym1", e.target.value)}
              />
              <Input
                placeholder="Symptom 2 (e.g. Shallow breathing & tight chest)"
                size="xs"
                fontSize="xs"
                bg="white"
                value={workbook.day1_sym2 || ""}
                onChange={(e) => saveWorkbookField("day1_sym2", e.target.value)}
              />
              <Input
                placeholder="Symptom 3 (e.g. Acid reflux or high pulse under load)"
                size="xs"
                fontSize="xs"
                bg="white"
                value={workbook.day1_sym3 || ""}
                onChange={(e) => saveWorkbookField("day1_sym3", e.target.value)}
              />
            </VStack>

            <Box pt="2">
              <Text fontSize="11px" fontWeight="semibold" color="navy.800" mb="1.5">
                CC-6 Score for PHYSICAL Link Today: <strong className="text-teal-600">{workbook.day1_score || 5}/10</strong>
              </Text>
              <HStack spaceX="1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                  <Button
                    key={val}
                    size="xs"
                    p="0"
                    w="7"
                    fontSize="10px"
                    bg={workbook.day1_score === val ? "teal.600" : "white"}
                    color={workbook.day1_score === val ? "white" : "navy.800"}
                    border="1px solid"
                    borderColor="navy.200"
                    onClick={() => saveWorkbookField("day1_score", val)}
                  >
                    {val}
                  </Button>
                ))}
              </HStack>
            </Box>
          </VStack>
        );

      case 2:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 2 WORKBOOK SECTION: THE CC-6 TEST AUDIT</Text>
            <Text fontSize="10px" color="navy.600">Rate each link of the Chain Currency 1-10 (1 = Bankrupt, 10 = Thriving Surplus) and write a short reason why:</Text>
            
            <VStack align="stretch" spaceY="2.5" mt="2">
              {["Physical", "Emotional", "Mental", "Spiritual", "Environmental", "Self-care"].map((link) => (
                <Flex key={link} align="center" justify="space-between" direction={{ base: "column", sm: "row" }} spaceY={{ base: "2", sm: "0" }}>
                  <Text fontSize="11px" fontWeight="bold" color="navy.700" w="80px">{link}:</Text>
                  
                  <HStack spaceX="2" flex="1" w="full" ml={{ sm: "4" }}>
                    <select
                      className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1 w-20"
                      value={(workbook.day2_scores && workbook.day2_scores[link]) || 5}
                      onChange={(e) => {
                        const nextSc = { ...workbook.day2_scores, [link]: parseInt(e.target.value) };
                        saveWorkbookField("day2_scores", nextSc);
                      }}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(s => <option key={s} value={s}>{s}/10</option>)}
                    </select>
                    
                    <Input
                      placeholder={`Current ${link} status note...`}
                      size="xs"
                      fontSize="xs"
                      bg="white"
                      value={(workbook.day2_whys && workbook.day2_whys[link]) || ""}
                      onChange={(e) => {
                        const nextWhy = { ...workbook.day2_whys, [link]: e.target.value };
                        saveWorkbookField("day2_whys", nextWhy);
                      }}
                    />
                  </HStack>
                </Flex>
              ))}
            </VStack>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.200" mt="2">
              <Text fontSize="10px" fontWeight="bold" color="teal.800" mb="1" uppercase="true">✍ COVENANT INTEGRITY REGISTER</Text>
              <Text fontSize="10px" color="navy.600" mb="2">"I, commit to audit my chain currency indicators daily for 30 consecutive days."</Text>
              
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2">
                <Input
                  placeholder="Your Full Name"
                  size="xs"
                  fontSize="xs"
                  value={workbook.day2_covenant_name || ""}
                  onChange={(e) => saveWorkbookField("day2_covenant_name", e.target.value)}
                />
                <Button
                  size="xs"
                  bg={workbook.day2_covenant_signed ? "teal.600" : "navy.800"}
                  color="white"
                  borderRadius="xs"
                  onClick={() => saveWorkbookField("day2_covenant_signed", !workbook.day2_covenant_signed)}
                >
                  {workbook.day2_covenant_signed ? "✓ Signed & Covenant Sealed" : "Sign Digital Contract"}
                </Button>
              </SimpleGrid>

              {workbook.day2_covenant_signed && (
                <Text fontSize="9px" color="teal.600" mt="2" fontWeight="bold" py="1" px="2" bg="teal.50" textAlign="center">
                  📜 CERTIFIED INTEGRITY AGREEMENT SECURED: {workbook.day2_covenant_name} on {workbook.day2_covenant_date}
                </Text>
              )}
            </Box>
          </VStack>
        );

      case 3:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 3 WORKBOOK SECTION: 24h WITHDRAWAL LOGGER</Text>
            <Text fontSize="10px" color="navy.600">Track the top 3 activities that drain your chain’s current accounts:</Text>
            
            {workbook.day3_items?.map((item: any, idx: number) => (
              <Box key={idx} bg="white" p="2.5" borderRadius="xs" border="1px solid" borderColor="navy.200">
                <Text fontSize="10px" fontWeight="bold" color="navy.700" mb="1.5">Drainage Aspect #{idx + 1}</Text>
                <SimpleGrid columns={{ base: 1, sm: 3 }} gap="2">
                  <Input
                    placeholder="e.g. Doom scrolling late nights"
                    size="xs"
                    fontSize="xs"
                    value={item.name || ""}
                    onChange={(e) => {
                      const list = [...workbook.day3_items];
                      list[idx] = { ...list[idx], name: e.target.value };
                      saveWorkbookField("day3_items", list);
                    }}
                  />
                  <select
                    className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1 h-7"
                    value={item.link || "Physical"}
                    onChange={(e) => {
                      const list = [...workbook.day3_items];
                      list[idx] = { ...list[idx], link: e.target.value };
                      saveWorkbookField("day3_items", list);
                    }}
                  >
                    {["Physical", "Emotional", "Mental", "Spiritual", "Environmental", "Self-care"].map(lk => (
                      <option key={lk} value={lk}>{lk} Link</option>
                    ))}
                  </select>
                  <HStack spaceX="2" justify="space-between">
                    <Text fontSize="9px" color="red.600" fontWeight="bold">Cost: {item.cost || 5}/10</Text>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      className="w-24 h-1 bg-navy-200 rounded-lg cursor-pointer"
                      value={item.cost || 5}
                      onChange={(e) => {
                        const list = [...workbook.day3_items];
                        list[idx] = { ...list[idx], cost: parseInt(e.target.value) };
                        saveWorkbookField("day3_items", list);
                      }}
                    />
                  </HStack>
                </SimpleGrid>
              </Box>
            ))}
          </VStack>
        );

      case 4:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 4 WORKBOOK SECTION: DEPOSIT LOG REGISTER</Text>
            <Text fontSize="10px" color="navy.600">List 3 deliberate deposits that rebuild interest across your chain links:</Text>
            
            {workbook.day4_items?.map((item: any, idx: number) => (
              <Box key={idx} bg="white" p="2.5" borderRadius="xs" border="1px solid" borderColor="navy.200">
                <Text fontSize="10px" fontWeight="bold" color="navy.700" mb="1.5">Deposit Aspect #{idx + 1}</Text>
                <SimpleGrid columns={{ base: 1, sm: 3 }} gap="2">
                  <Input
                    placeholder="e.g. Warm bath or 15-min quiet stretch"
                    size="xs"
                    fontSize="xs"
                    value={item.name || ""}
                    onChange={(e) => {
                      const list = [...workbook.day4_items];
                      list[idx] = { ...list[idx], name: e.target.value };
                      saveWorkbookField("day4_items", list);
                    }}
                  />
                  <select
                    className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1 h-7"
                    value={item.link || "Physical"}
                    onChange={(e) => {
                      const list = [...workbook.day4_items];
                      list[idx] = { ...list[idx], link: e.target.value };
                      saveWorkbookField("day4_items", list);
                    }}
                  >
                    {["Physical", "Emotional", "Mental", "Spiritual", "Environmental", "Self-care"].map(lk => (
                      <option key={lk} value={lk}>{lk} Link</option>
                    ))}
                  </select>
                  <HStack spaceX="2" justify="space-between">
                    <Text fontSize="9px" color="teal.600" fontWeight="bold">Value: {item.value || 5}/10</Text>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      className="w-24 h-1 bg-navy-200 rounded-lg cursor-pointer"
                      value={item.value || 5}
                      onChange={(e) => {
                        const list = [...workbook.day4_items];
                        list[idx] = { ...list[idx], value: parseInt(e.target.value) };
                        saveWorkbookField("day4_items", list);
                      }}
                    />
                  </HStack>
                </SimpleGrid>
              </Box>
            ))}
          </VStack>
        );

      case 5:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 5 WORKBOOK SECTION: YOUR PERSONAL CANCER WAKE-UP MOMENT</Text>
            
            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <HStack justify="space-between" mb="1">
                <Text fontSize="10px" fontWeight="bold" color="navy.800">Identify When Body/Mind Said "Enough" (Goal: 5 Sentences):</Text>
                <Badge colorScheme="teal" fontSize="9px">
                  {workbook.day5_journal_sc?.split(/[.!?]+/).filter(Boolean).length || 0}/5 Sentences
                </Badge>
              </HStack>
              <Textarea
                placeholder="Describe that pivotal wake-up call with ultimate vulnerability..."
                fontSize="xs"
                size="xs"
                value={workbook.day5_journal_sc || ""}
                onChange={(e) => saveWorkbookField("day5_journal_sc", e.target.value)}
              />
            </Box>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <HStack justify="space-between" mb="1">
                <Text fontSize="10px" fontWeight="bold" color="navy.800">Describe Your Chain Currency Bankruptcy Story (Goal: 300 words):</Text>
                <Badge colorScheme="purple" fontSize="9px">
                  {workbook.day5_story?.trim() === "" ? 0 : workbook.day5_story?.split(/\s+/).filter(Boolean).length || 0} / 300 words
                </Badge>
              </HStack>
              <Textarea
                placeholder="What link plummeted to zero? What did it cost you? What was the ultimate collateral damage?"
                fontSize="xs"
                size="xs"
                minH="100px"
                value={workbook.day5_story || ""}
                onChange={(e) => saveWorkbookField("day5_story", e.target.value)}
              />
            </Box>
          </VStack>
        );

      case 6:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 6 WORKBOOK SECTION: TRACE THE RIPPLE OF DEPRECIATION</Text>
            <Text fontSize="10px" color="navy.600">Map how one negative input cascades through your entire system:</Text>
            
            <SimpleGrid columns={{ base: 1, md: 4 }} gap="2.5" position="relative" mt="2">
              <Box bg="white" p="2" borderRadius="xs" border="1px solid" borderColor="navy.200" textAlign="center">
                <Text fontSize="9px" fontWeight="bold" color="navy.500" mb="1">💭 THOUGHT</Text>
                <Input
                  placeholder="e.g. 'I'm not doing enough'"
                  size="xs"
                  fontSize="10px"
                  value={workbook.day6_thought || ""}
                  onChange={(e) => saveWorkbookField("day6_thought", e.target.value)}
                />
              </Box>
              
              <Box bg="white" p="2" borderRadius="xs" border="1px solid" borderColor="navy.200" textAlign="center">
                <Text fontSize="9px" fontWeight="bold" color="red.500" mb="1">🧘 PHYSIQUE / BODY</Text>
                <Input
                  placeholder="e.g. Shallow chest gasping"
                  size="xs"
                  fontSize="10px"
                  value={workbook.day6_body || ""}
                  onChange={(e) => saveWorkbookField("day6_body", e.target.value)}
                />
              </Box>

              <Box bg="white" p="2" borderRadius="xs" border="1px solid" borderColor="navy.200" textAlign="center">
                <Text fontSize="9px" fontWeight="bold" color="purple.500" mb="1">🛌 SLEEP ENERGY</Text>
                <Input
                  placeholder="e.g. Woke up fatigued at 3 AM"
                  size="xs"
                  fontSize="10px"
                  value={workbook.day6_sleep || ""}
                  onChange={(e) => saveWorkbookField("day6_sleep", e.target.value)}
                />
              </Box>

              <Box bg="white" p="2" borderRadius="xs" border="1px solid" borderColor="navy.200" textAlign="center">
                <Text fontSize="9px" fontWeight="bold" color="amber.605" mb="1">💡 CHOICE / DECISION</Text>
                <Input
                  placeholder="e.g. Snapped at coworker & withdrew"
                  size="xs"
                  fontSize="10px"
                  value={workbook.day6_decision || ""}
                  onChange={(e) => saveWorkbookField("day6_decision", e.target.value)}
                />
              </Box>
            </SimpleGrid>
            <Text fontSize="9px" color="navy.500" fontStyle="italic" textAlign="center">"All links are connected. One weak weld creates system collapse..."</Text>
          </VStack>
        );

      case 7:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 7 WORKBOOK SECTION: SABBATH MINDFUL DEPOSITS</Text>
            
            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Pick at least 3 restful deposits to clear your ledger today:</Text>
              
              <SimpleGrid columns={{ base: 2, sm: 3 }} gap="2">
                {["Nap 10min", "Quiet Walk", "No phone scrolling", "Hot organic tea", "Listen to ambient music", "Slow breathing stretches"].map(opt => {
                  const isChecked = workbook.day7_actions?.includes(opt);
                  return (
                    <Button
                      key={opt}
                      size="xs"
                      fontSize="9px"
                      borderRadius="xs"
                      variant={isChecked ? "solid" : "outline"}
                      colorScheme={isChecked ? "teal" : "gray"}
                      onClick={() => {
                        let list = [...(workbook.day7_actions || [])];
                        if (list.includes(opt)) {
                          list = list.filter(x => x !== opt);
                        } else {
                          list.push(opt);
                        }
                        saveWorkbookField("day7_actions", list);
                      }}
                    >
                      {isChecked ? "✓ " + opt : opt}
                    </Button>
                  );
                })}
              </SimpleGrid>

              {workbook.day7_actions?.length >= 3 && (
                <Text fontSize="10px" color="teal.600" mt="2" fontWeight="bold" textAlign="center">
                  🌸 SABBATH HEALTH BONUS MULTIPLIER SECURED: 3+ Deposits completed! Rest registered.
                </Text>
              )}
            </Box>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mt="1">
              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Which link is most overdrawn?</Text>
                <select
                  className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1.5 w-full"
                  value={workbook.day7_most_overdrawn || "Physical"}
                  onChange={(e) => saveWorkbookField("day7_most_overdrawn", e.target.value)}
                >
                  {["Physical", "Emotional", "Mental", "Spiritual", "Environmental", "Self-care"].map(lk => (
                    <option key={lk} value={lk}>{lk} Link</option>
                  ))}
                </select>
              </Box>

              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">My Primary Week 1 Win:</Text>
                <Input
                  placeholder="Describe your 1 big victory..."
                  size="xs"
                  fontSize="xs"
                  value={workbook.day7_win || ""}
                  onChange={(e) => saveWorkbookField("day7_win", e.target.value)}
                />
              </Box>
            </SimpleGrid>
          </VStack>
        );

      case 8:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 8 WORKBOOK SECTION: PHYSICAL RECOVERY & WALK</Text>
            
            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.700" mb="2">5-min Mobility Drills checklist:</Text>
              <VStack align="stretch" spaceY="1">
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={!!workbook.day8_rolls_completed}
                    onChange={(e) => saveWorkbookField("day8_rolls_completed", e.target.checked)}
                  />
                  <span>Perform: Neck rolls 10x, Shoulder rolls 10x, Hip circles 10x</span>
                </label>
              </VStack>
            </Box>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.700" mb="1.5">Walk 15 mins today (No phone scrolling) - Reflection Outcome:</Text>
              <Textarea
                placeholder="How did moving & breathing without looking at screen feel?"
                fontSize="xs"
                size="xs"
                value={workbook.day8_reflection || ""}
                onChange={(e) => saveWorkbookField("day8_reflection", e.target.value)}
              />
            </Box>
          </VStack>
        );

      case 9:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 9 WORKBOOK SECTION: NOURISH & SCREEN-FREE REFUTING</Text>
            
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Hunger Level BEFORE Meal:</Text>
                <HStack spaceX="1">
                  {[1,2,3,4,5,6,7,8,9,10].map(h => (
                    <Button
                      key={h}
                      size="xs"
                      p="0"
                      w="6"
                      fontSize="9px"
                      colorScheme={workbook.day9_hunger_before === h ? "purple" : "gray"}
                      variant={workbook.day9_hunger_before === h ? "solid" : "outline"}
                      onClick={() => saveWorkbookField("day9_hunger_before", h)}
                    >
                      {h}
                    </Button>
                  ))}
                </HStack>
              </Box>

              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Hunger Level AFTER Meal:</Text>
                <HStack spaceX="1">
                  {[1,2,3,4,5,6,7,8,9,10].map(h => (
                    <Button
                      key={h}
                      size="xs"
                      p="0"
                      w="6"
                      fontSize="9px"
                      colorScheme={workbook.day9_hunger_after === h ? "teal" : "gray"}
                      variant={workbook.day9_hunger_after === h ? "solid" : "outline"}
                      onClick={() => saveWorkbookField("day9_hunger_after", h)}
                    >
                      {h}
                    </Button>
                  ))}
                </HStack>
              </Box>
            </SimpleGrid>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Chew 20x each bite. Report on flavors & sensations:</Text>
              <Textarea
                placeholder="What did you taste that you normally rush past?"
                fontSize="xs"
                value={workbook.day9_nourish_notes || ""}
                onChange={(e) => saveWorkbookField("day9_nourish_notes", e.target.value)}
              />
            </Box>
          </VStack>
        );

      case 10:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 10 WORKBOOK SECTION: FEELINGS WHEEL DICTIONARY</Text>
            
            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.850" mb="2">Select exact feelings you felt today (Pick up to 3):</Text>
              <Flex gap="2" wrap="wrap">
                {["Anxious", "Numb", "Overwhelmed", "Hopeful", "Tired"].map(fl => {
                  const isSel = workbook.day10_feelings?.includes(fl);
                  return (
                    <Button
                      key={fl}
                      size="xs"
                      borderRadius="xs"
                      colorScheme={isSel ? "teal" : "gray"}
                      variant={isSel ? "solid" : "outline"}
                      onClick={() => {
                        let list = [...(workbook.day10_feelings || [])];
                        if (list.includes(fl)) {
                          list = list.filter(k => k !== fl);
                        } else {
                          if (list.length < 3) list.push(fl);
                        }
                        saveWorkbookField("day10_feelings", list);
                      }}
                    >
                      {fl}
                    </Button>
                  );
                })}
              </Flex>
              
              <Input
                mt="2"
                placeholder="Other specific feeling..."
                size="xs"
                fontSize="xs"
                value={workbook.day10_other_feeling || ""}
                onChange={(e) => saveWorkbookField("day10_other_feeling", e.target.value)}
              />
            </Box>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.850" mb="1.5">Express 3 of your feelings today out loud:</Text>
              <VStack align="stretch" spaceY="2">
                <Input
                  placeholder="I feel Anxious because..."
                  size="xs"
                  fontSize="xs"
                  value={workbook.day10_stmt1 || ""}
                  onChange={(e) => saveWorkbookField("day10_stmt1", e.target.value)}
                />
                <Input
                  placeholder="I feel tired because..."
                  size="xs"
                  fontSize="xs"
                  value={workbook.day10_stmt2 || ""}
                  onChange={(e) => saveWorkbookField("day10_stmt2", e.target.value)}
                />
                <Input
                  placeholder="I feel hopeful because..."
                  size="xs"
                  fontSize="xs"
                  value={workbook.day10_stmt3 || ""}
                  onChange={(e) => saveWorkbookField("day10_stmt3", e.target.value)}
                />
              </VStack>
            </Box>
          </VStack>
        );

      case 11:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 11 WORKBOOK SECTION: INTERACTIVE BREATH BUDDY COACH</Text>
            
            <Box bg="white" p="4" borderRadius="xs" border="1px solid" borderColor="navy.150" textAlign="center">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">THE BOX BREATHING METHOD: INHALATION (4s) → HOLD (4s) → EXHALATION (6s)</Text>
              
              {/* Visual Pulsing Breathing Sphere */}
              <Flex justify="center" align="center" py="6" direction="column">
                <Box
                  w={breathingStatus === "idle" ? "64px" : breathingStatus === "exhale" ? "48px" : "120px"}
                  h={breathingStatus === "idle" ? "64px" : breathingStatus === "exhale" ? "48px" : "120px"}
                  bg={breathingStatus === "inhale" ? "teal.400" : breathingStatus === "hold" ? "amber.400" : breathingStatus === "exhale" ? "indigo.400" : "navy.100"}
                  borderRadius="full"
                  transition="all 4s linear"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="navy.900"
                  fontWeight="bold"
                  fontSize="xs"
                  boxShadow="md"
                >
                  <VStack spaceY="0">
                    <Text fontSize="xs" fontWeight="black" textTransform="uppercase">
                      {breathingStatus === "idle" ? "Standby" : breathingStatus}
                    </Text>
                    {breathingSeconds > 0 && <Text fontSize="10px">{breathingSeconds}s</Text>}
                  </VStack>
                </Box>
                
                <Text fontSize="11px" color="navy.500" mt="4">
                  Rounds completed during current practice loop: <strong className="text-teal-700">{breathingCounter}</strong>
                </Text>
                
                <HStack spaceX="2" mt="3">
                  {breathingIntervalId ? (
                    <Button size="xs" colorScheme="red" onClick={stopBreathingCoach} borderRadius="xs">
                      Stop Breath Metronome
                    </Button>
                  ) : (
                    <Button size="xs" colorScheme="teal" onClick={startBreathingCoach} borderRadius="xs">
                      🚀 Start Live Breath Metronome
                    </Button>
                  )}
                </HStack>
              </Flex>
            </Box>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Do 3-min breath 3x tomorrow. Set Alarms verification:</Text>
              <SimpleGrid columns={3} gap="2">
                <label className="flex items-center text-xs justify-center p-2 border border-navy-200">
                  <input
                    type="checkbox"
                    className="mr-1.5"
                    checked={!!workbook.day11_alarm10am}
                    onChange={(e) => saveWorkbookField("day11_alarm10am", e.target.checked)}
                  />
                  <span>10:00 AM</span>
                </label>
                <label className="flex items-center text-xs justify-center p-2 border border-navy-200">
                  <input
                    type="checkbox"
                    className="mr-1.5"
                    checked={!!workbook.day11_alarm2pm}
                    onChange={(e) => saveWorkbookField("day11_alarm2pm", e.target.checked)}
                  />
                  <span>02:00 PM</span>
                </label>
                <label className="flex items-center text-xs justify-center p-2 border border-navy-200">
                  <input
                    type="checkbox"
                    className="mr-1.5"
                    checked={!!workbook.day11_alarm8pm}
                    onChange={(e) => saveWorkbookField("day11_alarm8pm", e.target.checked)}
                  />
                  <span>08:00 PM</span>
                </label>
              </SimpleGrid>
            </Box>
          </VStack>
        );

      case 12:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 12 WORKBOOK SECTION: TRUTH DESTRUCTION OF LIES</Text>
            
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
              <Box bg="red.50" p="3" borderRadius="xs" border="1px solid" borderColor="red.200">
                <Text fontSize="10px" fontWeight="bold" color="red.700" mb="1.5">🚨 THE DESTRUCTIVE LIE TO CATCH:</Text>
                <Input
                  placeholder="e.g. 'I must be reachable by work 24/7'"
                  size="xs"
                  fontSize="xs"
                  bg="white"
                  value={workbook.day12_lie || ""}
                  onChange={(e) => saveWorkbookField("day12_lie", e.target.value)}
                />
              </Box>

              <Box bg="teal.50" p="3" borderRadius="xs" border="1px solid" borderColor="teal.200">
                <Text fontSize="10px" fontWeight="bold" color="teal.700" mb="1.5">🌟 THE CORE INTEGRITY TRUTH:</Text>
                <Input
                  placeholder="e.g. 'I am allowed to rest & protect my chain'"
                  size="xs"
                  fontSize="xs"
                  bg="white"
                  value={workbook.day12_truth || ""}
                  onChange={(e) => saveWorkbookField("day12_truth", e.target.value)}
                />
              </Box>
            </SimpleGrid>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Write 3 Chain Currency Affirmations:</Text>
              
              <VStack align="stretch" spaceY="2">
                <HStack spaceX="2">
                  <Text fontSize="11px" fontWeight="semibold" color="navy.600">1.</Text>
                  <Input
                    placeholder="e.g. I deposit 15-min quiet stretching into my chain daily."
                    size="xs"
                    fontSize="xs"
                    value={workbook.day12_aff1 || ""}
                    onChange={(e) => saveWorkbookField("day12_aff1", e.target.value)}
                  />
                </HStack>
                <HStack spaceX="2">
                  <Text fontSize="11px" fontWeight="semibold" color="navy.600">2.</Text>
                  <Input
                    placeholder="e.g. My environmental space link is getting stronger."
                    size="xs"
                    fontSize="xs"
                    value={workbook.day12_aff2 || ""}
                    onChange={(e) => saveWorkbookField("day12_aff2", e.target.value)}
                  />
                </HStack>
                <HStack spaceX="2">
                  <Text fontSize="11px" fontWeight="semibold" color="navy.600">3.</Text>
                  <Input
                    placeholder="e.g. I am not overdrawn. I am rebuilding my surplus."
                    size="xs"
                    fontSize="xs"
                    value={workbook.day12_aff3 || ""}
                    onChange={(e) => saveWorkbookField("day12_aff3", e.target.value)}
                  />
                </HStack>
              </VStack>
            </Box>
          </VStack>
        );

      case 13:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 13 WORKBOOK SECTION: MENTAL SPEED FOCUS BLOCKS</Text>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="3">
              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Define single focus task:</Text>
                <Input
                  placeholder="e.g. Draft municipal grant contract outline"
                  size="xs"
                  fontSize="xs"
                  value={workbook.day13_focus_task || ""}
                  onChange={(e) => saveWorkbookField("day13_focus_task", e.target.value)}
                />
                
                <label className="flex items-center text-xs mt-3">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={!!workbook.day13_phone_away}
                    onChange={(e) => saveWorkbookField("day13_phone_away", e.target.checked)}
                  />
                  <span>Verify: Phone placed physically in another room</span>
                </label>
              </Box>

              <Box bg="navy.900" color="white" p="3.5" borderRadius="xs" textAlign="center">
                <Text fontSize="9px" fontWeight="bold" color="teal.300" letterSpacing="wider" uppercase="true">Focus Metronome</Text>
                <Text fontSize="3xl" fontWeight="black" fontFamily="mono" my="2">
                  {Math.floor(pomodoroSeconds / 60).toString().padStart(2, '0')}:{(pomodoroSeconds % 60).toString().padStart(2, '0')}
                </Text>

                <HStack spaceX="1" justify="center">
                  <Button size="xs" colorScheme="teal" onClick={togglePomodoro} maxH="5">
                    {pomodoroRunning ? "Pause block" : "Start Focus"}
                  </Button>
                  <Button size="xs" colorScheme="gray" variant="outline" onClick={resetPomodoro} maxH="5">
                    Reset
                  </Button>
                  <Button size="xs" colorScheme="amber" variant="ghost" onClick={() => setPomodoroSeconds(5)} maxH="5" fontSize="8px">
                    Fast Demo (5s)
                  </Button>
                </HStack>
              </Box>
            </SimpleGrid>
          </VStack>
        );

      case 14:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 14 WORKBOOK SECTION: CC-6 TWO-WEEK RESCORE</Text>
            
            <SimpleGrid columns={3} gap="2">
              {["Physical", "Emotional", "Mental"].map(l => (
                <Box key={l} bg="white" p="2.5" borderRadius="xs" border="1px solid" borderColor="navy.150" textAlign="center">
                  <Text fontSize="10px" fontWeight="bold" color="navy.700" mb="1">{l}:</Text>
                  <select
                    className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1 w-full"
                    value={(workbook.day14_scores && workbook.day14_scores[l]) || 5}
                    onChange={(e) => {
                      const nextC = { ...workbook.day14_scores, [l]: parseInt(e.target.value) };
                      saveWorkbookField("day14_scores", nextC);
                    }}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(s => <option key={s} value={s}>{s}/10</option>)}
                  </select>
                </Box>
              ))}
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mt="1">
              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Identify strongest link this week:</Text>
                <select
                  className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1 w-full"
                  value={workbook.day14_strongest || "Physical"}
                  onChange={(e) => saveWorkbookField("day14_strongest", e.target.value)}
                >
                  {["Physical", "Emotional", "Mental"].map(s => (
                    <option key={s} value={s}>{s} Link</option>
                  ))}
                </select>
              </Box>

              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Absolute proof of its strength:</Text>
                <Input
                  placeholder="Describe evidence..."
                  size="xs"
                  fontSize="xs"
                  value={workbook.day14_proof || ""}
                  onChange={(e) => saveWorkbookField("day14_proof", e.target.value)}
                />
              </Box>
            </SimpleGrid>
          </VStack>
        );

      case 15:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 15 WORKBOOK SECTION: THE WHY SURVIVAL DIRECTIVE</Text>
            
            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Why Did I Survive? (Answer in exactly 3 individual words):</Text>
              <Input
                placeholder="Enter 3 words (e.g., Serve / Lead / Love)"
                size="xs"
                fontSize="xs"
                value={workbook.day15_why3 || ""}
                onChange={(e) => saveWorkbookField("day15_why3", e.target.value)}
              />
            </Box>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Survivor directive statement sentence:</Text>
              <Input
                placeholder="I survived so I can serve survivors of systemic crises..."
                size="xs"
                fontSize="xs"
                value={workbook.day15_sentence || ""}
                onChange={(e) => saveWorkbookField("day15_sentence", e.target.value)}
              />
            </Box>
          </VStack>
        );

      case 16:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 16 WORKBOOK SECTION: NATURE UNPLUGGED</Text>
            
            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">5-min Mindful Desk Journal ("Universe, what do I need to hear today?"):</Text>
              <Textarea
                placeholder="Write whatever quiet download enters your thoughts..."
                fontSize="xs"
                value={workbook.day16_journal || ""}
                onChange={(e) => saveWorkbookField("day16_journal", e.target.value)}
              />
            </Box>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <label className="flex items-center text-xs">
                <input
                  type="checkbox"
                  className="mr-2.5 w-4 h-4 text-teal-600"
                  checked={!!workbook.day16_outside_completed}
                  onChange={(e) => saveWorkbookField("day16_outside_completed", e.target.checked)}
                />
                <span className="fontWeight-semibold">Verify: Spent 10 minutes outside with no cellular device. Sky + breath logged.</span>
              </label>
            </Box>
          </VStack>
        );

      case 17:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 17 WORKBOOK SECTION: ENVIRONMENTAL PEOPLE AUDIT</Text>
            <Text fontSize="10px" color="navy.600">Audit your Top 5 contacts. Mark as D (Deposit) or W (Withdrawal):</Text>
            
            <VStack align="stretch" spaceY="2" mt="1">
              {[0, 1, 2, 3, 4].map(idx => {
                const item = workbook.day17_contacts?.[idx] || { name: "", type: "Deposit" };
                return (
                  <Flex key={idx} bg="white" p="2" borderRadius="xs" border="1px solid" borderColor="navy.150" align="center" justify="space-between">
                    <Input
                      placeholder={`Contact #${idx + 1} Name`}
                      size="xs"
                      fontSize="xs"
                      maxW="200px"
                      value={item.name || ""}
                      onChange={(e) => {
                        const list = [...workbook.day17_contacts];
                        list[idx] = { ...list[idx], name: e.target.value };
                        saveWorkbookField("day17_contacts", list);
                      }}
                    />
                    
                    <HStack spaceX="1">
                      <Button
                        size="xs"
                        fontSize="9px"
                        colorScheme={item.type === "Deposit" ? "teal" : "gray"}
                        onClick={() => {
                          const list = [...workbook.day17_contacts];
                          list[idx] = { ...list[idx], type: "Deposit" };
                          saveWorkbookField("day17_contacts", list);
                        }}
                      >
                        Deposit (+)
                      </Button>
                      <Button
                        size="xs"
                        fontSize="9px"
                        colorScheme={item.type === "Withdrawal" ? "red" : "gray"}
                        onClick={() => {
                          const list = [...workbook.day17_contacts];
                          list[idx] = { ...list[idx], type: "Withdrawal" };
                          saveWorkbookField("day17_contacts", list);
                        }}
                      >
                        Withdrawal (-)
                      </Button>
                    </HStack>
                  </Flex>
                );
              })}
            </VStack>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150" mt="2">
              <Text fontSize="10px" fontWeight="bold" color="teal.800" mb="2">Thank-You Note Dispatch:</Text>
              <Text fontSize="10px" color="navy.700" bg="navy.50" p="2.5" borderLeft="3px solid" borderColor="teal.500" mb="3">
                "Thank you for being a deposit in my chain."
              </Text>
              <Button
                size="xs"
                colorScheme="teal"
                borderRadius="xs"
                w="full"
                onClick={() => {
                  navigator.clipboard.writeText("Thank you for being a deposit in my chain.");
                  saveWorkbookField("day17_copied", true);
                  setTimeout(() => saveWorkbookField("day17_copied", false), 2500);
                }}
              >
                {workbook.day17_copied ? "✓ Copied to Clipboard!" : "Copy Template to Clipboard"}
              </Button>
            </Box>
          </VStack>
        );

      case 18:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 18 WORKBOOK SECTION: PHYSICAL ENVIRONMENTAL CLEANUP</Text>
            
            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Verify: Throw/fold exactly 5 items (Desk timer 5-min completed):</Text>
              <label className="flex items-center text-xs">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={!!workbook.day18_desktimer}
                  onChange={(e) => saveWorkbookField("day18_desktimer", e.target.checked)}
                />
                <span>Set stopwatch, organized 5 clutter items securely</span>
              </label>
            </Box>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Fix 1 space: Select which specific space reorganized:</Text>
              <SimpleGrid columns={3} gap="2">
                <label className="flex items-center text-xs justify-center p-2 border border-navy-200">
                  <input
                    type="checkbox"
                    className="mr-1.5"
                    checked={!!workbook.day18_bed}
                    onChange={(e) => saveWorkbookField("day18_bed", e.target.checked)}
                  />
                  <span>Made Bed</span>
                </label>
                <label className="flex items-center text-xs justify-center p-2 border border-navy-200">
                  <input
                    type="checkbox"
                    className="mr-1.5"
                    checked={!!workbook.day18_shelf}
                    onChange={(e) => saveWorkbookField("day18_shelf", e.target.checked)}
                  />
                  <span>Cleared Shelf</span>
                </label>
                <label className="flex items-center text-xs justify-center p-2 border border-navy-200">
                  <input
                    type="checkbox"
                    className="mr-1.5"
                    checked={!!workbook.day18_table}
                    onChange={(e) => saveWorkbookField("day18_table", e.target.checked)}
                  />
                  <span>Wiped Table</span>
                </label>
              </SimpleGrid>
              
              <Input
                placeholder="Other specific room reorganized..."
                size="xs"
                fontSize="xs"
                mt="2"
                value={workbook.day18_space_fixed || ""}
                onChange={(e) => saveWorkbookField("day18_space_fixed", e.target.value)}
              />
            </Box>
          </VStack>
        );

      case 19:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 19 WORKBOOK SECTION: SCRIPTLINE BOUNDARY FORMULAS</Text>
            
            <Box bg="white" p="3.5" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Script 1 Boundary (Fill in blanks):</Text>
              
              <Flex align="center" mt="2" wrap="wrap" gap="2" fontSize="xs">
                <Text>I care about you, and I can't</Text>
                <Input
                  placeholder="e.g. answer work emails past 7 PM"
                  size="xs"
                  fontSize="xs"
                  maxW="250px"
                  bg="white"
                  value={workbook.day19_script_cant || ""}
                  onChange={(e) => saveWorkbookField("day19_script_cant", e.target.value)}
                />
                <Text>today.</Text>
              </Flex>

              <Flex align="center" mt="2" wrap="wrap" gap="2" fontSize="xs">
                <Text>I can</Text>
                <Input
                  placeholder="e.g. examine them at 9 AM tomorrow"
                  size="xs"
                  fontSize="xs"
                  maxW="250px"
                  bg="white"
                  value={workbook.day19_script_can || ""}
                  onChange={(e) => saveWorkbookField("day19_script_can", e.target.value)}
                />
                <Text>instead.</Text>
              </Flex>
            </Box>

            <Box bg="white" p="3.5" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Use it once today. Write what happened:</Text>
              <Textarea
                placeholder="How did the counterpart respond? Describe boundary outcome..."
                fontSize="xs"
                value={workbook.day19_what_happened || ""}
                onChange={(e) => saveWorkbookField("day19_what_happened", e.target.value)}
              />
            </Box>
          </VStack>
        );

      case 20:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 20 WORKBOOK SECTION: REVENUE SLEEP RESTORATION</Text>
            <Text fontSize="10px" color="navy.600">Track implementation of sleep winddown milestones:</Text>
            
            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <VStack align="stretch" spaceY="2">
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={!!workbook.day20_phone_off}
                    onChange={(e) => saveWorkbookField("day20_phone_off", e.target.checked)}
                  />
                  <span>09:00 PM: Phone completely turned off</span>
                </label>
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={!!workbook.day20_warm_drink}
                    onChange={(e) => saveWorkbookField("day20_warm_drink", e.target.checked)}
                  />
                  <span>09:15 PM: Warm caffeine-free drink (e.g. Lavender)</span>
                </label>
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={!!workbook.day20_breath}
                    onChange={(e) => saveWorkbookField("day20_breath", e.target.checked)}
                  />
                  <span>09:30 PM: 3-min Box breathing completed</span>
                </label>
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={!!workbook.day20_lights_out}
                    onChange={(e) => saveWorkbookField("day20_lights_out", e.target.checked)}
                  />
                  <span>09:45 PM: Room blacked out & lights out</span>
                </label>
                <label className="flex items-center text-xs pt-1.5 border-t border-navy-100">
                  <input
                    type="checkbox"
                    className="mr-2 text-teal-600"
                    checked={!!workbook.day20_phone_out}
                    onChange={(e) => saveWorkbookField("day20_phone_out", e.target.checked)}
                  />
                  <span className="fontWeight-bold text-teal-700">VERIFY: Phone is physically placed outside sleeping room</span>
                </label>
              </VStack>
            </Box>
          </VStack>
        );

      case 21:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 21 WORKBOOK SECTION: WEEK 3 REFLECTION ON HIDDEN LINKS</Text>
            
            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Which hidden link structural aspect surprised you most?</Text>
              <Textarea
                placeholder="e.g. Spiritual or space organization - and what you discovered during audit meetings..."
                fontSize="xs"
                value={workbook.day21_review_answer || ""}
                onChange={(e) => saveWorkbookField("day21_review_answer", e.target.value)}
              />
            </Box>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Choose 1 hidden link to rehabilitate securely during next 30 days:</Text>
              <select
                className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-2 w-full"
                value={workbook.day21_rehab_link || "Spiritual"}
                onChange={(e) => saveWorkbookField("day21_rehab_link", e.target.value)}
              >
                {["Spiritual", "Environmental", "Self-care"].map(lk => (
                  <option key={lk} value={lk}>{lk} Link</option>
                ))}
              </select>
            </Box>
          </VStack>
        );

      case 22:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 22 WORKBOOK SECTION: DEBT VS SURPLUS SCORE CARD COMPARATIVE</Text>
            <Text fontSize="10px" color="navy.600">Re-evaluate your complete scoreboard to assess actual recovery gains:</Text>
            
            <Box bg="white" p="1.5" overflowX="auto" borderRadius="xs">
              <table className="min-w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-navy-200">
                    <th className="py-1.5 fontWeight-semibold"># LINK</th>
                    <th className="py-1.5 fontWeight-semibold w-24">DAY 2 SCORE</th>
                    <th className="py-1.5 fontWeight-semibold w-24">DAY 22 SCORE</th>
                    <th className="py-1.5 fontWeight-semibold w-24">DIFFERENTIAL</th>
                  </tr>
                </thead>
                <tbody>
                  {["Physical", "Emotional", "Mental", "Spiritual", "Environmental", "Self-care"].map(link => {
                    const d2 = workbook.day2_scores?.[link] || 5;
                    const d22 = workbook.day22_scores?.[link] || 5;
                    const diff = d22 - d2;
                    return (
                      <tr key={link} className="border-b border-navy-100">
                        <td className="py-1.5 text-navy-800 fontWeight-medium">{link}</td>
                        <td className="py-1.5 text-navy-500">{d2}/10</td>
                        <td className="py-1.5">
                          <select
                            className="border border-navy-200 bg-white text-11px rounded-xs p-0.5"
                            value={d22}
                            onChange={(e) => {
                              const list = { ...workbook.day22_scores, [link]: parseInt(e.target.value) };
                              saveWorkbookField("day22_scores", list);
                            }}
                          >
                            {[1,2,3,4,5,6,7,8,9,10].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className={`py-1.5 fontWeight-bold ${diff > 0 ? "text-teal-600" : diff < 0 ? "text-red-500" : "text-navy-500"}`}>
                          {diff > 0 ? `+${diff}` : diff} pts
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Which link gained the most points?</Text>
                <select
                  className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1.5 w-full"
                  value={workbook.day22_gained_most || "Physical"}
                  onChange={(e) => saveWorkbookField("day22_gained_most", e.target.value)}
                >
                  {["Physical", "Emotional", "Mental", "Spiritual", "Environmental", "Self-care"].map(lk => (
                    <option key={lk} value={lk}>{lk} Link</option>
                  ))}
                </select>
              </Box>

              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">By how many exact points?</Text>
                <Input
                  type="number"
                  size="xs"
                  fontSize="xs"
                  value={workbook.day22_points_gain || 0}
                  onChange={(e) => saveWorkbookField("day22_points_gain", parseInt(e.target.value) || 0)}
                />
              </Box>
            </SimpleGrid>
          </VStack>
        );

      case 23:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 23 WORKBOOK SECTION: THE 90-DAY BUDGET TEMPLATE</Text>
            <Text fontSize="10px" color="navy.600">Establish structural Deposits and Withdrawal Cuts across the links:</Text>
            
            <Box bg="white" p="1.5" overflowX="auto" borderRadius="xs">
              <table className="min-w-full text-xs text-left" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr className="border-b border-navy-200">
                    <th className="py-2 fontWeight-semibold text-navy-800"># LINK</th>
                    <th className="py-2 fontWeight-semibold text-navy-800">DAILY DEPOSITS I'LL MAKE</th>
                    <th className="py-2 fontWeight-semibold text-navy-800">DAILY WITHDRAWALS I'LL CUT</th>
                  </tr>
                </thead>
                <tbody>
                  {["Physical", "Emotional", "Mental", "Spiritual", "Environmental", "Self-Care"].map((link) => {
                    const row = workbook.day23_budget?.[link] || { deposit: "", withdrawal: "" };
                    return (
                      <tr key={link} className="border-b border-navy-100">
                        <td className="py-2 text-navy-800 fontWeight-bold">{link}</td>
                        <td className="py-2 pr-1">
                          <Input
                            size="xs"
                            fontSize="10px"
                            bg="white"
                            value={row.deposit || ""}
                            onChange={(e) => {
                              const nextB = { ...workbook.day23_budget };
                              nextB[link] = { ...row, deposit: e.target.value };
                              saveWorkbookField("day23_budget", nextB);
                            }}
                          />
                        </td>
                        <td className="py-2">
                          <Input
                            size="xs"
                            fontSize="10px"
                            bg="white"
                            value={row.withdrawal || ""}
                            onChange={(e) => {
                              const nextB = { ...workbook.day23_budget };
                              nextB[link] = { ...row, withdrawal: e.target.value };
                              saveWorkbookField("day23_budget", nextB);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>
          </VStack>
        );

      case 24:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 24 WORKBOOK SECTION: HABITS TRANSIT ROUTINE</Text>
            
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Pick 1 Weakest Link to Rehabilitate:</Text>
                <select
                  className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1.5 w-full"
                  value={workbook.day24_weak_link || "Physical"}
                  onChange={(e) => saveWorkbookField("day24_weak_link", e.target.value)}
                >
                  {["Physical", "Emotional", "Mental", "Spiritual", "Environmental", "Self-Care"].map(lk => (
                    <option key={lk} value={lk}>{lk} Link</option>
                  ))}
                </select>
              </Box>

              <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Define 1 new core habit for rehabilitation:</Text>
                <Input
                  placeholder="e.g. Daily 25-minute quiet morning stretching block"
                  size="xs"
                  fontSize="xs"
                  value={workbook.day24_new_habit || ""}
                  onChange={(e) => saveWorkbookField("day24_new_habit", e.target.value)}
                />
              </Box>
            </SimpleGrid>
            <Text fontSize="9px" color="navy.500" fontStyle="italic" textAlign="center">"Focusing completely on reinforcing 1 key weld achieves maximum system strength."</Text>
          </VStack>
        );

      case 25:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 25 WORKBOOK SECTION: DAILY CHAIN CURRENCY ACCREDITED LEDGER</Text>
            <Text fontSize="10px" color="navy.600">Track and calculate daily balances across Days 25, 26, & 27:</Text>
            
            <Box bg="white" p="2.5" overflowX="auto" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <table className="min-w-full text-xs text-left" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr className="border-b border-navy-200">
                    <th className="py-2 fontWeight-semibold">RECORD DAY</th>
                    <th className="py-2 fontWeight-semibold w-28">DEPOSITS QTY</th>
                    <th className="py-2 fontWeight-semibold w-28">WITHDRAWALS QTY</th>
                    <th className="py-2 fontWeight-semibold">BALANCED VALUE STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {["day25", "day26", "day27"].map(day => {
                    const rec = workbook.day25_entries?.[day] || { deposits: 0, withdrawals: 0, net: "Surplus" };
                    const diff = (rec.deposits || 0) - (rec.withdrawals || 0);
                    return (
                      <tr key={day} className="border-b border-navy-100">
                        <td className="py-2 text-navy-800 fontWeight-bold uppercase font-mono">{day}</td>
                        <td className="py-2 pr-1">
                          <Input
                            type="number"
                            size="xs"
                            fontSize="xs"
                            bg="white"
                            maxW="80px"
                            value={rec.deposits}
                            onChange={(e) => {
                              const nextE = { ...workbook.day25_entries };
                              const deps = parseInt(e.target.value) || 0;
                              nextE[day] = { ...rec, deposits: deps, net: deps >= rec.withdrawals ? "Surplus" : "Debt" };
                              saveWorkbookField("day25_entries", nextE);
                            }}
                          />
                        </td>
                        <td className="py-2">
                          <Input
                            type="number"
                            size="xs"
                            fontSize="xs"
                            bg="white"
                            maxW="80px"
                            value={rec.withdrawals || 0}
                            onChange={(e) => {
                              const nextE = { ...workbook.day25_entries };
                              const withs = parseInt(e.target.value) || 0;
                              nextE[day] = { ...rec, withdrawals: withs, net: rec.deposits >= withs ? "Surplus" : "Debt" };
                              saveWorkbookField("day25_entries", nextE);
                            }}
                          />
                        </td>
                        <td className="py-2 fontWeight-bold">
                          <Badge colorScheme={diff >= 0 ? "teal" : "red"} fontSize="10px">
                            {diff >= 0 ? `Surplus (+${diff})` : `Debt (${diff})`}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>
          </VStack>
        );

      case 26:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 26 WORKBOOK SECTION: THE 24-HOUR CHRONO TIME AUDIT</Text>
            <Text fontSize="10px" color="navy.600">Map yesterday's key block items. Label as D (Deposit) or W (Withdrawal):</Text>
            
            <SimpleGrid columns={{ base: 2, sm: 5 }} gap="2" mt="1">
              {["08:00", "12:00", "15:00", "18:00", "21:00"].map(tm => {
                const status = workbook.day26_blocks?.[tm] || "D";
                return (
                  <Box key={tm} bg="white" p="2" borderRadius="xs" border="1px solid" borderColor="navy.150" textAlign="center">
                    <Text fontSize="10px" fontWeight="bold" color="navy.500" mb="1.5" fontFamily="mono">{tm}</Text>
                    <HStack spaceX="1" justify="center">
                      <Button
                        size="xs"
                        fontSize="8px"
                        p="0"
                        w="5"
                        h="5"
                        colorScheme={status === "D" ? "teal" : "gray"}
                        onClick={() => {
                          const nextB = { ...workbook.day26_blocks, [tm]: "D" };
                          saveWorkbookField("day26_blocks", nextB);
                        }}
                      >
                        D
                      </Button>
                      <Button
                        size="xs"
                        fontSize="8px"
                        p="0"
                        w="5"
                        h="5"
                        colorScheme={status === "W" ? "red" : "gray"}
                        onClick={() => {
                          const nextB = { ...workbook.day26_blocks, [tm]: "W" };
                          saveWorkbookField("day26_blocks", nextB);
                        }}
                      >
                        W
                      </Button>
                    </HStack>
                  </Box>
                );
              })}
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mt="2">
              <Box bg="white" p="2.5" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1">Cut 1 Withdrawal Tomorrow:</Text>
                <Input
                  placeholder="e.g. Cut 30-min evening screen check"
                  size="xs"
                  fontSize="xs"
                  value={workbook.day26_cut || ""}
                  onChange={(e) => saveWorkbookField("day26_cut", e.target.value)}
                />
              </Box>

              <Box bg="white" p="2.5" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1">Add 1 Deposit Tomorrow:</Text>
                <Input
                  placeholder="e.g. Add 10-min box breathing stretch"
                  size="xs"
                  fontSize="xs"
                  value={workbook.day26_add || ""}
                  onChange={(e) => saveWorkbookField("day26_add", e.target.value)}
                />
              </Box>
            </SimpleGrid>
          </VStack>
        );

      case 27:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 27 WORKBOOK SECTION: BREAKOUT TRAINING PEER COACHING</Text>
            
            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Coach partner full name & status audit checklist:</Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2">
                <Input
                  placeholder="Partner full name..."
                  size="xs"
                  fontSize="xs"
                  value={workbook.day27_friend_coached || ""}
                  onChange={(e) => saveWorkbookField("day27_friend_coached", e.target.value)}
                />
                
                <Box bg="teal.50" p="1" borderRadius="xs" textAlign="center" border="1px solid" borderColor="teal.200">
                  <Text fontSize="10px" color="teal.800" fontWeight="bold">Peer Breakout: 10 mins each completed</Text>
                </Box>
              </SimpleGrid>
            </Box>

            <Box bg="white" p="3" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="2">Partner's CC-6 Ratings scorecard:</Text>
              <SimpleGrid columns={3} gap="2">
                {["Physical", "Emotional", "Mental"].map(link => (
                  <Box key={link} textAlign="center border border-navy-100 p-2 text-xs">
                    <Text fontSize="9px" fontWeight="bold" color="navy.600" mb="1">{link}</Text>
                    <select
                      className="border border-navy-200 bg-white text-xs w-full outline-navy-300 rounded-xs"
                      value={(workbook.day27_partner_scores && workbook.day27_partner_scores[link]) || 5}
                      onChange={(e) => {
                        const list = { ...workbook.day27_partner_scores, [link]: parseInt(e.target.value) };
                        saveWorkbookField("day27_partner_scores", list);
                      }}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(s => <option key={s} value={s}>{s}/10</option>)}
                    </select>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        );

      case 28:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 28 WORKBOOK SECTION: YOUR ACCOMPLISHED CHAIN NARRATIVE</Text>
            
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
              <Box bg="white" p="3.5" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="red.700" mb="1.5">30 Sequential Days Ago (My Before State):</Text>
                <Textarea
                  placeholder="Describe your burnout, overdraws, fatigue levels..."
                  fontSize="xs"
                  value={workbook.day28_story_before || ""}
                  onChange={(e) => saveWorkbookField("day28_story_before", e.target.value)}
                />
              </Box>

              <Box bg="white" p="3.5" borderRadius="xs" border="1px solid" borderColor="navy.150">
                <Text fontSize="10px" fontWeight="bold" color="teal.750" mb="1.5">Today (My Rebuilded Core Surplus):</Text>
                <Textarea
                  placeholder="Describe your regular deposits, new habits, boundaries..."
                  fontSize="xs"
                  value={workbook.day28_story_after || ""}
                  onChange={(e) => saveWorkbookField("day28_story_after", e.target.value)}
                />
              </Box>
            </SimpleGrid>
          </VStack>
        );

      case 29:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 29 WORKBOOK SECTION: THE 90-DAY PREP GRADUATION PLEDGE</Text>
            
            <Box bg="white" p="3.5" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="teal.800" mb="1">The 90-Day Chain Commitment Contract Statement:</Text>
              <Text fontSize="10px" color="navy.600" mb="3">"I, commit to exactly 1 daily structural deposit in my strongest chosen link for 90 days."</Text>
              
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2.5">
                <Input
                  placeholder="Enter full name"
                  size="xs"
                  fontSize="xs"
                  value={workbook.day29_pledge_name || ""}
                  onChange={(e) => saveWorkbookField("day29_pledge_name", e.target.value)}
                />
                
                <select
                  className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1.5 h-7"
                  value={workbook.day29_pledge_link || "Physical"}
                  onChange={(e) => saveWorkbookField("day29_pledge_link", e.target.value)}
                >
                  {["Physical", "Emotional", "Mental", "Spiritual", "Environmental", "Self-Care"].map(lk => (
                    <option key={lk} value={lk}>{lk} Link</option>
                  ))}
                </select>
              </SimpleGrid>

              <Button
                size="xs"
                mt="3"
                w="full"
                colorScheme={workbook.day29_pledge_signed ? "teal" : "gray"}
                borderRadius="xs"
                onClick={() => saveWorkbookField("day29_pledge_signed", !workbook.day29_pledge_signed)}
              >
                {workbook.day29_pledge_signed ? "✓ Pledge Registered!" : "Execute 90-Day Oath Signature"}
              </Button>
            </Box>

            <Box bg="white" p="3.5" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Film 30-sec testimony script draft:</Text>
              <Textarea
                placeholder="I graduated Chain Currency because..."
                fontSize="xs"
                value={workbook.day29_testimony || ""}
                onChange={(e) => saveWorkbookField("day29_testimony", e.target.value)}
              />
            </Box>
          </VStack>
        );

      case 30:
        return (
          <VStack align="stretch" spaceY="3" bg="teal.50/50" p="4" borderRadius="xs" border="1px dashed" borderColor="teal.300">
            <Text fontSize="xs" fontWeight="bold" color="teal.800">📋 DAY 30 WORKBOOK SECTION: COMMISSIONING LEADER CEREMONIAL</Text>
            
            <Box bg="navy.900" color="white" p="4" borderRadius="xs" textAlign="center" border="1px solid" borderColor="teal.400">
              <Text fontSize="10px" fontWeight="bold" color="teal.200" mb="1" uppercase="true" letterSpacing="widest">THE ACTIVE LEADER CEREMONIAL OATH</Text>
              <Text fontSize="11px" fontStyle="italic" my="2">
                "I am a Chain Currency leader. I audit my accounts daily. I deposit. I protect my margins. I lead self & coach peer survivors."
              </Text>
              
              <label className="flex items-center text-xs justify-center font-mono">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={!!workbook.day30_oath_signed}
                  onChange={(e) => saveWorkbookField("day30_oath_signed", e.target.checked)}
                />
                <span className="fontWeight-bold text-teal-400">Stand & Acknowledge leader Oath</span>
              </label>
            </Box>

            <Box bg="white" p="4" borderRadius="xs" border="1px solid" borderColor="navy.150">
              <Text fontSize="10px" fontWeight="bold" color="navy.800" mb="1.5">Enter Name & Month for Accredited Certificate of Graduation:</Text>
              <SimpleGrid columns={{ base: 1, sm: 3 }} gap="2.5">
                <Input
                  placeholder="Accredited Full Name"
                  size="xs"
                  fontSize="xs"
                  value={workbook.day30_grad_name || ""}
                  onChange={(e) => saveWorkbookField("day30_grad_name", e.target.value)}
                />
                <select
                  className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1 h-7"
                  value={workbook.day30_grad_month || "June"}
                  onChange={(e) => saveWorkbookField("day30_grad_month", e.target.value)}
                >
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(mo => (
                    <option key={mo} value={mo}>{mo}</option>
                  ))}
                </select>
                <select
                  className="border border-navy-200 bg-white text-xs rounded-xs outline-none p-1 h-7"
                  value={workbook.day30_grad_year || "2026"}
                  onChange={(e) => saveWorkbookField("day30_grad_year", e.target.value)}
                >
                  {["2026", "2027", "2028"].map(yr => <option key={yr} value={yr}>{yr}</option>)}
                </select>
              </SimpleGrid>

              <Button
                colorScheme="teal"
                size="xs"
                w="full"
                borderRadius="xs"
                mt="4"
                fontWeight="extrabold"
                leftIcon={<Award size={12} />}
                isDisabled={!workbook.day30_oath_signed || !workbook.day30_grad_name}
                onClick={() => triggerCertificatePrint("GLOBAL 30-DAY VIRTUAL CHAIN CURRENCY LEADER")}
              >
                🎓 CLAIM MY ACCREDITED GRADUATION DIPLOMA
              </Button>
            </Box>
          </VStack>
        );

      default:
        return null;
    }
  };

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

  const [certDownloadName, setCertDownloadName] = useState<string | null>(null);
  
  const triggerCertificatePrint = (title: string) => {
    setCertDownloadName(title);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const toggleDayExpanded = (day: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleSaveDayAnswer = (day: number) => {
    const updated = {
      ...savedDayCheckpoints,
      [day]: true
    };
    setSavedDayCheckpoints(updated);
    try {
      localStorage.setItem("academy_checkpoints", JSON.stringify(updated));
      localStorage.setItem("academy_student_answers", JSON.stringify(studentAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box bg="white" minH="100vh">
      {/* Visual Header Banner */}
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

      {/* Main Container Area */}
      <Box maxW="90%" mx="auto" px={{ base: "4", md: "0" }} py="8">
        {/* Navigation Tabs */}
        <Flex borderBottom="1px solid" borderColor="navy.200" mb="8" spaceX="4" wrap="wrap">
          <Button
            variant="ghost"
            fontSize="sm"
            fontWeight="bold"
            pb="3"
            borderRadius="0"
            color={academyTab === "training" ? "teal.700" : "navy.500"}
            borderBottom="2px solid"
            borderColor={academyTab === "training" ? "teal.600" : "transparent"}
            onClick={() => { setAcademyTab("training"); setActiveCourseId(null); }}
          >
            ★ Global 30-Day Training (Renewal Ch.2)
          </Button>
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

        {/* 0. PREMIER TRAINING TAB VIEW (GLOBAL 30-DAY VIRTUAL CHAIN CURRENCY TRAINING) */}
        {academyTab === "training" && (
          <Box>
            {/* Header / Announcement */}
            <Box bg="navy.900" color="white" p={{ base: "6", md: "10" }} borderRadius="xs" mb="10" textAlign="left" position="relative" overflow="hidden">
              <Box position="absolute" top="0" right="0" bottom="0" w="30%" opacity="0.1" pointerEvents="none" filter="blur(1px)">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
                  <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                </svg>
              </Box>

              <VStack align="flex-start" spaceY="3" maxW="800px">
                <Badge bg="teal.400" color="navy.900" px="3" py="1" borderRadius="xs" letterSpacing="wider" fontSize="10px" fontWeight="black">
                  PREMIER SYLLABUS DIRECTLY FROM NOVEL CHAPTER 2
                </Badge>
                
                <Heading fontSize={{ base: "xl", md: "3xl" }} fontFamily="heading" fontWeight="bold" lineHeight="tall" color="teal.300">
                  GLOBAL 30-DAY VIRTUAL “CHAIN CURRENCY” TRAINING
                </Heading>
                
                <Text fontSize={{ base: "xs", md: "sm" }} opacity="0.9" borderLeft="3px solid" borderColor="teal.400" pl="4" py="1" fontStyle="italic">
                  Built directly from the novel <strong className="text-white">“RENEWAL: A STORY OF SURVIAL AND SELF-DISCOVERY” BY CHRIS MOSES CHAPTER 2</strong>.
                </Text>
              </VStack>
            </Box>

            {/* OVERVIEW SECTION */}
            <SimpleGrid columns={{ base: 1, lg: 12 }} gap="8" mb="12">
              <Box gridColumn={{ base: "1", lg: "span 8" }} textAlign="left">
                <HStack spaceX="2" mb="4">
                  <BookMarked size={20} className="text-teal-600" />
                  <Heading fontSize="xl" fontWeight="bold" color="navy.800" letterSpacing="tight">
                    Program Overview
                  </Heading>
                </HStack>
                <Text fontSize="sm" color="navy.700" lineHeight="relaxed" mb="6">
                  Here’s the global 30-Day Virtual “Chain Currency” Training built directly from <strong className="text-navy-900">Renewal Chapter 2</strong>. This is a personal transformation + peer-coach program designed to systematically audit your physical mental assets and build durable resilience. 
                  <br /><br />
                  <span className="text-navy-500 font-semibold italic">Please Note: This is an intensive curriculum of personal empowerment, habit auditing and community peer support. It does not constitute medical therapy. Ideal for the public, corporate wellness tracks, or church community groups.</span>
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" mt="4">
                  <Box p="4" bg="teal.50" borderRadius="xs" borderLeft="4px solid" borderColor="teal.500">
                    <Text fontSize="xs" fontWeight="bold" color="teal.900" mb="1">Personal Transformation</Text>
                    <Text fontSize="11px" color="teal.800">Complete 10-minute daily teachings and 20-minute practice logs designed to restore mental energy.</Text>
                  </Box>
                  <Box p="4" bg="navy.50" borderRadius="xs" borderLeft="4px solid" borderColor="navy.600">
                    <Text fontSize="xs" fontWeight="bold" color="navy.900" mb="1">Peer-Coach Ecosystem</Text>
                    <Text fontSize="11px" color="navy.700">Audit your Chain Currency (CC-6) indicators and build immediate trust connections with graduation pods.</Text>
                  </Box>
                </SimpleGrid>
              </Box>

              {/* Training Quick Stats / Fact Sheet */}
              <Box gridColumn={{ base: "1", lg: "span 4" }}>
                <VStack align="stretch" spaceY="4" bg="navy.50" p="5" borderRadius="xs" border="1px solid" borderColor="navy.150" h="full" justify="space-between">
                  <Box textAlign="left">
                    <Text fontSize="xs" fontWeight="bold" color="navy.800" mb="4" uppercase="true" letterSpacing="wider">Training Factsheet</Text>
                    <VStack align="stretch" spaceY="3">
                      <HStack justify="space-between" fontSize="xs">
                        <Text color="navy.500">Format:</Text>
                        <Text fontWeight="semibold" color="navy.800">100% Virtual Zoom/Syllabus</Text>
                      </HStack>
                      <Box w="full" h="1px" bg="navy.200" />
                      <HStack justify="space-between" fontSize="xs">
                        <Text color="navy.500">Duration:</Text>
                        <Text fontWeight="semibold" color="navy.800">30 Sequential Days</Text>
                      </HStack>
                      <Box w="full" h="1px" bg="navy.200" />
                      <HStack justify="space-between" fontSize="xs">
                        <Text color="navy.500">Core Engine:</Text>
                        <Text fontWeight="semibold" color="navy.800">CC-6 Matrix Audits</Text>
                      </HStack>
                      <Box w="full" h="1px" bg="navy.200" />
                      <HStack justify="space-between" fontSize="xs">
                        <Text color="navy.500">Faculty Lead:</Text>
                        <Text fontWeight="semibold" color="navy.800">Chris S. Moses</Text>
                      </HStack>
                    </VStack>
                  </Box>

                  <Badge bg="teal.600" color="white" p="2" fontSize="10px" textAlign="center" borderRadius="xs">
                    Cohorts Open Monthly
                  </Badge>
                </VStack>
              </Box>
            </SimpleGrid>

            {/* EXPANDED FEES FOR TRAINING */}
            <Box mb="14" textAlign="left">
              <HStack spaceX="2" mb="6">
                <Coins size={20} className="text-teal-600" />
                <Heading fontSize="xl" fontWeight="bold" color="navy.800" letterSpacing="tight">
                  Fees for Training
                </Heading>
              </HStack>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" mb="8">
                {/* Tier 1 */}
                <Box bg="white" p="6" borderRadius="xs" border="1px solid" borderColor="navy.200" display="flex" flexDirection="column" justifyContent="space-between" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
                  <Box>
                    <Badge bg="navy.100" color="navy.800" mb="2" fontSize="9px">TIER 1</Badge>
                    <Heading fontSize="md" color="navy.800" mb="2">Self-Paced</Heading>
                    <HStack align="baseline" mb="4">
                      <Text fontSize="2xl" fontWeight="black" color="navy.800">$49</Text>
                      <Text fontSize="10px" color="navy.500">/ flat fee</Text>
                    </HStack>
                    <Box w="full" h="1px" bg="navy.150" mb="4" />
                    <VStack align="flex-start" spaceY="2" fontSize="xs" color="navy.600">
                      <Text>✓ Professional Recordings</Text>
                      <Text>✓ Program Training Manual</Text>
                      <Text>✓ CC-6 Diagnostics Tool</Text>
                      <Text color="red.500">✗ No Live Synchronized Meetings</Text>
                      <Text color="red.500">✗ No Group Cohort Access</Text>
                    </VStack>
                  </Box>
                  <Button size="xs" mt="6" colorScheme="navy" variant="outline" borderRadius="xs" w="full">
                    Purchase Tier 1
                  </Button>
                </Box>

                {/* Tier 2 */}
                <Box bg="white" p="6" borderRadius="xs" border="1px solid" borderColor="navy.200" display="flex" flexDirection="column" justifyContent="space-between" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
                  <Box>
                    <Badge bg="teal.50" color="teal.700" mb="2" fontSize="9px">TIER 2</Badge>
                    <Heading fontSize="md" color="navy.800" mb="2">Standard</Heading>
                    <HStack align="baseline" mb="4">
                      <Text fontSize="2xl" fontWeight="black" color="navy.800">$149</Text>
                      <Text fontSize="10px" color="navy.500">/ flat fee</Text>
                    </HStack>
                    <Box w="full" h="1px" bg="navy.150" mb="4" />
                    <VStack align="flex-start" spaceY="2" fontSize="xs" color="navy.600">
                      <Text>✓ 30 Daily Live Zooms</Text>
                      <Text>✓ Dedicated Group & Pods</Text>
                      <Text>✓ Printed Manual PDF</Text>
                      <Text>✓ CC Budget Template</Text>
                      <Text>✓ Graduation Certificate PDF</Text>
                    </VStack>
                  </Box>
                  <Button size="xs" mt="6" bg="navy.800" color="white" _hover={{ bg: "navy.700" }} borderRadius="xs" w="full">
                    Register Standard
                  </Button>
                </Box>

                {/* Tier 3 */}
                <Box bg="white" p="6" borderRadius="xs" border="2px solid" borderColor="teal.600" position="relative" display="flex" flexDirection="column" justifyContent="space-between" transform="scale(1.02)" boxShadow="md">
                  <Badge bg="teal.600" color="white" position="absolute" top="-3" right="4" fontSize="9px" px="2" py="0.5" borderRadius="xs">
                    RECOMMENDED VALUE
                  </Badge>
                  <Box>
                    <Badge bg="teal.50" color="teal.750" mb="2" fontSize="9px">TIER 3</Badge>
                    <Heading fontSize="md" color="navy.800" mb="2">Coach Track</Heading>
                    <HStack align="baseline" mb="4">
                      <Text fontSize="2xl" fontWeight="black" color="teal.700">$299</Text>
                      <Text fontSize="10px" color="navy.500">/ flat fee</Text>
                    </HStack>
                    <Box w="full" h="1px" bg="navy.150" mb="4" />
                    <VStack align="flex-start" spaceY="2" fontSize="xs" color="navy.600">
                      <Text fontWeight="bold" color="teal.700">✓ All Standard Included</Text>
                      <Text>✓ 4 Extra Advanced Coach Labs</Text>
                      <Text>✓ CC-6 Licensure (Use with 10 people)</Text>
                      <Text>✓ Personal Listing on Faculty Website</Text>
                    </VStack>
                  </Box>
                  <Button size="xs" mt="6" bg="teal.600" color="white" _hover={{ bg: "teal.700" }} borderRadius="xs" w="full">
                    Enroll Coach Track
                  </Button>
                </Box>

                {/* Tier 4 */}
                <Box bg="white" p="6" borderRadius="xs" border="1px solid" borderColor="navy.200" display="flex" flexDirection="column" justifyContent="space-between" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
                  <Box>
                    <Badge bg="amber.100" color="amber.800" mb="2" fontSize="9px">TIER 4</Badge>
                    <Heading fontSize="md" color="navy.800" mb="2">Corporate Bulk</Heading>
                    <HStack align="baseline" mb="4">
                      <Text fontSize="2xl" fontWeight="black" color="navy.800">$99</Text>
                      <Text fontSize="10px" color="navy.500">/ person</Text>
                    </HStack>
                    <Box w="full" h="1px" bg="navy.150" mb="4" />
                    <VStack align="flex-start" spaceY="2" fontSize="xs" color="navy.600">
                      <Text>✓ 20 + Seats Minimum</Text>
                      <Text>✓ Customized HR Growth Reports</Text>
                      <Text>✓ Live VIP Q&A Session with Chris on Day 15</Text>
                      <Text>✓ Custom Intake Integration</Text>
                    </VStack>
                  </Box>
                  <Button size="xs" mt="6" variant="outline" colorScheme="amber" borderRadius="xs" w="full">
                    Request Corporate Setup
                  </Button>
                </Box>
              </SimpleGrid>

              {/* Extra terms, scholarships & refunds */}
              <Box bg="navy.50" p="4" borderRadius="xs" border="1px solid" borderColor="navy.150" mb="12">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: "4", md: "8" }} fontSize="xs">
                  <HStack spaceX="3" align="flex-start">
                    <Heart size={16} className="text-red-500 shrink-0" mt="0.5" />
                    <Box>
                      <Text fontWeight="bold" color="navy.800">Scholarships & Caregiver Assistance</Text>
                      <Text color="navy.600">10% of cohort seats are offered completely free for cancer survivors + primary caregivers. Apply with your personal story.</Text>
                    </Box>
                  </HStack>
                  
                  <HStack spaceX="3" align="flex-start">
                    <ShieldCheck size={16} className="text-teal-600 shrink-0" mt="0.5" />
                    <Box>
                      <Text fontWeight="bold" color="navy.800">Covenant Integrity Refund Policy</Text>
                      <Text color="navy.600">100% refund available prior to Day 3. No refunds granted after Day 3—commitment is an essential part of the training cycle.</Text>
                    </Box>
                  </HStack>
                </SimpleGrid>
              </Box>
            </Box>

            {/* 30-DAY CURRICULUM INTERACTIVE COMPONENT */}
            <Box mb="12" textAlign="left">
              <HStack spaceX="2" mb="4" justify="space-between" wrap="wrap" gap="4">
                <HStack spaceX="2">
                  <Clock size={20} className="text-teal-600" />
                  <Heading fontSize="xl" fontWeight="bold" color="navy.800" letterSpacing="tight">
                    30-Day Training Curriculum
                  </Heading>
                </HStack>
                
                <Badge bg="teal.50" color="teal.800" fontSize="10px" p="2" borderRadius="xs">
                  Daily Habit: 10m Teach → 10m Story → 20m Practice → 5m Assignment
                </Badge>
              </HStack>

              <Text fontSize="xs" color="navy.500" mb="6">
                Click any of the week milestones below to display the diagnostic journals, daily "Say" prompts, practices, and worksheets.
              </Text>

              {/* Week Tab Selectors */}
              <Flex gap="3" mb="8" wrap="wrap">
                {ccCurriculum.map((week) => (
                  <Button
                    key={week.week}
                    onClick={() => setActiveWeekCursor(week.week)}
                    bg={activeWeekCursor === week.week ? "navy.800" : "navy.50"}
                    color={activeWeekCursor === week.week ? "white" : "navy.800"}
                    _hover={{ bg: "navy.700", color: "white" }}
                    borderRadius="xs"
                    fontSize="xs"
                    fontWeight="bold"
                    px="5"
                    py="4"
                    flex={{ base: "1 1 40%", sm: "none" }}
                  >
                    Week {week.week}: {week.title}
                  </Button>
                ))}
              </Flex>

              {/* Focused Week Days list */}
              {ccCurriculum.filter(w => w.week === activeWeekCursor).map((week) => (
                <Box key={week.week}>
                  <Heading fontSize="md" color="teal.700" mb="6" borderBottom="2px solid" borderColor="teal.100" pb="2">
                    WEEK {week.week} MODULES: {week.title}
                  </Heading>

                  <VStack align="stretch" spaceY="4">
                    {week.days.map((day) => {
                      const isExpanded = !!expandedDays[day.day];
                      const isSaved = !!savedDayCheckpoints[day.day];
                      const studentText = studentAnswers[day.day] || "";

                      return (
                        <Box
                          key={day.day}
                          bg="white"
                          borderRadius="xs"
                          border="1px solid"
                          borderColor={isExpanded ? "teal.300" : "navy.150"}
                          boxShadow={isExpanded ? "sm" : "none"}
                          overflow="hidden"
                          transition="border-color 0.2s"
                        >
                          {/* Day Header Trigger */}
                          <Flex
                            p="4"
                            align="center"
                            justify="space-between"
                            cursor="pointer"
                            onClick={() => toggleDayExpanded(day.day)}
                            bg={isExpanded ? "teal.50" : "white"}
                            _hover={{ bg: "teal.50" }}
                          >
                            <HStack spaceX="3" align="center">
                              <Box
                                bg={isSaved ? "teal.600" : "navy.800"}
                                color="white"
                                fontSize="xs"
                                fontWeight="bold"
                                px="2.5"
                                py="1"
                                borderRadius="xs"
                                h="7"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                {isSaved ? "✓ Day " + day.day : "Day " + day.day}
                              </Box>
                              <Heading fontSize="sm" color="navy.800" fontWeight="bold">
                                {day.title}
                              </Heading>
                            </HStack>
                            
                            <HStack spaceX="2">
                              {isSaved ? (
                                <Badge bg="teal.600" color="white" fontSize="9px" borderRadius="xs">CC Saved</Badge>
                              ) : (
                                <Badge bg="navy.100" color="navy.755" fontSize="9px" borderRadius="xs">Pending</Badge>
                              )}
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </HStack>
                          </Flex>

                          {/* Expansion Content Body */}
                          {isExpanded && (
                            <Box p="6" borderTop="1px solid" borderColor="navy.100" bg="white">
                              <VStack align="stretch" spaceY="5">
                                {/* The Say Script */}
                                <Box bg="amber.50" p="4" borderRadius="xs" borderLeft="4px solid" borderColor="amber.400">
                                  <Text fontSize="10px" fontWeight="bold" color="amber-800" uppercase="true" letterSpacing="wider" mb="2">
                                    THE DAILY MINDFUL READING ("SAY" SCRIPT)
                                  </Text>
                                  <Text fontSize="xs" color="amber-900" fontStyle="italic" lineHeight="relaxed">
                                    {day.say}
                                  </Text>
                                </Box>

                                {/* The Practice */}
                                <Box>
                                  <Text fontSize="10px" fontWeight="bold" color="teal.750" uppercase="true" letterSpacing="wider" mb="1">
                                    THE CLINICAL PRACTICE EXERCISE
                                  </Text>
                                  <Text fontSize="xs" color="navy.700">
                                    {day.practice}
                                  </Text>
                                </Box>

                                {/* The Custom Interactive Workbook Section */}
                                {renderInteractiveWorkbookWidgets(day.day)}

                                {/* The Assignment Workbox */}
                                <Box pt="2">
                                  <Text fontSize="10px" fontWeight="bold" color="indigo.800" uppercase="true" letterSpacing="wider" mb="1">
                                    THE SUBMITTABLE STUDY ASSIGNMENT
                                  </Text>
                                  <Text fontSize="xs" color="navy.700" mb="3">
                                    <strong>Prompt:</strong> {day.assignment}
                                  </Text>

                                  <VStack align="flex-end" spaceY="3" w="full">
                                    <Textarea
                                      placeholder="Record your daily practice outcomes or self-discovery audit results..."
                                      size="xs"
                                      fontSize="xs"
                                      borderRadius="xs"
                                      value={studentText}
                                      onChange={(e) => setStudentAnswers({ ...studentAnswers, [day.day]: e.target.value })}
                                      minH="80px"
                                      bg="white"
                                      borderColor="navy.200"
                                      _focus={{ borderColor: "teal.400" }}
                                    />
                                    <HStack justify="space-between" w="full">
                                      {isSaved && (
                                        <Text fontSize="10px" color="teal.600" fontWeight="bold">
                                          ✓ Homework checkpoint successfully logged!
                                        </Text>
                                      )}
                                      <Button
                                        size="xs"
                                        bg="teal.600"
                                        color="white"
                                        borderRadius="xs"
                                        onClick={() => handleSaveDayAnswer(day.day)}
                                        _hover={{ bg: "teal.700" }}
                                        ml="auto"
                                      >
                                        Log Practice Completed
                                      </Button>
                                    </HStack>
                                  </VStack>
                                </Box>
                              </VStack>
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </VStack>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* 1. LMS CATALOG TAB VIEW */}
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
                      {activeLesson ? (() => {
                        const currentUrl = activeLesson.mediaUrl;

                        const regMath = currentUrl.match(/(?:vimeo\.com\/video\/|vimeo\.com\/|video\/)(\d+)/) || currentUrl.match(/^(\d+)$/);
                        const vimeoEmbedUrl = regMath && regMath[1] 
                          ? `https://player.vimeo.com/video/${regMath[1]}?autoplay=0&byline=0&portrait=0&badge=0` 
                          : null;

                        return (
                          <Box bg="navy.50" p="5" borderRadius="xs" border="1px solid" borderColor="navy.100" mb="6" textAlign="left">
                            <Flex justify="space-between" align="center" mb="3">
                              <HStack spaceX="2">
                                {activeLesson.type === "video" ? <Video size={16} className="text-teal-600" /> : <FileText size={16} className="text-teal-600" />}
                                <Text fontSize="xs" fontWeight="bold" color="navy.800">Active Lesson: {activeLesson.title}</Text>
                              </HStack>
                              <Badge bg="teal.600" color="white" size="sm" borderRadius="xs">{activeLesson.duration}</Badge>
                            </Flex>
                            
                            {/* Animated Player or Content container */}
                            <Box 
                              w="full" 
                              style={{ aspectRatio: "16/9" }} 
                              bg="black" 
                              borderRadius="xs" 
                              mb="4" 
                              display="flex" 
                              alignItems="center" 
                              justifyContent="center" 
                              position="relative" 
                              overflow="hidden"
                            >
                              {activeLesson.type === "video" ? (
                                vimeoEmbedUrl ? (
                                  <iframe
                                    src={vimeoEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                  />
                                ) : (
                                  <video src={currentUrl} controls className="w-full h-full object-cover" />
                                )
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
                        );
                      })() : (
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

      {/* Printable Certificate structure (for verified students) */}
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

      {/* Localized Styles */}
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
