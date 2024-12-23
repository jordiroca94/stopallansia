import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="fixed text-black z-50 flex justify-between w-full py-5 px-10 bg-transparent">
      <Link href="/" className="font-bold text-xl uppercase text-black">
        Stop all ansia
      </Link>
      <button className="font-bold text-xl text-black">Get tickets</button>
    </div>
  );
};

export default Header;
