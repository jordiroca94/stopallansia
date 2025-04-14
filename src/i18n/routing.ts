import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "it"],

  defaultLocale: "en",
  pathnames: {
    "/": {
      en: "/",
      es: "/",
      it: "/",
    },
    "/about": {
      en: "/about",
      es: "/quienes-somos",
      it: "/chi-siamo",
    },
    "/reserve": {
      en: "/reserve",
      es: "/reservar",
      it: "/riservare",
    },
    "/artists": {
      en: "/artists",
      es: "/artistas",
      it: "/artisti",
    },
    "/reserve-tickets": {
      en: "/reserve-tickets",
      es: "/reservar-tickets",
      it: "/riservare-tickets",
    },
    "/payment-success": {
      en: "/payment-success",
      es: "/pago-realizado",
      it: "/pagamento-riuscito",
    },
    "/admin": {
      en: "/admin",
      es: "/admin",
      it: "/admin",
    },
    "/admin/dashboard": {
      en: "/admin/dashboard",
      es: "/admin/dashboard",
      it: "/admin/dashboard",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
