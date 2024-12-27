"use client";
import Link from "next/link";
import Logo from "../icons/logo";
import { useEffect, useState } from "react";

const Header = ({ parallax }: { parallax?: boolean }) => {
  const links = [
    { link: "/about", label: "About" },
    { link: "/reserve", label: "Tickets" },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(scrollPosition, "scrollin");
  return (
    <header
      className={`${
        scrollPosition > 0 ? "bg-blackHeader/70 text-white" : "text-black"
      } ${
        parallax ? "absolute top-0" : "fixed"
      } z-50 flex justify-between items-center w-full py-5 px-10 bg-transparent`}
    >
      <Link
        href="/"
        className="font-bold text-2xl uppercase font-secondary text-black "
      >
        {Logo}
      </Link>
      <div className="flex gap-4">
        {links.map(({ link, label }) => (
          <Link
            key={label}
            href={link}
            className="font-extrabold text-lg uppercase underlineAfterHover"
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
