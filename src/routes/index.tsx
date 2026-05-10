import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import logoImg from "@/assets/logo.png";
import { getSettings, type AppSettings } from "@/lib/settings";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const features = [
  {
    icon: "⚡",
    title: "سرعة فائقة",
    desc: "فحص حتى 6000 هوية موبايلي يوميًا — أسرع من أي طريقة يدوية.",
  },
  {
    icon: "📱",
    title: "يعمل من الجوال",
    desc: "لا حاجة لجهاز مكتبي. شغّل النظام من جوالك في أي مكان.",
  },
  {
    icon: "🌙",
    title: "24 ساعة يوميًا",
    desc: "يعمل دون توقف. اترك النظام يعمل وهو يُنجز المهمة عنك.",
  },
  {
    icon: "🎯",
    title: "مصمّم لموظفي التحصيل",
    desc: "أداة احترافية موجّهة لتسريع عمليات التحقق ورفع كفاءة العمل اليومي.",
  },
];

const plans = [
  {
    name: "الباقة الأساسية",
    price: "300",
    quota: "1000",
    highlight: false,
    billingOptions: [
      { label: "شهري", price: "300", suffix: "/ شهريًا" },
    ],
    waMessage: "السلام عليكم، أرغب بالاشتراك في الباقة الأساسية (300 ريال / شهريًا) — فحص 1000 هوية موبايلي يوميًا.",
    features: [
      "فحص 1000 هوية موبايلي يوميًا",
      "كل 1000 فحص يستغرق 4 ساعات",
      "تجديد العداد تلقائيًا الساعة 12 منتصف الليل",
      "تشغيل من الجوال بسهولة",
      "عمل متواصل 24 ساعة",
      "دعم فني مباشر مع فريقنا",
      "تحديثات مستمرة للنظام",
    ],
  },
  {
    name: "الباقة الاحترافية",
    price: "1000",
    quota: "6000",
    highlight: true,
    billingOptions: [
      {
        label: "6 أشهر",
        price: "6000",
        suffix: "/ 6 أشهر",
        waMessage:
          "السلام عليكم، أرغب بالاشتراك في الباقة الاحترافية لمدة 6 أشهر بقيمة 6000 ريال — فحص 6000 هوية موبايلي يوميًا.",
      },
      {
        label: "سنوي",
        price: "12000",
        suffix: "/ سنويًا",
        waMessage:
          "السلام عليكم، أرغب بالاشتراك السنوي في الباقة الاحترافية بقيمة 12000 ريال — فحص 6000 هوية موبايلي يوميًا.",
      },
    ],
    waMessage: "السلام عليكم، أرغب بالاشتراك في الباقة الاحترافية — فحص 6000 هوية موبايلي يوميًا. يرجى تزويدي بتفاصيل الاشتراك (شهري / 6 أشهر / سنوي).",
    features: [
      "فحص 6000 هوية موبايلي يوميًا",
      "كل 1000 فحص يستغرق 4 ساعات",
      "تجديد العداد تلقائيًا الساعة 12 منتصف الليل",
      "تشغيل من الجوال بسهولة",
      "عمل متواصل 24 ساعة",
      "دعم فني مباشر مع فريقنا",
      "أولوية في الدعم الفني",
      "سيرفر خاص",
    ],
  },
];

function LandingPage() {
  const [settings, setSettings] = useState<AppSettings>(() => getSettings());
  const [serverMenuOpen, setServerMenuOpen] = useState(false);
  const [heroServerMenuOpen, setHeroServerMenuOpen] = useState(false);
  const [billingIdx, setBillingIdx] = useState<Record<string, number>>({});
  const [promoInput, setPromoInput] = useState<Record<string, string>>({});
  const [promoStatus, setPromoStatus] = useState<Record<string, "valid" | "invalid" | "">>({});

  const VALID_PROMOS = ["فهد", "محمد"];
  const normalize = (s: string) => s.trim().replace(/\s+/g, "");
  const applyPromo = (planName: string) => {
    const code = normalize(promoInput[planName] ?? "");
    if (!code) {
      setPromoStatus((p) => ({ ...p, [planName]: "" }));
      return;
    }
    const ok = VALID_PROMOS.includes(code);
    setPromoStatus((p) => ({ ...p, [planName]: ok ? "valid" : "invalid" }));
  };

  const buildWaUrl = (baseUrl: string, message: string) => {
    try {
      const u = new URL(baseUrl);
      u.searchParams.set("text", message);
      return u.toString();
    } catch {
      return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
  };

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  useEffect(() => {
    if (!serverMenuOpen && !heroServerMenuOpen) return;
    const close = () => {
      setServerMenuOpen(false);
      setHeroServerMenuOpen(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [serverMenuOpen, heroServerMenuOpen]);

  return (
    <div className="min-h-screen text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="شعار مجرّد"
              width={64}
              height={64}
              className="h-16 w-16 rounded-2xl shadow-glow object-cover"
            />
            <span className="text-xl font-black tracking-tight">مجرّد</span>
          </div>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setServerMenuOpen((v) => !v)}
              className="rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-bold text-primary hover:bg-primary/20 transition-colors"
            >
              دخول النظام ←
            </button>
            {serverMenuOpen && (
              <div className="absolute end-0 mt-2 w-56 rounded-2xl border border-border bg-card shadow-elegant overflow-hidden z-[60]">
                <a
                  href={settings.loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 text-sm font-bold hover:bg-accent transition-colors"
                >
                  <span>سيرفر عام</span>
                  <span className="inline-flex items-center gap-1 text-xs text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    نشط
                  </span>
                </a>
                <div className="border-t border-border/50" />
                <a
                  href="http://85.237.211.62:8080/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 text-sm font-bold hover:bg-accent transition-colors"
                >
                  <span>سيرفر شركة تحصيل 1</span>
                  <span className="inline-flex items-center gap-1 text-xs text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    نشط
                  </span>
                </a>
                <div className="border-t border-border/50" />
                <button
                  type="button"
                  onClick={() => alert("يتم تجهيزه")}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-muted-foreground hover:bg-accent transition-colors text-right"
                >
                  <span>سيرفر شركة تحصيل 2</span>
                  <span className="text-xs">يتم تجهيزه</span>
                </button>
              </div>
            )}
          </div>
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
                نظام <span className="text-gradient-primary">مجرّد</span>
                <br />
                لفحص هويات موبايلي
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                نظام آلي مصمم لموظفي التحصيل لفحص هويات موبايلي بسرعة قياسية.
                <br />
                <span className="text-foreground font-bold">
                  حتى 6000 هوية يوميًا
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
                  تواصل معنا للاشتراك
                </a>
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setHeroServerMenuOpen((v) => !v)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-bold text-foreground hover:bg-accent transition-colors w-full sm:w-auto"
                  >
                    دخول النظام
                    <span className="text-xs opacity-70">▾</span>
                  </button>
                  {heroServerMenuOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-60 rounded-2xl border border-border bg-card shadow-elegant overflow-hidden z-50 text-right">
                      <a
                        href={settings.loginUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 text-sm font-bold hover:bg-accent transition-colors"
                      >
                        <span>سيرفر عام</span>
                        <span className="inline-flex items-center gap-1 text-xs text-primary">
                          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          نشط
                        </span>
                      </a>
                      <div className="border-t border-border/50" />
                      <a
                        href="http://85.237.211.62:8080/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 text-sm font-bold hover:bg-accent transition-colors"
                      >
                        <span>سيرفر شركة تحصيل 1</span>
                        <span className="inline-flex items-center gap-1 text-xs text-primary">
                          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          نشط
                        </span>
                      </a>
                      <div className="border-t border-border/50" />
                      <button
                        type="button"
                        onClick={() => alert("يتم تجهيزه")}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-muted-foreground hover:bg-accent transition-colors text-right"
                      >
                        <span>سيرفر شركة تحصيل 2</span>
                        <span className="text-xs">يتم تجهيزه</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4 text-sm text-muted-foreground">
                <Stat value="6000" label="هوية / يوميًا" />
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
                className="relative rounded-3xl border border-border shadow-elegant mx-[9px]"
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
                className="group rounded-2xl bg-gradient-card border border-border p-6 hover:border-primary/50 transition-all hover:-translate-y-1 mx-[26px]"
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
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block rounded-full bg-gold/10 border border-gold/30 px-4 py-1.5 text-xs font-bold text-gold mb-4">
              باقة الاشتراك
            </span>
            <h2 className="text-3xl lg:text-4xl font-black">
              اختر <span className="text-gradient-gold">باقتك</span> المناسبة.
            </h2>
            <p className="text-muted-foreground mt-3">
              العداد يتجدد تلقائيًا الساعة 12 منتصف الليل كل يوم.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto px-6">
            {plans.map((plan) => {
              const selectedIdx = billingIdx[plan.name] ?? 0;
              const selected = plan.billingOptions[selectedIdx] ?? plan.billingOptions[0];
              const baseWaMessage = (selected as { waMessage?: string }).waMessage ?? plan.waMessage;
              const status = promoStatus[plan.name] ?? "";
              const promoCode = normalize(promoInput[plan.name] ?? "");
              const promoApplied = status === "valid";
              const bonusLabel =
                plan.name === "الباقة الأساسية"
                  ? "5 أيام مجانية"
                  : selected.label === "6 أشهر"
                    ? "15 يوم مجاني"
                    : "شهر مجاني";
              const selectedWaMessage = promoApplied
                ? `${baseWaMessage} + ${bonusLabel} (كود الخصم: ${promoCode})`
                : baseWaMessage;
              const waHref = buildWaUrl(settings.telegramUrl, selectedWaMessage);
              return (
              <div
                key={plan.name}
                className={`relative rounded-3xl bg-gradient-card p-8 lg:p-10 transition-all hover:-translate-y-1 ${
                  plan.highlight
                    ? "border-2 border-gold/50 shadow-gold"
                    : "border-2 border-primary/40 shadow-glow"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 rounded-full bg-gradient-gold px-5 py-1.5 text-xs font-black text-gold-foreground shadow-gold whitespace-nowrap">
                    الأكثر طلبًا ⭐
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    اشتراك مرن لكل عضو
                  </p>
                </div>

                {plan.billingOptions.length > 1 && (
                  <div className="flex items-center justify-center gap-1 mb-5 rounded-full border border-border bg-background/40 p-1">
                    {plan.billingOptions.map((opt, i) => {
                      const active = i === selectedIdx;
                      return (
                        <button
                          key={opt.label}
                          onClick={() =>
                            setBillingIdx((prev) => ({ ...prev, [plan.name]: i }))
                          }
                          className={`flex-1 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                            active
                              ? plan.highlight
                                ? "bg-gradient-gold text-gold-foreground shadow-gold"
                                : "bg-gradient-primary text-primary-foreground shadow-glow"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span
                      className={`text-6xl font-black ${
                        plan.highlight
                          ? "text-gradient-gold"
                          : "text-gradient-primary"
                      }`}
                    >
                      {selected.price}
                    </span>
                    <span className="text-xl font-bold text-muted-foreground">
                      ريال
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{selected.suffix}</p>
                </div>

                <div className="text-center mb-6">
                  <span className="inline-block rounded-full bg-primary/10 border border-primary/30 px-4 py-1.5 text-sm font-bold text-primary">
                    {plan.quota} هوية / يوميًا
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.highlight
                            ? "bg-gold/20 text-gold"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-muted-foreground mb-2 text-right">
                    كود الخصم (اختياري)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput[plan.name] ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        setPromoInput((p) => ({ ...p, [plan.name]: v }));
                        setPromoStatus((p) => ({ ...p, [plan.name]: "" }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          applyPromo(plan.name);
                        }
                      }}
                      placeholder="أدخل كود الخصم"
                      className="flex-1 rounded-full border border-border bg-background/40 px-4 py-2 text-sm text-right outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => applyPromo(plan.name)}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition-transform hover:scale-[1.02] ${
                        plan.highlight
                          ? "bg-gradient-gold text-gold-foreground shadow-gold"
                          : "bg-gradient-primary text-primary-foreground shadow-glow"
                      }`}
                    >
                      تطبيق
                    </button>
                  </div>
                  {status === "valid" && (
                    <p className="mt-2 text-xs font-bold text-gold text-right">
                      ✓ تم إضافة {bonusLabel}
                    </p>
                  )}
                  {status === "invalid" && (
                    <p className="mt-2 text-xs font-bold text-destructive text-right">
                      الكود خاطئ
                    </p>
                  )}
                </div>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 w-full rounded-full px-4 py-4 text-sm sm:text-base font-black leading-tight transition-transform hover:scale-[1.02] ${
                    plan.highlight
                      ? "bg-gradient-gold text-gold-foreground shadow-gold"
                      : "bg-gradient-primary text-primary-foreground shadow-glow"
                  }`}
                >
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <TelegramIcon className="h-5 w-5 shrink-0" />
                    تواصل معنا للاشتراك
                  </span>
                  {promoApplied && (
                    <span className="whitespace-nowrap">+ {bonusLabel}</span>
                  )}
                </a>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  للاشتراك تواصل مع فريق المبيعات مباشرة
                </p>

                {!plan.highlight && (
                  <div className="mt-4 rounded-2xl border border-gold/30 bg-gold/5 px-4 py-3 text-center">
                    <p className="text-xs font-bold text-gold">
                      💡 ملاحظة: عند طلب زيادة عدد الفحص، كل 100 فحص إضافي بـ 25 ريال
                    </p>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block rounded-full bg-primary/10 border border-primary/30 px-4 py-1.5 text-xs font-bold text-primary mb-4">
              آراء العملاء
            </span>
            <h2 className="text-3xl lg:text-4xl font-black">
              موظفو التحصيل <span className="text-gradient-primary inline-block leading-[1.6] pb-2">يثقون بمجرّد</span>
            </h2>
            <p className="text-muted-foreground mt-3">
              تجارب حقيقية من موظفين سهّل عليهم النظام التحصيل وجمع الفواتير المسددة.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto px-2">
            {[
              {
                name: "عبدالعزيز القحطاني",
                role: "موظف تحصيل",
                text: "والله نظام مجرّد وفّر علي ساعات يومياً، صرت أفحص آلاف الهويات وأنا في السيارة. الفواتير المسددة تتجمّع عندي بسرعة وبدون عناء.",
              },
              {
                name: "فهد الشمري",
                role: "مشرف تحصيل",
                text: "قبل النظام كنا نضيع وقت كبير في الفحص اليدوي. الحين فريقي يخلّص شغل يوم كامل في ساعتين. أنصح فيه أي شركة تحصيل.",
              },
              {
                name: "سلطان العتيبي",
                role: "موظف تحصيل ميداني",
                text: "أسهل أداة جربتها في حياتي المهنية. أشغّله من جوالي وأنا برّا وأرجع ألقى النتائج جاهزة. زاد إنتاجي أكثر من الضعف.",
              },
              {
                name: "ماجد الدوسري",
                role: "محصّل ديون",
                text: "اللي عجبني إنه يشتغل 24 ساعة بدون توقف. أنام وأصحى ألقى الفواتير المحصّلة جاهزة. توفير وقت ومجهود بشكل خرافي.",
              },
              {
                name: "ناصر الحربي",
                role: "موظف تحصيل",
                text: "الدعم الفني سريع والنظام ثابت ما يفصل. صار عندي وقت أركّز على المتابعة بدل ما أضيعه في الفحص. شكراً مجرّد.",
              },
              {
                name: "تركي المطيري",
                role: "مدير قسم التحصيل",
                text: "اشتركنا في الباقة الاحترافية وفعلاً نقلت الشركة لمستوى ثاني. كل الموظفين عندنا يعتمدون عليه يومياً.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-gradient-card border border-border p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex text-gold mb-3 text-lg">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-black">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
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
                تواصل مع فريق المبيعات
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} مجرّد. جميع الحقوق محفوظة.</p>
          <p className="mt-2 font-bold text-foreground">
            برمجة وتطوير{" "}
            <a
              href="https://trndsky.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              TRNDSKY
            </a>
          </p>
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
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.595 5.39l-.999 3.648 3.893-1.005zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
