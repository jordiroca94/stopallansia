import React from "react";
import { BsInstagram } from "react-icons/bs";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="border-t py-10 px-4 bg-black text-white">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a
              href="mailto:jordirocasoler94@gmail.com"
              className="mt-2 inline-block relative overflow-hidden group"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-red">
                info@stopallansia.com
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
            </a>
            <p className="text-gray-400 mt-2">
              © {new Date().getFullYear()} Stop All Ansia Festival
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <Link
              href="https://instagram.com/stopallansiaofficial"
              target="_blank"
              className="group flex items-center gap-2 transition-transform duration-300 hover:translate-x-1"
            >
              <p className="transition-colors duration-300 group-hover:text-red">
                {t("FOOTER_INSTAGRAM")}
              </p>
              <BsInstagram
                className="transition-all duration-300 group-hover:text-red group-hover:scale-110"
                size={20}
              />
            </Link>
            <Link
              href="https://jordirocasoler.com/"
              className="transition-colors duration-300 group-hover:text-red flex items-center mt-2 relative group"
            >
              <span className="transition-all duration-300 group-hover:tracking-wider group-hover:text-red">
                {t("FOOTER_DEVELOPED")}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
