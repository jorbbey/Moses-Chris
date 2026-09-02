export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: "African" | "European" | "Asian" | "Middle East" | "Americas" | "Popular";
}

export const POPULAR_LANGUAGE_CODES = ["en", "ig", "yo", "ha", "sw", "fr", "es", "ar", "pt", "de", "zh-CN", "hi"];

export const ALL_LANGUAGES: LanguageOption[] = [
  // African Languages
  { code: "ig", name: "Igbo", nativeName: "Asụsụ Igbo", flag: "🇳🇬", region: "African" },
  { code: "yo", name: "Yoruba", nativeName: "Èdè Yorùbá", flag: "🇳🇬", region: "African" },
  { code: "ha", name: "Hausa", nativeName: "Harshen Hausa", flag: "🇳🇬", region: "African" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", region: "African" },
  { code: "zu", name: "Zulu", nativeName: "isiZulu", flag: "🇿🇦", region: "African" },
  { code: "xh", name: "Xhosa", nativeName: "isiXhosa", flag: "🇿🇦", region: "African" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹", region: "African" },
  { code: "so", name: "Somali", nativeName: "Soomaali", flag: "🇸🇴", region: "African" },
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans", flag: "🇿🇦", region: "African" },
  { code: "mg", name: "Malagasy", nativeName: "Malagasy", flag: "🇲🇬", region: "African" },
  { code: "rw", name: "Kinyarwanda", nativeName: "Ikinyarwanda", flag: "🇷🇼", region: "African" },
  { code: "sn", name: "Shona", nativeName: "chiShona", flag: "🇿🇼", region: "African" },
  { code: "st", name: "Sesotho", nativeName: "Sesotho", flag: "🇱🇸", region: "African" },

  // European Languages
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", region: "European" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", region: "European" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", region: "European" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", region: "European" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", region: "European" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", region: "European" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", region: "European" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", region: "European" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦", region: "European" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱", region: "European" },
  { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿", region: "European" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪", region: "European" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴", region: "European" },
  { code: "da", name: "Danish", nativeName: "Dansk", flag: "🇩🇰", region: "European" },
  { code: "fi", name: "Finnish", nativeName: "Suomi", flag: "🇫🇮", region: "European" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷", region: "European" },
  { code: "ro", name: "Romanian", nativeName: "Română", flag: "🇷🇴", region: "European" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", flag: "🇭🇺", region: "European" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", flag: "🇧🇬", region: "European" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", flag: "🇭🇷", region: "European" },
  { code: "sr", name: "Serbian", nativeName: "Српски", flag: "🇷🇸", region: "European" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", flag: "🇸🇰", region: "European" },
  { code: "ga", name: "Irish", nativeName: "Gaeilge", flag: "🇮🇪", region: "European" },

  // Middle Eastern Languages
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", region: "Middle East" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", region: "Middle East" },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱", region: "Middle East" },
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷", region: "Middle East" },

  // Asian Languages
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳", region: "Asian" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", flag: "🇹🇼", region: "Asian" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", region: "Asian" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", region: "Asian" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", region: "Asian" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰", region: "Asian" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩", region: "Asian" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳", region: "Asian" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", region: "Asian" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", region: "Asian" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳", region: "Asian" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳", region: "Asian" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳", region: "Asian" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳", region: "Asian" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", region: "Asian" },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭", region: "Asian" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", region: "Asian" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾", region: "Asian" },
  { code: "tl", name: "Filipino (Tagalog)", nativeName: "Filipino", flag: "🇵🇭", region: "Asian" },
  { code: "my", name: "Burmese", nativeName: "မြန်မာစာ", flag: "🇲🇲", region: "Asian" },
  { code: "km", name: "Khmer", nativeName: "ភាសាខ្មែរ", flag: "🇰🇭", region: "Asian" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", flag: "🇳🇵", region: "Asian" },
  { code: "si", name: "Sinhala", nativeName: "සිංහල", flag: "🇱🇰", region: "Asian" },
];

export function getLanguageByCode(code: string): LanguageOption | undefined {
  if (!code) return undefined;
  const normalized = code.toLowerCase();
  return (
    ALL_LANGUAGES.find(l => l.code.toLowerCase() === normalized) ||
    ALL_LANGUAGES.find(l => l.code.split("-")[0].toLowerCase() === normalized.split("-")[0])
  );
}
