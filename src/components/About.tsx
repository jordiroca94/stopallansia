import { Calendar, Activity } from "lucide-react";
import { useTranslations } from "next-intl";
import { CiLocationOn } from "react-icons/ci";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiTentLine } from "react-icons/ri";
import BuyTicketsButton from "./ui/BuyTicketsButton";

export default function About() {
  const t = useTranslations();
  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
          Stop All Ansia
        </h1>
        <p className="mx-auto max-w-2xl text-xl opacity-90">
          {t("ABOUT_SUBTITLE")}
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-16">
        <section className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-3xl font-bold">{t("ABOUT_STORY.TITLE")}</h2>
          <p className="mb-4 text-lg">{t("ABOUT_STORY.1")}</p>
          <p className="text-lg">{t("ABOUT_STORY.2")}</p>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
            <div className="mb-4 flex items-center">
              <Calendar className="mr-3 h-6 w-6" />
              <h3 className="text-2xl font-bold">{t("ABOUT_DATES.TITLE")}</h3>
            </div>
            <p className="text-lg">{t("ABOUT_DATES.1")}</p>
            <p className="mt-2 text-lg">{t("ABOUT_DATES.2")}</p>
          </div>

          <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
            <div className="mb-4 flex items-center">
              <Activity className="mr-3 h-6 w-6" />
              <h3 className="text-2xl font-bold">{t("ABOUT_VIBES.TITLE")}</h3>
            </div>
            <p className="text-lg">{t("ABOUT_VIBES.1")}</p>
            <p className="mt-2 text-lg">{t("ABOUT_VIBES.2")} </p>
          </div>
        </div>
        <section className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-white/20 p-4">
                <CiLocationOn className="size-8" />{" "}
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t("ABOUT_CARDS.1.TITLE")}
              </h3>
              <p>{t("ABOUT_CARDS.1.DESCRIPTION")}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-white/20 p-4">
                <RiTentLine className="size-8" />{" "}
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t("ABOUT_CARDS.2.TITLE")}
              </h3>
              <p>{t("ABOUT_CARDS.2.DESCRIPTION")}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-white/20 p-4">
                <IoFastFoodOutline className="size-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t("ABOUT_CARDS.3.TITLE")}
              </h3>
              <p>{t("ABOUT_CARDS.3.DESCRIPTION")}</p>
            </div>
          </div>
        </section>
        <div className="mx-auto mt-8 flex justify-center">
          <BuyTicketsButton />
        </div>
      </div>
    </div>
  );
}
