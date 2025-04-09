"use client";
import React, { useState } from "react";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import SimpleAnimation from "./animations/SimpleAnimation";
import Image from "next/image";
import Blions from "../../public/images/lineup/b-lions.png";
import Canopi from "../../public/images/lineup/canopi.png";
import ControlIlMetodo from "../../public/images/lineup/contro-il-metodo.png";
import Dimarziio from "../../public/images/lineup/dimarziio.png";
import FlipFlop from "../../public/images/lineup/flip-flop.png";
import FrancoForte from "../../public/images/lineup/franco-forte.png";
import GarageBagarre from "../../public/images/lineup/garage-bagarre.png";
import Inerba from "../../public/images/lineup/inerba.png";
import JohnyC from "../../public/images/lineup/johnny-c.png";
import Kaiser from "../../public/images/lineup/kaiser.png";
import MateoBergoglio from "../../public/images/lineup/mateo-bergoglio.png";
import Perez from "../../public/images/lineup/perez.png";
import Run from "../../public/images/lineup/run.png";
import SovaSunset from "../../public/images/lineup/sova-sunset.png";
import TechnoKoffie from "../../public/images/lineup/techno-koffie.png";
import Veezo from "../../public/images/lineup/veezo.png";
import { useTranslations } from "next-intl";

const Artists = () => {
  const [showText, setShowText] = useState<string | null>(null);
  const t = useTranslations();

  const cards = [
    {
      name: "b-lions",
      description: t("ARTIST.1"),
      image: Blions,
    },
    {
      name: "canopi",
      description: t("ARTIST.2"),
      image: Canopi,
    },
    {
      name: "contro-il-metodo",
      description: t("ARTIST.3"),
      image: ControlIlMetodo,
    },
    {
      name: "dimarziio",
      description: t("ARTIST.4"),
      image: Dimarziio,
    },
    {
      name: "flip-flop",
      description: t("ARTIST.5"),
      image: FlipFlop,
    },
    {
      name: "franco-forte",
      description: t("ARTIST.6"),
      image: FrancoForte,
    },
    {
      name: "garage-bagarre",
      description: t("ARTIST.7"),
      image: GarageBagarre,
    },
    {
      name: "inerba",
      description: t("ARTIST.8"),
      image: Inerba,
    },
    {
      name: "johnny-c",
      description: t("ARTIST.9"),
      image: JohnyC,
    },
    {
      name: "kaiser",
      description: t("ARTIST.10"),
      image: Kaiser,
    },
    {
      name: "mateo-bergoglio",
      description: t("ARTIST.11"),
      image: MateoBergoglio,
    },
    {
      name: "perez",
      description: t("ARTIST.12"),
      image: Perez,
    },
    {
      name: "run",
      description: t("ARTIST.13"),
      image: Run,
    },
    {
      name: "sova-sunset",
      description: t("ARTIST.14"),
      image: SovaSunset,
    },
    {
      name: "techno-koffie",
      description: t("ARTIST.15"),
      image: TechnoKoffie,
    },
    {
      name: "veezo",
      description: t("ARTIST.16"),
      image: Veezo,
    },
  ];

  return (
    <Container>
      <Grid>
        <SimpleAnimation className="col-span-full border-b pb-5 border-gray">
          <h1 className="text-3xl lg:text-5xl font-semibold font-secondary">
            {t("ARTISTS_TITLE")}
          </h1>
        </SimpleAnimation>
      </Grid>
      <Grid className="py-10">
        {cards.map((card) => (
          <div
            onClick={() =>
              setShowText((prev) => (prev === card.name ? null : card.name))
            }
            key={card.name}
            className="col-span-4 sm:col-span-2 lg:col-span-4 rounded-2xl overflow-hidden shadow-xl relative group"
          >
            <Image src={card.image} alt={card.name} />
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold bg-black bg-opacity-40">
              <h5
                className={`lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 px-5 text-center ${
                  showText === card.name
                    ? "max-[1024px]:opacity-100"
                    : "max-[1024px]:opacity-0"
                }`}
              >
                {card.description}
              </h5>
            </div>
          </div>
        ))}
      </Grid>
    </Container>
  );
};

export default Artists;
