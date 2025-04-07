import { Link } from "@/i18n/routing";
import Logo from "../icons/logo";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import { MobileMenu } from "./MobileMenu";

const Header = ({ parallax }: { parallax?: boolean }) => {
  const t = useTranslations();

  const navItems = [
    { link: "/about" as const, label: t("ABOUT") },
    { link: "/reserve" as const, label: t("TICKETS") },
    { link: "/artists" as const, label: t("ARTISTS") },
  ];

  return (
    <header
      className={`${
        parallax ? "absolute top-0" : ""
      } z-50 flex justify-between items-center w-full py-5 px-5 lg:px-10 bg-transparent`}
    >
      <Link
        href="/"
        className="font-bold text-2xl uppercase font-secondary text-black "
      >
        {Logo}
      </Link>
      <MobileMenu />
      <div className="hidden sm:flex items-center gap-2 lg:gap-4">
        {navItems.map(({ link, label }) => (
          <Link
            key={label}
            href={link}
            className="font-extrabold text-lg uppercase underlineAfterHover"
          >
            {label}
          </Link>
        ))}
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
