export interface Product {
  id: string;
  title: string;
  category: "book" | "ebook" | "training" | "resource";
  price: number;
  rating: number;
  image: string;
  summary: string;
  author: string;
  amazonKindleLink?: string;
  features?: string[];
  pdfUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  category: "Epidemiology" | "Mental Health" | "Domestic Violence" | "Leadership";
  lessonsCount: number;
  duration: string;
  enrolled: boolean;
  progress: number; // 0 to 100
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  summary: string;
  lessons: Lesson[];
  quizzes: Quiz[];
  quizCompleted: boolean;
  quizScore?: number;
  certificateEarned: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: "video" | "pdf" | "audio" | "download";
  mediaUrl: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  userSelection?: number;
}

export interface Appointment {
  id: string;
  type: "individual" | "private" | "group";
  typeName: string;
  duration: string;
  price: number;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  timezone: string;
  clientName: string;
  clientEmail: string;
  clientNotes: string;
  status: "confirmed" | "completed" | "cancelled";
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "Public Health" | "Mental Health" | "Domestic Violence" | "Child Welfare";
  publishedAt: string;
  readTime: string;
  image: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  author: string;
  text: string;
  date: string;
}

export interface ResourceInfo {
  id: string;
  title: string;
  category: "Mental Health" | "Domestic Violence" | "Public Health" | "Emergency Preparedness" | "Child Welfare" | "Maternal Health";
  description: string;
  fileSize: string;
  downloadCount: number;
  tags: string[];
  downloadUrl: string;
}
