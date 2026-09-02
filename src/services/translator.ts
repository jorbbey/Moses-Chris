import i18n from "../i18n";
import { ALL_LANGUAGES, getLanguageByCode } from "../data/languages";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const STORAGE_KEY = "moseschris_selected_language";
let isScriptLoaded = false;
const listeners = new Set<(lang: string) => void>();

export function getStoredLanguage(): string {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;

    // Check cookie
    const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
    if (match && match[1]) return match[1];
  } catch (err) {
    console.error("Error reading stored language:", err);
  }
  return "en";
}

export function subscribeLanguageChange(callback: (lang: string) => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notifyLanguageChange(lang: string) {
  listeners.forEach(cb => {
    try {
      cb(lang);
    } catch (e) {
      console.error(e);
    }
  });
}

/**
 * Initializes Google Translate Script and DOM hook
 */
export function initGoogleTranslate(): void {
  if (typeof window === "undefined") return;

  // Create mount div if not present
  let mountNode = document.getElementById("google_translate_element");
  if (!mountNode) {
    mountNode = document.createElement("div");
    mountNode.id = "google_translate_element";
    mountNode.style.position = "absolute";
    mountNode.style.left = "-9999px";
    mountNode.style.top = "-9999px";
    mountNode.style.width = "1px";
    mountNode.style.height = "1px";
    mountNode.style.overflow = "hidden";
    mountNode.style.visibility = "hidden";
    document.body.appendChild(mountNode);
  }

  // Define global init callback
  window.googleTranslateElementInit = () => {
    try {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement?.InlineLayout?.SIMPLE,
          },
          "google_translate_element"
        );

        // Apply initially stored language if non-English
        const savedLang = getStoredLanguage();
        if (savedLang && savedLang !== "en") {
          setTimeout(() => {
            applyLanguageToCombo(savedLang);
          }, 600);
        }
      }
    } catch (err) {
      console.warn("Google Translate init caught error:", err);
    }
  };

  // Inject Script once
  if (!isScriptLoaded && !document.getElementById("google-translate-script")) {
    isScriptLoaded = true;
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.type = "text/javascript";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = (e) => {
      console.warn("Failed to load Google Translate element:", e);
    };
    document.body.appendChild(script);
  }
}

function setTranslationCookie(langCode: string) {
  const host = window.location.hostname;
  const isEn = langCode === "en";

  if (isEn) {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${host}; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${host}; path=/;`;
  } else {
    const cookieValues = [
      `googtrans=/en/${langCode}; path=/;`,
      `googtrans=/en/${langCode}; domain=${host}; path=/;`,
      `googtrans=/auto/${langCode}; path=/;`,
      `googtrans=/auto/${langCode}; domain=${host}; path=/;`,
    ];
    cookieValues.forEach((val) => {
      document.cookie = val;
    });
  }
}

function applyLanguageToCombo(langCode: string): boolean {
  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }
  return false;
}

/**
 * Changes language across the whole application
 */
export async function changeApplicationLanguage(langCode: string): Promise<void> {
  if (typeof window === "undefined") return;

  const validLang = getLanguageByCode(langCode) ? langCode : "en";

  // Store in LocalStorage
  try {
    localStorage.setItem(STORAGE_KEY, validLang);
  } catch (e) {
    console.error(e);
  }

  // Update i18n
  try {
    i18n.changeLanguage(validLang);
  } catch (e) {
    console.error(e);
  }

  // Set translation cookies
  setTranslationCookie(validLang);

  // Apply to Google Translate Combo element
  const applied = applyLanguageToCombo(validLang);
  if (!applied) {
    // Retry shortly in case combo was still rendering
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (applyLanguageToCombo(validLang) || attempts >= 10) {
        clearInterval(interval);
      }
    }, 200);
  }

  notifyLanguageChange(validLang);
}
