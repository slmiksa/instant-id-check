// Simple client-side settings store for landing links.
// Editable from /admin (protected by a passcode).

const STORAGE_KEY = "mojarrad_settings_v1";

export type AppSettings = {
  loginUrl: string;
  telegramUrl: string;
};

export const DEFAULT_SETTINGS: AppSettings = {
  loginUrl: "https://d52e-93-112-223-108.ngrok-free.app",
  telegramUrl: "https://t.me/your_username",
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
