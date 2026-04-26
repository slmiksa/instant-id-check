import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ADMIN_PASSCODE,
  DEFAULT_SETTINGS,
  getSettings,
  saveSettings,
  type AppSettings,
} from "@/lib/settings";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم — مجرّد" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
    if (sessionStorage.getItem("admin_ok") === "1") setAuthed(true);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pass === ADMIN_PASSCODE) {
      sessionStorage.setItem("admin_ok", "1");
      setAuthed(true);
      setError("");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_ok");
    setAuthed(false);
    setPass("");
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl bg-gradient-card border border-border p-8 shadow-elegant space-y-5"
        >
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center text-2xl font-black text-primary-foreground mb-4">
              🔒
            </div>
            <h1 className="text-2xl font-black">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground mt-1">
              أدخل كلمة المرور للمتابعة
            </p>
          </div>
          <div>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full rounded-xl bg-input border border-border px-4 py-3 text-base outline-none focus:border-primary transition-colors"
              autoFocus
            />
            {error && (
              <p className="text-destructive text-sm mt-2 text-center">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-primary py-3 font-black text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform"
          >
            دخول
          </button>
          <Link
            to="/"
            className="block text-center text-xs text-muted-foreground hover:text-foreground"
          >
            ← العودة للصفحة الرئيسية
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground mt-1">
              تعديل روابط الصفحة الرئيسية
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-bold hover:bg-accent transition-colors"
          >
            خروج
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className="rounded-3xl bg-gradient-card border border-border p-6 lg:p-8 space-y-6 shadow-elegant"
        >
          <Field
            label="رابط دخول النظام"
            hint="الرابط الذي يفتح عند الضغط على زر «دخول النظام»"
            value={settings.loginUrl}
            onChange={(v) => setSettings({ ...settings, loginUrl: v })}
            placeholder="https://example.com/login"
          />

          <Field
            label="رابط التليجرام للاشتراك"
            hint="مثال: https://t.me/username أو رابط مجموعة"
            value={settings.telegramUrl}
            onChange={(v) => setSettings({ ...settings, telegramUrl: v })}
            placeholder="https://t.me/your_username"
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-primary py-3 font-black text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform"
            >
              {saved ? "✓ تم الحفظ" : "حفظ التغييرات"}
            </button>
            <Link
              to="/"
              className="flex-1 rounded-xl border border-border bg-card py-3 font-bold text-center hover:bg-accent transition-colors"
            >
              معاينة الصفحة
            </Link>
          </div>
        </form>

        <div className="mt-6 rounded-2xl border border-border bg-card/50 p-5 text-sm text-muted-foreground space-y-2">
          <p className="font-bold text-foreground">ℹ️ ملاحظة مهمة</p>
          <p>
            الإعدادات تُحفظ في متصفحك الحالي فقط (localStorage). لو فتحت الموقع
            من جهاز آخر ستظهر الروابط الافتراضية حتى تُعدّلها هناك أيضًا. لربط
            إعدادات مشتركة لكل الزوار، نحتاج تفعيل قاعدة البيانات (Lovable
            Cloud).
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2">{label}</label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir="ltr"
        className="w-full rounded-xl bg-input border border-border px-4 py-3 text-base outline-none focus:border-primary transition-colors"
      />
      {hint && <p className="text-xs text-muted-foreground mt-2">{hint}</p>}
    </div>
  );
}
