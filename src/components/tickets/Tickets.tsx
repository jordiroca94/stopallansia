"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useLocale, useTranslations } from "next-intl";
import Checkout from "./Checkout";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe public key is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export type TicketType = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
};

export default function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const checkoutRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    if (selectedTicket && checkoutRef.current) {
      checkoutRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedTicket]);

  const tickets = [
    {
      id: "early-bird",
      name: t("RESERVE_CARDS.1.TITLE"),
      price: 149,
      description: t("RESERVE_CARDS.1.DESCRIPTION"),
      features: [
        t("RESERVE_CARDS.1.FEATURES.1"),
        t("RESERVE_CARDS.1.FEATURES.2"),
        t("RESERVE_CARDS.1.FEATURES.3"),
        t("RESERVE_CARDS.1.FEATURES.4"),
      ],
    },
    {
      id: "regular",
      name: t("RESERVE_CARDS.2.TITLE"),
      price: 199,
      description: t("RESERVE_CARDS.2.DESCRIPTION"),
      features: [
        t("RESERVE_CARDS.2.FEATURES.1"),
        t("RESERVE_CARDS.2.FEATURES.2"),
        t("RESERVE_CARDS.2.FEATURES.3"),
        t("RESERVE_CARDS.2.FEATURES.4"),
        t("RESERVE_CARDS.2.FEATURES.5"),
      ],
    },
    {
      id: "vip",
      name: t("RESERVE_CARDS.3.TITLE"),
      price: 299,
      description: t("RESERVE_CARDS.3.DESCRIPTION"),
      features: [
        t("RESERVE_CARDS.3.FEATURES.1"),
        t("RESERVE_CARDS.3.FEATURES.2"),
        t("RESERVE_CARDS.3.FEATURES.3"),
        t("RESERVE_CARDS.3.FEATURES.4"),
        t("RESERVE_CARDS.3.FEATURES.5"),
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl capitalize">
          {t("RESERVE_TITLE")}
        </h1>
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative rounded-xl p-1 transition-all duration-300 ${
                selectedTicket?.id === ticket.id
                  ? "scale-105 bg-gradient-to-br from-white/50 to-white/20"
                  : "bg-white/5 hover:bg-white/10"
              } border-white/30`}
            >
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="mb-1 text-2xl font-bold">{ticket.name}</h3>
                <div className="mb-4 flex items-baseline">
                  <span className="text-3xl font-bold">{ticket.price} €</span>
                </div>
                <p className="mb-4 text-sm opacity-90">{ticket.description}</p>

                <ul className="mb-6 space-y-2">
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-white" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedTicket(ticket);
                  }}
                  className={`w-full rounded-full py-3 text-center font-bold transition-all duration-300 ${
                    selectedTicket?.id === ticket.id
                      ? "bg-white text-black"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {selectedTicket?.id === ticket.id
                    ? t("RESERVE_SELECTED")
                    : t("RESERVE_SELECT")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedTicket !== null && (
          <div ref={checkoutRef}>
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(selectedTicket.price),
                currency: "eur",
                locale: locale as "en" | "es" | "it",
              }}
            >
              <Checkout ticket={selectedTicket} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}
