import Link from "next/link";
import Logo from "../icons/logo";

const Header = () => {
  return (
    <header className="fixed text-black z-50 flex justify-between w-full py-5 px-10 bg-transparent">
      <Link href="/" className="font-bold text-2xl uppercase font-secondary">
        {Logo}
      </Link>

      <button className="font-extrabold text-lg uppercase transition-transform duration-300 hover:scale-110">
        Get tickets
      </button>
    </header>
  );
};

export default Header;
