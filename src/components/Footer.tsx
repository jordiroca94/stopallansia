import React from "react";
import { FaInstagram, FaGithub } from "react-icons/fa";
import Logo from "../icons/footerLogo";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="flex justify-center items-center p-10 border-t border-white bg-black text-white">
      <div className="flex flex-col justify-center items-center gap-4">
        <a
          target="_blank"
          className="flex flex-col gap-2 items-center"
          href="https://www.instagram.com/stop.all.ansia/"
        >
          <h5 className="text-center font-bold text-base hover:underline">
            {t("STAY_UPDATED")}
          </h5>
          <FaInstagram className="size-6 lg:size-7 transition-transform duration-300 hover:scale-125" />
        </a>

        <div>{Logo}</div>

        <div className="flex items-center gap-2 text-base mt-2 ">
          Developed by
          <a
            href="https://jordirocasoler.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:animate-pulse"
          >
            Jordi Roca
          </a>
          <a
            href="https://github.com/jordiroca94"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="size-5 transition-transform duration-300 hover:scale-125" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
