import { Link } from "@/i18n/routing";
import Logo from "../icons/logo";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";

const Header = ({ parallax }: { parallax?: boolean }) => {
  const t = useTranslations();

  const links: { link: "/about" | "/reserve" | "/artists"; label: string }[] = [
    { link: "/about", label: t("ABOUT") },
    { link: "/reserve", label: t("TICKETS") },
    { link: "/artists", label: t("ARTISTS") },
  ];

  return (
    <header
      className={`${
        parallax ? "absolute top-0" : "fixed"
      } z-50 flex justify-between items-center w-full py-5 px-5 lg:px-10 bg-transparent`}
    >
      <Link
        href="/"
        className="font-bold text-2xl uppercase font-secondary text-black "
      >
        {Logo}
      </Link>
      <div className="flex items-center gap-4">
        {links.map(({ link, label }) => (
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
