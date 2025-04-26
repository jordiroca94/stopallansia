"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import useLockScroll from "@/hooks/useLockBodyScroll";

export function MobileMenuParallax() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  //Dirty hack to prevent scroll on parallax background ( had to duplicate components, this could be improved )
  useLockScroll(isOpen, ".parallax");

  const navItems = [
    { link: "/about" as const, label: t("ABOUT") },
    { link: "/tickets" as const, label: t("TICKETS") },
    { link: "/artists" as const, label: t("ARTISTS") },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="sm:hidden absolute right-4 top-4 z-50 h-12 w-12 rounded-full bg-white p-3 shadow-lg focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="relative h-full w-full">
          <span
            className={`absolute left-0 top-0 h-0.5 w-full transform bg-black transition-all duration-300 ease-in-out ${
              isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-black transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-full transform bg-black transition-all duration-300 ease-in-out ${
              isOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex w-full flex-col items-center space-y-8 px-8 text-center">
          {navItems.map(({ link, label }) => (
            <Link
              key={label}
              href={link}
              className="text-4xl font-bold text-white transition-all duration-300 hover:scale-110 hover:text-gray-300 capitalize"
              onClick={toggleMenu}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-4">
          <LanguageSelector mobile />
        </div>
      </div>
    </>
  );
}
