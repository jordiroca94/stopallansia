import React from "react";
import { FaInstagram } from "react-icons/fa";
import Logo from "../icons/footerLogo";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="flex justify-center items-center p-10 border-t border-cream bg-black text-white">
      <div className="flex flex-col justify-center items-center gap-4">
        <a
          className="flex flex-col gap-2 items-center"
          href="https://www.instagram.com/stop.all.ansia/"
        >
          <h5 className="text-center font-bold text-base hover:underline">
            {t("STAY_UPDATED")}
          </h5>
          <FaInstagram className="size-6 lg:size-7 transition-transform duration-300 hover:scale-125" />
        </a>
        <div>{Logo}</div>
      </div>
    </footer>
  );
};

export default Footer;
