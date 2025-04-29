import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";

const BuyTicketsButton = () => {
  const t = useTranslations();
  return (
    <Link
      href="/tickets"
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <span className="absolute h-0 w-0 rounded-full bg-black opacity-10 transition-all duration-300 group-hover:h-56 group-hover:w-56"></span>
      <span className="relative flex items-center">
        <span className="uppercase">{t("BUY_TICKETS")}</span>
      </span>
    </Link>
  );
};

export default BuyTicketsButton;
