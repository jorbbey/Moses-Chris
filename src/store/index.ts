import { create } from "zustand";
import { Product, Course, Appointment, BlogPost, ResourceInfo } from "../types";

interface PlatformState {
  // Store Data
  products: Product[];
  wishlist: string[];
  cart: { product: Product; quantity: number }[];
  
  // Academy Data
  courses: Course[];
  
  // Schedule Data
  appointments: Appointment[];
  
  // Blog / Resource Data
  blogPosts: BlogPost[];
  resources: ResourceInfo[];

  // User details
  studentName: string;
  studentEmail: string;

  // Actions
  addCartItem: (product: Product) => void;
  removeCartItem: (productId: string) => void;
  updateCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;

  enrollInCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  submitQuiz: (courseId: string, selections: number[]) => { passed: boolean; score: number };
  resetQuiz: (courseId: string) => void;
  
  bookAppointment: (appt: Omit<Appointment, "id" | "status">) => void;
  cancelAppointment: (apptId: string) => void;

  likeBlogPost: (postId: string) => void;
  addBlogComment: (postId: string, comment: { author: string; text: string }) => void;
  incrementResourceDownload: (resourceId: string) => void;
}

// Initial Mock Seed Data reflecting the real Moses Chris portfolio
const initialProducts: Product[] = [
  {
    id: "prod-1",
    title: "Healing Minds, Protecting Lives: A Guide to Public Health Advocacy",
    category: "book",
    price: 24.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
    summary: "A profound overview of modern public health consulting with practical guidelines for epidemiology, outbreak response, and mental wellbeing integration.",
    author: "Moses Chris",
    amazonKindleLink: "https://amazon.com",
    features: ["Paperback available", "Kindle Digital Edition", "Comprehensive study cases"]
  },
  {
    id: "prod-2",
    title: "Behind Closed Doors: Escaping the Cycle of Domestic Abuse",
    category: "ebook",
    price: 14.99,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    summary: "Expert insights, psychological models, and legal-physical support strategies for domestic violence victims and frontline responders.",
    author: "Moses Chris",
    pdfUrl: "/assets/docs/escaping_domestic_abuse_preview.pdf",
    features: ["Instant High-Quality PDF", "Interactive workbook pages", "Resource lists"]
  },
  {
    id: "prod-3",
    title: "Maternal Resiliency: Community Solutions for Infant & Mother Wellness",
    category: "book",
    price: 19.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400",
    summary: "A practical textbook detailing pre-natal health frameworks, toddler development indices, and community-driven maternal nourishment models.",
    author: "Moses Chris",
    amazonKindleLink: "https://amazon.com",
    features: ["Paperback format", "Approved by Public Health colleges"]
  },
  {
    id: "prod-4",
    title: "Emergency Consultation & Community Crisis Action Blueprint",
    category: "resource",
    price: 9.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400",
    summary: "SOP guidelines for disaster readiness, active hazard protocols, and neighborhood response coordinates.",
    author: "Moses Chris",
    pdfUrl: "/assets/docs/emergency_action_blueprint.pdf",
    features: ["Instant PDF", "Editable checklists included"]
  }
];

const initialCourses: Course[] = [
  {
    id: "course-1",
    title: "Epidemic Surveillance & Incident Command System (ICS)",
    category: "Epidemiology",
    lessonsCount: 4,
    duration: "4 hours",
    enrolled: false,
    progress: 0,
    instructorName: "Moses Chris",
    instructorTitle: "Epidemiologist & Consultant",
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    summary: "Become certified in basic disease tracking models, outbreak handling vectors, and multi-agency response collaboration commands.",
    lessons: [
      { id: "c1-l1", title: "Introduction to Field Epidemiology & Viral Vectors", duration: "45 mins", completed: false, type: "video", mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "c1-l2", title: "Case Detection, Surveillance & Isolation Indices", duration: "1 hour", completed: false, type: "pdf", mediaUrl: "#" },
      { id: "c1-l3", title: "The FEMA Incident Command Structure Operations", duration: "1 hour", completed: false, type: "audio", mediaUrl: "#" },
      { id: "c1-l4", title: "Outbreak Simulation Lab & Data Visualizations", duration: "1 hour 15 mins", completed: false, type: "download", mediaUrl: "#" }
    ],
    quizzes: [
      { id: "c1-q1", question: "Which is the first priority under FEMA Incident Command System (ICS)?", options: ["Life safety", "Property preservation", "Incident stabilization", "Public relations"], correctIndex: 0 },
      { id: "c1-q2", question: "What represents basic viral reproduction rate in an immune-naive population?", options: ["R-negative", "F-score", "R0 (R-nought)", "Zet-factor"], correctIndex: 2 }
    ],
    quizCompleted: false,
    certificateEarned: false
  },
  {
    id: "course-2",
    title: "Trauma-Informed Crisis Counselling and Victim-Care Mastery",
    category: "Mental Health",
    lessonsCount: 3,
    duration: "3.5 hours",
    enrolled: true,
    progress: 33,
    instructorName: "Moses Chris",
    instructorTitle: "Registered Counselor",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    summary: "Learn essential clinical tools for active psychological listening, emergency domestic violence safe planning, and infant advocacy.",
    lessons: [
      { id: "c2-l1", title: "Grounding Techniques for Panic and Trauma Flashbacks", duration: "1 hour", completed: true, type: "video", mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "c2-l2", title: "Safety Mapping & Immediate Shelter Relocation Logistics", duration: "1.5 hours", completed: false, type: "pdf", mediaUrl: "#" },
      { id: "c2-l3", title: "Maternal Attachment Repair & Child Counselling", duration: "1 hour", completed: false, type: "video", mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    quizzes: [
      { id: "c2-q1", question: "What is the baseline mental health triage procedure in emergency scenarios?", options: ["Somatic therapy", "Immediate cognitive restructuring", "Psychological First Aid (PFA)", "Psychoanalysis"], correctIndex: 2 }
    ],
    quizCompleted: false,
    certificateEarned: false
  },
  {
    id: "course-3",
    title: "Domestic Violence Advocacy & Frontline Intervention Principles",
    category: "Domestic Violence",
    lessonsCount: 3,
    duration: "5 hours",
    enrolled: false,
    progress: 0,
    instructorName: "Moses Chris",
    instructorTitle: "Social Justice Advocate",
    instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    summary: "Develop key competency in community education, legal protection frameworks, and multi-layered client security counseling.",
    lessons: [
      { id: "c3-l1", title: "The Cycle of Violence & Power Control Wheels", duration: "1.5 hours", completed: false, type: "video", mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "c3-l2", title: "Legal Restraining Orders & Child Welfare Protection Laws", duration: "2 hours", completed: false, type: "pdf", mediaUrl: "#" },
      { id: "c3-l3", title: "Building Collaborative Community Taskforces", duration: "1.5 hours", completed: false, type: "audio", mediaUrl: "#" }
    ],
    quizzes: [
      { id: "c3-q1", question: "Which tool demonstrates visual patterns of coercion, threats, and intimidation used by abusers?", options: ["Maslow Hierarchy", "Power and Control Wheel", "Beck Inventory", "Dutton Assessment Table"], correctIndex: 1 }
    ],
    quizCompleted: false,
    certificateEarned: false
  }
];

const initialResources: ResourceInfo[] = [
  {
    id: "res-1",
    title: "Immediate Domestic Violence Action Plan & Safety Map",
    category: "Domestic Violence",
    description: "An instant-download, highly confidential walkthrough to help individuals safely navigate domestic emergency evacuations, lock down digital presence, and package transition documents.",
    fileSize: "1.8 MB",
    downloadCount: 312,
    tags: ["Safety Map", "Crisis SOP", "Legal Rights"],
    downloadUrl: "#"
  },
  {
    id: "res-2",
    title: "Outbreak Investigation SOP Checklist & Rapid Containment Form",
    category: "Public Health",
    description: "Designed for public health field personnel, this manual guides outbreak surveillance, case contact log tracking, index case isolating, and clinical specimen packaging.",
    fileSize: "3.4 MB",
    downloadCount: 184,
    tags: ["Epidemiology", "SOP Checklist", "CDC Standards"],
    downloadUrl: "#"
  },
  {
    id: "res-3",
    title: "Family Emergency Toolkit & Disaster Readiness Blueprint",
    category: "Emergency Preparedness",
    description: "Detailed household supply schedules, shelter-in-place checklists, emergency radio systems config, and rapid meeting coordinates guides.",
    fileSize: "2.6 MB",
    downloadCount: 429,
    tags: ["Preparedness", "Family Plan", "First Aid"],
    downloadUrl: "#"
  },
  {
    id: "res-4",
    title: "Prenatal Tracking Log & Newborn Developmental Milestones Index",
    category: "Maternal Health",
    description: "Medical-grade tracker grids documenting baby growth parameters, fetal movement logs, optimal postpartum checkup timing, and critical diagnostic marks.",
    fileSize: "4.1 MB",
    downloadCount: 228,
    tags: ["Maternal Care", "Toddler Health", "Logbook"],
    downloadUrl: "#"
  }
];

const initialBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Interface of Mental Health and Disease Outbreak Response",
    summary: "As an epidemiologist and counsellor, I investigate how infectious crises amplify traumatic feedback loops in local populations and how response systems must integrate psych-first models.",
    content: "During public health emergencies, panic often spreads faster than pathogens. The fear of isolation, the loss of financial autonomy, and bereavement create a fertile environment for intense anxiety, depression, and post-traumatic stress. Integrating clinical mental support directly within active medical triages is not merely a supplementary luxury; it is crucial to securing societal cooperation, compliance with biosafety protocols, and eventual post-epidemic revitalization. This paper documents five real-world case reviews...",
    category: "Public Health",
    publishedAt: "2026-05-18",
    readTime: "6 mins read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    likes: 42,
    comments: [
      { author: "Dr. Sarah Jenkins", text: "Brilliant insights! Medical-clinical integration is severely underutilized in municipal responses.", date: "2026-05-19" }
    ]
  },
  {
    id: "post-2",
    title: "Recognizing Early Warning Signs of Coercive Control in Relationships",
    summary: "Domestic abuse goes far beyond physical violence. Identifying systematic control and micro-regulation vectors is crucial for prevention and immediate crisis safety planning.",
    content: "Coercive control functions as a serial capture of an individual's personal sovereignty. Perpetrators systematically restrict the victim's social affiliations, access to household finance, professional work environments, and mobile communications, establishing an omniscient micro-regulative dynamic. For therapists, advocates, and friends, identifying these non-physical micro-signals at early stages is central. Let's list the core behavioral indicators...",
    category: "Domestic Violence",
    publishedAt: "2026-05-22",
    readTime: "8 mins read",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    likes: 56,
    comments: [
      { author: "Evelyn Carter", text: "This article saved my daughter from an extremely dangerous situation. Thank you, Moses.", date: "2026-05-23" }
    ]
  },
  {
    id: "post-3",
    title: "Maternal Health Disparities in Underserved Municipal Jurisdictions",
    summary: "An analytical study investigating neonatal care deficits, nutrition tracking, and localized advocacy models designed to suppress infant mortality margins.",
    content: "Maternal wellness remains a prime metric of societal advancement. In municipal sectors where prenatal education is restricted and clinical hubs are geographically scattered, toddler wellness indices drops dramatically. By forming localized community taskforces and implementing robust mobile monitoring protocols, we can reverse maternal mortality rates. In this entry we audit empirical strategies currently tested on the ground.",
    category: "Child Welfare",
    publishedAt: "2026-05-29",
    readTime: "11 mins read",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600",
    likes: 89,
    comments: []
  }
];

const initialAppointments: Appointment[] = [
  {
    id: "appt-1",
    type: "individual",
    typeName: "1-on-1 Individual Therapy Session",
    duration: "50 mins",
    price: 150,
    date: "2026-06-03",
    timeSlot: "10:00 AM - 10:50 AM",
    timezone: "GMT / UTC (Local)",
    clientName: "End-User Client",
    clientEmail: "user@example.com",
    clientNotes: "Initial consultation for postpartum anxiety and anxiety management strategies.",
    status: "confirmed"
  }
];

export const usePlatformStore = create<PlatformState>((set, get) => ({
  products: initialProducts,
  wishlist: [],
  cart: [],
  courses: initialCourses,
  appointments: initialAppointments,
  blogPosts: initialBlogPosts,
  resources: initialResources,
  studentName: "Jorbbey",
  studentEmail: "jorbbey@gmail.com",

  addCartItem: (product) => {
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity: 1 }] };
    });
  },

  removeCartItem: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    }));
  },

  updateCartQuantity: (productId, qty) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(1, qty) } : item
      ),
    }));
  },

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (productId) => {
    set((state) => {
      const isStarred = state.wishlist.includes(productId);
      return {
        wishlist: isStarred
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId],
      };
    });
  },

  enrollInCourse: (courseId) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId ? { ...course, enrolled: true, progress: 0 } : course
      ),
    }));
  },

  completeLesson: (courseId, lessonId) => {
    set((state) => {
      const courses = state.courses.map((course) => {
        if (course.id !== courseId) return course;
        
        const lessons = course.lessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        );
        
        const completedCount = lessons.filter((l) => l.completed).length;
        const totalCount = lessons.length;
        const progress = Math.round((completedCount / totalCount) * 100);
        
        return {
          ...course,
          lessons,
          progress,
          // Automark quiz as completed / certificate available if progress is high and quiz completed
          certificateEarned: progress === 100 && course.quizCompleted
        };
      });
      return { courses };
    });
  },

  submitQuiz: (courseId, selections) => {
    let score = 0;
    let passed = false;
    
    set((state) => {
      const courses = state.courses.map((course) => {
        if (course.id !== courseId) return course;
        
        const quizList = course.quizzes;
        let correctCount = 0;
        
        quizList.forEach((q, idx) => {
          if (q.correctIndex === selections[idx]) {
            correctCount++;
          }
        });
        
        score = Math.round((correctCount / quizList.length) * 100);
        passed = score >= 70;
        
        return {
          ...course,
          quizCompleted: true,
          quizScore: score,
          certificateEarned: course.progress === 100 && passed
        };
      });
      return { courses };
    });
    
    return { passed, score };
  },

  resetQuiz: (courseId) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? { ...course, quizCompleted: false, quizScore: undefined, certificateEarned: false }
          : course
      ),
    }));
  },

  bookAppointment: (appt) => {
    set((state) => {
      const newId = `appt-${Date.now()}`;
      const newAppt: Appointment = {
        ...appt,
        id: newId,
        status: "confirmed"
      };
      return {
        appointments: [newAppt, ...state.appointments]
      };
    });
  },

  cancelAppointment: (apptId) => {
    set((state) => ({
      appointments: state.appointments.map((appt) =>
        appt.id === apptId ? { ...appt, status: "cancelled" } : appt
      ),
    }));
  },

  likeBlogPost: (postId) => {
    set((state) => ({
      blogPosts: state.blogPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ),
    }));
  },

  addBlogComment: (postId, comment) => {
    set((state) => ({
      blogPosts: state.blogPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { author: comment.author, text: comment.text, date: new Date().toISOString().split("T")[0] }
              ]
            }
          : post
      ),
    }));
  },

  incrementResourceDownload: (resourceId) => {
    set((state) => ({
      resources: state.resources.map((res) =>
        res.id === resourceId ? { ...res, downloadCount: res.downloadCount + 1 } : res
      ),
    }));
  }
}));
