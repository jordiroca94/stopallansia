import { Calendar, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { CiLocationOn } from "react-icons/ci";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiTentLine } from "react-icons/ri";

export default function AboutContent() {
  const t = useTranslations();
  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
          {t("ABOUT_TITLE")}
        </h1>
        <p className="mx-auto max-w-2xl text-xl opacity-90">
          Where music and nature create perfect harmony
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-16">
        <section className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
          <p className="mb-4 text-lg">
            Founded in 2023, Stop All Ansia Festival was born from a vision to
            create a space where music and nature could coexist in perfect
            balance. What started as a small gathering of like-minded artists
            and nature enthusiasts has grown into one of the most anticipated
            music festivals celebrating the connection between artistic
            expression and environmental consciousness.
          </p>
          <p className="text-lg">
            Stop all Ansia Festival is a creative retreat that unites nature,
            people, and art in a journey away from everyday anxiety. It offers
            an opportunity to embrace, grow, and fully immerse oneself in the
            present moment with an open heart and mind.
          </p>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
            <div className="mb-4 flex items-center">
              <Calendar className="mr-3 h-6 w-6" />
              <h3 className="text-2xl font-bold">Festival Dates</h3>
            </div>
            <p className="text-lg">August 4-07, 2024</p>
            <p className="mt-2 text-lg">Four days of music, art, and nature</p>
          </div>

          <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
            <div className="mb-4 flex items-center">
              <MapPin className="mr-3 h-6 w-6" />
              <h3 className="text-2xl font-bold"></h3>
            </div>
            <p className="text-lg"></p>
            <p className="mt-2 text-lg"></p>
          </div>
        </div>

        <section className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-3xl font-bold">What Makes Us Different</h2>
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
          <a
            href="#"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-[#2d112b] transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span className="absolute h-0 w-0 rounded-full bg-black opacity-10 transition-all duration-300 group-hover:h-56 group-hover:w-56"></span>
            <span className="relative flex items-center">
              <span>BUY TICKETS</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
