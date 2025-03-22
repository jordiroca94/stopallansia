import Countdown from "./Countdown";
import { Link } from "@/i18n/routing";
import Footer from "../Footer";
import KeyboardAnimation from "../animations/KeyboardAnimation";
import SimpleAnimation from "../animations/SimpleAnimation";
import { useTranslations } from "next-intl";

const ParallaxCover = () => {
  const t = useTranslations();

  return (
    <div className="bg-black block absolute top-full left-0 right-0 h-screen z-20">
      <div className="text-white flex justify-center items-center w-full flex-col h-screen gap-8">
        <SimpleAnimation>
          <h3 className="text-3xl font-bold uppercase"> {t("WELCOME")}</h3>
        </SimpleAnimation>
        <SimpleAnimation>
          <Countdown />
        </SimpleAnimation>
        <SimpleAnimation>
          <h5 className="text-lg font-bold uppercase text-gray-300">
            {t("PRIVATE")}
          </h5>
        </SimpleAnimation>

        <div className="max-w-[350px] lg:max-w-none text-lg flex flex-col gap-3 font-semibold w-full text-justify">
          <KeyboardAnimation
            className="md:hidden text-xl font-bold text-center"
            text={[
              t("MOBILE_KEYBOARD_ANIMATION.1"),
              t("MOBILE_KEYBOARD_ANIMATION.2"),
              t("MOBILE_KEYBOARD_ANIMATION.3"),
              t("MOBILE_KEYBOARD_ANIMATION.4"),
            ]}
            once
          />
          <KeyboardAnimation
            className="hidden md:block md:text-2xl font-bold text-center"
            text={[t("KEYBOARD_ANIMATION.1"), t("KEYBOARD_ANIMATION.2")]}
            once
          />
        </div>
        <SimpleAnimation className="mt-8">
          <Link
            href="/reserve"
            className="font-bold text-base uppercase border-white border py-3 px-6 rounded-md hover:bg-white hover:text-black"
          >
            {t("RESERVE")}
          </Link>
        </SimpleAnimation>
      </div>
      <Footer />
    </div>
  );
};

export default ParallaxCover;
