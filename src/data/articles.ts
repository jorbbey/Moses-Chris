import { BlogPost, ArchiveMonth, Comment } from "../types";
import rawData from "./mosesArticlesData.json";

// High quality curated images based on domain
const CATEGORY_IMAGES: Record<string, string[]> = {
  "Epidemiology": [
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1583912267670-6575ad4736f8?auto=format&fit=crop&q=80&w=600",
  ],
  "Mental Health & Wellness": [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&q=80&w=600",
  ],
  "Domestic Violence": [
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  ],
  "Child & Maternal Health": [
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600",
  ],
  "Public Health & Resilience": [
    "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=600",
  ],
  "Human Rights & Policy": [
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=600",
  ]
};

function getImageForArticle(category: string, id: number): string {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES["Public Health & Resilience"];
  const index = Math.abs(id) % images.length;
  return images[index];
}

export const MONTHLY_ARCHIVES: ArchiveMonth[] = rawData.archives as ArchiveMonth[];

export const ALL_MOSES_ARTICLES: BlogPost[] = (rawData.posts as any[]).map((p) => {
  const image = getImageForArticle(p.category, p.wpId || 100);
  return {
    id: p.id,
    wpId: p.wpId,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    content: p.contentPlain,
    contentHtml: p.contentHtml,
    category: p.category,
    publishedAt: p.formattedDate,
    readTime: p.readTime,
    image,
    likes: p.likes || 42,
    comments: [] as Comment[],
    monthKey: p.monthKey,
    monthLabel: p.monthLabel,
    year: p.year,
    month: p.month,
    link: p.link,
    author: p.author || "Moses Chris",
    authorTitle: p.authorTitle || "Author, Epidemiologist & Public Health Advocate",
    sourceUrl: p.sourceUrl || p.link
  };
});

// Grouped articles by month
export const ARTICLES_BY_MONTH: Record<string, BlogPost[]> = {};
ALL_MOSES_ARTICLES.forEach((article) => {
  if (article.monthKey) {
    if (!ARTICLES_BY_MONTH[article.monthKey]) {
      ARTICLES_BY_MONTH[article.monthKey] = [];
    }
    ARTICLES_BY_MONTH[article.monthKey].push(article);
  }
});

// Helper functions
export function getArticlesByMonthKey(monthKey: string): BlogPost[] {
  if (!monthKey || monthKey === "all") return ALL_MOSES_ARTICLES;
  return ARTICLES_BY_MONTH[monthKey] || [];
}

export function getArticleById(id: string): BlogPost | undefined {
  return ALL_MOSES_ARTICLES.find((a) => a.id === id);
}

export const ALL_CATEGORIES = [
  "All",
  "Epidemiology",
  "Mental Health & Wellness",
  "Domestic Violence",
  "Child & Maternal Health",
  "Public Health & Resilience",
  "Human Rights & Policy"
];

export function sanitizeArticleHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "");
}
