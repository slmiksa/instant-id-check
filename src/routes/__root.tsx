import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "مجرّد — بوت فحص هويات موبايلي للتحصيل" },
      {
        name: "description",
        content:
          "بوت آلي لفحص هويات موبايلي لموظفي التحصيل. افحص 1000 هوية في 7 ساعات من جوالك، يعمل 24/7. اشترك الآن.",
      },
      { property: "og:title", content: "مجرّد — بوت فحص هويات موبايلي للتحصيل" },
      {
        property: "og:description",
        content: "افحص 1000 هوية في 7 ساعات. يعمل من الجوال، 24 ساعة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "مجرّد — بوت فحص هويات موبايلي للتحصيل" },
      { name: "description", content: "ID Checker Bot is a web application for mobile ID verification, designed for collection agents." },
      { property: "og:description", content: "ID Checker Bot is a web application for mobile ID verification, designed for collection agents." },
      { name: "twitter:description", content: "ID Checker Bot is a web application for mobile ID verification, designed for collection agents." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8b32199a-cb29-4cfd-97a7-6007fa30ed07/id-preview-03fc59f2--e0e975fa-f2b6-4d4f-9dda-b852c19420c3.lovable.app-1777184260026.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8b32199a-cb29-4cfd-97a7-6007fa30ed07/id-preview-03fc59f2--e0e975fa-f2b6-4d4f-9dda-b852c19420c3.lovable.app-1777184260026.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
