import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="fixed text-black z-50 flex justify-between w-full py-5 px-10 bg-transparent">
      <Link
        href="/"
        className="font-bold text-2xl uppercase text-black font-secondary"
      >
        LOGO
      </Link>
      <button className="font-extrabold text-lg uppercase">Get tickets</button>
    </div>
  );
};

export default Header;
