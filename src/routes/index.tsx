import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { getSettings, type AppSettings } from "@/lib/settings";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const features = [
  {
    icon: "⚡",
    title: "سرعة فائقة",
    desc: "فحص 1000 هوية موبايلي خلال 7 ساعات فقط — أسرع من أي طريقة يدوية.",
  },
  {
    icon: "📱",
    title: "يعمل من الجوال",
    desc: "لا حاجة لجهاز مكتبي. شغّل البوت من جوالك في أي مكان.",
  },
  {
    icon: "🌙",
    title: "24 ساعة يوميًا",
    desc: "يعمل دون توقف. اترك البوت يعمل وهو يُنجز المهمة عنك.",
  },
  {
    icon: "🎯",
    title: "مصمّم لموظفي التحصيل",
    desc: "أداة احترافية موجّهة لتسريع عمليات التحقق ورفع كفاءة العمل اليومي.",
  },
];

const planFeatures = [
  "فحص غير محدود لهويات موبايلي",
  "سرعة 1000 هوية / 7 ساعات",
  "تشغيل من الجوال بسهولة",
  "عمل متواصل 24 ساعة",
  "دعم فني مباشر عبر التليجرام",
  "تحديثات مستمرة للبوت",
];

function LandingPage() {
  const [settings, setSettings] = useState<AppSettings>(() => getSettings());

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  return (
    <div className="min-h-screen text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center font-black text-primary-foreground">
              م
            </div>
            <span className="text-lg font-black tracking-tight">مجرّد</span>
          </div>
          <a
            href={settings.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-bold text-primary hover:bg-primary/20 transition-colors"
          >
            دخول النظام ←
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7 text-center lg:text-right mx-[24px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                النظام يعمل الآن • 24/7
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.15]">
                بوت <span className="text-gradient-primary">مجرّد</span>
                <br />
                لفحص هويات موبايلي
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                نظام آلي مصمم لموظفي التحصيل لفحص هويات موبايلي بسرعة قياسية.
                <br />
                <span className="text-foreground font-bold">
                  1000 هوية كل 7 ساعات
                </span>{" "}
                — من جوالك مباشرة.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <a
                  href={settings.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-black text-primary-foreground shadow-glow animate-pulse-glow hover:scale-[1.02] transition-transform"
                >
                  <TelegramIcon className="h-5 w-5" />
                  اشترك عبر التليجرام
                </a>
                <a
                  href={settings.loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-bold text-foreground hover:bg-accent transition-colors"
                >
                  دخول النظام
                </a>
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4 text-sm text-muted-foreground">
                <Stat value="1000" label="هوية / 7 ساعات" />
                <Stat value="24/7" label="عمل متواصل" />
                <Stat value="📱" label="من الجوال" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
              <img
                src={heroImg}
                alt="نظام مجرّد لفحص هويات موبايلي"
                width={1536}
                height={1024}
                className="relative rounded-3xl border border-border shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">
              لماذا <span className="text-gradient-primary">مجرّد</span>؟
            </h2>
            <p className="text-muted-foreground text-lg">
              أداة مبنية خصيصًا لتوفير وقتك ورفع إنتاجيتك في عمليات التحصيل.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl bg-gradient-card border border-border p-6 hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 lg:py-28">
        <div className="container mx-0 px-0">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block rounded-full bg-gold/10 border border-gold/30 px-4 py-1.5 text-xs font-bold text-gold mb-4">
              باقة الاشتراك
            </span>
            <h2 className="text-3xl lg:text-4xl font-black">
              سعر <span className="text-gradient-gold">واحد</span>. كل المزايا.
            </h2>
          </div>

          <div className="max-w-md mx-auto">
            <div className="relative rounded-3xl bg-gradient-card border-2 border-primary/40 p-8 lg:p-10 shadow-glow">
              <div className="absolute -top-4 right-1/2 translate-x-1/2 rounded-full bg-gradient-gold px-5 py-1.5 text-xs font-black text-gold-foreground shadow-gold">
                الأكثر طلبًا ⭐
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-black mb-2">باقة العضو</h3>
                <p className="text-sm text-muted-foreground">
                  اشتراك شهري لكل عضو
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-black text-gradient-primary">
                    200
                  </span>
                  <span className="text-xl font-bold text-muted-foreground">
                    ريال
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">/ شهريًا</p>
              </div>

              <ul className="space-y-3 mb-8">
                {planFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={settings.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-primary py-4 text-base font-black text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform"
              >
                <TelegramIcon className="h-5 w-5" />
                اشترك الآن عبر التليجرام
              </a>

              <p className="text-center text-xs text-muted-foreground mt-4">
                التواصل والاشتراك يتم مباشرة عبر التليجرام
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 mx-[34px]">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-card border border-border p-10 lg:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-primary opacity-10" />
            <div className="relative space-y-5 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-black">
                جاهز توفّر وقتك وتضاعف إنتاجيتك؟
              </h2>
              <p className="text-muted-foreground text-lg">
                انضم لفريق العمل الذكي. اشترك الآن وابدأ الفحص خلال دقائق.
              </p>
              <a
                href={settings.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-10 py-4 text-base font-black text-primary-foreground shadow-glow"
              >
                <TelegramIcon className="h-5 w-5" />
                ابدأ الاشتراك
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} مجرّد. جميع الحقوق محفوظة.</p>
          <Link
            to="/admin"
            className="text-xs opacity-60 hover:opacity-100 transition-opacity"
          >
            لوحة التحكم
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-black text-foreground">{value}</span>
      <span>{label}</span>
    </div>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}
