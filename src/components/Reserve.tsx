import React from "react";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import SimpleAnimation from "./animations/SimpleAnimation";
import { Link } from "@/i18n/routing";
import TextAnimation from "./animations/TextAnimation";
import Image from "next/image";
import Reserveimage from "../../public/images/reserve.png";
import { useTranslations } from "next-intl";
const Reserve = () => {
  const t = useTranslations();

  return (
    <Container>
      <Grid customGap="gap-4" className="pb-6 lg:pb-12">
        <SimpleAnimation className="col-span-full border-b pb-5 border-gray">
          <h1 className="text-3xl lg:text-5xl font-semibold font-secondary">
            {t("RESERVE_TITLE")}
          </h1>
        </SimpleAnimation>
        <SimpleAnimation className="col-span-full">
          <h2 className="text-2xl lg:text-4xl font-semibold">
            {t("RESERVE_SUBTITLE")}
          </h2>
        </SimpleAnimation>
        <div className="col-span-4 lg:col-span-8 flex flex-col gap-3 text-base text-justify pr-4">
          <SimpleAnimation>
            <h3 className="text-xl lg:text-2xl font-light">
              {t("RESERVE_SUBTITLE_2")}
            </h3>
          </SimpleAnimation>
          <TextAnimation className="flex flex-col gap-3">
            <p>{t("RESERVE_DESCRIPTION.1")}</p>
            <p>{t("RESERVE_DESCRIPTION.2")}</p>
            <p>{t("RESERVE_DESCRIPTION.3")}</p>
            <p>{t("RESERVE_DESCRIPTION.4")}</p>
            <p>{t("RESERVE_DESCRIPTION.5")}</p>
          </TextAnimation>
          <SimpleAnimation>
            <Link
              href="/reserve-tickets"
              className="sm:w-fit my-4 lg:mt-10 flex justify-center font-bold text-base uppercase border-black bg-white border py-3 px-6 rounded-md hover:bg-black hover:text-white"
            >
              {t("RESERVE_BUTTON")}
            </Link>
          </SimpleAnimation>
        </div>
        <SimpleAnimation className="col-span-4 lg:col-start-9">
          <Image
            className="aspect-[5/6] rounded-md"
            src={Reserveimage}
            alt={t("RESERVE_TITLE")}
          />
        </SimpleAnimation>
      </Grid>
    </Container>
  );
};

export default Reserve;
