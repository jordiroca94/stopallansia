import React from "react";
import { BsInstagram } from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
  // const t = useTranslations();

  return (
    <footer className="border-t py-10 px-4 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a
              href="mailto:jordirocasoler94@gmail.com"
              className="mt-2 hover:text-red-500 transition-colors"
            >
              info@stopallansia.com
            </a>
            <p className="text-gray-400 mt-2">
              © {new Date().getFullYear()} Stop All Ansia Festival
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <Link
              href="https://instagram.com/stopallansiaofficial"
              target="_blank"
              className="hover:text-red-500 transition-colors flex items-center gap-2"
            >
              <p>Stay updated on the latest info</p>
              <BsInstagram className="mr-2" size={20} />
            </Link>
            <Link
              href="https://jordirocasoler.com/"
              className="text-red-500 flex items-center"
            >
              <span>Developed by Jordi Roca</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
