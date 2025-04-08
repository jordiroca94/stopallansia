import React from "react";
import Container from "./ui/Container";
import Image from "next/image";
import AboutImage from "../../public/images/about.png";
import Grid from "./ui/Grid";
import SimpleAnimation from "./animations/SimpleAnimation";
import TextAnimation from "./animations/TextAnimation";
import { CiLocationOn } from "react-icons/ci";
import { RiTentLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations();

  const cards = [
    {
      title: t("ABOUT_CARDS.1.TITLE"),
      description: t("ABOUT_CARDS.1.DESCRIPTION"),
      icon: <CiLocationOn className="size-8" />,
    },
    {
      title: t("ABOUT_CARDS.2.TITLE"),
      description: t("ABOUT_CARDS.2.DESCRIPTION"),
      icon: <RiTentLine className="size-8" />,
    },
    {
      title: t("ABOUT_CARDS.3.TITLE"),
      description: t("ABOUT_CARDS.3.DESCRIPTION"),
      icon: <IoFastFoodOutline className="size-8" />,
    },
  ];

  return (
    <Container>
      <Grid>
        <SimpleAnimation className="col-span-full border-b pb-5 border-gray">
          <h1 className="text-3xl lg:text-5xl font-semibold font-secondary">
            {t("ABOUT_TITLE")}
          </h1>
        </SimpleAnimation>
        <div className="col-span-4 lg:col-span-6 text-base text-justify">
          <TextAnimation className="flex flex-col gap-3">
            <p>{t("ABOUT_DESCRIPTION.1")}</p>
            <p>{t("ABOUT_DESCRIPTION.2")}</p>
            <p>{t("ABOUT_DESCRIPTION.3")}</p>
          </TextAnimation>
        </div>
        <SimpleAnimation className="lg:col-start-8 col-span-4 lg:col-span-5">
          <Image className="rounded-md" src={AboutImage} alt="Who are we?" />
        </SimpleAnimation>
      </Grid>
      <Grid className="py-6 lg:py-12 gap-8">
        {cards.map((card) => (
          <div key={card.title} className="card col-span-4">
            <div className="cardContent">
              <h2 className="cardTitle flex justify-center ">{card.title}</h2>
              <div className="text-white w-full flex justify-center py-2">
                {card.icon}
              </div>
              <p className="cardDescription text-center">{card.description}</p>
            </div>
          </div>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
