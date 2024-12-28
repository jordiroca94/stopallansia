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

// swiperjs.com
const About = () => {
  const cards = [
    {
      title: "Location",
      description:
        "Far from everyday worries, surrounded by nature: this is where Stop all'Ansia happens. Info in Instagram DM.",
      icon: <CiLocationOn className="size-8" />,
    },
    {
      title: "Accomodation",
      description:
        "To stay, bring your own tent and camp in the designated area. Basic amenities are provided: restrooms are available.",
      icon: <RiTentLine className="size-8" />,
    },
    {
      title: "Eat & Drink",
      description:
        "To help us organize, you can pre-order your meals when reserving your spot at the event (you can always buy them on-site).You are also welcome to bring your own food.",
      icon: <IoFastFoodOutline className="size-8" />,
    },
  ];

  return (
    <div className="pt-header">
      <Container>
        <Grid>
          <SimpleAnimation className="col-span-full border-b pb-5 border-gray">
            <h1 className="text-3xl lg:text-5xl font-semibold font-secondary">
              WHAT IS STOP ALL ANSIA
            </h1>
          </SimpleAnimation>
          <div className="col-span-4 lg:col-span-6 text-base text-justify">
            <TextAnimation className="flex flex-col gap-3">
              <p>
                An opportunity to embrace, grow, and fully immerse oneself in
                the present moment with an open heart and mind.
              </p>
              <p>
                This is a space where art transcends limitations, cultivating an
                authentic and lasting exchange between diverse forms of
                expression.
              </p>
              <p>
                Stop all Ansia Festival is a creative retreat that unites
                nature, people and art in a journey away from everyday anxiety.
              </p>
            </TextAnimation>
          </div>
          <SimpleAnimation className="lg:col-start-8 col-span-4 lg:col-span-5">
            <Image className="rounded-2xl" src={AboutImage} alt="Who are we?" />
          </SimpleAnimation>
        </Grid>
        <Grid className="py-6 lg:py-12 gap-8">
          {cards.map((card) => (
            <div key={card.title} className="card col-span-4">
              <div className="cardContent">
                <h2 className="cardTitle flex justify-center">{card.title}</h2>
                <div className="text-white w-full flex justify-center py-2">
                  {card.icon}
                </div>
                <p className="cardDescription">{card.description}</p>
              </div>
            </div>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default About;
