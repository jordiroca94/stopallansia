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

const Artists = () => {
  const [showText, setShowText] = useState<string | null>(null);

  const cards = [
    {
      name: "b-lions",
      description:
        "Born and raised in Greece, DJ B-Líons brings over 15 years of musical experience to the decks. With a rich background in music, including Spanish guitar and trumpet, he began DJing over a decade ago at local events in northern Greece.",
      image: Blions,
    },
    {
      name: "canopi",
      description:
        "Michele, also known as Canopi, is a DJ and producer hailing from Genoa. His sets blend a variety of musical genres, with a focus on electronic and contemporary styles. At his live sets, we can listen to an electric mix ranging from Bass to Dembow, and Breakbeat to Hardgroove Techno, creating an immersive and dynamic sound experience.",
      image: Canopi,
    },
    {
      name: "contro-il-metodo",
      description:
        "Contro il Metodo are a duo of dj/producers from Milan. They are characterised by industrial, breakbeat and peaktime/driving techno influences. In their productions, deep and glitchy atmospheres combine with full and relentless rhythms, creating a sound with an analog and contemporary flavor, designed to satisfy the needs of the dancefloor.",
      image: ControlIlMetodo,
    },
    {
      name: "dimarziio",
      description:
        "Dimarziio is an Argentine DJ and producer, now based in Barcelona since 2023. Passionate about music from an early age, he has been dedicated to electronic music since 2019. His sound blends genres like progressive house, with influences from the ‘90s and ‘00s, electro, acid house, and indie dance.",
      image: Dimarziio,
    },
    {
      name: "flip-flop",
      description:
        "From the basketball court to the ping pong table, and now also on the decks—DJ Flip (aka DJ Crocs - any pun about the name intended of course) & DJ Flop (aka DJ Woody Chocolich) are bringing that same teamwork to the B2B set.",
      image: FlipFlop,
    },
    {
      name: "franco-forte",
      description:
        "His journey with music began in Turin in his teenage years, alongside an early passion for writing, initially in a raw, poetic form, which later evolved into fully crafted song lyrics. In 2019, he released his first single, 6990, officially launching the FRANCO FORTE project.",
      image: FrancoForte,
    },
    {
      name: "garage-bagarre",
      description:
        "Garage Bagarre’s music is an electrifying blend of ‘60s garage rock, surf, blues, and psychedelia. Hailing from the heart of Turin, this band channels raw energy into every performance, fusing gritty rhythms and vibrant sounds.",
      image: GarageBagarre,
    },
    {
      name: "inerba",
      description:
        "INERBA is a project that came to life two years ago in Torino. It’s blending rock, funk, and pop into an electrifying sound, where the powerful vocals of the lead singer take center stage, adding depth and emotion to every track.",
      image: Inerba,
    },
    {
      name: "johnny-c",
      description:
        "A lover of rhythm, Johnny C will take us through a journey of electronic music’s different sub genres. Starting on the piano at a young age and later mastering percussion and drums, he blends an array of electronic sub-genres in his sets—moving effortlessly from house to electro, acid to disco, and techno to psy-trance.",
      image: JohnyC,
    },
    {
      name: "kaiser",
      description:
        "Kaiser is born with a strong inclination for hip-hop culture and rap. Later, he pushed the boundaries and tried to find samples and influences. This love, made him became a true connoisseurs of black music culture. His favourite words are “people contamination”.",
      image: Kaiser,
    },
    {
      name: "mateo-bergoglio",
      description:
        "An Argentinian DJ and producer now based in Barcelona, bringing his unique blend of house, minimal house, and deep tech to dance floors. Drawing inspiration from heavyweights like Chris Stussy, Anotr, Marco Carola, Mateo Dufour, Toman, and Pawsa, he delivers fresh, groove-driven sets that keep the energy high.",
      image: MateoBergoglio,
    },
    {
      name: "perez",
      description:
        "An incurable groove seeker, initially a habitué of the noblest Milanese clubbing scene, he naturally switched to the other side of the console, thanks to a rich background in house, disco, funk, soul and African music.",
      image: Perez,
    },
    {
      name: "run",
      description:
        "Rhythmicus distortus urbanus. We are looking for a distorted and rhythmic sound, we like the speed and the breaking of the structures. We want to make people dance and jump because that’s what rock is all about. This is how R.U.N steps onto the scene, and we’re already buzzing with excitement, ready to dive into their music.",
      image: Run,
    },
    {
      name: "sova-sunset",
      description:
        "Sova Sunset bring raw energy to the stage, mixing gritty vocals and distorted guitars born on the streets of Milan. Composed of Federico Navarra (vocals and guitar), Samuele Roda (drums), Gabriele Umana (guitar, bass, keyboards) and Gianluca Sansone (guitar), the band blends alternative rock and punk, creating a powerful and electrifying sound",
      image: SovaSunset,
    },
    {
      name: "techno-koffie",
      description:
        "Techno Koffie is a collective of three: Federico, Guido and Jacopo. It started by adding a techno twist to the italian ritual of drinking coffee with friends during the dull Sunday afternoons. Techno Koffie is now a recognisable name among the techno lovers in the Netherlands.",
      image: TechnoKoffie,
    },
    {
      name: "veezo",
      description:
        "Veezo is a pianist and producer rooted in jazz. Raised with hiphop and in love with electronica, he draws inspiration from artists such as Ahmad Jamal, Fela Kuti and Piero Umiliani.",
      image: Veezo,
    },
  ];

  return (
    <Container>
      <Grid>
        <SimpleAnimation className="col-span-full border-b pb-5 border-gray">
          <h1 className="text-3xl lg:text-5xl font-semibold font-secondary">
            Last year edition
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
