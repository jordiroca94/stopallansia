"use client";

import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en", name: "EN", flag: "🇬🇧" },
  { code: "es", name: "ES", flag: "🇪🇸" },
  { code: "it", name: "IT", flag: "🇮🇹" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const language = languages.find((language) => language.code === locale);
    if (language) {
      setSelectedLanguage(language);
    }
  }, [locale]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    router.replace({ pathname }, { locale: language.code as Locale });

    console.log(`Language changed to ${language.code}`);
  };

  if (!selectedLanguage) return null;
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-2xl">{selectedLanguage.flag}</span>
        <span className="hidden sm:inline text-base text-bold">
          {selectedLanguage.name}
        </span>
        <IoChevronDownOutline className="size-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-20 bg-black text-white rounded-md shadow-xl z-20">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => selectLanguage(language)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              <span className="mr-2 text-2xl">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
