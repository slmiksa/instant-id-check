// Simple client-side settings store for landing links.
// Editable from /admin (protected by a passcode).

const STORAGE_KEY = "mojarrad_settings_v1";

export type AppSettings = {
  loginUrl: string;
  telegramUrl: string;
  whatsappUrl: string;
};

export const DEFAULT_SETTINGS: AppSettings = {
  loginUrl: "https://quad-runs-arcade-biol.trycloudflare.com",
  telegramUrl: "https://wa.me/966575503461?text=%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%D9%85%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D9%86%D8%B8%D8%A7%D9%85%20%D9%81%D8%AD%D8%B5%20%D9%85%D9%88%D8%A8%D8%A7%D9%8A%D9%84%D9%8A",
  whatsappUrl: "https://wa.me/966575503461?text=%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%D9%85%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D9%86%D8%B8%D8%A7%D9%85%20%D9%81%D8%AD%D8%B5%20%D9%85%D9%88%D8%A8%D8%A7%D9%8A%D9%84%D9%8A",
};

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: AppSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

// Admin passcode (change to whatever you want).
export const ADMIN_PASSCODE = "admin2026";
