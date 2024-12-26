import Link from "next/link";
import Logo from "../icons/logo";

const Header = ({ parallax }: { parallax?: boolean }) => {
  const links = [
    { link: "/about", label: "About" },
    { link: "/reserve", label: "Tickets" },
  ];
  return (
    <header
      className={`${
        parallax ? "absolute top-0" : "fixed"
      } text-black z-50 flex justify-between items-center w-full py-5 px-10 bg-transparent`}
    >
      <Link href="/" className="font-bold text-2xl uppercase font-secondary">
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
